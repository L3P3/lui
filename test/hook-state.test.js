import { test, expect } from 'bun:test';
import { setupDOM } from './setup.js';

test('hook_state: can manage component state', async () => {
	setupDOM();
	
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
