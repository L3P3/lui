/**
	@preserve lui.js web frame work
	inspired by react and mithril
	L3P3.de 2020
*/

import {DEBUG, VERBOSE} from './flags.js';

const HOOK_EFFECT = DEBUG ? 0 : 1;
const HOOK_ASYNC = DEBUG ? 1 : 2;
const HOOK_STATE = DEBUG ? 2 : 0;
const HOOK_STATIC = DEBUG ? 3 : 0;
const HOOK_MEMO = DEBUG ? 4 : 0;
const HOOK_PREV = DEBUG ? 5 : 0;
const HOOK_REDUCEA = DEBUG ? 6 : 0;
const HOOK_REDUCEF = DEBUG ? 7 : 0;


/// COMPILATION ///

/**
	@template {TYPE_PROPS} T
	@typedef {function(T):?Array<?TYPE_INSTANCE_CALL<*>|boolean>}
*/
var TYPE_COMPONENT;

/** @typedef {TYPE_COMPONENT<TYPE_PROPS_DOM>} */
var TYPE_COMPONENT_DOM;

/** @typedef {?string} */
var TYPE_KEY;

/** @typedef {?Object} */
var TYPE_PROPS;

/**
	@typedef {?{
		C: (Array<TYPE_INSTANCE_CALL<*>>|void),
		F: (Object<string, boolean>|void),
		R: (function(HTMLElement):void|void),
		S: (Object<string, string>|void)
	}}
*/
var TYPE_PROPS_DOM;

/** @typedef {[number, ...*]} */
var TYPE_SLOT;

/**
	@template {TYPE_PROPS} T
	@typedef {{
		component: TYPE_COMPONENT<T>,
		props: T
	}}
*/
var TYPE_INSTANCE_CALL;

/**
	@template {TYPE_PROPS} T
	@typedef {{
		icall: TYPE_INSTANCE_CALL<T>,
		iparent: ?TYPE_INSTANCE<*>,
		parent_index: number,
		slots: Array<TYPE_SLOT>,
		childs: ?Array<TYPE_INSTANCE<*>>,
		dom: ?HTMLElement,
		dom_first: ?HTMLElement
	}}
*/
var TYPE_INSTANCE;

/** @typedef {!Set<TYPE_INSTANCE<*>>} */
var TYPE_QUEUE;


/// STATE ///

/**
	currently rendered instance
	@type {?TYPE_INSTANCE<*>}
*/
let current = null;

/**
	first instance_render call for current instance
	@type {boolean}
*/
let current_first = true;

/**
	next state slot pointer
	@type {number}
*/
let current_index = 0;

/**
	relative time of the last rerender call
	@type {number}
*/
let render_time = 0;

/**
	instances that should be rerendered in this frame
	@type {TYPE_QUEUE}
*/
let render_queue = new Set;

/**
	instances that should be rerendered in the next frame
	@type {TYPE_QUEUE}
*/
let render_queue_next = new Set;

/**
	is the render loop active?
	@type {boolean}
*/
let rerender_pending = false;

/**
	is a rerender requested?
	@type {boolean}
*/
let rerender_requested = false;


/// MAPS ///

/**
	also enum default value
	@dict
	@type {!Object<string, HTMLElement>}
*/
const dom_cache = {};

/**
	@dict
	@type {!Object<string, TYPE_COMPONENT_DOM>}
*/
const component_dom_cache = {};


DEBUG && (
	window.onerror = () => {
		current !== null_ &&
			log('error');
		render_queue.clear();
		render_queue_next.clear();
	}
);


/// ALIAS ///

const null_ = current;
const Array_ = Array;
const Object_ = Object;
const document_ = document;


/// DEBUGGING ///

/**
	gets the current stack
	@return {string}
*/
const stack_get = () => {
	const stack = [];
	let item = current;
	while (item !== null_) {
		stack.unshift(
			component_name_get(item.icall.component)
		);
		item = item.iparent;
	}
	return (
		stack.join('>') ||
		'-'
	);
}

/**
	tries getting a component name
	@param {TYPE_COMPONENT<*>} component
	@return {string}
*/
const component_name_get = component => (
	component === tuple_comp ? 'list' :
	component['name_'] ||
	component.name ||
	'?'
)

/**
	throws a lui error
	@param {string} message
	@throws {Error}
*/
const error = message => {
	throw(
		new Error('lui: ' + message)
	);
}

