import { test, expect } from 'bun:test';
import { JSDOM } from 'jsdom';

test('hook_assert: can conditionally render components', async () => {
	// Setup DOM
	const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
	global.window = dom.window;
	global.document = dom.window.document;
	global.HTMLElement = dom.window.HTMLElement;
	global.Node = dom.window.Node;
	global.Element = dom.window.Element;
	global.requestAnimationFrame = (callback) => setTimeout(callback, 0);
	global.cancelAnimationFrame = clearTimeout;
	
	const { hook_assert, hook_state, init, node, node_dom } = await import('../src/lui.js');
	
	function Inner({ on }) {
		hook_assert(on);
		
		return [
			node_dom('p', { textContent: 'Test' }),
		];
	}
	
	// Create unique root element
	const root = document.createElement('div');
	document.body.appendChild(root);
	
	init(() => {
		const [on, on_set] = hook_state(false);
		
		return [
			node_dom('h1', { textContent: 'Hello, World!' }),
			node(Inner, { on }),
			node_dom('button', {
				textContent: 'Toggle',
				onclick: () => {
					on_set(!on);
				},
			}),
		];
	}, root);
	
	// Wait for initialization
	await new Promise(resolve => setTimeout(resolve, 10));
	
	const h1 = root.querySelector('h1');
	expect(h1.textContent).toBe('Hello, World!');
	
	// Initially, the inner component should not render (on=false)
	let paragraphs = root.querySelectorAll('p');
	expect(paragraphs.length).toBe(0);
	
	// Toggle on
	const button = root.querySelector('button');
	button.click();
	await new Promise(resolve => setTimeout(resolve, 10));
	
	// Now the inner component should render
	paragraphs = root.querySelectorAll('p');
	expect(paragraphs.length).toBe(1);
	expect(paragraphs[0].textContent).toBe('Test');
	
	// Toggle off
	button.click();
	await new Promise(resolve => setTimeout(resolve, 10));
	
	// Inner component should not render again
	paragraphs = root.querySelectorAll('p');
	expect(paragraphs.length).toBe(0);
});
