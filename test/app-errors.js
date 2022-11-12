import {
	hook_model,
	hook_state,
	node,
	node_dom,
	init,
} from '../src/lui.js';

const cases = {
	model: () => {
		const [state, actions] = hook_model({
			initu: () => {},
			init: () => ({
				a: 1,
				b: new Date,
			}),
			foo: state => {
				state.a = 2;
			},
		});

		actions.foo();

		return null;
	},
};

function Index({
	case_set,
}) {
	return (
		Object.keys(cases)
		.map(key =>
			node_dom('p', {
				innerText: key,
				onclick: () => {
					case_set(key);
				},
			})
		)
	);
}

init(() => {
	const [caseId, case_set] = hook_state(null);

	return [null, [
		caseId &&
		node(cases[caseId]),

		!caseId &&
		node(Index, {case_set}),
	]];
});
