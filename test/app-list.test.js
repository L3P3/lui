import { test, expect } from 'bun:test';
import { setupDOM } from './setup.js';

test('app-list: can render list items with node_map', async () => {
	setupDOM();
	
	const { hook_dom, hook_model, init, node_map } = await import('../src/lui.js');
	
	const actions = {
		init: () => (
			new Array(6).fill(null)
			.map((_, i) => 'item_' + i)
		),
	};
	
	const ListItem = ({ I }) => (
		hook_dom('p', { textContent: I }),
		null
	);
	
	// Create unique root element
	const root = document.createElement('div');
	document.body.appendChild(root);
	
	init(() => {
		const [list] = hook_model(actions);
		
		return [
			node_map(
				ListItem,
				list
			),
		];
	}, root);
	
	// Wait for initialization
	await new Promise(resolve => setTimeout(resolve, 10));
	
	const paragraphs = root.querySelectorAll('p');
	expect(paragraphs.length).toBe(6);
	expect(paragraphs[0].textContent).toBe('item_0');
	expect(paragraphs[5].textContent).toBe('item_5');
});
