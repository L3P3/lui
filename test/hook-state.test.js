import {
	expect,
	test,
} from 'bun:test';

import {root_create} from './setup.js';
import {
	hook_state,
	init,
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

	init(() => {
		render_count++;
		const [value, value_set] = hook_state(false);

		// Setting the same value should NOT trigger an abort or extra render
		if (!value) value_set(true);

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
	expect(root.querySelector('p').textContent).toBe('true');
});
