import {
	expect,
	test,
} from 'bun:test';

import {root_create} from './setup.js';
import {
	hook_callback,
	hook_object_changes,
	hook_state,
	init,
	node_dom,
} from '../src/lui.js';

test('hook_callback: stable reference until deps change and uses latest deps', () => {
	const root = root_create();
	let lastArgs = null;
	let calls = 0;

	init(() => {
		const [value, value_set] = hook_state(1);
		const [tick, tick_set] = hook_state(0);

		const cb = hook_callback((current, payload) => {
			lastArgs = [current, payload];
			++calls;
		}, [value]);

		return [
			node_dom('button[id=invoke][textContent=invoke]', {
				onclick: () => cb('evt'),
			}),
			node_dom('button[id=rerender][textContent=rerender]', {
				onclick: () => tick_set(tick + 1),
			}),
			node_dom('button[id=update][textContent=update]', {
				onclick: () => value_set(value + 1),
			}),
		];
	}, root);

	const invoke = root.querySelector('#invoke');
	const rerender = root.querySelector('#rerender');
	const update = root.querySelector('#update');

	invoke.click();
	expect(lastArgs).toEqual([1, 'evt']);
	expect(calls).toBe(1);

	rerender.click();
	invoke.click();
	expect(lastArgs).toEqual([1, 'evt']);
	expect(calls).toBe(2);

	update.click();
	invoke.click();
	expect(lastArgs).toEqual([2, 'evt']);
	expect(calls).toBe(3);
});

test('hook_object_changes: reports modified keys only', () => {
	const root = root_create();
	let state_set_;

	init(() => {
		const [state, state_set] = hook_state({
			a: 1,
			b: 2,
			c: 3,
		});
		state_set_ = state_set;

		const changed = hook_object_changes(state);

		return [
			node_dom('p[id=changed]', {
				textContent: changed.join(','),
			}),
		];
	}, root);

	const changed = root.querySelector('#changed');
	expect(changed.textContent).toBe('a,b,c');

	state_set_({
		a: 1,
		b: 5,
		c: 3,
	});

	expect(changed.textContent).toBe('b');
});
