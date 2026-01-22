import './setup.js';
import {
	expect,
	test,
} from 'bun:test';

import {
	hook_model,
	init,
	node_dom,
} from '../src/lui.js';

test('hook_model: can manage state with actions', () => {
	const model = {
		init: () => 0,
		increment: state => state + 1,
		decrement: state => state - 1,
	};
	
	const root = document.createElement('div');
	document.body.appendChild(root);
	
	init(() => {
		const [count, { increment, decrement }] = hook_model(model);
		
		return [
			node_dom('span', { textContent: `Count: ${count}` }),
			node_dom('button[id=inc]', { textContent: 'Increment', onclick: increment }),
			node_dom('button[id=dec]', { textContent: 'Decrement', onclick: decrement }),
		];
	}, root);
	
	const span = root.querySelector('span');
	expect(span.textContent).toBe('Count: 0');
	
	// Increment
	root.querySelector('#inc').click();
	expect(span.textContent).toBe('Count: 1');
	
	// Increment again
	root.querySelector('#inc').click();
	expect(span.textContent).toBe('Count: 2');
	
	// Decrement
	root.querySelector('#dec').click();
	expect(span.textContent).toBe('Count: 1');
});
