import {
	expect,
	test,
} from 'bun:test';

import {root_create} from './setup.js';
import {
	hook_async,
	hook_state,
	init,
	node_dom,
} from '../src/lui.js';

test('hook_async: respects deps and fallback while ignoring outdated promises', async () => {
	const root = root_create();
	const resolvers = [];

	const loader = key => new Promise(resolve => {
		resolvers.push({key, resolve});
	});

	init(() => {
		const [key, key_set] = hook_state('one');
		const value = hook_async(loader, [key], 'loading');

		return [
			node_dom('div[id=value]', {
				textContent: value,
			}),
			node_dom('button[id=next][textContent=next]', {
				onclick: () => key_set('two'),
			}),
		];
	}, root);

	const valueNode = root.querySelector('#value');
	expect(valueNode.textContent).toBe('loading');
	// first promise created
	expect(resolvers.length).toBe(1);

	// trigger new request before resolving the first one
	root.querySelector('#next').click();
	expect(valueNode.textContent).toBe('loading');
	expect(resolvers.length).toBe(2);

	// resolve outdated promise -> should be ignored
	resolvers[0].resolve('value_one');
	await new Promise(resolve => setTimeout(resolve, 0));
	expect(valueNode.textContent).toBe('loading');

	// resolve latest promise -> should update
	resolvers[1].resolve('value_two');
	await new Promise(resolve => setTimeout(resolve, 0));
	expect(valueNode.textContent).toBe('value_two');
});