/**
	prints message
	@param {string} message
*/
const log = (message, ...data) => {
	console.log('lui ' + stack_get() + ': ' + message, ...data);
}

/**
	checks for added/removed keys
	@param {!Object} a
	@param {!Object} b
*/
const assert_keys = (a, b) => {
	a !== b &&
	JSON.stringify(Object_.keys(a)) !== JSON.stringify(Object_.keys(b)) &&
		error('object keys mismatch');
}

/**
	ensures hook rules
	@param {number=} type
*/
const assert_hook = type => {
	current === null_ &&
		error('hook called outside of component rendering');

	type !== undefined &&
	current_index < current.slots.length &&
	current.slots[current_index][0] !== type &&
		error('inconsistent hook order at index ' + current_index);
}

/**
	ensures that value does not change between renderings
	@param {*} value
*/
const assert_hook_equal = value => {
	assert_hook();

	value !== hook_prev(value, value) &&
		error('value changed between renderings');
}


/// ABSTRACT  ///

/**
	lists all changed properties
	@param {!Object} a
	@param {!Object} b
	@return {!Array<string>}
*/
const object_diff = (a, b) => (
	DEBUG && assert_keys(a, b),
	a === b
	?	[]
	:	Object_.keys(a)
		.filter(key => a[key] !== b[key])
)

/**
	checks if objects are equal
	@param {!Object} a
	@param {!Object} b
	@return {boolean}
*/
const object_comp = (a, b) => (
	DEBUG && assert_keys(a, b),
	a === b ||
	!Object_.keys(a)
	.some(key => a[key] !== b[key])
)

/**
	checks if tuples are equal, also enum for node_list
	@param {Array} a
	@param {(Array|undefined)} b
	@return {boolean}
*/
const tuple_comp = (a, b) => {
	DEBUG && (
		b
		?	a.length !== b.length
		:	a.length > 0
	) &&
		error('tuple length changed');

	if (!b) return true;

	let i = a.length;
	while (i > 0) {
		if (a[--i] === b[i]) continue;
		return false;
	}
	return true;
}


/// INSTANCES ///

