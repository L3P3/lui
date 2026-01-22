import { test, expect } from 'bun:test';
import { JSDOM } from 'jsdom';

test('app-template: can define and use templates', async () => {
	// Setup DOM
	const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
	global.window = dom.window;
	global.document = dom.window.document;
	global.HTMLElement = dom.window.HTMLElement;
	global.Node = dom.window.Node;
	global.Element = dom.window.Element;
	global.requestAnimationFrame = (callback) => setTimeout(callback, 0);
	global.cancelAnimationFrame = clearTimeout;
	
	const { dom_define, init, node_dom } = await import('../src/lui.js');
	
	// Define a template
	dom_define('test', 'h1', {
		textContent: 'Hello, world!',
		S: {
			color: 'red',
		},
	});
	
	// Create unique root element
	const root = document.createElement('div');
	document.body.appendChild(root);
	
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
	
	// Wait for initialization
	await new Promise(resolve => setTimeout(resolve, 10));
	
	const h1 = root.querySelector('h1');
	expect(h1).toBeTruthy();
	expect(h1.textContent).toBe('Hello, world!');
	expect(h1.style.color).toBe('red');
	expect(h1.style.textDecoration).toBe('underline');
});
