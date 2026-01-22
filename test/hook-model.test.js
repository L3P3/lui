import {
	expect,
	test,
} from 'bun:test';

import {root_create} from './setup.js';
import {
	hook_model,
	init,
	node_dom,
} from '../src/lui.js';

test('hook_model: can manage state with actions', () => {
	const root = root_create();

	const model = {
		init: () => 0,
		increment: state => state + 1,
		decrement: state => state - 1,
	};

	init(() => {
		const [count, {
			increment,
			decrement,
		}] = hook_model(model);

		return [
			node_dom('span', {
				textContent: `Count: ${count}`,
			}),
			node_dom('button[id=inc][textContent=Increment]', {
				onclick: increment,
			}),
			node_dom('button[id=dec][textContent=Decrement]', {
				onclick: decrement,
			}),
		];
	}, root);

	const span = root.querySelector('span');
	expect(span.textContent).toBe('Count: 0');

	root.querySelector('#inc').click();
	expect(span.textContent).toBe('Count: 1');

	root.querySelector('#inc').click();
	expect(span.textContent).toBe('Count: 2');

	root.querySelector('#dec').click();
	expect(span.textContent).toBe('Count: 1');
});