/**
	update an instance
	@param {TYPE_INSTANCE<*>} instance
	@param {?HTMLElement} dom_parent
	@param {?HTMLElement} dom_after
*/
const instance_render = (instance, dom_parent, dom_after) => {
	(
		current_first = (
			current = instance
		).slots === null_
	) && (
		instance.slots = []
	);
	current_index = 0;

	let dom_first = dom_after;

	VERBOSE && log('instance_render');
	render_queue.delete(instance);

	// not node_list?
	if (instance.icall.component !== tuple_comp) {
		let child_calls = null_;

		try {
			child_calls = (instance.icall.component)(instance.icall.props);
		}
		catch (thrown) {
			if (
				DEBUG &&
				thrown !== dom_cache
			) throw thrown;
		}

		const {dom} = instance;

		DEBUG &&
		typeof child_calls !== 'object' &&
			error('components need to return child list or null');

		if (child_calls !== null_) {
			if (dom !== null_) {
				dom_parent = dom;
				dom_first = null_;
			}

			let childs_index = child_calls.length;
			let child;
			let child_call;

			DEBUG && (
				typeof childs_index !== 'number' &&
					error('childs must be returned in a list'),
				childs_index === 0 &&
					error('returned childs list empty'),
				instance.childs !== null_ &&
				childs_index !== instance.childs.length &&
					error('returned childs count changed')
			);

			/** @type {Array<TYPE_INSTANCE<*>>} */
			const instance_childs = (
				instance.childs ||
				(
					instance.childs =
						new Array_(childs_index).fill(null_)
				)
			);

			do {
				child = instance_childs[--childs_index];

				if (
					(
						child_call = child_calls[childs_index]
					) &&
					child_call !== true
				) {
					DEBUG &&
					child !== null_ &&
					child.icall.component !== child_call.component &&
						error('child replaced at ' + childs_index);

					if (child === null_) {
						VERBOSE && log('child add');

						instance_render(
							child = instance_childs[childs_index] = {
								icall: child_call,
								iparent: instance,
								parent_index: childs_index,
								slots: null_,
								childs: null_,
								dom: null_,
								dom_first: null_
							},
							dom_parent,
							dom_first
						);

						DEBUG && (
							current = instance
						);

						child.dom !== null_ &&
							dom_parent.insertBefore(
								child.dom_first = child.dom,
								dom_first
							);
					}
					else if (
						!object_comp(
							child.icall.props,
							child_call.props
						)
					) {
						VERBOSE && log('child modify', object_diff(child.icall.props, child_call.props));

						child.icall = child_call;
						instance_render(
							child,
							dom_parent,
							dom_first
						);

						DEBUG && (
							current = instance
						);
					}

					child.dom_first !== null_ && (
						dom_first = child.dom_first
					);
				}
				else if (child !== null_) {
					instance_unmount(child, dom_parent);
					instance_childs[childs_index] = null_;
				}
			}
			while (childs_index > 0);
		}
		else if (instance.childs !== null_) {
			VERBOSE && log('discard childs');
			for (const child of instance.childs)
				child !== null_ &&
					instance_unmount(child, dom_parent);
			instance.childs = null_;
		}

		dom === null_ &&
		(
			instance.dom_first =
				dom_first !== dom_after
				?	dom_first
				:	null_
		);
	}
	// node_list?
	else {
		const {
			component,
			data,
			props
		} = instance.icall.props;
		if (DEBUG) {
			(
				typeof data !== 'object' ||
				data === null_ ||
				typeof data.length !== 'number'
			) &&
				error('node_list data must be an array');
			(
				typeof props !== 'object' ||
				props === null_
			) &&
				error('node_list props must be an object');
			assert_hook_equal(component);
			const item_type_ref = hook_static({val: null_});
			data.length > 0 && (
				item_type_ref.val !== null_
				?	(
						typeof data[0] !== item_type_ref.val &&
							error('node_list item type changed'),
						typeof data[0] === 'object' &&
						data[0] !== null_ &&
						typeof data[0].id !== item_type_ref.val_id &&
							error('node_list item id type changed')
					)
				:	(
						['object', 'string', 'number']
						.includes(
							item_type_ref.val = typeof data[0]
						) ||
							error('node_list item type invalid'),
						typeof data[0] === 'object' &&
						data[0] !== null_ &&
						!['string', 'number']
						.includes(
							item_type_ref.val_id = typeof data[0].id
						) &&
							error('node_list item id type invalid')
					)
			);
		}
		const data_map = {};
		const data_order = [];
		let data_index = data.length;
		if (data_index > 0) {
			const items_objects = typeof data[0] === 'object';
			for (const item of data) {
				DEBUG && (
					item === null_ &&
						error('node_list item is null'),
					typeof item !== typeof data[0] &&
						error('node_list item type changed'),
					items_objects &&
					typeof item.id !== typeof data[0].id &&
						error('node_list item id type changed')
				);
	
				const key = (
					items_objects
					?	item.id
					:	item
				);

				DEBUG &&
				key in data_map &&
					error('node_list item not unique');
	
				data_map[key] = item;
				data_order.push(key);
			}
		}

		const item_map = hook_static();
		const data_order_prev = hook_prev(data_order);
		const props_prev = hook_prev(props);
		const props_changed = (
			current_first ||
			!object_comp(
				props,
				props_prev
			)
		);

		VERBOSE && !current_first && props_changed && log('childs modify', object_diff(props_prev, props));

		// remove items
		if(!current_first)
		for (const key of data_order_prev) {
			if (key in data_map) continue;
			instance_unmount(item_map[key], dom_parent);
			delete item_map[key];
		}

		// insert/reinsert all items
		const childs = instance.childs = new Array(data_index);
		while (data_index > 0) {
			const key = data_order[--data_index];
			let child = item_map[key];
			if (child !== undefined) {
				child.parent_index !== data_index && (
					instance_reinsert(child, dom_parent, dom_first),
					child.parent_index = data_index
				);

				if (props_changed) {
					child.icall.props = {
						...props,
						I: data_map[key]
					};
					instance_render(
						child,
						dom_parent,
						dom_first
					);

					DEBUG && (
						current = instance
					);
				}
			}
			else {
				VERBOSE && log('child add');

				instance_render(
					item_map[key] = child = {
						icall: {
							component,
							props: {
								...props,
								I: data_map[key]
							}
						},
						iparent: instance,
						parent_index: data_index,
						slots: null_,
						childs: null_,
						dom: null_,
						dom_first: null_
					},
					dom_parent,
					dom_first
				);

				DEBUG && (
					current = instance
				);

				child.dom !== null_ &&
					dom_parent.insertBefore(
						child.dom_first = child.dom,
						dom_first
					);
			}

			(
				childs[data_index] = child
			).dom_first !== null_ && (
				dom_first = child.dom_first
			);
		}
		instance.dom_first =
			dom_first !== dom_after
			?	dom_first
			:	null_;
	}
}

