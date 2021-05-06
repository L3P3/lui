#!/bin/env node
/* eslint-disable no-undef */

const flags = process.argv[2] || '';

import * as fs from 'fs';
import {exec as child_process_exec} from 'child_process';
import {hostname} from 'os';

const {version} = JSON.parse(
	fs.readFileSync('./package.json', 'utf-8')
);

const exec = cmd => (
	new Promise(resolve =>
		child_process_exec(
			cmd,
			(...args) => resolve(args)
		)
	)
)

function flags_set(debug, verbose) {
	fs.writeFileSync(
		'./src/flags.js',
`export const DEBUG = ${debug};
export const VERBOSE = ${verbose};
`,
		'utf8'
	);
}

async function build(prod) {
	flags_set(!prod, false);

	const file = './dist/lui' + (prod ? '' : '.dev') + '.js';

	console.log((await exec(
		'google-closure-compiler --' +
		[
			'assume_function_wrapper',
			'charset UTF-8',
			'compilation_level ADVANCED',
			'dependency_mode PRUNE',
			'entry_point ./src/luirt.js',
			'js ./src',
			'js_output_file ' + file,
			'jscomp_warning boundedGenerics',
			'language_in ECMASCRIPT_NEXT',
			'language_out ECMASCRIPT6_STRICT',
			'module_resolution WEBPACK',
			'rewrite_polyfills false',
			'strict_mode_input',
			'use_types_for_optimization',
			'warning_level VERBOSE'
		]
		.join(' --')
	))[2]);
	
	const code_js = (
		(
			fs.readFileSync(file, 'utf8')
			.trim() + '%END%'
		)
		.replace('lui.js web frame work', 'lui.js web frame work ' + version)
		.replace('*/\n', '*/\n{')
		.replace(';%END%', '}')
		//.split('\n').join('')
	);

	fs.writeFileSync(file, code_js, 'utf8');
}

(async () => {

if(
	!(
		await exec('google-closure-compiler --version')
	)[1].includes('Version: v202')
) {
	console.log('newer closure compiler version required!');
	return;
}

await exec('mkdir -p ./dist');
await exec('rm ./dist/lui.*');

console.log(`build ${version}...`);

await build(false);
await build(true);

console.log(`raw size: ${
	Math.round(fs.statSync('./dist/lui.js').size / 1024)
}k`);

if (
	flags.includes('d') &&
	hostname() === 'l3p3-rk5'
) {
	try {
		console.log('compress...');
	
		console.log((await exec('zopfli --i1000 ./dist/lui.*'))[2]);
	
		console.log(`compressed size: ${
			Math.round(fs.statSync('./dist/lui.js.gz').size / 1024)
		}k`);
	}
	catch (error) {}

	console.log('deploy...');
	await exec('mv ./dist/lui.* /media/Archiv/Anbieter/node/rtjscomp/public/shr/');
}

})()
.catch(console.log)
.finally(() => {
	flags_set(true, false);
});
