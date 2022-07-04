import {
	hook_callback,
	hook_dom,
	hook_effect,
	hook_model,
	hook_state,
	hook_static,
	init,
	node,
	node_dom,
	node_map,
} from '../src/lui.js';

let todo_id_counter = 0;

const todos_mutations = {
	init: () => {
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
	reset: () => [],
	add: (state, payload) => (
		payload.id = ++todo_id_counter,
		state.concat(payload)
	),
	rem: (state, payload) => (
		state.filter(todo => todo.id !== payload)
	),
};

const TodoForm = ({
	todo_list_empty,
	todo_cmd,
}) => {
	const [value, value_set] = hook_state('');

	hook_dom('form', {
		onsubmit: hook_callback(
			(value) => {
				todo_cmd.add({
					text: value,
				});
				value_set('');
				return false;
			},
			[value]
		),
	});

	return [
		node_dom('input[name=todo_new]', {
			value,

			onkeyup: hook_static(
				(event) => {
					value_set(event.target.value);
				}
			),
		}),
		node_dom('button[innerText=add]', {
			disabled: !value,
		}),
		node_dom('button[innerText=reset]', {
			disabled: todo_list_empty,

			onclick: hook_static(
				() => {
					todo_cmd.reset();
					return false;
				}
			),
		}),
	];
};

const TodoListItem = ({
	I: item,
	todo_cmd,
}) => (
	hook_dom('p'), [
		node_dom('span', {
			innerText: item.text,
		}),
		node_dom('button[innerText=remove]', {
			onclick: hook_static(
				() => {
					todo_cmd.rem(item.id);
				}
			),
		}),
	]
);

init(() => {
	const [todo_list, todo_cmd] = hook_model(todos_mutations);

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

	return [null, [
		node_dom('h1[innerText=TODO list in lui]'),
		node(
			TodoForm,
			{
				todo_list_empty: todo_list.length === 0,
				todo_cmd,
			}
		),
		node_dom('hr'),
		todo_list.length === 0 &&
		node_dom('p[innerHTML=<i>nothing there</i>]'),
		node_map(
			TodoListItem,
			todo_list,
			{
				todo_cmd,
			}
		),
		node_dom('hr'),
		node_dom('p[innerHTML=2022, <a href=//l3p3.de target=_blank>L3P3</a>]'),
	]];
});
