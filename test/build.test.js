import {execFileSync} from 'node:child_process';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import {JSDOM} from 'jsdom';
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

for (const [filename, max_size, rjs] of [
	['lui.legacy.js', 9100, false],
	['lui.r.js', 6950, true],
	['lui.r.noeval.js', 7150, true],
	['luix.legacy.js', 11050, false],
	['luix.r.js', 8900, true],
	['luix.r.noeval.js', 9100, true],
]) {
	test(`${filename}: compact bundle updates and removes children`, () => {
		const code = readFileSync('./dist/' + filename, 'utf8');
		expect(Buffer.byteLength(code)).toBeLessThan(max_size);

		const dom = new JSDOM('<!DOCTYPE html><body></body>', {
			runScripts: 'outside-only',
		});
		let lui;
		dom.window.define = value => { lui = value; };
		dom.window.eval(code);
		if (!rjs) lui = dom.window.lui;

		const root = dom.window.document.createElement('div');
		let set_show;
		lui.init(() => {
			const [show, set] = lui.hook_state(true);
			set_show = set;
			return [
				lui.node_dom('p', {
					D: {item: show ? 'a' : 'c'},
					S: {color: show ? 'red' : 'blue'},
					textContent: show ? 'a' : 'c',
				}),
				show && lui.node_dom('span', {textContent: 'b'}),
			];
		}, root);

		expect(root.textContent).toBe('ab');
		expect(root.firstChild.getAttribute('data-item')).toBe('a');
		expect(root.firstChild.style.color).toBe('red');
		set_show(false);
		expect(root.textContent).toBe('c');
		expect(root.firstChild.getAttribute('data-item')).toBe('c');
		expect(root.firstChild.style.color).toBe('blue');
		dom.window.close();
	});
}
