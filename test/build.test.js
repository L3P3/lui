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
	['lui.legacy.js', 9280, false],
	['lui.r.js', 7130, true],
	['lui.r.noeval.js', 7330, true],
	['luix.legacy.js', 11230, false],
	['luix.r.js', 9080, true],
	['luix.r.noeval.js', 9280, true],
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

for (const [filename, max_size] of [
	['lui.js', 4930],
	['lui.noeval.js', 5110],
	['luix.js', 6530],
	['luix.noeval.js', 6710],
]) {
	test(`${filename}: modern bundle stays compact`, () => {
		expect(readFileSync('./dist/' + filename).length).toBeLessThan(max_size);
	});
}

for (const filename of [
	'lui.noeval.js',
	'lui.r.noeval.js',
	'luix.noeval.js',
	'luix.r.noeval.js',
]) {
	test(`${filename}: nested first nodes preserve order`, () => {
		const dom = new JSDOM('<!DOCTYPE html><body></body>', {
			runScripts: 'outside-only',
		});
		let lui;
		dom.window.define = value => { lui = value; };
		dom.window.eval(readFileSync('./dist/' + filename, 'utf8'));
		lui ||= dom.window.lui;

		const setters = {};
		const Part = ({name}) => {
			const [show, set] = lui.hook_state(false);
			setters[name] = set;
			return show ? [lui.node_dom('span', {textContent: name})] : null;
		};
		const Inner = () => [
			lui.node(Part, {name: 'a'}),
			false,
			lui.node(Part, {name: 'b'}),
			lui.node(Part, {name: 'c'}),
		];
		const root = dom.window.document.createElement('div');
		lui.init(() => [lui.node(Inner), lui.node_dom('span[textContent=z]')], root);
		setters.c(true);
		setters.a(true);
		setters.b(true);
		expect(root.textContent).toBe('abcz');
		setters.a(false);
		setters.c(false);
		expect(root.textContent).toBe('bz');
		setters.a(true);
		expect(root.textContent).toBe('abz');
		dom.window.close();
	});
}

test('extended rjs noeval bundle preserves mapped hooks and cleanup order', () => {
	const dom = new JSDOM('<!DOCTYPE html><body></body>', {
		runScripts: 'outside-only',
	});
	let lui;
	dom.window.define = value => { lui = value; };
	dom.window.eval(readFileSync('./dist/luix.r.noeval.js', 'utf8'));

	const root = dom.window.document.createElement('div');
	const cleanups = [];
	let set_items;
	const map_item = item => {
		lui.hook_effect(() => () => cleanups.push(item), []);
		return item.toUpperCase();
	};
	lui.init(() => {
		const [items, set] = lui.hook_state(['a', 'b', 'c']);
		set_items = set;
		const values = lui.hook_map(map_item, items);
		return [lui.node_dom('p', {textContent: values.join('')})];
	}, root);

	expect(root.textContent).toBe('ABC');
	set_items(['c', 'a']);
	expect(root.textContent).toBe('CA');
	expect(cleanups).toEqual(['b']);
	set_items([]);
	expect(root.textContent).toBe('');
	expect(cleanups).toEqual(['b', 'c', 'a']);
	dom.window.close();
});
