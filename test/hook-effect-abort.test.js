import {
	expect,
	test,
} from 'bun:test';

import {root_create} from './setup.js';
import {
	hook_assert,
	hook_effect,
	hook_state,
	hook_static,
	init,
	node,
	node_dom,
} from '../src/lui.js';

test('hook_assert: effect before assert(false) has slot preserved, not re-run on re-render', () => {
	const root = root_create();
	let effect_runs = 0;
	let on_set_;

	function Inner({on}) {
		hook_effect(() => {
			effect_runs++;
		});

		hook_assert(on);

		return [
			node_dom('span[textContent=visible]'),
		];
	}

	init(() => {
		const [on, on_set] = hook_state(false);
		on_set_ = on_set;

		return [
			node(Inner, {on}),
		];
	}, root);

	// Initial render: effect ran, then hook_assert(false) aborted.
	// Effect slot was saved with unmount=null.
	expect(effect_runs).toBe(1);
	expect(root.querySelector('span')).toBeNull();

	// Toggle on: re-render, effect slot exists with no deps → not re-run.
	on_set_(true);
	expect(effect_runs).toBe(1);
	expect(root.querySelector('span').textContent).toBe('visible');
});

test('hook_assert: effect before assert(false) with deps, re-runs when deps change after assert passes', () => {
	const root = root_create();
	let effect_runs = 0;
	let cleanup_runs = 0;
	let on_set_;
	let dep_set_;

	function Inner({on, dep}) {
		hook_effect(() => {
			effect_runs++;
			return () => { cleanup_runs++; };
		}, [dep]);

		hook_assert(on);

		return [
			node_dom('span', {textContent: dep}),
		];
	}

	init(() => {
		const [on, on_set] = hook_state(false);
		const [dep, dep_set] = hook_state('a');
		on_set_ = on_set;
		dep_set_ = dep_set;

		return [
			node(Inner, {on, dep}),
		];
	}, root);

	// Effect ran once (dep='a'), then hook_assert(false) aborted the render.
	// Unlike state.set inside an effect, hook_assert aborts AFTER hook_effect
	// completes fully, so the cleanup function WAS returned and stored.
	expect(effect_runs).toBe(1);
	expect(cleanup_runs).toBe(0);

	// Enable: deps unchanged ['a']→['a'], effect not re-run.
	on_set_(true);
	expect(effect_runs).toBe(1);
	expect(root.querySelector('span').textContent).toBe('a');

	// Change dep: deps ['a']→['b'], old cleanup runs, then effect re-runs.
	dep_set_('b');
	expect(effect_runs).toBe(2);
	expect(cleanup_runs).toBe(1);
	expect(root.querySelector('span').textContent).toBe('b');
});

test('hook_assert: assert(false) before effect prevents effect from running, initializes on later render', () => {
	const root = root_create();
	let effect_runs = 0;
	let on_set_;

	function Inner({on}) {
		hook_assert(on);

		hook_effect(() => {
			effect_runs++;
		});

		return [
			node_dom('span[textContent=visible]'),
		];
	}

	init(() => {
		const [on, on_set] = hook_state(false);
		on_set_ = on_set;

		return [
			node(Inner, {on}),
		];
	}, root);

	// hook_assert(false) aborted before the effect was ever reached.
	expect(effect_runs).toBe(0);
	expect(root.querySelector('span')).toBeNull();

	// Toggle on: effect initializes for the first time.
	on_set_(true);
	expect(effect_runs).toBe(1);
	expect(root.querySelector('span').textContent).toBe('visible');
});

test('hook_effect: slot preserved when state.set aborts initial render (no deps)', () => {
	const root = root_create();
	let effect_runs = 0;

	init(() => {
		const [value, value_set] = hook_state(0);

		hook_effect(() => {
			effect_runs++;
			if (value === 0) {
				value_set(1); // abort + re-render
			}
		});

		return [
			node_dom('p', {
				textContent: String(value),
			}),
		];
	}, root);

	// Effect ran once during the initial (aborted) render.
	// On re-render the slot already exists with deps=undefined → not re-run.
	expect(effect_runs).toBe(1);
	expect(root.querySelector('p').textContent).toBe('1');
});

test('hook_effect: slot preserved when state.set aborts initial render (with deps)', () => {
	const root = root_create();
	let effect_runs = 0;
	let cleanup_runs = 0;

	init(() => {
		const [value, value_set] = hook_state(0);

		hook_effect(() => {
			effect_runs++;
			if (value === 0) {
				value_set(1); // abort + re-render
			}
			return () => { cleanup_runs++; };
		}, [value]);

		return [
			node_dom('p', {
				textContent: String(value),
			}),
		];
	}, root);

	// Effect ran during initial render (value=0), aborted before returning cleanup.
	// On re-render (value=1), deps changed [0]→[1] → effect re-runs.
	expect(effect_runs).toBe(2);
	// Cleanup from the aborted run was null → not called.
	expect(cleanup_runs).toBe(0);
	expect(root.querySelector('p').textContent).toBe('1');
});

test('hook_effect: cleanup is null after aborted initial run, no stale cleanup on unmount', () => {
	const root = root_create();
	let cleanup_runs = 0;
	let show_set_;

	function Inner() {
		const [value, value_set] = hook_state(0);

		hook_effect(() => {
			if (value === 0) {
				value_set(1); // abort, cleanup never returned
			}
			return () => { cleanup_runs++; };
		});

		return [
			node_dom('span', {
				textContent: String(value),
			}),
		];
	}

	init(() => {
		const [show, show_set] = hook_state(true);
		show_set_ = show_set;

		return [
			show && node(Inner),
		];
	}, root);

	expect(root.querySelector('span').textContent).toBe('1');
	// No cleanup from the aborted initial run.
	expect(cleanup_runs).toBe(0);

	// Unmount Inner. The effect's unmount is null (from the abort), so no cleanup call.
	show_set_(false);
	expect(cleanup_runs).toBe(0);
});

test('hook_effect: hooks after aborted effect initialize correctly on re-render', () => {
	const root = root_create();
	let render_count = 0;

	init(() => {
		render_count++;
		const [value, value_set] = hook_state(0);

		hook_effect(() => {
			if (value === 0) {
				value_set(1); // abort before reaching later hooks
			}
		});

		// This hook_static is only reached on the re-render (value=1).
		const ref = hook_static();

		return [
			node_dom('p', {
				textContent: `${value}-${typeof ref}`,
			}),
		];
	}, root);

	expect(render_count).toBe(2);
	expect(root.querySelector('p').textContent).toBe('1-object');
});

test('hook_effect: aborted effect with deps, then external trigger re-runs effect', () => {
	const root = root_create();
	let effect_runs = 0;
	let dep_set_;

	init(() => {
		const [value, value_set] = hook_state(0);
		const [dep, dep_set] = hook_state('a');
		dep_set_ = dep_set;

		hook_effect(() => {
			effect_runs++;
			if (value === 0) {
				value_set(1); // abort + re-render
			}
		}, [dep]);

		return [
			node_dom('p', {
				textContent: `${value}-${dep}`,
			}),
		];
	}, root);

	// Initial render (aborted): effect_runs=1.
	// Re-render: deps=['a'] unchanged → effect not re-run.
	expect(effect_runs).toBe(1);
	expect(root.querySelector('p').textContent).toBe('1-a');

	// Now change dep → deps change → effect re-runs.
	dep_set_('b');
	expect(effect_runs).toBe(2);
	expect(root.querySelector('p').textContent).toBe('1-b');
});
