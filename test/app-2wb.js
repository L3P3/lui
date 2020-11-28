import {
	init,
	hook_state,
	hook_transition,
	node_html
} from '../src/lui.js';

const F = {dark: true};

init(() => {
	const [name, name_set] = hook_state('');

	return [
		{
			F
		},
		[
			node_html(
				'h1',
				{
					S: {
						color: `rgb(255,${
							hook_transition(
								name ? 255 : 0,
								500
							)
						},0)`
					},
					innerText: (
						name
						?	`Moin, ${name}!`
						:	'Moin!'
					)
				}
			),
			node_html(
				'p',
				null,
				[
					node_html(
						'input',
						{
							value: name,
							onkeyup: event => {
								name_set(event.target.value);
							}
						}
					),
					node_html(
						'button[innerText=Leeren]',
						{
							onclick: () => {
								name_set('');
							}
						}
					)
				]
			)
		]
	];
});
