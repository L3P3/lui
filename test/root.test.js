import {
	expect,
	test,
} from 'bun:test';

import {root_create} from './setup.js';
import {
	hook_dom,
	init,
	node_dom,
	reset,
} from '../src/lui.js';

test('init root: can mount once on specific root element', () => {
	const root = root_create();
	// should be removed by init call
	root.appendChild(
		document.createElement('p')
	);

	init(() => {
		hook_dom('', {
			id: 'root',
		});

		return [
			node_dom('h1[textContent=PASS]'),
		];
	}, root);

	expect(root.id).toBe('root');
	expect(root.childNodes.length).toBe(1);
	expect(root.querySelector('h1')).toBeTruthy();
	expect(root.querySelector('h1').textContent).toBe('PASS');

	// init again should fail
	expect(() => {
		init(() => {
			return null;
		}, root);
	}).toThrow();
	reset();
});
