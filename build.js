#!/bin/env node
/* eslint-disable no-undef */

const flags = process.argv[2] || '';

import * as fs from 'fs';
import {exec as child_process_exec} from 'child_process';
import {hostname} from 'os';

const {version} = JSON.parse(
	fs.readFileSync('./package.json', 'utf-8')
);
const CI = !!process.env.CI;
const checks_only = CI && process.env.GITHUB_REF_NAME !== 'master';
const GCC_PATH = 'node_modules/.bin/google-closure-compiler';

const exec = cmd => (
	new Promise((resolve, reject) =>
		child_process_exec(
			cmd,
			(error, stdout, stderr) => {
				if (error) reject(error);
				else if (stderr.trim()) {
					console.error(stderr);
					reject(new Error('error output'));
				}
				else resolve(stdout);
			}
		)
	)
);

async function old_size(path) {
	const size = await exec(`git cat-file -s origin/dist:${path}`).catch(() => '');
	return size ? parseInt(size) : 0;
}

function flags_set(debug, verbose, legacy, rjs, extended, noeval, debug_internal) {
	fs.writeFileSync(
		'./src/flags.js',
`export const DEBUG = ${debug};
export const DEBUG_INTERNAL = ${debug_internal};
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
	flags_set(!prod, false, legacy, rjs, extended, noeval, false);

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

	await exec(
		GCC_PATH + ' --' +
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
			'warning_level VERBOSE',
			checks_only ? 'checks_only' : null,
		]
		.filter(Boolean)
		.join(' --')
	);
	if (checks_only) return;

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

	const size_before = await old_size(filename);

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

const gcc_version_output = await exec(GCC_PATH + ' --version');
if(!gcc_version_output.includes('Version: v202')) {
	console.log('command output: ' + gcc_version_output);
	throw new Error('newer closure compiler version required!');
}

await exec('mkdir -p ./dist');
//await exec('rm ./dist/*.old.js;rename.ul .js .old.js ./dist/*.js');
await exec('rm ./dist/*').catch(() => {});

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
	!CI &&
	flags.includes('d') &&
	hostname() === 'l3p3-rk5'
) {
	try {
		console.log('compress...');

		await exec('parallel zopfli --i10000 dist/{/} ::: dist/lui*');

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
.catch(error => {
	console.error(error);
	process.exitCode = 1;
})
.finally(() => {
	if (CI) return;
	flags_set(true, false, false, false, true, false, true);
});
