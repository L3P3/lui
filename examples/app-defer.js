import {
	defer,
	defer_end,
	hook_state,
	hook_static,
	init,
	node_dom,
} from '../src/lui.js';

init(() => {
	const [a, a_set] = hook_state('a');
	const [b, b_set] = hook_state('b');
	const [c, c_set] = hook_state('c');

	console.log(a + b + c);

	return [
		node_dom('h1', {
			innerText: a + b + c,
		}),
		node_dom('p[innerText=ABC, sync]', hook_static({
			onclick: () => {
				a_set('A');
				b_set('B');
				c_set('C');
			},
		})),
		node_dom('p[innerText=abc, defer]', hook_static({
			onclick: () => {
				defer();
				a_set('a');
				b_set('b');
				c_set('c');
			},
		})),
		node_dom('p[innerText=abc, defer+end]', hook_static({
			onclick: () => {
				defer();
				a_set('a');
				b_set('b');
				c_set('c');
				defer_end();
			},
		})),
	];
});
