import { test, expect } from 'bun:test';
import { JSDOM } from 'jsdom';

test('hook_state: can manage component state', async () => {
	// Setup DOM
	const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
	global.window = dom.window;
	global.document = dom.window.document;
	global.HTMLElement = dom.window.HTMLElement;
	global.Node = dom.window.Node;
	global.Element = dom.window.Element;
	global.requestAnimationFrame = (callback) => setTimeout(callback, 0);
	global.cancelAnimationFrame = clearTimeout;
	
	const { hook_state, init, node_dom } = await import('../src/lui.js');
	
	// Create unique root element
	const root = document.createElement('div');
	document.body.appendChild(root);
	
	init(() => {
		const [count, count_set] = hook_state(0);
		
		return [
			node_dom('h1', { textContent: `Count: ${count}` }),
			node_dom('button', {
				textContent: 'Increment',
				onclick: () => count_set(count + 1)
			}),
		];
	}, root);
	
	// Wait for initialization
	await new Promise(resolve => setTimeout(resolve, 10));
	
	const h1 = root.querySelector('h1');
	expect(h1.textContent).toBe('Count: 0');
	
	// Simulate button click
	const button = root.querySelector('button');
	button.click();
	
	// Wait for state update
	await new Promise(resolve => setTimeout(resolve, 10));
	
	expect(h1.textContent).toBe('Count: 1');
});
