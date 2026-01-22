import {
	root_create,
} from './setup.js';
import {
	expect,
	test,
} from 'bun:test';

import {
	hook_assert,
	hook_state,
	init,
	node,
	node_dom,
} from '../src/lui.js';

test('hook_assert: can conditionally render components', () => {
	const root = root_create();
	
	function Inner({ on }) {
		hook_assert(on);
		
		return [
			node_dom('p', { textContent: 'Test' }),
		];
	}
	
	init(() => {
		const [on, on_set] = hook_state(false);
		
		return [
			node_dom('h1', { textContent: 'Hello, World!' }),
			node(Inner, { on }),
			node_dom('button', {
				textContent: 'Toggle',
				onclick: () => {
					on_set(!on);
				},
			}),
		];
	}, root);
	
	const h1 = root.querySelector('h1');
	expect(h1.textContent).toBe('Hello, World!');
	
	// Initially, the inner component should not render (on=false)
	let paragraphs = root.querySelectorAll('p');
	expect(paragraphs.length).toBe(0);
	
	// Toggle on
	const button = root.querySelector('button');
	button.click();
	
	// Now the inner component should render
	paragraphs = root.querySelectorAll('p');
	expect(paragraphs.length).toBe(1);
	expect(paragraphs[0].textContent).toBe('Test');
	
	// Toggle off
	button.click();
	
	// Inner component should not render again
	paragraphs = root.querySelectorAll('p');
	expect(paragraphs.length).toBe(0);
});
