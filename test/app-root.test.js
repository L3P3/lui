import { test, expect } from 'bun:test';
import { JSDOM } from 'jsdom';

test('app-root: can mount on specific root element', async () => {
	// Setup DOM
	const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
	global.window = dom.window;
	global.document = dom.window.document;
	global.HTMLElement = dom.window.HTMLElement;
	global.Node = dom.window.Node;
	global.Element = dom.window.Element;
	global.requestAnimationFrame = (callback) => setTimeout(callback, 0);
	global.cancelAnimationFrame = clearTimeout;
	
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
