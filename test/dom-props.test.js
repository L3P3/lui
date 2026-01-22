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

test('node_dom: applies dataset, class map, styles and ref handler', () => {
	const root = root_create();
	let ref = null;

	init(() => ([
		node_dom('div[className=wrap]', {
			D: {
				test: '123',
			},
			F: {
				active: true,
				inactive: false,
			},
			S: {
				color: 'red',
			},
			R: el => {
				ref = el;
			},
		}, [
			node_dom('span[textContent=child]'),
		]),
	]), root);

	expect(ref).not.toBeNull();
	expect(ref.tagName).toBe('DIV');
	expect(ref.dataset.test).toBe('123');
	expect(ref.classList.contains('active')).toBe(true);
	expect(ref.classList.contains('inactive')).toBe(false);
	expect(ref.style.color).toBe('red');
	expect(ref.querySelector('span').textContent).toBe('child');
});

test('node_dom: updates class map when props change', () => {
	const root = root_create();
	let on_set_;

	init(() => {
		const [on, on_set] = hook_state(true);
		on_set_ = on_set;

		return [
			node_dom('div[id=box]', {
				F: {
					on,
					off: !on,
				},
			}),
		];
	}, root);

	const box = root.querySelector('#box');
	expect(box.classList.contains('on')).toBe(true);
	expect(box.classList.contains('off')).toBe(false);

	on_set_(false);
	expect(box.classList.contains('on')).toBe(false);
	expect(box.classList.contains('off')).toBe(true);
});
