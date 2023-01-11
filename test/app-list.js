import {
	hook_dom,
	hook_memo,
	hook_model,
	init,
	node_dom,
	node_map
} from '../src/lui.js';

const actions = {
	init: () => (
		new Array(6).fill(null)
		.map((_, i) => 'item_' + i)
	),

	swap: state => [
		state[0],
		state[4],
		state[2],
		state[3],
		state[1],
		state[5],
	],
};

const ListItem = ({
	I,
}) => (
	hook_dom('p', {innerText: I}),
	null
	//[node_dom('p', {innerText: I})]
);

init(() => {
	const [list, {swap}] = hook_model(actions);

	return [null, [
		hook_memo(() => (
			node_dom('div', null, [
				node_dom('button[innerText=swap]', {
					onclick: swap,
				}),
			])
		)),
		node_map(
			ListItem,
			list
		),
	]];
});
