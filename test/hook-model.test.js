import { test, expect } from 'bun:test';
import { JSDOM } from 'jsdom';

test('hook_model: can manage state with actions', async () => {
	// Setup DOM
	const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
	global.window = dom.window;
	global.document = dom.window.document;
	global.HTMLElement = dom.window.HTMLElement;
	global.Node = dom.window.Node;
	global.Element = dom.window.Element;
	global.requestAnimationFrame = (callback) => setTimeout(callback, 0);
	global.cancelAnimationFrame = clearTimeout;
	
	const { hook_model, init, node_dom } = await import('../src/lui.js');
	
	const model = {
		init: () => 0,
		increment: state => state + 1,
		decrement: state => state - 1,
	};
	
	// Create unique root element
	const root = document.createElement('div');
	document.body.appendChild(root);
	
	init(() => {
		const [count, { increment, decrement }] = hook_model(model);
		
		return [
			node_dom('span', { textContent: `Count: ${count}` }),
			node_dom('button[id=inc]', { textContent: 'Increment', onclick: increment }),
			node_dom('button[id=dec]', { textContent: 'Decrement', onclick: decrement }),
		];
	}, root);
	
	// Wait for initialization
	await new Promise(resolve => setTimeout(resolve, 10));
	
	const span = root.querySelector('span');
	expect(span.textContent).toBe('Count: 0');
	
	// Increment
	root.querySelector('#inc').click();
	await new Promise(resolve => setTimeout(resolve, 10));
	expect(span.textContent).toBe('Count: 1');
	
	// Increment again
	root.querySelector('#inc').click();
	await new Promise(resolve => setTimeout(resolve, 10));
	expect(span.textContent).toBe('Count: 2');
	
	// Decrement
	root.querySelector('#dec').click();
	await new Promise(resolve => setTimeout(resolve, 10));
	expect(span.textContent).toBe('Count: 1');
});
