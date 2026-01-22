import {
	expect,
	test,
} from 'bun:test';

import {root_create} from './setup.js';
import {
	hook_memo,
	hook_prev,
	hook_static,
	hook_state,
	init,
	node_dom,
} from '../src/lui.js';

test('hook_memo: recomputes only when deps change', () => {
	const root = root_create();
	let compute_count = 0;

	init(() => {
		const [value, value_set] = hook_state(0);
		const [tick, tick_set] = hook_state(0);

		const doubled = hook_memo(() => {
			++compute_count;
			return value * 2;
		}, [value]);

		return [
			node_dom('p[id=value-text]', {
				textContent: doubled,
			}),
			node_dom('button[id=tick][textContent=tick]', {
				onclick: () => tick_set(tick + 1),
			}),
			node_dom('button[id=value-btn][textContent=value]', {
				onclick: () => value_set(value + 1),
			}),
		];
	}, root);

	const value_text = root.querySelector('#value-text');
	expect(compute_count).toBe(1);
	expect(value_text.textContent).toBe('0');

	root.querySelector('#tick').click();
	expect(compute_count).toBe(1);
	expect(value_text.textContent).toBe('0');

	root.querySelector('#value-btn').click();
	expect(compute_count).toBe(2);
	expect(value_text.textContent).toBe('2');
});

test('hook_prev: exposes previous render value', () => {
	const root = root_create();

	init(() => {
		const [count, count_set] = hook_state(1);
		const prev = hook_prev(count, 0);

		return [
			node_dom('p[id=current]', {
				textContent: String(count),
			}),
			node_dom('p[id=prev]', {
				textContent: String(prev),
			}),
			node_dom('button[id=inc][textContent=inc]', {
				onclick: () => count_set(count + 1),
			}),
		];
	}, root);

	expect(root.querySelector('#prev').textContent).toBe('0');
	root.querySelector('#inc').click();
	expect(root.querySelector('#current').textContent).toBe('2');
	expect(root.querySelector('#prev').textContent).toBe('1');
});

test('hook_static: keeps stable reference between renders', () => {
	const root = root_create();
	const seen = [];

	init(() => {
		const stable = hook_static({id: 'stable'});
		const [flag, flag_set] = hook_state(false);

		seen.push(stable);

		return [
			node_dom('p[id=flag]', {
				textContent: String(flag),
			}),
			node_dom('button[id=toggle][textContent=toggle]', {
				onclick: () => flag_set(!flag),
			}),
		];
	}, root);

	expect(seen.length).toBe(1);
	root.querySelector('#toggle').click();
	expect(seen.length).toBe(2);
	expect(seen[0]).toBe(seen[1]);
});