/**
	unmount an instance
	@param {TYPE_INSTANCE<*>} instance
	@param {?HTMLElement} dom_parent
*/
const instance_unmount = (instance, dom_parent) => {
	VERBOSE && log('instance_unmount ' + component_name_get(instance.icall.component));

	dom_parent !== null_ &&
	instance.dom !== null_ && (
		dom_parent.removeChild(
			instance.dom
		),
		dom_parent = null_
	);

	if (instance.childs !== null_) {
		for (const child of instance.childs) {
			child !== null_ &&
				instance_unmount(child, dom_parent);
		}
	}

	for (const slot of instance.slots) {
		switch (slot[0]) {
			case HOOK_EFFECT:
				slot[2] !== null_ &&
					slot[2](slot[1]);
				break;
			case HOOK_ASYNC:
				slot[1] = null_;
				break;
			default:
		}
	}

	render_queue.delete(instance);
	render_queue_next.delete(instance);
}

/**
	reinsert all dom nodes of an instance
	@param {TYPE_INSTANCE<*>} instance
	@param {HTMLElement} dom_parent
	@param {?HTMLElement} dom_first
	@return {?HTMLElement}
*/
const instance_reinsert = (instance, dom_parent, dom_first) => {
	if (instance.dom !== null_) {
		dom_parent.insertBefore(instance.dom, dom_first);
		return instance.dom;
	}
	if (instance.dom_first !== null_) {
		let childs_index = instance.childs.length;
		do {
			instance.childs[--childs_index] !== null_ && (
				dom_first = instance_reinsert(
					instance.childs[childs_index],
					dom_parent,
					dom_first
				)
			);
		}
		while (childs_index > 0);
	}
	return dom_first;
}

/**
	request rerendering for instance
	@param {TYPE_INSTANCE<*>} instance
*/
const instance_dirtify = instance => {
	VERBOSE &&
	!render_queue.has(instance) &&
		log('instance_dirtify ' + component_name_get(instance.icall.component));

	render_queue.add(instance);
	//TODO order

	rerender_pending ||
		rerender();
}


/// HOOKS ///

/**
	request rerendering for current instance
*/
export const hook_rerender = () => {
	DEBUG && assert_hook();

	VERBOSE &&
	!render_queue_next.has(current) &&
		log('rerender request');

	render_queue_next.add(current);
}

/**
	get if this is the first instance_render call
	@return {boolean}
*/
export const hook_first = () => (
	DEBUG && assert_hook(),
	current_first
)

/**
	interrupts rendering if condition is not met
	@param {boolean=} condition
*/
export const hook_assert = condition => {
	DEBUG && assert_hook();

	if (!condition) throw dom_cache;
}

/**
	fire an effect on deps change
	@param {function(...*=):(void|function(...*=):void)} effect
	@param {Array=} deps
*/
export const hook_effect = (effect, deps) => {
	DEBUG && assert_hook(HOOK_EFFECT);

	if (current_index < current.slots.length) {
		const slot = current.slots[current_index++];
		if (!tuple_comp(slot[1], deps)) {
			VERBOSE && log('effect again', deps);
			slot[2] !== null_ &&
				(slot[2])(
					...slot[1]
				);
			slot[2] = (
				effect(
					...(
						slot[1] = deps || []
					)
				) ||
				null_
			);
		}
	}
	else {
		VERBOSE && log('effect initial', deps);
		current.slots[current_index++] = [
			HOOK_EFFECT,
			deps = deps || [],
			effect(...deps) || null_
		];
	}

	DEBUG &&
	current.slots[current_index - 1][2] &&
	current.slots[current_index - 1][2].then &&
		error('effect function must be synchronous, use hook_async instead');
}

