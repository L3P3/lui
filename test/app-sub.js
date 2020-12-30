import {
	init,
	hook_first,
	hook_prev,
	hook_reducer_f,
	hook_state,
	hook_static,
	hook_sub,
	node_dom,
	now
} from '../src/lui.js';

init(() => {
	const [getter, getter_set] = hook_state(() => 'Initial');
	const [foo, foo_toggle] = hook_reducer_f(prev => !prev, () => false);

	return [null, [
		node_dom('h1', {
			innerText: hook_sub(getter, [foo]),
			onclick: foo_toggle
		}),
		node_dom(
			'p',
			{
				innerText: 'Zeit',
				onclick: () => getter_set(foo => {
					return foo ? now() : 'Zeit?';
				})
			}
		),
		node_dom(
			'p',
			{
				innerText: 'Initial',
				onclick: () => getter_set(foo => {
					return hook_first() ? 'Erstens' : 'Nicht erstens';
				})
			}
		),
		node_dom(
			'p',
			{
				innerText: 'Hooks',
				onclick: () => getter_set(foo => {
					return `Initial: ${hook_static(foo)} Vorher: ${hook_prev(foo)} Jetzt: ${foo}`;
				})
			}
		)
	]];
});
