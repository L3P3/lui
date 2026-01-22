import './setup.js';
import {
	expect,
	test,
} from 'bun:test';

import {
	init,
	node_dom,
} from '../src/lui.js';

test('app-root: can mount on specific root element', () => {
	// Create a unique root element for this test
	const root = document.createElement('div');
	root.id = 'test-root';
	document.body.appendChild(root);
	
	// Mount app on the root element using textContent in props instead of descriptor
	init(() => {
		return [
			node_dom('h1', { textContent: 'PASS' }),
		];
	}, root);
	
	expect(root.querySelector('h1')).toBeTruthy();
	expect(root.querySelector('h1').textContent).toBe('PASS');
});
