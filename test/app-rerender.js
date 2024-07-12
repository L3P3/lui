import {
	hook_effect,
	hook_rerender,
	hook_state,
	init,
	node,
} from '../src/lui.js';

// checks for issue #37

let counter = 0;

init(() => {
	hook_rerender();

	++counter;
	hook_effect(() => {
		setInterval(() => {
			console.log(counter);
			counter = 0;
		}, 1e3);
	});

	return [
		node(Child),
	];
});

function Child() {
	const [_, state_set] = hook_state(0);

	hook_effect(() => {
		setTimeout(() => {
			state_set(1);
		}, 0);
	});

	return null;
}
