import {
	hook_reducer,
	hook_state,
	hook_static,
	init,
	node,
	node_list
} from '../src/lui.js';

const TODO_RESET = 0;
const TODO_ADD = 1;
const TODO_REM = 2;

let todo_id_counter = 0;

const todos_reducer = [
	//RESET
	() => [],
	//ADD
	(state, payload) => {
		payload.id = ++todo_id_counter;
		return state.concat(payload);
	},
	//REM
	(state, payload) => (
		state.filter(todo => todo.id !== payload)
	)
];

const c_todo_form = ({
	todo_list_empty,
	todo_cmd
}) => {
	const [value, value_set] = hook_state('');

	return [
		node(
			'input',
			{
				value,

				onchange: value_set
			}
		),
		node(
			'button',
			{
				disabled: !value,
				innerText: 'add',

				onclick: hook_static(
					() => {
						todo_cmd(
							TODO_ADD,
							{
								text: value
							}
						);
						value_set('');
					}
				)
			}
		),
		node(
			'button',
			{
				disabled: todo_list_empty,
				innerText: 'reset',

				onclick: hook_static(
					() => {
						todo_cmd(TODO_RESET);
					}
				)
			}
		)
	];
};

const c_todo_list_item = ({
	item,
	todo_cmd
}) => [
	node(
		'p',
		null,
		[
			node(
				'span',
				{
					innerText: item.text
				}
			),
			node(
				'button[innerText=remove]',
				{
					onclick: hook_static(
						() => {
							todo_cmd(
								TODO_REM,
								item.id
							);
						}
					)
				}
			)
		]
	)
];

init(() => {
	const [todo_list, todo_cmd] = hook_reducer(todos_reducer);

	return [
		null,
		[
			node('h1[innerText=TODO list in lui]'),
			node(
				c_todo_form,
				{
					todo_list_empty: todo_list.length === 0,
					todo_cmd
				}
			),
			node('hr'),
			node_list(
				c_todo_list_item,
				{
					todo_cmd
				},
				todo_list
			),
			node('hr'),
			node('p[innerHTML=2020, <a href=//l3p3.de target=_blank>L3P3</a>]')
		]
	];
});
