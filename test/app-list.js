import {
	hook_dom,
	hook_memo,
	hook_reducer,
	init,
	node_dom,
	node_map
} from '../src/lui.js';

const ACTION_SWAP = 1;

const actions = [
	// RESET
	() => (
		new Array(6).fill(null)
		.map((_, i) => 'item_' + i)
	),

	// SWAP
	state => [
		state[0],
		state[4],
		state[2],
		state[3],
		state[1],
		state[5],
	],
];

const ListItem = ({
	I,
}) => (
	hook_dom('p', {innerText: I}), null
	//[node_dom('p', {innerText: I})]
);

init(() => {
	const [list, dispatch] = hook_reducer(actions);

	return [
		null,
		[
			hook_memo(() => (
				node_dom('div', null, [
					node_dom('button[innerText=swap]', {
						onclick: () => {
							dispatch(ACTION_SWAP);
						},
					}),
				])
			)),
			node_map(
				ListItem,
				list
			),
		]
	];
});