/**
	request value on deps change
	@template T
	@param {function(...*=):Promise<T>} getter
	@param {Array=} deps
	@param {?=} fallback
	@return {?T}
*/
export const hook_async = (getter, deps, fallback) => {
	DEBUG && assert_hook(HOOK_ASYNC);

	const slot = (
		current_index < current.slots.length
		?	current.slots[current_index++]
		:	(
			current.slots[current_index++] = [
				HOOK_ASYNC,
				null_,
				null_
			]
		)
	);

	if (
		slot[1] !== null_ &&
		tuple_comp(slot[1], deps)
	) {
		return slot[2];
	}

	VERBOSE && log('async start', deps);

	fallback !== undefined && (
		slot[2] = fallback
	);

	const current_ = current;
	getter(
		...(
			slot[1] = deps =
				deps || []
		)
	)
	.then(value => {
		VERBOSE && log('async end ' + component_name_get(current_.icall.component));
		if (
			slot[2] === value ||
			slot[1] !== deps
		) return;
		slot[2] = value;
		instance_dirtify(current_);
	});
	return slot[2];
}

/**
	get persistent state
	@template T
	@param {T} initial
	@return {[T, function(T):void, function():T]}
*/
export const hook_state = initial => {
	DEBUG && assert_hook(HOOK_STATE);

	if (current_index < current.slots.length) {
		return current.slots[current_index++][1];
	}

	const current_ = current;
	/** @type [T, function(T):void, function():T] */
	const slot = [
		initial,
		value => {
			VERBOSE && log('state set ' + component_name_get(current_.icall.component), value);
			if (slot[0] === value) return;
			slot[0] = value;
			instance_dirtify(current_);
		},
		() => slot[0]
	];
	current.slots[current_index++] = [HOOK_STATE, slot];
	return slot;
}

/**
	get persistent constant
	@template T
	@param {T=} value
	@return {T}
*/
export const hook_static = value => {
	DEBUG && assert_hook(HOOK_STATIC);

	return (
		current_index < current.slots.length
		?	current.slots[current_index++]
		:	(
			current.slots[current_index++] = [
				HOOK_STATIC,
				value === undefined ? {} : value
			]
		)
	)[1];
}

/**
	update value on deps change
	@template T
	@param {function(...*=):T} getter
	@param {Array=} deps
	@return {T}
*/
export const hook_memo = (getter, deps) => {
	DEBUG && assert_hook(HOOK_MEMO);

	if (current_index < current.slots.length) {
		const slot = current.slots[current_index++];
		return (
			tuple_comp(slot[1], deps)
			?	slot[2]
			:	(
				VERBOSE && log('memo again', deps),
				slot[2] =
					getter(
						...(
							slot[1] = deps || []
						)
					)
			)
		);
	}

	VERBOSE && log('memo initial', deps);
	const value = getter(
		...(
			deps = deps || []
		)
	);
	current.slots[current_index++] = [HOOK_MEMO, deps, value];
	return value;
}

/**
	get value from previous rendering
	@template T
	@param {T} value
	@param {T=} initial
	@return {T}
*/
export const hook_prev = (value, initial) => {
	DEBUG && assert_hook(HOOK_PREV);

	if (current_index < current.slots.length) {
		const slot = current.slots[current_index++];
		const prev = slot[1];
		slot[1] = value;
		return prev;
	}

	current.slots[current_index++] = [HOOK_PREV, value];
	return initial;
}

/**
	returns stable callback
	@template T
	@param {function():T} callback
	@param {Array} deps
	@return {function():T}
*/
export const hook_callback = (callback, deps) => {
	const state = hook_static();
	state.deps = deps;
	if (current_first) {
		state.callback = (...args) => (
			callback(...state.deps, ...args)
		);
	}
	return state.callback;
}

/**
	used for the hook_delay
	@param {number} delay
	@param {function(boolean):void} expired_set
	@return {function():void}
*/
const hook_delay_effect = (delay, expired_set) => {
	const timeout = setTimeout(
		() => {
			expired_set(true);
		},
		delay
	);

	return (
		() => {
			clearTimeout(timeout);
		}
	);
}

/**
	wait until it turns true
	@param {number} delay in ms
	@return {boolean}
*/
export const hook_delay = delay => {
	const [expired, expired_set] = hook_state(false);
	hook_effect(
		hook_delay_effect,
		[delay, expired_set]
	);
	return expired;
}

