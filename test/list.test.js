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

const complex_model = {
	init: () => ([
		{id: 'a', text: 'item_a'},
		{id: 'b', text: 'item_b'},
		{id: 'c', text: 'item_c'},
	]),
	swap: (state, a, b) => {
		const next = [...state];
		const ai = next.findIndex(item => item.id === a);
		const bi = next.findIndex(item => item.id === b);
		[ next[ai], next[bi] ] = [ next[bi], next[ai] ];
		return next;
	},
	update: (state, id, text) => state.map(item => (
		item.id === id ? {...item, text} : item
	)),
	insert_after: (state, after_id, item) => {
		const next = [];
		for (const value of state) {
			next.push(value);
			value.id === after_id && next.push(item);
		}
		return next;
	},
	remove: (state, id) => state.filter(item => item.id !== id),
};

const mapParagraphs = root =>
	Array.from(root.querySelectorAll('p'));

const mapIds = root =>
	mapParagraphs(root).map(p => p.dataset.id);

const mapElementsById = root => {
	const entries = mapParagraphs(root).map(p => [p.dataset.id, p]);
	return new Map(entries);
};

const ListItemComplex = ({
	I,
}) => (
	hook_dom('p', {
		D: {
			id: I.id,
		},
		textContent: I.text,
	}),
	null
);

test('node_map: keeps identity while reordering and updating keyed items', () => {
	const root = root_create();

	let actions_;
	init(() => {
		const [items, actions] = hook_model(complex_model);
		actions_ = actions;

		return [
			node_map(ListItemComplex, items),
		];
	}, root);

	// initial order
	expect(mapIds(root)).toEqual(['a', 'b', 'c']);
	const elements_initial = mapElementsById(root);

	// swap order of first two items
	actions_.swap('a', 'b');
	expect(mapIds(root)).toEqual(['b', 'a', 'c']);
	const elements_swapped = mapElementsById(root);
	expect(elements_swapped.get('a')).toBe(elements_initial.get('a'));
	expect(elements_swapped.get('b')).toBe(elements_initial.get('b'));

	// update text of an existing item without replacing its element
	actions_.update('b', 'item_b_updated');
	const elements_updated = mapElementsById(root);
	expect(elements_updated.get('b')).toBe(elements_swapped.get('b'));
	expect(elements_updated.get('b').textContent).toBe('item_b_updated');

	// insert new item after b and ensure order maintained
	actions_.insert_after('b', {id: 'x', text: 'item_x'});
	expect(mapIds(root)).toEqual(['b', 'x', 'a', 'c']);

	// remove an item and ensure list shrinks and order remains
	actions_.remove('a');
	expect(mapIds(root)).toEqual(['b', 'x', 'c']);
});
