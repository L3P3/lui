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

function flags_set(debug, verbose, legacy, rjs, extended) {
	fs.writeFileSync(
		'./src/flags.js',
`export const DEBUG = ${debug};
export const VERBOSE = ${verbose};
export const LEGACY = ${legacy};
export const RJS = ${rjs};
export const EXTENDED = ${extended};
`,
		'utf8'
	);
}

async function build(prod, legacy, rjs, extended) {
	flags_set(!prod, false, legacy, rjs, extended);

	const filename = `lui${
		extended ? 'x' : ''
	}${
		rjs ? '.r' : ''
	}${
		prod ? '' : '.dev'
	}${
		legacy ? '.legacy' : ''
	}.js`;
	const file = './dist/' + filename;

	const stderr = (await exec(
		'google-closure-compiler --' +
		[
			'assume_function_wrapper',
			'charset UTF-8',
			'compilation_level ADVANCED',
			'dependency_mode PRUNE',
			'entry_point ./src/luirt.js',
			'js ./src',
			'js_output_file ' + file,
			'language_in ECMASCRIPT_NEXT',
			`language_out ECMASCRIPT${
				legacy ? '3'
				: rjs ? '5_STRICT'
				: '_2020'
			}`,
			'strict_mode_input',
			'emit_use_strict',
			'module_resolution WEBPACK',
			'rewrite_polyfills false',
			'use_types_for_optimization',
			'warning_level VERBOSE'
		]
		.join(' --')
	))[2].trim();
	if (stderr) {
		console.log(stderr);
		process.exit(1);
	}

	const wrap_fn = legacy || rjs;

	const code_js = (
		(
			fs.readFileSync(file, 'ascii')
			.trim() + '%END%'
		)
		.replace('lui.js web frame work', 'lui.js web frame work ' + version)
		.replace('*/\n',
			wrap_fn ? '*/\n(function(){' : '*/\n{'
		)
		.replace(';%END%',
			wrap_fn ? '})()' : '}'
		)
		//.split('\n').join('')
	);

	fs.writeFileSync(file, code_js, 'ascii');

	let size_before = parseInt(
		(
			await exec(`git cat-file -s origin/dist:${filename}`)
		)[1]
	);
	if (isNaN(size_before)) size_before = 0;

	let diff = String(code_js.length - size_before);
	if (diff === '0') diff = '';
	else {
		if (!diff.startsWith('-')) diff = ' +' + diff;
		else diff = ' ' + diff;
	}

	console.log(`${
		filename.padEnd(14, ' ')
	} ${
		String(code_js.length).padStart(5, ' ')
	}${
		diff
	}`);
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
//await exec('rm ./dist/*.old.js;rename.ul .js .old.js ./dist/*.js');
await exec('rm ./dist/*');

console.log(`build ${version}...`);

//await build(true, false, false, false);

for (const extended of [false, true]) {
	for (const prod of [false, true])
	for (const rjs of [false, true])
		await build(prod, false, rjs, extended);

	await build(true, true, false, extended);
}

if (
	flags.includes('d') &&
	hostname() === 'l3p3-rk5'
) {
	try {
		console.log('compress...');

		console.log((await exec('zopfli --i1000 ./dist/lui*'))[2]);

		console.log(`compression: ${
			fs.statSync('./dist/lui.js').size
		} -> ${
			fs.statSync('./dist/lui.js.gz').size
		}`);
	}
	catch (error) {}

	console.log('deploy...');
	await exec('cp ./dist/lui* /media/Archiv/Anbieter/www/shr/');
}

})()
.catch(console.log)
.finally(() => {
	flags_set(true, false, false, false, true);
});
