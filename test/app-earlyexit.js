import {
	init,
	hook_assert,
	hook_state,
	node,
	node_dom
} from '../src/lui.js';

function inner({
	on
}) {
	//if (!on) return null;
	hook_assert(on);

	return [
		null,
		node_dom('p[innerText=Test]')
	];
}

init(() => {
	const [on, on_set] = hook_state(false);

	return [
		null,
		[
			node_dom('h1[innerText=Hallo, Welt!]'),
			node(inner, {on}),
			node_dom(
				'p', null,
				[
					node_dom(
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
