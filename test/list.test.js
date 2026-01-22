import {
	expect,
	test,
} from 'bun:test';

import {root_create} from './setup.js';
import {
	hook_dom,
	hook_model,
	init,
	node_map,
} from '../src/lui.js';

const model = {
	init: () => (
		new Array(6).fill(null)
		.map((_, i) => 'item_' + i)
	),
	push: (state, item) => [
		...state,
		item,
	],
	pop: state => state.slice(0, -1),
};

const ListItem = ({
	I,
}) => (
	hook_dom('p', {
		textContent: I,
	}),
	null
);

test('node_map: can render changing list items with node_map', () => {
	const root = root_create();

	let actions_;
	init(() => {
		const [list, actions] = hook_model(model);
		actions_ = actions;

		return [
			node_map(
				ListItem,
				list
			),
		];
	}, root);

	let paragraphs = root.querySelectorAll('p');
	expect(paragraphs.length).toBe(6);
	expect(paragraphs[0].textContent).toBe('item_0');
	expect(paragraphs[5].textContent).toBe('item_5');

	actions_.push('item_6');
	paragraphs = root.querySelectorAll('p');
	expect(paragraphs.length).toBe(7);
	expect(paragraphs[6].textContent).toBe('item_6');

	actions_.pop();
	paragraphs = root.querySelectorAll('p');
	expect(paragraphs.length).toBe(6);
	expect(paragraphs[5].textContent).toBe('item_5');
});
