import {
	hook_callback,
	hook_dom,
	hook_effect,
	hook_reducer,
	hook_state,
	hook_static,
	init,
	node,
	node_dom,
	node_map
} from '../src/lui.js';

const TODO_RESET = 1;
const TODO_ADD = 2;
const TODO_REM = 3;

let todo_id_counter = 0;

const todos_reducer = [
	//LOAD
	() => {
		const list = JSON.parse(
			window.localStorage !== undefined &&
			localStorage.getItem('todos') ||
			'[]'
		);
		todo_id_counter = list.reduce(
			(n, item) => (
				item.id > n
				?	item.id
				: n
			),
			0
		);
		return list;
	},
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

const TodoForm = ({
	todo_list_empty,
	todo_cmd
}) => {
	const [value, value_set] = hook_state('');

	hook_dom(
		'form',
		{
			onsubmit: hook_callback(
				(value) => {
					todo_cmd(
						TODO_ADD,
						{
							text: value
						}
					);
					value_set('');
					return false;
				},
				[value]
			)
		}
	);

	return [
		node_dom(
			'input[name=todo_new]',
			{
				value,

				onkeyup: hook_static(
					(event) => {
						value_set(event.target.value);
					}
				)
			}
		),
		node_dom(
			'button',
			{
				disabled: !value,
				innerText: 'add'
			}
		),
		node_dom(
			'button',
			{
				disabled: todo_list_empty,
				innerText: 'reset',

				onclick: hook_static(
					() => {
						todo_cmd(TODO_RESET);
						return false;
					}
				)
			}
		)
	];
};

const TodoListItem = ({
	I: item,
	todo_cmd
}) => [
	node_dom(
		'p',
		null,
		[
			node_dom(
				'span',
				{
					innerText: item.text
				}
			),
			node_dom(
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

	hook_effect(
		todo_list => {
			window.localStorage !== undefined &&
			localStorage.setItem(
				'todos',
				JSON.stringify(todo_list)
			);
		},
		[todo_list]
	);

	return [
		null,
		[
			node_dom('h1[innerText=TODO list in lui]'),
			node(
				TodoForm,
				{
					todo_list_empty: todo_list.length === 0,
					todo_cmd
				}
			),
			node_dom('hr'),
			todo_list.length === 0 &&
			node_dom('p[innerHTML=<i>nothing there</i>]'),
			node_map(
				TodoListItem,
				todo_list,
				{
					todo_cmd
				}
			),
			node_dom('hr'),
			node_dom('p[innerHTML=2020, <a href=//l3p3.de target=_blank>L3P3</a>]')
		]
	];
});