/**
	smooth transition
	@param {number} goal
	@param {number} delay in ms
	@return {number}
*/
export const hook_transition = (goal, delay) => {
	const state = hook_static({goal});
	const transition = hook_memo(
		(goal, delay) => ({
			value_start: state.goal,
			value_end: goal,
			time_start: render_time,
			time_end: (
				current_first
				?	render_time
				:	render_time + delay
			)
		}),
		[goal, delay]
	);

	if (transition.time_end <= render_time) {
		return (
			state.goal = transition.value_end
		);
	}

	hook_rerender();
	return (
		state.goal =
		transition.time_start === render_time
		?	transition.value_start
		:	transition.value_start +
			(transition.value_end - transition.value_start) *
			(render_time - transition.time_start) /
			(transition.time_end - transition.time_start)
	);
}

/**
	get all changed properties
	@param {!Object} object
	@return {!Array<string>} keys
*/
export const hook_object_changes = object => {
	const prev = hook_prev(object);
	return (
		current_first
		?	Object_.keys(object)
		:	object_diff(prev, object)
	);
}

/**
	get persitent state with custom reducer list
	@template T
	@param {Array<function(T=, ...*=):T>} reducer
	@return {[T, function(number, *):void]}
*/
export const hook_reducer = reducer => {
	DEBUG && assert_hook(HOOK_REDUCEA);

	DEBUG &&
	typeof reducer === 'function' &&
		error('array required, use hook_reducer_f instead');

	if (current_index < current.slots.length)
		return current.slots[current_index++][1];

	const current_ = current;
	/** @type {[T, function(number, *):void]} */
	const slot = [
		reducer[0](),
		(cmd, payload) => {
			VERBOSE && log('reducer ' + component_name_get(current_.icall.component) + ' -> #' + cmd, payload);
			const value = reducer[cmd](slot[0], payload);
			if (slot[0] === value) return;
			slot[0] = value;
			instance_dirtify(current_);
		}
	];
	current.slots[current_index++] = [HOOK_REDUCEA, slot];
	return slot;
}

/**
	get persitent state with custom reducer function
	@template T
	@template U
	@param {function(T, U):T} reducer
	@param {function():T=} initializer
	@return {[T, function(U=):void]}
*/
export const hook_reducer_f = (reducer, initializer) => {
	DEBUG && assert_hook(HOOK_REDUCEF);

	DEBUG &&
	typeof reducer !== 'function' &&
		error('function required');

	if (current_index < current.slots.length)
		return current.slots[current_index++][1];

	const current_ = current;
	/** @type {[T, function(U=):void]} */
	const slot = [
		(
			initializer
			?	initializer()
			:	null_
		),
		payload => {
			VERBOSE && log('reducer ' + component_name_get(current_.icall.component), payload);
			const value = reducer(slot[0], payload);
			if (slot[0] === value) return;
			slot[0] = value;
			instance_dirtify(current_);
		}
	];
	current.slots[current_index++] = [HOOK_REDUCEF, slot];
	return slot;
}

/**
	skips rendering until promise is resolved
	@param {Promise} promise
*/
export const hook_await = promise => {
	hook_assert(
		hook_async(promise, null_, dom_cache) !== dom_cache
	);
}

/**
	syncs dom attributes
	@param {TYPE_PROPS_DOM} attributes
	@return {HTMLElement}
*/
const hook_dom_common = attributes => {
	DEBUG &&
		assert_hook_equal(attributes === null_);
	const {dom} = current;
	if (attributes !== null_) {
		for (const key of hook_object_changes(attributes)) {
			DEBUG &&
			key.length > 1 &&
			key.charAt(0).toLowerCase() !== key.charAt(0) &&
				error('capital prop: ' + key);

			switch (key.charCodeAt(0)) {
				case 70://F
					DEBUG && (
						attributes.F === null_ ||
						typeof attributes.F !== 'object'
					) &&
						error('invalid css flags');

					dom.className = (
						Object_.keys(
							/** @type {!Object} */ (attributes.F)
						)
						.filter(key => attributes.F[key])
						.join(' ')
					);

					VERBOSE && log('dom flags', dom.className.split(' '));

					continue;
				case 82://R
					(attributes.R)(dom);
				case 67://C
				case 83://S
					continue;
				default:
					DEBUG &&
					key.charCodeAt(0) < 97 &&
						error('invalid prop: ' + key);

					VERBOSE && log('dom prop ' + key, attributes[key]);

					dom[key] = attributes[key];
			}
		}

		DEBUG &&
			assert_hook_equal(!attributes.S);
		if (attributes.S)
			for (const key of hook_object_changes(attributes.S)) {
				VERBOSE && log('dom css ' + key + '=' + attributes.S[key]);
				dom.style[key] = attributes.S[key];
			}
	}
	return dom;
}

