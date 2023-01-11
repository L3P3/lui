import {
	hook_effect,
	hook_map,
	hook_model,
	hook_prev,
	hook_rerender,
	hook_state,
	hook_static,
	hook_sub,
	init,
	node_dom,
	now,
} from '../src/lui.js';

const hook_first = () => {
	let first = false;
	hook_effect(() => {
		first = true;
	});
	return first;
};

const effect_life = item => (
	console.log('effect mount', item),
	() => console.log('effect unmount', item)
);

const hook_count_effect = step => (
	clearInterval.bind(
		null,
		setInterval(step, 1e3)
	)
)
const hook_count = () => {
	const [value, {step}] = hook_model({
		init: () => 0,
		step: value => ++value,
	});
	hook_effect(hook_count_effect, [step]);
	return value;
}

init(() => {
	const [getter, getter_set] = hook_state(() => 'Initial');
	const [foo, {foo_toggle}] = hook_model({
		init: () => false,
		foo_toggle: prev => !prev,
	});

	return [null, [
		node_dom('h1', {
			innerText: hook_sub(getter, [foo]),
			onclick: foo_toggle,
		}),
		node_dom('p', {
			innerText: 'hook_effect (see log)',
			onclick: hook_static(() => getter_set(foo => {
				//inception
				hook_sub(hook_static(() => {
					//unmounting
					hook_effect(effect_life);
				}));
				return foo ? now() : 'Zeit?';
			})),
		}),
		node_dom('p', {
			innerText: 'hook_map',
			onclick: hook_static(() => getter_set(foo => {
				const list1 = hook_static([1, 2, 3]);
				const list2 = hook_static([4, 5, 6]);
				const results = hook_map(
					hook_static((item, foo) => (
						hook_effect(effect_life, [item]),
						item === 3
						?	hook_count()
						: foo
						?	item * 2
						:	item + 1
					)),
					foo ? list1 : list2,
					[foo]
				);
				return results.join(', ');
			})),
		}),
		node_dom('p', {
			innerText: 'hook_rerender',
			onclick: hook_static(() => getter_set(foo => {
				//updating from inside
				foo && hook_rerender();
				return foo ? now() : 'Zeit?';
			})),
		}),
		node_dom('p', {
			innerText: 'hook_first',
			onclick: hook_static(() => getter_set(() => {
				return hook_first() ? 'Erstens' : 'Nicht erstens';
			})),
		}),
		node_dom('p', {
			innerText: 'hook_static, hook_prev',
			onclick: hook_static(() => getter_set(foo => {
				return `Initial: ${hook_static(foo)} Vorher: ${hook_prev(foo)} Jetzt: ${foo}`;
			})),
		}),
	]];
});
