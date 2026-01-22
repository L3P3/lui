import './setup.js';
import {
	expect,
	test,
} from 'bun:test';

import {
	hook_state,
	init,
	node_dom,
} from '../src/lui.js';

test('hook_state: can manage component state', () => {
	const root = document.createElement('div');
	document.body.appendChild(root);
	
	init(() => {
		const [count, count_set] = hook_state(0);
		
		return [
			node_dom('h1', { textContent: `Count: ${count}` }),
			node_dom('button', {
				textContent: 'Increment',
				onclick: () => count_set(count + 1)
			}),
		];
	}, root);
	
	const h1 = root.querySelector('h1');
	expect(h1.textContent).toBe('Count: 0');
	
	// Simulate button click
	const button = root.querySelector('button');
	button.click();
	
	expect(h1.textContent).toBe('Count: 1');
});