/**
	turns function component into dom component
	@param {string} descriptor
	@param {TYPE_PROPS_DOM} attributes
	@return {HTMLElement}
*/
export const hook_dom = (descriptor, attributes) => (
	DEBUG && (
		assert_hook(),
		current.dom === null_
		?	current_first || error('hook_dom skipped before')
		:	current_first && error('hook_dom called twice'),
		attributes.C !== undefined &&
			error('hook_dom cannot have childs'),
		attributes.R !== undefined &&
			error('hook_dom cannot have a ref')
	),
	current_first && (
		current.dom = /** @type {HTMLElement} */ (
			dom_get(descriptor)
			.cloneNode(true)
		)
	),
	hook_dom_common(attributes)
)


/// INTERFACE ///

/**
	use a component with props and childs
	@template {TYPE_PROPS} T
	@param {TYPE_COMPONENT<T>} component
	@param {T=} props
	@param {Array<TYPE_INSTANCE_CALL<*>>=} childs
	@return {TYPE_INSTANCE_CALL<T>}
*/
export const node = (component, props, childs) => (
	DEBUG && (
		typeof component === 'string' &&
			error('component expected, use node_dom instead'),
		childs !== undefined && (
			!childs ||
			childs.constructor !== Array_
		) &&
			error('invalid childs type')
	),
	{
		component,
		props: (
			props
			?	(
					childs
					?	(
							props.C = childs,
							props
						)
					:	props
				)
			:	(
					childs
					?	/** @type {T} */ ({C: childs})
					:	null_
				)
		)
	}
)

/**
	create/use a component with props for each data item
	@param {TYPE_COMPONENT} component
	@param {!Array} data
	@param {TYPE_PROPS=} props
	@return {TYPE_INSTANCE_CALL}
*/
export const node_list = (component, data, props) => (
	node(
		tuple_comp,
		{
			component,
			data,
			props: props || {}
		}
	)
)

/**
	mounts the body component
	@param {function():[TYPE_PROPS, Array<TYPE_INSTANCE_CALL>]} body
*/
export const init = body => {
	VERBOSE && log('init');

	DEBUG && (
		(
			current !== null_ ||
			render_queue.size > 0
		) &&
			error('init called more than once'),
		typeof body !== 'function' &&
			error('init function requires body component')
	);

	let result;//[props, childs]

	const dom = document_.body;
	dom.innerHTML = '';

	const component = () => (
		DEBUG && (
			(
				!(
					result = body()
				) ||
				result.length !== 2
			) && error('root component must return [props, childs]'),
			assert_hook_equal(result[0] === null_),
			result[0] !== null_ && (
				typeof result[0] !== 'object' &&
					error('invalid props type'),
				assert_keys(
					hook_prev(result[0], result[0]),
					result[0]
				),
				result[0].C !== undefined &&
					error('body childs must be in second return value')
			)
		),
		hook_dom_common(
			(
				DEBUG
				?	result
				:	result = body()
			)[0]
		),
		result[1]
	);

	DEBUG && (
		component['name_'] = '$body'
	);

	instance_dirtify({
		icall: {
			component,
			props: null_
		},
		iparent: null_,
		parent_index: 0,
		slots: null_,
		childs: null_,
		dom,
		dom_first: dom
	});
}

/**
	get latest rerendering call time
	@return {number}
*/
export const now = () => (
	render_time
)

