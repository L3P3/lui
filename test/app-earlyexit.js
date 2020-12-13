import {
	init,
	hook_assert,
	hook_state,
	node,
	node_html
} from '../src/lui.js';

function inner({
	on
}) {
	//if (!on) return null;
	hook_assert(on);

	return [
		null,
		node_html('p[innerText=Test]')
	];
}

init(() => {
	const [on, on_set] = hook_state(false);

	return [
		null,
		[
			node_html('h1[innerText=Hallo, Welt!]'),
			node(inner, {on}),
			node_html(
				'p', null,
				[
					node_html(
						'button[innerText=Toggle]',
						{
							onclick: () => {
								on_set(!on);
							}
						}
					)
				]
			)
		]
	];
});
