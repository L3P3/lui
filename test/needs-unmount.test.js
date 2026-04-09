import {
	expect,
	test,
} from 'bun:test';

import {root_create} from './setup.js';
import {
	hook_dom,
	hook_effect,
	hook_state,
	init,
	node,
	node_dom,
} from '../src/lui.js';

const ChildWithEffect = ({cleanups}) => (
	hook_effect(() => {
		return () => cleanups.push('child_effect');
	}),
	hook_dom('span', {
		textContent: 'effectful',
	}),
	null
);

const ChildWithoutEffect = () => (
	hook_dom('span', {
		textContent: 'plain',
	}),
	null
);

test('needs_unmount: effect cleanup runs when subtree with effect is unmounted', () => {
	const root = root_create();
	const cleanups = [];
	let show_set_;

	init(() => {
		const [show, show_set] = hook_state(true);
		show_set_ = show_set;

		return [
			node_dom('div[id=wrapper]'),
			show &&
			node(ChildWithEffect, {cleanups}),
		];
	}, root);

	expect(root.querySelector('span')).toBeTruthy();
	expect(root.querySelector('span').textContent).toBe('effectful');

	show_set_(false);
	expect(cleanups).toEqual(['child_effect']);
	expect(root.querySelector('span')).toBeFalsy();
});

test('needs_unmount: DOM is cleaned up for subtree without effects', () => {
	const root = root_create();
	let show_set_;

	init(() => {
		const [show, show_set] = hook_state(true);
		show_set_ = show_set;

		return [
			node_dom('div[id=wrapper]'),
			show &&
			node(ChildWithoutEffect, null),
		];
	}, root);

	expect(root.querySelector('span')).toBeTruthy();
	expect(root.querySelector('span').textContent).toBe('plain');

	show_set_(false);
	expect(root.querySelector('span')).toBeFalsy();
});

const GrandchildWithEffect = ({cleanups}) => (
	hook_effect(() => {
		return () => cleanups.push('grandchild_effect');
	}),
	hook_dom('em', {
		textContent: 'deep',
	}),
	null
);

const ParentComponent = ({cleanups, show_grandchild}) => (
	hook_dom('div', {id: 'parent'}),
	[
		node_dom('span[textContent=parent-text]'),
		show_grandchild &&
		node(GrandchildWithEffect, {cleanups}),
	]
);

test('needs_unmount: nested effect cleanup runs when ancestor is unmounted', () => {
	const root = root_create();
	const cleanups = [];
	let show_set_;

	init(() => {
		const [show, show_set] = hook_state(true);
		show_set_ = show_set;

		return [
			node_dom('h1[textContent=test]'),
			show &&
			node(ParentComponent, {cleanups, show_grandchild: true}),
		];
	}, root);

	expect(root.querySelector('em')).toBeTruthy();
	expect(root.querySelector('em').textContent).toBe('deep');

	show_set_(false);
	expect(cleanups).toEqual(['grandchild_effect']);
	expect(root.querySelector('em')).toBeFalsy();
	expect(root.querySelector('#parent')).toBeFalsy();
});