/**
	update dirty instances
*/
const rerender = () => {
	render_time = performance.now();
	rerender_pending = true;
	for (const instance of render_queue) {
		if (instance.dom !== null_) {
			instance_render(instance, null_, null_);

			DEBUG && (
				current = null_
			);
		}
		else {
			let dom_parent = null_;
			let dom_after = null_;
			let dom_first = instance.dom_first;
			let dom_parent_instance = instance;
			let instance2 = instance;

			while (
				(
					dom_parent = (
						dom_parent_instance = dom_parent_instance.iparent
					).dom
				) === null_
			) {}

			do {
				let index = instance2.parent_index;
				const {childs} = (
					instance2 = instance2.iparent
				);
				const childs_length = childs.length;

				while (
					++index < childs_length &&
					(
						childs[index] === null_ ||
						(
							dom_after = childs[index].dom_first
						) === null_
					)
				) {}
			}
			while (
				dom_after === null_ &&
				instance2 !== dom_parent_instance
			);

			instance_render(
				instance2 = instance,
				dom_parent,
				dom_after
			);

			DEBUG && (
				current = null_
			);
			
			if (dom_first !== instance2.dom_first)//TODO it better
			while (
				(
					instance2 = instance2.iparent
				).dom === null_
			) {
				dom_first = null_;
				for (const child of instance2.childs) {//TODO skip n items if possible
					if (
						child !== null_ &&
						(
							dom_first = child.dom_first
						) !== null_
					)
						break;
				}
				if (dom_first === instance2.dom_first) break;
				instance2.dom_first = dom_first;
			}
		}
	}
	rerender_pending = false;

	if (
		!rerender_requested &&
		render_queue_next.size > 0
	) {
		rerender_requested = true;
		requestAnimationFrame(rerender_next);
	}
}

/**
	rerender, only called by timeout/raf
*/
const rerender_next = () => {
	rerender_requested = false;

	//swap queues and clear the next one
	const tmp = render_queue;
	render_queue = render_queue_next;
	(
		render_queue_next = tmp
	).clear();

	rerender();
}


/// DOM COMPONENTS ///

/**
	use a dom component with props and childs
	@param {string} descriptor
	@param {TYPE_PROPS_DOM=} props
	@param {Array<TYPE_INSTANCE_CALL<*>>=} childs
	@return {TYPE_INSTANCE_CALL<TYPE_PROPS_DOM>}
*/
export const node_dom = (descriptor, props, childs) => (
	node(
		component_dom_get(descriptor),
		props,
		childs
	)
)

/**
	returns the described dom
	@param {string} descriptor
	@return {HTMLElement}
*/
const dom_get = descriptor => {
	let dom = dom_cache[descriptor];
	if (dom === undefined) {
		VERBOSE && log('dom create ' + descriptor);

		const index_sqb = descriptor.indexOf('[');
		const tag = (
			index_sqb < 0
			?	descriptor.substr(0)
			:	descriptor.substr(0, index_sqb)
		);
	
		DEBUG && (
			tag.length === 0 ||
			tag !== tag.toLowerCase() ||
			tag.includes(' ') ||
			tag.includes('#') ||
			tag.includes('.')
		) &&
			error('dom: invalid tag');
	
		dom_cache[descriptor] = dom = /** @type {HTMLElement} */ (
			document_.createElement(tag)
		);
	
		if (index_sqb > 0) {
			DEBUG &&
			!descriptor.endsWith(']') &&
				error('dom: ] missing');
	
			for (
				const sqbi of
				descriptor
				.substring(
					index_sqb + 1,
					descriptor.length - 1
				)
				.split('][')
			) {
				DEBUG &&
				!sqbi &&
					error('dom: empty attribute');
	
				DEBUG &&
				(
					sqbi.includes('[') ||
					sqbi.includes(']')
				) &&
					error('dom: attributes screwed up');
	
				const eqi = sqbi.indexOf('=');
	
				DEBUG &&
				sqbi.includes(' ') && (
					eqi < 0 ||
					sqbi.indexOf(' ') < eqi
				) &&
					error('dom: space in attribute name');
	
				eqi > 0
				?	dom[
						sqbi.substr(0, eqi)
					] =
						sqbi.substr(eqi + 1)
				:	dom[sqbi] = true;
			}
		}
	}
	return dom;
}

/**
	returns dom component for descriptor
	@param {string} descriptor
	@return {TYPE_COMPONENT_DOM}
*/
const component_dom_get = descriptor => {
	let component = component_dom_cache[descriptor];
	if (component === undefined) {
		const dom = dom_get(descriptor);
		/** @type {TYPE_COMPONENT_DOM} */
		component_dom_cache[descriptor] = component = props => (
			current_first && (
				current.dom = /** @type {HTMLElement} */ (
					dom.cloneNode(true)
				)
			),
			hook_dom_common(props),
			props !== null_ && props.C || null_
		);

		DEBUG && (
			component['name_'] = '$' + descriptor
		);
	}
	return component;
}
