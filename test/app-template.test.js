import {
	root_create,
} from './setup.js';
import {
	expect,
	test,
} from 'bun:test';

import {
	dom_define,
	init,
	node_dom,
} from '../src/lui.js';

test('app-template: can define and use templates', () => {
	const root = root_create();
	
	// Define a template
	dom_define('test', 'h1', {
		textContent: 'Hello, world!',
		S: {
			color: 'red',
		},
	});
	
	// Initialize app with template
	init(() => {
		return [
			node_dom('#test', {
				S: {
					textDecoration: 'underline',
				},
			}),
		];
	}, root);
	
	const h1 = root.querySelector('h1');
	expect(h1).toBeTruthy();
	expect(h1.textContent).toBe('Hello, world!');
	expect(h1.style.color).toBe('red');
	expect(h1.style.textDecoration).toBe('underline');
});
