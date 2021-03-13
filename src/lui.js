/**
	@preserve lui.js web frame work
	inspired by react and mithril
	L3P3.de 2021
*/

import {DEBUG, VERBOSE} from './flags.js';

const HOOK_EFFECT = DEBUG ? 0 : 1;
const HOOK_ASYNC = DEBUG ? 1 : 2;
const HOOK_STATE = DEBUG ? 2 : 0;
const HOOK_STATIC = DEBUG ? 3 : 0;
const HOOK_MAP = DEBUG ? 4 : 3;
const HOOK_MEMO = DEBUG ? 5 : 0;
const HOOK_PREV = DEBUG ? 6 : 0;
const HOOK_REDUCEA = DEBUG ? 7 : 0;
const HOOK_REDUCEF = DEBUG ? 8 : 0;
const HOOK_SUB = DEBUG ? 9 : 3;


/// COMPILATION ///

/**
	@typedef {function(?TYPE_PROPS):?Array<TYPE_INSTANCE_CALL_OPTIONAL>}
*/
var TYPE_COMPONENT;

/**
	@typedef {{
		component: TYPE_COMPONENT,
		props: ?TYPE_PROPS
	}}
*/
var TYPE_INSTANCE_CALL;

/**
	@typedef {TYPE_INSTANCE_CALL|*}
*/
var TYPE_INSTANCE_CALL_OPTIONAL;

/**
	@typedef {{
		icall: TYPE_INSTANCE_CALL,
		iparent: ?TYPE_INSTANCE,
		parent_index: number,
		slots: !Array<!Array>,
		childs: ?Array<?TYPE_INSTANCE>,
		dom: ?HTMLElement,
		dom_first: ?HTMLElement
	}}
*/
var TYPE_INSTANCE;

/**
	@typedef {!Set<TYPE_INSTANCE>}
*/
var TYPE_QUEUE;


/// STATE ///

/**
	currently rendered instance
	@type {?TYPE_INSTANCE}
*/
let current = null;

/**
	first instance_render call for current instance
	@type {boolean}
*/
let current_first = true;

/**
	state slots
	@type {?Array<Array>}
*/
let current_slots = current;

/**
	next state slot pointer
	@type {number}
*/
let current_slots_index = 0;

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
let rerender_pending = current_first;

/**
	is a rerender requested?
	@type {boolean}
*/
let rerender_requested = !current_first;


/// MAPS ///

/**
	descriptor to node cache, symbol "default value"
	@type {!Object<string, HTMLElement>}
	@dict
*/
const dom_cache = {};

/**
	descriptor to component cache
	@type {!Object<string, TYPE_COMPONENT>}
	@dict
*/
const component_dom_cache = {};


/// ALIAS ///

const null_ = current;
const undefined_ = void 0;
const true_ = current_first;
const false_ = rerender_requested;
const Array_ = Array;
const Object_ = Object;
const Object_assign = Object_.assign;
const Object_keys = Object_.keys;
const document_ = document;
export const window_ = window;
const performance_ = window_.performance || Date;


/// DEBUGGING ///

/**
	tries getting a component name
	@param {TYPE_INSTANCE} component
	@return {string}
*/
const instance_name_get = ({icall: {component}}) => (
	component === deps_comp
	?	'list'
	:	component['name_'] ||
		component.name ||
		'?'
)

/**
	gets the current stack
	@return {string}
*/
const stack_get = () => {
	const stack = [];
	let item = current_slots;
	if (item !== null_) {
		while (item[0][0] === null_) {
			stack.unshift(
				item[0].length === 5
				?	'hook_map:' + (
						typeof item[0][3] === 'object'
						?	item[0][3].id
						:	item[0][3]
					)
				:	'hook_sub'
			);
			item = item[0][1];
		}
		item = item[0][0];
	}
	let index = null_;
	while (item !== null_) {
		stack.unshift(
			instance_name_get(item) +
			(
				index !== null_
				?	':' + index
				:	''
			)
		);
		index = item.parent_index;
		item = item.iparent;
	}
	return (
		stack.join('>') ||
		'-'
	);
}

