import {
	expect,
	test,
} from 'bun:test';

import {root_create} from './setup.js';
import {
	hook_delay,
	hook_effect,
	hook_dom,
	hook_state,
	init,
	node,
	node_dom,
} from '../src/lui.js';

const Effectful = ({
	label,
	on,
	runs,
	cleanups,
}) => (
	hook_effect(() => {
		runs.push(label);
		return () => cleanups.push(label);
	}, [label]),
	hook_dom('div', {
		D: {label},
		textContent: on ? label : 'off',
	}),
	null
);

test('hook_effect: runs on deps change and cleans up on unmount', () => {
	const root = root_create();
	const runs = [];
	const cleanups = [];

	let label_set_;
	let show_set_;

	init(() => {
		const [label, label_set] = hook_state('first');
		const [show, show_set] = hook_state(true);

		label_set_ = label_set;
		show_set_ = show_set;

		return [
			node_dom('h1[textContent=effect-test]'),
			show &&
			node(Effectful, {
				label,
				on: show,
				runs,
				cleanups,
			}),
		];
	}, root);

	expect(runs).toEqual(['first']);
	expect(cleanups).toEqual([]);

	label_set_('second');
	expect(runs).toEqual(['first', 'second']);
	expect(cleanups).toEqual(['first']);

	show_set_(false);
	expect(cleanups).toEqual(['first', 'second']);
});

test('hook_delay: flips to true after configured timeout', async () => {
	const root = root_create();
	init(() => {
		const ready = hook_delay(5);
		return [
			node_dom('p[id=status]', {
				textContent: ready ? 'ready' : 'waiting',
			}),
		];
	}, root);

	const status = root.querySelector('#status');
	expect(status.textContent).toBe('waiting');
	await new Promise(resolve => setTimeout(resolve, 15));
	expect(status.textContent).toBe('ready');
});
