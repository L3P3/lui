/**
 * Test to verify that hook_model actions and hook_state setter return new state
 * This validates the fix for: "hook_model: actions should return new state"
 */

import {
	hook_model,
	hook_state,
	init,
	node_dom,
} from '../src/lui.js';

const counter_model = {
	init: () => ({ count: 0, history: [] }),
	increment: state => ({ 
		count: state.count + 1, 
		history: [...state.history, 'increment'] 
	}),
	decrement: state => ({ 
		count: state.count - 1, 
		history: [...state.history, 'decrement'] 
	}),
	reset: () => ({ count: 0, history: [] }),
	addAmount: (state, amount) => ({
		count: state.count + amount,
		history: [...state.history, `add ${amount}`]
	}),
};

init(() => {
	const [simpleState, simpleState_set] = hook_state(0);
	const [modelState, modelActions] = hook_model(counter_model);

	const testStateReturn = () => {
		console.log('Testing hook_state return value...');
		const returnValue = simpleState_set(42);
		console.log('Set state to 42, returned:', returnValue);
		console.assert(returnValue === 42, 'hook_state setter should return new value');
		console.log('✓ hook_state test passed');
	};

	const testModelReturns = () => {
		console.log('Testing hook_model action return values...');

		// Reset to known state first
		modelActions.reset();

		// Test increment
		const result1 = modelActions.increment();
		console.log('increment() returned:', result1);
		console.assert(result1.count === 1, 'increment should return state with count 1');

		// Test decrement
		const result2 = modelActions.decrement();
		console.log('decrement() returned:', result2);
		console.assert(result2.count === 0, 'decrement should return state with count 0');

		// Test with parameters
		const result3 = modelActions.addAmount(10);
		console.log('addAmount(10) returned:', result3);
		console.assert(result3.count === 10, 'addAmount should return state with count 10');

		// Test that returned value can be used immediately
		const result4 = modelActions.reset();
		console.log('reset() returned:', result4);
		console.assert(result4.count === 0, 'reset should return state with count 0');

		console.log('✓ All hook_model tests passed');
	};

	const testChainedCalls = () => {
		console.log('Testing chained usage with return values...');

		// Example: use return value immediately without waiting for re-render
		const newState = modelActions.addAmount(5);
		console.log('Added 5, new count is:', newState.count);

		// This demonstrates the value of having return values
		if (newState.count > 10) {
			console.log('Count exceeded 10, will reset');
			modelActions.reset();
		}

		console.log('✓ Chained call test passed');
	};

	return [
		node_dom('div', null, [
			node_dom('h1[innerText=Return Value Tests]'),
			node_dom('p', { innerText: `Simple state: ${simpleState}` }),
			node_dom('p', { innerText: `Model count: ${modelState.count}` }),
			node_dom('p', { innerText: `History: ${modelState.history.join(', ')}` }),
			node_dom('button[innerText=Test hook_state]', { onclick: testStateReturn }),
			node_dom('button[innerText=Test hook_model]', { onclick: testModelReturns }),
			node_dom('button[innerText=Test chained]', { onclick: testChainedCalls }),
			node_dom('p[innerText=Check console for test results]', {
				S: { color: 'gray', fontSize: '12px' }
			}),
		]),
	];
});
