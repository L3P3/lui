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
	node_dom,
} from '../src/lui.js';

test('defer and defer_end batch multiple state updates into single render', async () => {
	const root = root_create();
	let render_count = 0;

	init(() => {
		const [value, value_set] = hook_state('A');

		++render_count;

		return [
			node_dom('h1[id=value]', {
				textContent: value,
			}),
			node_dom('button[id=defer][textContent=defer]', {
				onclick: () => {
					defer();
					value_set('B');
					value_set('C');
				},
			}),
			node_dom('button[id=defer-end][textContent=defer-end]', {
				onclick: () => {
					defer();
					value_set('X');
					value_set('Y');
					defer_end();
				},
			}),
		];
	}, root);

	expect(render_count).toBe(1);
	expect(root.querySelector('#value').textContent).toBe('A');

	root.querySelector('#defer').click();
	expect(root.querySelector('#value').textContent).toBe('A');
	await new Promise(resolve => setTimeout(resolve, 5));
	expect(root.querySelector('#value').textContent).toBe('C');
	expect(render_count).toBe(2);

	root.querySelector('#defer-end').click();
	expect(root.querySelector('#value').textContent).toBe('Y');
	expect(render_count).toBe(3);
});
