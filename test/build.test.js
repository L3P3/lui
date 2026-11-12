import {execFileSync} from 'node:child_process';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import {
	expect,
	test,
} from 'bun:test';

const env = {...process.env};
delete env.CI;
delete env.GITHUB_REF_NAME;

execFileSync(
	process.execPath,
	['./build.js'],
	{env}
);

test('production bundles keep internal variables scoped', () => {
	const sandbox = {
		document: {},
		window: null,
	};
	sandbox.window = sandbox;
	vm.createContext(sandbox);
	vm.runInContext(
		readFileSync('./dist/lui.js', 'utf8'),
		sandbox
	);

	expect(Object.keys(sandbox).sort()).toEqual([
		'document',
		'lui',
		'window',
	]);
});
