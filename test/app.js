import {
	init,
	hook_effect,
	hook_first,
	hook_reducer_f,
	hook_state,
	hook_static,
	hook_transition,
	node
} from '../src/lui.js';

//BAR
function Bar({color}) {
	const [expanded, expanded_set] = hook_state(false);

	return [
		node(
			'div',
			{
				S: {
					width: hook_transition(
						expanded ? 500 : 50,
						1e3
					) + 'px',
					height: '10px',
					background: color
				},
				onmouseover: hook_static(() => {
					expanded_set(true);
				}),
				onmouseout: hook_static(() => {
					expanded_set(false);
				})
			}
		)
	];
}

//BODY

const localStorage_ = window.localStorage;

const dark_reducer = prev => !prev;

const dark_init = () => (
	localStorage_
	?	localStorage_.getItem('dark') === '1'
	:	false
);

const dark_save = dark => {
	localStorage_ &&
	localStorage_.setItem(
		'dark',
		+dark
	)
};

init(() => {
	const [dark, dark_toggle] = hook_reducer_f(dark_reducer, dark_init);

	hook_effect(dark_save, [dark]);

	const [red, red_set] = hook_state(false);

	return [
		{
			F: {
				dark,
				red
			}
		},
		[
			node('h1[innerText=Hallo, Welt!]'),
			node(
				'p',
				{
					innerText: `Dies ist eine ${
						dark ? 'dunk' : 'hel'
					}le Beispielseite!`
				}
			),
			node(
				'p',
				null,
				[
					node(
						'button[title=Ein Knopf zum Drücken]',
						{
							innerText: `${
								dark ? 'Hel' : 'Dunke'
							}l machen!`,

							onclick: dark_toggle,
							onmouseover: hook_static(() => {
								red_set(true);
							}),
							onmouseout: hook_static(() => {
								red_set(false);
							})
						}
					)
				]
			),
			hook_static(hook_first() && node(() =>
				[]
				.concat(
					...(
						new Array(16)
						.fill(0)
						.map((n, index) => index.toString(16))
						.map(char => '#0'+char+'8')
						.map(color =>
							node(Bar, {color})
						)
					)
				)
			))
		]
	];
});
