import {
	init,
	hook_state,
	hook_transition,
	node
} from '../src/lui.js';

const F = {dark: true};

init(() => {
	const [name, name_set] = hook_state('');

	return [
		{
			F
		},
		[
			node(
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
			node(
				'p',
				null,
				[
					node(
						'input',
						{
							value: name,
							onkeyup: event => {
								name_set(event.target.value);
							}
						}
					),
					node(
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