/**
	prints message
	@param {string} message
*/
const log = (message, ...items) => {
	console.log('lui ' + stack_get() + ': ' + message, ...items);
}

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
	checks for added/removed keys
	@param {Object<string, *>} a
	@param {Object<string, *>} b
*/
const assert_keys = (a, b) => {
	a !== b && (
		a === null_ ||
		b === null_ ||
		JSON.stringify(Object_keys(a)) !== JSON.stringify(Object_keys(b))
	) &&
		error('object keys mismatch');
}

/**
	ensures hook rules
	@param {?number} type
	@param {boolean} component only allowed directly in components
*/
const assert_hook = (type, component) => {
	current_slots === null_ &&
		error('hook called outside of hook context');

	current_slots = /** @type {!Array<Array>} */ (current_slots);

	component &&
	current_slots[0][0] === null &&
		error('hook called outside of component rendering');

	type !== null_ &&
	current_slots_index < current_slots.length &&
	current_slots[current_slots_index][0] !== type &&
		error('inconsistent hook order at #' + current_slots_index);
}

/**
	ensures that value does not change between renderings
	@param {*} value
*/
const assert_hook_equal = (value, description) => {
	assert_hook(null_, false_);

	value !== hook_prev(value, value) &&
		error(description + ' changed between renderings');
}


/// BASICS  ///

/**
	copies the current time
*/
const time_update = () => {
	render_time = performance_.now();
};

/**
	lists all changed properties
	@param {Object<string, *>} a
	@param {Object<string, *>} b
	@return {!Array<string>}
*/
const object_diff = (a, b) => (
	DEBUG && assert_keys(a, b),
	a === b
	?	[]
	:	Object_keys(/** @type {!Object} */ (a))
		.filter(key => a[key] !== b[key])
)

/**
	checks if objects are different
	@param {Object<string, *>} a
	@param {Object<string, *>} b
	@return {boolean}
*/
const object_comp = (a, b) => (
	DEBUG && assert_keys(a, b),
	a !== b &&
	Object_keys(/** @type {!Object} */ (a))
	.some(key => a[key] !== b[key])
)

/**
	checks if tuples are equal, symbol "node_map"
	@param {!Array} a
	@param {?Array} b
	@return {boolean}
*/
const deps_comp = (a, b) => {
	DEBUG && (
		b !== null_
		?	(
			b.length === 0 && error('deps empty'),
			a.length !== b.length && error('deps length changed')
		)
		:	a.length > 0 && error('deps presence changed')
	);

	if (b !== null_) {
		let i = a.length;
		do {
			if (a[--i] === b[i]) continue;
			return false_;
		}
		while (i > 0);
	}
	return true_;
}


/// INSTANCES ///

