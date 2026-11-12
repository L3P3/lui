import {
	expect,
	test,
} from 'bun:test';

import {root_create} from './setup.js';
import {
	defer,
	defer_end,
	hook_state,
	init,
	node,
	node_dom,
} from '../src/lui.js';

test('hook_state: can manage component state', () => {
	const root = root_create();

	init(() => {
		const [count, count_set] = hook_state(0);

		return [
			node_dom('h1', {
				textContent: `Count: ${count}`,
			}),
			node_dom('button[textContent=Increment]', {
				onclick: () => count_set(count + 1),
			}),
		];
	}, root);

	const h1 = root.querySelector('h1');
	expect(h1.textContent).toBe('Count: 0');

	root.querySelector('button').click();

	expect(h1.textContent).toBe('Count: 1');
});

test('hook_state: aborts render and re-renders when setter called during render', () => {
	const root = root_create();
	let render_count = 0;
	let after_set_count = 0;

	init(() => {
		render_count++;
		const [value, value_set] = hook_state(false);

		if (!value) value_set(true);

		after_set_count++;

		return [
			node_dom('p', {
				textContent: String(value),
			}),
		];
	}, root);

	// The component should have rendered twice:
	// 1st render: value=false, setter called with true → aborts and re-renders
	// 2nd render: value=true, setter not called again → stable
	expect(render_count).toBe(2);
	// Code after the setter was only reached once (the 2nd render, since the 1st aborted)
	expect(after_set_count).toBe(1);
	expect(root.querySelector('p').textContent).toBe('true');
});

test('nested components keep sibling order as their first DOM nodes change', () => {
	const root = root_create();
	const setters = {};
	const Part = ({name}) => {
		const [show, set] = hook_state(false);
		setters[name] = set;
		return show ? [node_dom('span', {textContent: name})] : null;
	};
	const Inner = () => [
		node(Part, {name: 'a'}),
		false,
		node(Part, {name: 'b'}),
		node(Part, {name: 'c'}),
	];
	const Outer = () => [
		node(Part, {name: 'x'}),
		node(Inner),
		node_dom('span[textContent=z]'),
	];

	init(() => [node(Outer), node_dom('span[textContent=end]')], root);
	expect(root.textContent).toBe('zend');
	setters.c(true);
	expect(root.textContent).toBe('czend');
	setters.a(true);
	expect(root.textContent).toBe('aczend');
	setters.b(true);
	expect(root.textContent).toBe('abczend');
	setters.a(false);
	expect(root.textContent).toBe('bczend');
	setters.x(true);
	expect(root.textContent).toBe('xbczend');
	setters.b(false);
	setters.c(false);
	expect(root.textContent).toBe('xzend');
	setters.x(false);
	setters.b(true);
	expect(root.textContent).toBe('bzend');
	setters.a(true);
	expect(root.textContent).toBe('abzend');
	defer();
	setters.a(false);
	setters.b(false);
	setters.c(true);
	setters.x(true);
	defer_end();
	expect(root.textContent).toBe('xczend');
	setters.x(false);
	setters.b(true);
	expect(root.textContent).toBe('bczend');
});
