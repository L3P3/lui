import { test, expect } from 'bun:test';
import { setupDOM } from './setup.js';

test('hook_model: can manage state with actions', async () => {
	setupDOM();
	
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