/**
	update current instance
	@param {?HTMLElement} dom_parent
	@param {?HTMLElement} dom_first
*/
const instance_render = (dom_parent, dom_first) => {
	const instance = /** @type {TYPE_INSTANCE} */ (current);
	const dom_after = dom_first;
	current_slots = instance.slots;
	current_slots_index = 1;

	VERBOSE && log('instance_render' + (current_first ? ' first' : ''));
	render_queue.delete(instance);

	// not node_map?
	if (instance.icall.component !== deps_comp) {
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

			const instance_childs = /** @type {Array<?TYPE_INSTANCE>} */ (
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
					child_call !== true_
				) {
					child_call = /** @type {TYPE_INSTANCE_CALL} */ (child_call);

					DEBUG &&
					child !== null_ &&
					child.icall.component !== child_call.component &&
						error('child replaced at ' + childs_index);

					if (
						current_first =
						child === null_
					) {
						instance_childs[childs_index] = current = child = {
							icall: child_call,
							iparent: instance,
							parent_index: childs_index,
							slots: [],
							childs: null_,
							dom: null_,
							dom_first: null_
						};
						child.slots[0] = [child];

						instance_render(
							dom_parent,
							dom_first
						);

						child.dom !== null_ &&
							dom_parent.insertBefore(
								child.dom_first = child.dom,
								dom_first
							);
					}
					else if (
						object_comp(
							child.icall.props,
							child_call.props
						)
					) {
						(
							current = child
						).icall = child_call;

						instance_render(
							dom_parent,
							dom_first
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
	// node_map?
	else {
		const {
			component,
			list_data,
			props
		} = instance.icall.props;

		DEBUG && (
			(
				typeof list_data !== 'object' ||
				list_data === null_ ||
				typeof list_data.length !== 'number'
			) &&
				error('list_data must be an array'),
			typeof props !== 'object' &&
				error('props must be an object'),
			assert_hook_equal(component, 'item component'),
			assert_hook_equal(props === null_, 'props presence')
		);

		let items_index = list_data.length;
		const items_map = {};
		const items_order = [];
		const items_objects = (
			items_index > 0 &&
			list_data_index(list_data, items_map, items_order)
		);

		DEBUG &&
		items_index === 0 &&
			hook_static();

		const item_map = hook_static();
		const items_order_prev = hook_prev(items_order);
		const props_prev = (
			props === null_
			?	null_
			:	hook_prev(props)
		);
		const props_changed = (
			current_first ||
			object_comp(
				props,
				props_prev
			)
		);

		VERBOSE && !current_first && props_changed && log('childs modify', object_diff(props_prev, props));

		// remove items
		if (!current_first)
		for (const key of items_order_prev) {
			if (key in items_map) continue;
			instance_unmount(item_map[key], dom_parent);
			delete item_map[key];
		}

		// insert/reinsert all items
		const childs = instance.childs = new Array_(items_index);
		while (items_index > 0) {
			const key = items_order[--items_index];
			let child = item_map[key];
			if (
				current_first =
				child === undefined_
			) {
				VERBOSE && log('child add: ' + key);

				item_map[key] = current = child = {
					icall: {
						component,
						props: (
							props === null_
							?	{
									I: items_map[key]
								}
							:	Object_assign({
									I: items_map[key]
								}, props)
						)
					},
					iparent: instance,
					parent_index: items_index,
					slots: [],
					childs: null_,
					dom: null_,
					dom_first: null_
				}
				child.slots[0] = [child];

				instance_render(
					dom_parent,
					dom_first
				);

				child.dom !== null_ &&
					dom_parent.insertBefore(
						child.dom_first = child.dom,
						dom_first
					);
			}
			else {
				child.parent_index !== items_index && (
					instance_reinsert(child, dom_parent, dom_first),
					child.parent_index = items_index
				);

				if (
					props_changed ||
					items_objects &&
						object_comp(
							items_map[key],
							child.icall.props.I
						)
				) {
					(
						current = child
					).icall.props = (
						props === null_
						?	{
								I: items_map[key]
							}
						:	Object_assign({
								I: items_map[key]
							}, props)
					);

					instance_render(
						dom_parent,
						dom_first
					);
				}
			}

			(
				childs[items_index] = child
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
	@param {TYPE_INSTANCE} instance
	@param {?HTMLElement} dom_parent
*/
const instance_unmount = (instance, dom_parent) => {
	VERBOSE && log('instance_unmount ' + instance_name_get(instance));

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

	hooks_unmount(instance.slots);

	render_queue.delete(instance);
	render_queue_next.delete(instance);
}

/**
	unmount all hooks in context
	@param {!Array<!Array>} slots
*/
const hooks_unmount = slots => {
	let slot, slots_index = slots.length;
	while (slots_index > 1) {
		switch (
			(
				slot = slots[--slots_index]
			)[0]
		) {
			case HOOK_EFFECT:
				slot[2] !== null_ &&
					slot[2](slot[1]);
				break;
			case HOOK_ASYNC:
				slot[1] = null_;
				break;
			case HOOK_SUB:
				hooks_unmount(slot[4]);
				break;
			case HOOK_MAP:
				hook_map_unmount(slot);
			default:
		}
	}
}

/**
	generate map and order list from data list
	@template T
	@param {!Array<T>} list_data must not be empty
	@param {!Object<(string|number),T>} items_map
	@param {!Array<(string|number)>} items_order
	@return {boolean}
*/
const list_data_index = (list_data, items_map, items_order) => {
	const items_objects = typeof list_data[0] === 'object';

	if (DEBUG) {
		const item_type_ref = hook_static();

		if (item_type_ref.val) {
			list_data[0] !== null_ &&
			typeof list_data[0] === item_type_ref.val ||
				error('item type changed');

			items_objects &&
			typeof list_data[0].id !== item_type_ref.val_id &&
				error('item id type changed');
		}
		else {
			list_data[0] !== null_ &&
			['object', 'string', 'number']
			.includes(
				item_type_ref.val = typeof list_data[0]
			) ||
				error('item type invalid');

			items_objects &&
			!['string', 'number']
			.includes(
				item_type_ref.val_id = typeof list_data[0].id
			) &&
				error('item id type invalid');
		}
	}

	for (const item of list_data) {
		DEBUG && (
			item === null_ &&
				error('item is null'),
			typeof item !== typeof list_data[0] &&
				error('item type changed'),
			items_objects &&
			typeof item.id !== typeof list_data[0].id &&
				error('item id type changed')
		);

		const key = (
			items_objects
			?	item.id
			:	item
		);

		DEBUG &&
		key in items_map &&
			error('item key not unique: ' + key);

		items_map[key] = item;
		items_order.push(key);
	}

	return items_objects;
}

/**
	reinsert all dom nodes of an instance
	@param {TYPE_INSTANCE} instance
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
	return instance for slots
	@param {!Array<!Array>} slots
	@return {TYPE_INSTANCE}
*/
const instance_current_get = slots => {
	while (slots[0][0] === null_) {
		slots = slots[0][1];
	}
	return slots[0][0];
}

/**
	dirtify parent hooks and return instance, return null if already dirty
	@param {!Array<!Array>} slots
	@return {?TYPE_INSTANCE}
*/
const dirtup = slots => {
	while (slots[0][0] === null_) {
		if (!slots[0][2][5]) {
			return null_;
		}
		slots[0][2][5] = false_;
		slots = slots[0][1];
	}
	return slots[0][0];
}

/**
	request rerendering for subs and instance
	@param {!Array<!Array>} slots
*/
const dirtify = slots => {
	const instance = dirtup(slots);

	if (instance !== null_) {
		VERBOSE &&
		!render_queue.has(/** @type {TYPE_INSTANCE} */ (instance)) &&
			log('dirtify ' + instance_name_get(/** @type {TYPE_INSTANCE} */ (instance)));

		render_queue.add(/** @type {TYPE_INSTANCE} */ (instance));
		//TODO order

		rerender_pending ||
			rerender();
	}
}


/// HOOKS ///

/**
	request rerendering for current instance
*/
export const hook_rerender = () => {
	DEBUG && assert_hook(null_, false_);

	const instance = dirtup(/** @type {!Array<!Array>} */ (current_slots));

	if (instance !== null_) {
		VERBOSE &&
		!render_queue_next.has(/** @type {TYPE_INSTANCE} */ (instance)) &&
			log('hook_rerender ' + instance_name_get(/** @type {TYPE_INSTANCE} */ (instance)));

		render_queue_next.add(/** @type {TYPE_INSTANCE} */ (instance));
	}
}

/**
	get if this is the first instance_render call
	@return {boolean}
*/
export const hook_first = () => (
	DEBUG && assert_hook(null_, false_),
	current_first
)

/**
	interrupts if condition is not met
	@param {boolean=} condition
*/
export const hook_assert = condition => {
	DEBUG && assert_hook(null_, false_);

	if (!condition) throw dom_cache;
}

/**
	fire an effect on deps change
	@param {function():(void|function():void)} effect
	@param {?Array=} deps
*/
export const hook_effect = (effect, deps) => {
	DEBUG && assert_hook(HOOK_EFFECT, false_);

	if (current_slots_index < current_slots.length) {
		const slot = current_slots[current_slots_index++];
		if (!deps_comp(slot[1], deps || null_)) {
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
		current_slots[current_slots_index++] = [
			HOOK_EFFECT,
			deps = deps || [],
			effect(...deps) || null_
		];
	}

	DEBUG &&
	current_slots[current_slots_index - 1][2] &&
	current_slots[current_slots_index - 1][2].then &&
		error('effect function must be synchronous, use hook_async instead');
}

/**
	request value on deps change
	@template T
	@param {function(...*):Promise<T>} getter
	@param {?Array=} deps
	@param {T=} fallback
	@return {?T}
*/
export const hook_async = (getter, deps, fallback) => {
	DEBUG && assert_hook(HOOK_ASYNC, false_);

	const slot = (
		current_slots_index < current_slots.length
		?	current_slots[current_slots_index++]
		:	(
			current_slots[current_slots_index++] = [
				HOOK_ASYNC,
				null_,
				null_
			]
		)
	);

	if (
		slot[1] !== null_ &&
		deps_comp(slot[1], deps || null_)
	) {
		return slot[2];
	}

	VERBOSE && log('async start', deps);

	fallback !== undefined_ && (
		slot[2] = fallback
	);

	const current_slots_ = /** @type {!Array<!Array>} */ (current_slots);
	getter(
		...(
			slot[1] = deps =
				deps || []
		)
	)
	.then(value => {
		VERBOSE && log('async ' + instance_name_get(instance_current_get(current_slots_)), value);
		if (
			slot[2] === value ||
			slot[1] !== deps
		) return;
		slot[2] = value;
		dirtify(current_slots_);
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
	DEBUG && assert_hook(HOOK_STATE, false_);

	if (current_slots_index < current_slots.length) {
		return current_slots[current_slots_index++][1];
	}

	const current_slots_ = /** @type {!Array<!Array>} */ (current_slots);
	/** @type [T, function(T):void, function():T] */
	const slot = [
		initial,
		value => {
			VERBOSE && log('state ' + instance_name_get(instance_current_get(current_slots_)), value);
			if (slot[0] === value) return;
			slot[0] = value;
			dirtify(current_slots_);
		},
		() => slot[0]
	];
	current_slots[current_slots_index++] = [HOOK_STATE, slot];
	return slot;
}

/**
	get persistent constant
	@template T
	@param {T=} value
	@return {T}
*/
export const hook_static = value => {
	DEBUG && assert_hook(HOOK_STATIC, false_);

	return (
		current_slots_index < current_slots.length
		?	current_slots[current_slots_index++]
		:	(
			current_slots[current_slots_index++] = [
				HOOK_STATIC,
				value === undefined_ ? {} : value
			]
		)
	)[1];
}

/**
	update value on deps change
	@template T
	@param {function(...*):T} getter
	@param {?Array=} deps
	@return {T}
*/
export const hook_memo = (getter, deps) => {
	DEBUG && assert_hook(HOOK_MEMO, false_);

	if (current_slots_index < current_slots.length) {
		const slot = current_slots[current_slots_index++];
		return (
			deps_comp(slot[1], deps || null_)
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
	current_slots[current_slots_index++] = [HOOK_MEMO, deps, value];
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
	DEBUG && assert_hook(HOOK_PREV, false_);

	if (current_slots_index < current_slots.length) {
		const slot = current_slots[current_slots_index++];
		const prev = slot[1];
		slot[1] = value;
		return prev;
	}

	current_slots[current_slots_index++] = [HOOK_PREV, value];
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
			expired_set(true_);
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
	const [expired, expired_set] = hook_state(false_);
	hook_effect(
		hook_delay_effect,
		[delay, expired_set]
	);
	return expired;
}

/**
	dynamic hook block
	@template T
	@param {function(...*):T} getter
	@param {?Array=} deps
	@return {?T}
*/
export const hook_sub = (getter, deps) => {
	DEBUG && assert_hook(HOOK_SUB, false_);

	let slot = null_;

	if (current_slots_index++ < current_slots.length) {
		if (
			(
				slot = /** @type{!Array} */ (current_slots[current_slots_index - 1])
			)[1] !== getter
		) {
			VERBOSE && log('sub getter change', deps);
			hooks_unmount(slot[4]);
			slot = null_;
		}
		else if (
			slot[5] &&
			deps_comp(slot[2], deps || null_)
		) {
			return slot[3];
		}
		else if (VERBOSE) {
			slot[5]
			?	log('sub deps change', deps)
			:	log('sub dirty', deps);
		}
	}
	else {
		VERBOSE && log('sub initial', deps);
	}

	const current_first_before = current_first;
	const current_slots_before = current_slots;
	const current_slots_index_before = current_slots_index;
	deps = deps || [];

	if (
		current_first =
		slot === null_
	) {
		current_slots[current_slots_index - 1] = slot = [
			HOOK_SUB,
			getter,
			deps,
			null_,//value
			[],//slots
			true_//clean
		];
		slot[4][0] = [null_, current_slots, slot];
	}
	else {
		slot[2] = deps;
		slot[5] = true_;
	}

	current_slots = slot[4];
	current_slots_index = 1;

	try {
		slot[3] = getter(
			...deps
		);
	}
	catch (thrown) {
		if (
			DEBUG &&
			thrown !== dom_cache
		) throw thrown;
	}

	current_first = current_first_before;
	current_slots = current_slots_before;
	current_slots_index = current_slots_index_before;

	return slot[3];
}

/**
	dynamic hook blocks for each item
	@template T
	@template U
	@param {function(U, ...*):T} getter
	@param {!Array<U>} list_data
	@param {?Array=} deps
	@return {!Array<T>}
*/
export const hook_map = (getter, list_data, deps) => {
	DEBUG && assert_hook(HOOK_MAP, false_);

	let slot = null_;
	let dirty = true_;

	if (current_slots_index++ < current_slots.length) {
		if (
			(
				slot = /** @type{!Array} */ (current_slots[current_slots_index - 1])
			)[1] !== getter
		) {
			VERBOSE && log('map getter change', deps);
			hook_map_unmount(slot);
			slot = null_;
		}
		else if (
			slot[5] &&
			list_data === slot[7] &&
			deps_comp(slot[2], deps || null_)
		) {
			return slot[3];
		}
		else if (VERBOSE) {
			slot[5]
			?	log('map deps/data change', deps)
			:	log('map dirty', deps);
		}
	}
	else {
		VERBOSE && log('map initial', deps);
	}

	deps = deps || [];

	if (slot === null_) {
		current_slots[current_slots_index - 1] = slot = [
			HOOK_MAP,
			getter,
			deps,
			[],//values
			[],//items order
			true_,//clean
			{},//items map
			list_data
		];
	}
	else {
		dirty = !slot[5];
		slot[2] = deps;
		slot[3] = [];
		slot[5] = true_;
		slot[7] = list_data;
	}

	DEBUG &&
	list_data.length === 0 &&
		hook_static();

	const items_data_map = {};
	const items_order = [];
	const items_objects = (
		list_data.length > 0 &&
		list_data_index(list_data, items_data_map, items_order)
	);

	const items_slots_map = slot[6];
	const current_first_before = current_first;
	const current_slots_before = current_slots;
	const current_slots_index_before = current_slots_index;

	// remove items
	for (const key of slot[4]) {
		if (key in items_data_map) continue;
		VERBOSE && log('map item remove: ' + key);
		hooks_unmount(items_slots_map[key]);
		delete items_slots_map[key];
	}

	// run/rerun all items
	for (const key of items_order) {
		let slots = items_slots_map[key];
		if (
			current_first =
			slots === undefined_
		) {
			VERBOSE && log('map item add: ' + key);

			items_slots_map[key] = slots = [[
				null_,
				current_slots_before,
				slot,
				null_,//data
				null_//result
			]];
		}

		slots = /** @type {!Array<Array>} */ (slots);

		if (
			dirty ||
			current_first || (
				items_objects
				?	object_comp(
						items_data_map[key],
						slots[0][3]
					)
				:	items_data_map[key] !== slots[0][3]
			)
		) {
			current_slots = slots;
			current_slots_index = 1;

			try {
				slots[0][4] = getter(
					slots[0][3] = items_data_map[key],
					...deps
				);
			}
			catch (thrown) {
				if (
					DEBUG &&
					thrown !== dom_cache
				) throw thrown;
			}

			DEBUG && (
				current_slots = current_slots_before
			);
		}
		slot[3].push(slots[0][4]);
	}

	current_first = current_first_before;
	current_slots = current_slots_before;
	current_slots_index = current_slots_index_before;

	slot[4] = items_order;
	return slot[3];
}

/**
	umount all contained hooks
	@param {!Array} slot
*/
const hook_map_unmount = slot => {
	for (const key of slot[4])
		hooks_unmount(slot[6][key]);
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
	@param {!Object<string, *>} object
	@return {!Array<string>} keys
*/
export const hook_object_changes = object => {
	const prev = hook_prev(object);
	return (
		current_first
		?	Object_keys(object)
		:	object_diff(prev, object)
	);
}

/**
	get persitent state with custom reducer list
	@template T
	@param {Array<function(T=, ...*):T>} reducer
	@return {[T, function(number, *):void]}
*/
export const hook_reducer = reducer => {
	DEBUG && assert_hook(HOOK_REDUCEA, false_);

	DEBUG &&
	typeof reducer === 'function' &&
		error('array required, use hook_reducer_f instead');

	if (current_slots_index < current_slots.length)
		return current_slots[current_slots_index++][1];

	const current_slots_ = /** @type {!Array<!Array>} */ (current_slots);
	/** @type {[T, function(number, *):void]} */
	const slot = [
		reducer[0](),
		(cmd, payload) => {
			VERBOSE && log('reducer ' + instance_name_get(instance_current_get(current_slots_)) + ' -> #' + cmd, payload);
			const value = reducer[cmd](slot[0], payload);
			if (slot[0] === value) return;
			slot[0] = value;
			dirtify(current_slots_);
		}
	];
	current_slots[current_slots_index++] = [HOOK_REDUCEA, slot];
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
	DEBUG && assert_hook(HOOK_REDUCEF, false_);

	DEBUG &&
	typeof reducer !== 'function' &&
		error('function required');

	if (current_slots_index < current_slots.length)
		return current_slots[current_slots_index++][1];

	const current_slots_ = /** @type {!Array<!Array>} */ (current_slots);
	/** @type {[T, function(U=):void]} */
	const slot = [
		(
			initializer
			?	initializer()
			:	null_
		),
		payload => {
			VERBOSE && log('reducer ' + instance_name_get(instance_current_get(current_slots_)), payload);
			const value = reducer(slot[0], payload);
			if (slot[0] === value) return;
			slot[0] = value;
			dirtify(current_slots_);
		}
	];
	current_slots[current_slots_index++] = [HOOK_REDUCEF, slot];
	return slot;
}

/**
	syncs dom attributes
	@param {?TYPE_PROPS} attributes
	@return {HTMLElement}
*/
const hook_dom_common = attributes => {
	DEBUG &&
		assert_hook_equal(attributes === null_, 'attributes presence');
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
						Object_keys(
							/** @type {!Object} */ (attributes.F)
						)
						.filter(key => attributes.F[key])
						.join(' ')
					);

					VERBOSE && log('dom flags', dom.className.split(' '));

					continue;
				case 82://R
					DEBUG &&
					typeof attributes.R !== 'function' &&
						error('invalid ref');

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
			assert_hook_equal(!attributes.S, 'style presence');
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
	@param {TYPE_PROPS=} attributes
	@return {HTMLElement}
*/
export const hook_dom = (descriptor, attributes) => (
	DEBUG && (
		assert_hook(null_, true_),
		current = /** @type {TYPE_INSTANCE} */ (current),
		current.dom === null_
		?	current_first || error('hook_dom skipped before')
		:	current_first && error('hook_dom called twice'),
		attributes !== undefined_ && (
			attributes.C !== undefined_ &&
				error('hook_dom cannot have childs'),
			attributes.R !== undefined_ &&
				error('hook_dom cannot have a ref')
		)
	),
	current_first && (
		current.dom = /** @type {HTMLElement} */ (
			dom_get(descriptor)
			.cloneNode(true_)
		)
	),
	hook_dom_common(attributes || null_)
)


/// INTERFACE ///

/**
	use a component with props and childs
	@param {TYPE_COMPONENT} component
	@param {?TYPE_PROPS=} props
	@param {Array<TYPE_INSTANCE_CALL_OPTIONAL>=} childs
	@return {TYPE_INSTANCE_CALL}
*/
export const node = (component, props, childs) => (
	DEBUG && (
		typeof component === 'string' &&
			error('component expected, use node_dom instead'),
		childs !== undefined_ && (
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
					?	/** @type {TYPE_PROPS} */ ({C: childs})
					:	null_
				)
		)
	}
)

/**
	create/use a component with props for each list item
	@param {TYPE_COMPONENT} component
	@param {Array<TYPE_LIST_ITEM>} list_data
	@param {TYPE_PROPS=} props
	@return {TYPE_INSTANCE_CALL}
*/
export const node_map = (component, list_data, props) => (
	node(
		/** @type {TYPE_COMPONENT} */ (deps_comp),
		{
			component,
			list_data,
			props: props || null_
		}
	)
)

/**
	mounts the body component
	@param {function():[?TYPE_PROPS, Array<TYPE_INSTANCE_CALL_OPTIONAL>]} body
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

	/**
		@type {TYPE_COMPONENT}
	*/
	const component = () => (
		DEBUG && (
			(
				!(
					result = body()
				) ||
				result.length !== 2
			) && error('root component must return [props, childs]'),
			assert_hook_equal(result[0] === null_, 'attributes presence'),
			result[0] !== null_ && (
				typeof result[0] !== 'object' &&
					error('invalid props type'),
				assert_keys(
					hook_prev(result[0], result[0]),
					result[0]
				),
				result[0].C !== undefined_ &&
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

	current = {
		icall: {
			component,
			props: null_
		},
		iparent: null_,
		parent_index: 0,
		slots: [],
		childs: null_,
		dom,
		dom_first: dom
	};
	current.slots[0] = [current];

	time_update();

	instance_render(null_, null_);

	rerender();
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
	time_update();
	rerender_pending = true_;
	for (current of render_queue) {
		current_first = false_;
		if (current.dom !== null_) {
			instance_render(null_, null_);
		}
		else {
			let dom_parent = null_;
			let dom_after = null_;
			let dom_first = current.dom_first;
			let dom_parent_instance = current;
			let instance = current;

			while (
				(
					dom_parent = (
						dom_parent_instance = dom_parent_instance.iparent
					).dom
				) === null_
			) {}

			do {
				let index = instance.parent_index;
				const {childs} = (
					instance = instance.iparent
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
				instance !== dom_parent_instance
			);

			instance = current;

			instance_render(
				dom_parent,
				dom_after
			);
			
			if (instance.dom_first !== dom_first)//TODO it better
			while (
				(
					instance = instance.iparent
				).dom === null_
			) {
				dom_first = null_;
				for (const child of instance.childs) {//TODO skip n items if possible
					if (
						child !== null_ &&
						(
							dom_first = child.dom_first
						) !== null_
					)
						break;
				}
				if (dom_first === instance.dom_first) break;
				instance.dom_first = dom_first;
			}
		}
	}
	rerender_pending = false_;

	DEBUG && (
		current = current_slots = null_
	);

	if (
		!rerender_requested &&
		render_queue_next.size > 0
	) {
		rerender_requested = true_;
		requestAnimationFrame(rerender_next);
	}
}

/**
	rerender, only called by timeout/raf
*/
const rerender_next = () => {
	rerender_requested = false_;

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
	@param {?TYPE_PROPS=} props
	@param {Array<TYPE_INSTANCE_CALL_OPTIONAL>=} childs
	@return {TYPE_INSTANCE_CALL}
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
	if (dom === undefined_) {
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
				:	dom[sqbi] = true_;
			}
		}
	}
	return dom;
}

/**
	returns dom component for descriptor
	@param {string} descriptor
	@return {TYPE_COMPONENT}
*/
const component_dom_get = descriptor => {
	let component = component_dom_cache[descriptor];
	if (component === undefined_) {
		const dom = dom_get(descriptor);
		/**
			@type {TYPE_COMPONENT}
		*/
		component_dom_cache[descriptor] = component = props => (
			current = /** @type {TYPE_INSTANCE} */ (current),
			current_first && (
				current.dom = /** @type {HTMLElement} */ (
					dom.cloneNode(true_)
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

DEBUG && (
	window_.onerror = () => (
		current !== null_ &&
			log('error'),
		render_queue.clear(),
		render_queue_next.clear()
	)
);
