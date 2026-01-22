import { test, expect } from 'bun:test';
import { setupDOM } from './setup.js';

test('app-root: can mount on specific root element', async () => {
	setupDOM();
	
	const { init, node_dom } = await import('../src/lui.js');
	
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
	
	// Wait for initialization with longer timeout
	await new Promise(resolve => setTimeout(resolve, 100));
	
	expect(root.querySelector('h1')).toBeTruthy();
	expect(root.querySelector('h1').textContent).toBe('PASS');
});
