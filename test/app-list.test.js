import './setup.js';
import {
	expect,
	test,
} from 'bun:test';

import {
	hook_dom,
	hook_model,
	init,
	node_map,
} from '../src/lui.js';

test('app-list: can render list items with node_map', () => {
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
	
	const paragraphs = root.querySelectorAll('p');
	expect(paragraphs.length).toBe(6);
	expect(paragraphs[0].textContent).toBe('item_0');
	expect(paragraphs[5].textContent).toBe('item_5');
});
