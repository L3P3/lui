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

for (const [filename, baseline, modern] of [
	['lui.dev.js', 9497, true],
	['lui.r.dev.js', 12005, false],
	['lui.js', 4836, true],
	['lui.r.js', 7031, false],
	['lui.legacy.js', 9169, false],
	['lui.noeval.js', 5016, true],
	['lui.r.noeval.js', 7233, false],
	['luix.dev.js', 11472, true],
	['luix.r.dev.js', 14329, false],
	['luix.js', 6453, true],
	['luix.r.js', 8974, false],
	['luix.legacy.js', 11102, false],
	['luix.noeval.js', 6629, true],
	['luix.r.noeval.js', 9178, false],
]) {
	test(`${filename}: loops stay compact without iterator helpers`, () => {
		const code = readFileSync('./dist/' + filename, 'utf8');
		expect(
			Buffer.byteLength(code)
		).toBeLessThanOrEqual(baseline);
		expect(code)
			.not.toContain('Symbol.iterator');
		expect(code)
			.not.toMatch(/\.next\(\)/);
		expect(code)
			.not.toMatch(/\b(\w+)=function\([^)]*\)\{[^{}]*\}[^{}]*?for\([^()]*\)\1\(/);
		if (modern) expect(code)
			.toMatch(/\bof\b/);
	});
}

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
	['lui.legacy.js', 9270, false],
	['lui.r.js', 7132, true],
	['lui.r.noeval.js', 7334, true],
	['luix.legacy.js', 11203, false],
	['luix.r.js', 9075, true],
	['luix.r.noeval.js', 9279, true],
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

for (const [filename, rjs] of [
	['lui.legacy.js', false],
	['lui.r.js', true],
	['lui.r.dev.js', true],
	['lui.r.noeval.js', true],
	['luix.legacy.js', false],
	['luix.r.js', true],
	['luix.r.dev.js', true],
	['luix.r.noeval.js', true],
]) {
	test(`${filename}: model actions and effects work without Symbol`, () => {
		const dom = new JSDOM('<!DOCTYPE html><body></body>', {
			runScripts: 'outside-only',
		});
		dom.window.Symbol = undefined;
		let lui;
		dom.window.define = value => { lui = value; };
		dom.window.eval(
			readFileSync('./dist/' + filename, 'utf8')
		);
		if (!rjs) lui = dom.window.lui;

		const root = dom.window.document.createElement('div');
		const cleanups = [];
		let actions;
		const model = {
			init: () => 0,
			add: (state, amount) => state + amount,
			subtract: (state, amount) => state - amount,
		};
		lui.init(() => {
			const [count, setters] = lui.hook_model(model);
			actions = setters;
			lui.hook_effect(
				value => () => cleanups.push(value),
				dom.window.Array.of(count)
			);
			return [lui.node_dom('button[title=ready]', {
				D: {item: String(count)},
				S: {color: (
					count
					?	'blue'
					:	'red'
				)},
				textContent: String(count),
			})];
		}, root);
		expect(root.firstChild.title)
			.toBe('ready');
		expect(root.textContent)
			.toBe('0');
		actions.add(3);
		actions.subtract(1);
		expect(root.textContent)
			.toBe('2');
		expect(
			root.firstChild.getAttribute('data-item')
		).toBe('2');
		expect(root.firstChild.style.color)
			.toBe('blue');
		expect(cleanups)
			.toEqual([0, 3]);
		dom.window.close();
	});
}

for (const [filename, max_size] of [
	['lui.js', 4937],
	['lui.noeval.js', 5117],
	['luix.js', 6554],
	['luix.noeval.js', 6730],
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

for (const [filename, rjs] of [
	['luix.legacy.js', false],
	['luix.r.js', true],
	['luix.r.dev.js', true],
	['luix.r.noeval.js', true],
]) {
	test(`${filename}: unmounts all mapped hooks`, () => {
		const dom = new JSDOM('<!DOCTYPE html><body></body>', {
			runScripts: 'outside-only',
		});
		let lui;
		dom.window.define = value => { lui = value; };
		dom.window.eval(
			readFileSync('./dist/' + filename, 'utf8')
		);
		if (!rjs) lui = dom.window.lui;

		const root = dom.window.document.createElement('div');
		const cleanups = [];
		let set_show;
		const Item = item => {
			lui.hook_effect(() => () => cleanups.push(item));
			return item;
		};
		const List = () => {
			const values = lui.hook_map(
				Item,
				dom.window.Array.of('a', 'b', 'c')
			);
			return [lui.node_dom('p', {textContent: values.join('')})];
		};
		lui.init(() => {
			const [show, set] = lui.hook_state(true);
			set_show = set;
			return [show && lui.node(List)];
		}, root);
		expect(root.textContent)
			.toBe('abc');
		set_show(false);
		expect(root.textContent)
			.toBe('');
		expect(cleanups)
			.toEqual(['a', 'b', 'c']);
		dom.window.close();
	});
}
