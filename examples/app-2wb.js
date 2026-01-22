import {
	hook_dom,
	hook_state,
	hook_transition,
	init,
	node_dom,
} from '../src/lui.js';

const F = {dark: true};

init(() => {
	hook_dom('', {
		F,
	});
	const [name, name_set] = hook_state('');

	return [
		node_dom('h1', {
			S: {
				color: `rgb(255,${
					hook_transition(
						name ? 255 : 0,
						500
					)
				},0)`,
			},
			innerText: (
				name
				?	`Moin, ${name}!`
				:	'Moin!'
			),
		}),
		node_dom('p', null, [
			node_dom('input', {
				value: name,
				onkeyup: event => {
					name_set(event.target.value);
				},
			}),
			node_dom('button[innerText=Leeren]', {
				onclick: () => {
					name_set('');
				},
			}),
		]),
	];
});
