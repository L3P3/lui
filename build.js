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

function flags_set(debug, verbose, legacy, rjs, extended, noeval) {
	fs.writeFileSync(
		'./src/flags.js',
`export const DEBUG = ${debug};
export const VERBOSE = ${verbose};
export const LEGACY = ${legacy};
export const RJS = ${rjs};
export const EXTENDED = ${extended};
export const NOEVAL = ${noeval};
`,
		'utf8'
	);
}

async function build(prod, legacy, rjs, extended, noeval) {
	flags_set(!prod, false, legacy, rjs, extended, noeval);

	const filename = `lui${
		extended ? 'x' : ''
	}${
		rjs ? '.r' : ''
	}${
		noeval ? '.noeval' : ''
	}${
		legacy ? '.legacy' : ''
	}${
		prod ? '' : '.dev'
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

	let code_js = (
		fs.readFileSync(file, 'ascii')
		.trim()
	);
	if (!code_js.startsWith("'use strict';")) {
		throw new Error('closure compiler output signature mismatch');
	}
	// cut off use strict
	code_js = code_js.slice(13);
	// extract closure compiler helpers added to the beginning
	let cc_helpers = '';
	const cc_helpers_length = code_js.indexOf('/*');
	if (cc_helpers_length > 0) {
		cc_helpers = code_js.slice(0, cc_helpers_length);
		code_js = code_js.slice(cc_helpers_length);
	}
	code_js = (
		'"use strict";' +
		code_js
		// insert version into file header
		.replace('lui.js web framework', 'lui.js web framework ' + version)
		.replace('*/\n',
			'*/\n' +
			(wrap_fn ? '(function()' : '') +
			'{' +
			cc_helpers
		)
		// remove last ;
		.slice(0, -1) +
		'}' +
		(wrap_fn ? ')()' : '') +
		'\n'
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
		await build(prod, false, rjs, extended, false);

	// legacy
	await build(true, true, false, extended, false);

	// noeval
	await build(true, false, false, extended, true);
	await build(true, false, true, extended, true);
}

if (
	flags.includes('d') &&
	hostname() === 'l3p3-rk5'
) {
	try {
		console.log('compress...');

		console.log((await exec('parallel zopfli --i10000 dist/{/} ::: dist/lui*'))[2]);

		console.log(`compression: ${
			fs.statSync('./dist/lui.js').size
		} -> ${
			fs.statSync('./dist/lui.js.gz').size
		}`);
	}
	catch (error) {}

	console.log('deploy...');
	const version_m = version.split('.')[0];
	await exec(`mkdir -p /media/Archiv/Anbieter/www/shr/lui/${version_m};cp ./dist/lui* /media/Archiv/Anbieter/www/shr/lui/${version_m}/`);
}

})()
.catch(console.log)
.finally(() => {
	flags_set(true, false, false, false, true, false);
});
