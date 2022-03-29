/**
	@preserve lui.js web frame work
	inspired by react and mithril
	L3P3.de 2022
*/

import {
	DEBUG,
	VERBOSE,
	LEGACY,
	RJS,
} from './flags.js';


/// COMPILATION ///

/**
	type of hook instance
	@enum {number}
*/
const HOOK = {
	HEAD_INSTANCE: /** @type {number} */ ( VERBOSE ? 'HEAD_INSTANCE' : 0),
	HEAD_MAP: /** @type {number} */ ( VERBOSE ? 'HEAD_MAP' : 1),
	HEAD_SUB: /** @type {number} */ ( VERBOSE ? 'HEAD_SUB' : 2),
	EFFECT: /** @type {number} */ ( VERBOSE ? 'EFFECT' : DEBUG ? 3 : 1),
	ASYNC: /** @type {number} */ ( VERBOSE ? 'ASYNC' : DEBUG ? 4 : 2),
	STATE: /** @type {number} */ ( VERBOSE ? 'STATE' : DEBUG ? 5 : 0),
	STATIC: /** @type {number} */ ( VERBOSE ? 'STATIC' : DEBUG ? 6 : 0),
	MAP: /** @type {number} */ ( VERBOSE ? 'MAP' : DEBUG ? 7 : 3),
	MEMO: /** @type {number} */ ( VERBOSE ? 'MEMO' : DEBUG ? 8 : 0),
	PREV: /** @type {number} */ ( VERBOSE ? 'PREV' : DEBUG ? 9 : 0),
	REDUCEA: /** @type {number} */ ( VERBOSE ? 'REDUCEA' : DEBUG ? 10 : 0),
	REDUCEF: /** @type {number} */ ( VERBOSE ? 'REDUCEF' : DEBUG ? 11 : 0),
	SUB: /** @type {number} */ ( VERBOSE ? 'SUB' : DEBUG ? 12 : 4),
}

/**
	@typedef {{
		htype: HOOK,
		slots: TYPE_SLOTS,
		hslot: TYPE_SLOT,
		hparent: TYPE_SLOTS,
		hinstance: TYPE_INSTANCE,
		deps_comp: ?TYPE_DEPS_COMP,
		deps: !Array,
		unmount: ?function(...?):void,
		hvalue: *,
		getter: function(...?):*,
		list_data: TYPE_LIST,
		item_data: TYPE_LIST_ITEM,
		items_order: !Array<string|number>,
		items_map: !Object<string|number, TYPE_SLOTS>,
	}}
*/
var TYPE_SLOT;

/**
	@typedef {!Array<TYPE_LIST_ITEM>}
*/
var TYPE_LIST;

/**
	@typedef {!Array<TYPE_SLOT>}
*/
var TYPE_SLOTS;

/**
	@typedef {function(!Array, !Array):boolean}
*/
var TYPE_DEPS_COMP;

/**
	@typedef {function(!Object, !Object):boolean}
*/
var TYPE_OBJ_COMP;

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
		props_comp: ?TYPE_OBJ_COMP,
		iparent: ?TYPE_INSTANCE,
		ilevel: number,
		parent_index: number,
		slots: !Array<TYPE_SLOT>,
		childs: ?Array<?TYPE_INSTANCE>,
		dom: ?HTMLElement,
		dom_first: ?HTMLElement,
		dirty: boolean,
	}}
*/
var TYPE_INSTANCE;


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
let current_first = !current;

/**
	state slots
	@type {?Array<TYPE_SLOT>}
*/
let current_slots = current;

/**
	next state slot pointer
	@type {number}
*/
let current_slots_index = 0;

/**
	relative time of the last render call
	@type {number}
*/
let render_time = 0;

/**
	pending animation frame request or 0
	@type {number}
*/
let rerender_requested = 0;

/**
	no synchronous rerendering?
	@type {boolean}
*/
let rerender_deferred = current_first;

/**
	instances that should be rerendered in this frame
	@type {!Array<Array<TYPE_INSTANCE>>}
*/
let render_queue = [];

/**
	instances that should be rerendered in the next frame
	@type {!Array<Array<TYPE_INSTANCE>>}
*/
let render_queue_next = [];


/// MAPS ///

/**
	descriptor to node cache, symbol "default value"
	@type {!Object<string, HTMLElement>}
*/
const dom_cache = {};

/**
	descriptor to component cache
	@type {!Object<string, TYPE_COMPONENT>}
*/
const component_dom_cache = {};

/**
	functions for set of keys saying if objects are different
	@type {Object<string, TYPE_OBJ_COMP>}
*/
const object_comp_functions = {};

/**
	functions for saying if arrays are different
	@type {Array<TYPE_DEPS_COMP>}
*/
const deps_comp_functions = [];


/// ALIAS ///

const Array_empty = [];
const null_ = current;
const undefined_ = void 0;
const true_ = current_first;
const false_ = !current_first;
const regexp_uppercase = /[A-Z]/g;
const Array_ = Array;
const Object_ = Object;
const Object_assign = /** @type {function(!Object, ...(?Object|void)):!Object} */ (
	LEGACY
	?	(
		Object_.assign || (
			Object_.assign =
			function(result) {
				for (
					var sources = arguments,
						length = sources.length,
						index = 0,
						item, key;
					++index < length;
				) {
					if (item = sources[index])
					for (key in item) {
						result[key] = item[key];
					}
				}
				return result;
			}
		)
	)
	:	Object_.assign
);
const Object_keys = /** @type {function(!Object):!Array<string>} */ (
	LEGACY
	?	(
		Object_.keys || (
			Object_.keys =
			function(object) {
				var result = [];
				for (var key in object) {
					result.push(key);
				}
				return result;
			}
		)
	)
	:	Object_.keys
);
const setTimeout_ = setTimeout;
const clearTimeout_ = clearTimeout;
const document_ = document;
export const window_ = window;
const Date_ = (
	LEGACY
	?	Date
	:	window_.performance || Date
);


/// DEBUGGING ///

/**
	tries getting a component name
	@param {TYPE_INSTANCE} component
	@return {string}
	@noinline
*/
const instance_name_get = ({icall: {component}}) => (
	component === object_comp_get
	?	'list'
	:	component['name_'] ||
		component.name ||
		'?'
)

/**
	gets the current stack
	@return {string}
	@noinline
*/
const stack_get = () => {
	const stack = [];
	let item = current_slots;
	let index = null_;
	if (item) {
		stack.unshift('$' + (current_slots_index - 1));
		while (item[0].htype !== HOOK.HEAD_INSTANCE) {
			stack.unshift(
				item[0].htype === HOOK.HEAD_MAP
				?	`hook_map[${
						typeof item[0].item_data === 'object'
						?	item[0].item_data.id
						:	item[0].item_data
					}]`
				:	'hook_sub'
			);
			item = item[0].hparent;
		}
		item = item[0].hinstance;
	}
	item = /** @type {?TYPE_INSTANCE} */ (item);
	while (item) {
		stack.unshift(
			instance_name_get(item) +
			(
				index
				?	':' + index
				:	''
			)
		);
		index = item.parent_index;
		item = item.iparent;
	}
	return (
		stack.join('/') ||
		'-'
	);
}

/**
	wrapper for reuse
	@noinline
*/
const log_raw = (...args) => {
	console.log(...args);
}

/**
	prints message
	@param {string} message
	@noinline
*/
const log = (message, ...items) => {
	log_raw('lui ' + stack_get() + ': ' + message, ...items);
}

/**
	throws a lui error
	@param {string} message
	@throws {Error}
	@noinline
*/
const error = message => {
	throw(
		new Error('lui: ' + message)
	);
}

/**
	print callback error with cached stack
	@noinline
*/
const callback_error = stack => {
	log_raw('lui ' + stack + ': error in callback');
};

/**
	catches and logs errors caught in callbacks
	@param {Function} fn
	@param {!Array} args
	@param {string} stack
	@noinline
*/
const callback_wrap = (fn, args, stack) => {
	try {
		return fn(...args);
	}
	catch (thrown) {
		callback_error(stack);
		throw thrown;
	}
}

/**
	checks for added/removed keys
	@param {Object} a
	@param {Object} b
*/
const assert_keys = (a, b) => {
	a !== b && (
		!a ||
		!b ||
		JSON.stringify(Object_keys(a)) !== JSON.stringify(Object_keys(b))
	) &&
		error('object keys mismatch');
}

/**
	ensures hook rules
	@param {?HOOK} type
	@param {boolean} component only allowed directly in components
	@param {?Array|void} deps
	@noinline
*/
const assert_hook = (type, component, deps) => {
	current_slots ||
		error('hook called outside of hook context');

	deps && (
		deps.constructor !== Array_ &&
			error('deps must be in an array'),
		deps.length === 0 &&
			error('deps must not be empty')
	);

	current_slots = /** @type {!Array<TYPE_SLOT>} */ (current_slots);

	component &&
	current_slots[0].htype !== HOOK.HEAD_INSTANCE &&
		error('hook called outside of component rendering');

	type !== null_ &&
	current_slots_index < current_slots.length && (
		current_slots[current_slots_index].htype !== type &&
			error('inconsistent hook order'),
		current_slots[current_slots_index].deps &&
			assert_hook_deps(
				current_slots[current_slots_index].deps,
				deps
			)
	);
}

/**
	ensures that value does not change between renderings
	@param {*} value
	@param {string} description
*/
const assert_hook_equal = (value, description) => {
	assert_hook(null_, false_, null_);

	value !== hook_prev(value, value) &&
		error(description + ' changed between renderings');
}

/**
	ensures deps rules
	@param {!Array} a
	@param {(?Array|void)} b
	@noinline
*/
const assert_hook_deps = (a, b) => (
	b
	?	a.length !== b.length && error('deps length changed')
	:	a.length > 0 && error('deps presence changed')
)


/// BASICS  ///

/**
	reused code for generating compare functions
	@param {!Array<string>} checks
	@return {TYPE_DEPS_COMP|TYPE_OBJ_COMP}
	@noinline
*/
const comp_generate = checks => (
	new Function('a', 'b',
		`return a!==b&&(${
			checks.join('||')
		})`
	)
)

/**
	gets or generates a compare function for keys, true if different
	also used as a symbol for node_map
	@param {!Object} object
	@return {TYPE_OBJ_COMP}
	@noinline
*/
const object_comp_get = object => {
	const key = (
		object = Object_keys(object)
	).join(',');

	return (
		object_comp_functions[key] ||
		(
			DEBUG && (
				object.length === 0 &&
					error('object empty'),
				object.some(key =>
					(
						key.includes('-') ||
						'0123456789'.includes(key.charAt(0))
					) &&
						error('invalid key: ' + key)
				)
			),
			VERBOSE && log('object_comp_get: ' + key),

			object_comp_functions[key] =
			/** @type {TYPE_OBJ_COMP} */ (
				comp_generate(
					object
					.map(key => `a.${ key }!==b.` + key)
				)
			)
		)
	);
}

/**
	lists all changed properties
	@param {!Object} a
	@param {!Object} b
	@return {!Array<string>}
*/
const object_diff = (a, b) => (
	DEBUG && assert_keys(a, b),
	a === b
	?	Array_empty
	:	Object_keys(/** @type {!Object} */ (a))
		.filter(key => a[key] !== b[key])
)

/**
	gets or generates a compare function for n-array, true if different
	@param {?Array|void} deps
	@return {?TYPE_DEPS_COMP}
	@noinline
*/
const deps_comp_get = deps => (
	deps
	?	(
		deps_comp_functions[deps.length] ||
		(
			DEBUG &&
			deps.length === 0 &&
				error('deps must not be empty'),
			VERBOSE && log('deps_comp_get: ' + deps.length),

			deps_comp_functions[deps.length] =
			/** @type {TYPE_DEPS_COMP} */ (
				comp_generate(
					deps
					.map((_, index) => `a[${ index }]!==b[${ index }]`)
				)
			)
		)
	)
	:	null_
)


/// INSTANCES ///

/**
	update current instance
	@param {?HTMLElement} dom_parent
	@param {?HTMLElement} dom_first
*/
const instance_render = (dom_parent, dom_first) => {
	const instance = /** @type {TYPE_INSTANCE} */ (current);
	const dom_after = dom_first;
	const ilevel = instance.ilevel + 1;
	current_slots = instance.slots;
	current_slots_index = 1;

	VERBOSE && log('instance_render ' + (current_first ? 'initial' : 'again'));
	instance.dirty = false_;

	// not node_map?
	if (instance.icall.component !== object_comp_get) {
		/**
			@type {Array<TYPE_INSTANCE_CALL_OPTIONAL>}
		*/
		let child_calls = null_;

		try {
			child_calls = (0, instance.icall.component)(instance.icall.props);
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

		if (child_calls) {
			if (dom) {
				dom_parent = dom;
				dom_first = null_;
			}

			let childs_index = child_calls.length;
			/**
				@type {?TYPE_INSTANCE}
			*/
			let child;
			/**
				@type {TYPE_INSTANCE_CALL_OPTIONAL}
			*/
			let child_call;

			DEBUG && (
				typeof childs_index !== 'number' &&
					error('childs must be returned in a list'),
				childs_index === 0 &&
					error('returned childs list empty'),
				instance.childs &&
				childs_index !== instance.childs.length &&
					error('returned childs count changed')
			);

			const instance_childs = (
				instance.childs ||
				(
					instance.childs =
					/** @type {Array<?TYPE_INSTANCE>} */ (
						new Array_(childs_index).fill(null_)
					)
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
					child &&
					child.icall.component !== child_call.component &&
						error('child component changed at ' + childs_index);

					if (
						current_first =
						!child
					) {
						(
							instance_childs[childs_index] = current = child = {
								icall: child_call,
								props_comp: (
									child_call.props &&
									object_comp_get(child_call.props)
								),
								iparent: instance,
								ilevel,
								parent_index: childs_index,
								slots: [],
								childs: null_,
								dom: null_,
								dom_first: null_,
								dirty: false_,
							}
						).slots[0] = {
							htype: HOOK.HEAD_INSTANCE,
							hinstance: child,
						};

						instance_render(
							dom_parent,
							dom_first
						);

						child.dom &&
							dom_parent.insertBefore(
								child.dom_first = child.dom,
								dom_first
							);
					}
					else if (
						DEBUG && assert_keys(
							child.icall.props,
							child_call.props
						),
						child_call.props &&
						child.props_comp(
							/** @type {!Object} */ (child.icall.props),
							/** @type {!Object} */ (child_call.props)
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

					child.dom_first && (
						dom_first = child.dom_first
					);
				}
				else if (child) {
					instance_unmount(child, dom_parent);
					instance_childs[childs_index] = null_;
				}
			}
			while (childs_index > 0);
		}
		else if (instance.childs) {
			VERBOSE && log('discard childs');

			for (const child of instance.childs)
				child &&
					instance_unmount(child, dom_parent);
			instance.childs = null_;
		}

		dom ||
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
			props,
		} = instance.icall.props;

		DEBUG && (
			(
				typeof list_data !== 'object' ||
				!list_data ||
				list_data.constructor !== Array_
			) &&
				error('list_data must be an array'),
			typeof props !== 'object' &&
				error('props must be an object'),
			assert_hook_equal(component, 'item component'),
			assert_hook_equal(props && Object_keys(props).join(','), 'common props')
		);

		let items_index = list_data.length;
		let props_changed = true_;

		if (
			hook_prev(items_index, items_index) + items_index <= 0
		) return;

		const state = hook_static();

		const items_map = {};
		const items_order = [];
		const items_objects = (
			items_index > 0 &&
			list_data_index(list_data, items_map, items_order)
		);
		DEBUG && (
			items_index ||
				hook_static()
		);

		// rerender?
		if (state.item_map) {
			props_changed = (
				props &&
				state.props_comp(
					props,
					state.props_prev
				)
			);
	
			VERBOSE &&
			props &&
			props_changed &&
				log('props changed', object_diff(state.props_prev, props));

			// remove items
			for (const key of state.items_order_prev) {
				if (
					LEGACY
					?	items_map[key] !== undefined_
					:	key in items_map
				) continue;

				VERBOSE && log('item remove: ' + key);
				instance_unmount(state.item_map[key], dom_parent);
				delete state.item_map[key];
			}

			state.props_prev = props;
			state.items_order_prev = items_order;
		}
		// initial render?
		else {
			state.item_map = {};
			state.item_comp = (
				items_objects
				?	object_comp_get(items_map[items_order[0]])
				:	null_
			);
			state.items_order_prev = items_order;
			state.props_comp = (
				state.props_prev = props
			) && object_comp_get(props);
		}

		// for all items
		const childs = instance.childs = new Array_(items_index);
		while (items_index > 0) {
			const key = items_order[--items_index];
			let child = state.item_map[key];
			if (
				current_first =
				!child
			) {
				VERBOSE && log('item add: ' + key);

				(
					state.item_map[key] = current = child = {
						icall: {
							component,
							props: (
								Object_assign({
									I: items_map[key],
								}, props)
							),
						},
						props_comp: null_,
						iparent: instance,
						ilevel,
						parent_index: items_index,
						slots: [],
						childs: null_,
						dom: null_,
						dom_first: null_,
						dirty: false_,
					}
				).slots[0] = {
					htype: HOOK.HEAD_INSTANCE,
					hinstance: child,
				};

				instance_render(
					dom_parent,
					dom_first
				);

				child.dom &&
					dom_parent.insertBefore(
						child.dom_first = child.dom,
						dom_first
					);
			}
			else {
				// TODO this algorithm still sucks
				const dom_last = instance_dom_last_get(child);
				if (
					dom_last &&
					dom_last.nextSibling !== dom_first
				) {
					VERBOSE && log('instance_reinsert ' + key);
					instance_reinsert(child, dom_parent, dom_first);
				}

				if (
					props_changed ||
					items_objects &&
						state.item_comp(
							items_map[key],
							child.icall.props.I
						)
				) {
					(
						current = child
					).icall.props = (
						Object_assign({
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
				childs[child.parent_index = items_index] = child
			).dom_first && (
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

	dom_parent &&
	instance.dom && (
		dom_parent.removeChild(
			instance.dom
		),
		dom_parent = null_
	);

	if (instance.childs)
	for (const child of instance.childs) {
		child &&
			instance_unmount(child, dom_parent);
	}

	hooks_unmount(instance.slots);

	if (instance.dirty) {
		let index;
		let group;

		(
			!(
				group = render_queue[index = instance.ilevel]
			) || (
				index = group.indexOf(instance)
			) < 0
		) && (
			!(
				group = render_queue_next[index]
			) || (
				index = group.indexOf(instance)
			) < 0
		) ||
			group.splice(index, 1);
	}
}

/**
	unmount all hooks in context
	@param {TYPE_SLOTS} slots
*/
const hooks_unmount = slots => {
	let slot, slots_index = slots.length;
	while (slots_index > 1)
	switch (
		(
			slot = slots[--slots_index]
		).htype
	) {
		case HOOK.EFFECT:
			slot.unmount &&
				(slot.unmount)(...slot.deps);
			break;
		case HOOK.ASYNC:
			slot.deps = Array_empty;
			break;
		case HOOK.MAP:
			hook_map_unmount(slot);
			break;
		case HOOK.SUB:
			hooks_unmount(slot.slots);
		default:
	}
}

/**
	generate map and order list from data list
	@param {TYPE_LIST} list_data must not be empty
	@param {!Object<(string|number), TYPE_LIST_ITEM>} items_map
	@param {!Array<(string|number)>} items_order
	@return {boolean}
*/
const list_data_index = (list_data, items_map, items_order) => {
	const items_objects = typeof list_data[0] === 'object';

	if (DEBUG) {
		const item_type_ref = hook_static();

		if (!item_type_ref.val) {
			list_data[0] !== null_ &&
			['object', 'string', 'number']
			.includes(
				item_type_ref.val = typeof list_data[0]
			) ||
				error('item type invalid');

			items_objects && (
				!['string', 'number']
				.includes(
					item_type_ref.val_id = typeof list_data[0].id
				) &&
					error('item id type invalid'),
				item_type_ref.keys = Object_keys(
					/** @type {!Object} */ (list_data[0])
				).join(',')
			);
		}

		for (const item of list_data) {
			item === null_ &&
				error('item is null');
			typeof item !== item_type_ref.val &&
				error('item type changed');
			items_objects && (
				typeof item.id !== item_type_ref.val_id &&
					error('item id type changed'),
				Object_keys(
					/** @type {!Object} */ (item)
				).join(',') !== item_type_ref.keys &&
					error('item keys differ of ' + item.id)
			);
		}
	}

	for (const item of list_data) {
		const key = /** @type {number|string} */ (
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
	gets last node of an instance (only an ugly workaround!)
	@param {TYPE_INSTANCE} instance
	@return {?HTMLElement}
*/
const instance_dom_last_get = instance => {
	if (instance.dom) return instance.dom;
	let instance_childs;
	let i = (
		(instance_childs = instance.childs)
		?	instance_childs.length
		:	0
	);
	let itm, itm_dom;
	while (i > 0) {
		if (
			(
				itm_dom = instance_childs[--i]
			) &&
			(
				itm = instance_dom_last_get(itm_dom)
			)
		) return itm;
	}
	return null_;
};

/**
	reinsert all dom nodes of an instance
	@param {TYPE_INSTANCE} instance
	@param {HTMLElement} dom_parent
	@param {?HTMLElement} dom_first
	@return {?HTMLElement}
*/
const instance_reinsert = (instance, dom_parent, dom_first) => {
	if (instance.dom) {
		dom_parent.insertBefore(instance.dom, dom_first);
		return instance.dom;
	}
	if (instance.dom_first) {
		let childs_index = instance.childs.length;
		do {
			instance.childs[--childs_index] && (
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
	@param {TYPE_SLOTS} slots
	@return {TYPE_INSTANCE}
*/
const instance_current_get = slots => {
	while (slots[0].htype !== HOOK.HEAD_INSTANCE) {
		slots = slots[0].hparent;
	}
	return slots[0].hinstance;
}

/**
	dirtify parent hooks and return instance, return null if already dirty
	@param {TYPE_SLOTS} slots
	@return {?TYPE_INSTANCE}
*/
const dirtup = slots => {
	while (slots[0].htype !== HOOK.HEAD_INSTANCE) {
		if (!slots[0].hslot.clean) {
			return null_;
		}
		slots[0].hslot.clean = false_;
		slots = slots[0].hparent;
	}
	return slots[0].hinstance;
}

/**
	request rerendering for subs and instance
	@param {TYPE_SLOTS|?TYPE_INSTANCE} slots
*/
const dirtify = slots => (
	(
		slots = dirtup(/** @type {TYPE_SLOTS} */ (slots))
	) &&
	!(
		/** @type {TYPE_INSTANCE} */ (slots)
	).dirty && (
		slots = /** @type {TYPE_INSTANCE} */ (slots),

		VERBOSE && log('dirtify ' + instance_name_get(slots)),

		slots.dirty = true_,
		render_queue[slots.ilevel]
		?	render_queue[slots.ilevel].push(slots)
		:	render_queue[slots.ilevel] = [slots],

		rerender_deferred ||
			render()
	)
)


/// HOOKS ///

/**
	request rerendering for current instance
*/
export const hook_rerender = () => {
	DEBUG && assert_hook(null_, false_, null_);

	const instance = dirtup(/** @type {TYPE_SLOTS} */ (current_slots));

	if (instance) {
		VERBOSE && log('hook_rerender ' + instance_name_get(/** @type {TYPE_INSTANCE} */ (instance))),

		/** @type {TYPE_INSTANCE} */ (instance).dirty = true_,
		render_queue_next[/** @type {TYPE_INSTANCE} */ (instance).ilevel]
		?	render_queue_next[/** @type {TYPE_INSTANCE} */ (instance).ilevel].push(
				/** @type {TYPE_INSTANCE} */ (instance)
			)
		:	render_queue_next[/** @type {TYPE_INSTANCE} */ (instance).ilevel] = [
				/** @type {TYPE_INSTANCE} */ (instance)
			];
	}
}

/**
	get if this is the first instance_render call
	@return {boolean}
*/
export const hook_first = () => (
	DEBUG && assert_hook(null_, false_, null_),
	current_first
)

/**
	interrupts if condition is not met
	@param {boolean=} condition
*/
export const hook_assert = condition => {
	DEBUG && assert_hook(null_, false_, null_);

	if (!condition) throw dom_cache;
}

/**
	call an effect by deps
	@param {function(...?):(void|function(...?):void)} effect
	@param {?Array=} deps
*/
export const hook_effect = (effect, deps) => {
	DEBUG && assert_hook(HOOK.EFFECT, false_, deps);

	// initial?
	if (current_slots_index >= current_slots.length) {
		VERBOSE && log('effect initial', deps);

		current_slots[current_slots_index] =
		/** @type {TYPE_SLOT} */ ({
			htype: HOOK.EFFECT,
			deps_comp: deps_comp_get(deps),
			deps: deps = deps || Array_empty,
			unmount: effect(...deps) || null_,
		});
	}
	// rerender?
	else if (deps) {
		const slot = current_slots[current_slots_index];

		if (
			slot.deps_comp(
				slot.deps,
				deps
			)
		) {
			VERBOSE && log('effect again', deps);

			slot.unmount &&
				(slot.unmount)(
					...slot.deps
				);
			slot.unmount = (
				effect(
					...(
						slot.deps = deps
					)
				) || null_
			);
		}
	}

	DEBUG &&
	current_slots[current_slots_index].unmount &&
	current_slots[current_slots_index].unmount.then &&
		error('effect function must be synchronous');
	
	++current_slots_index;
}

/**
	request value by deps
	@param {function(...?):Promise} getter
	@param {?Array=} deps
	@param {*=} fallback
	@return {*}
*/
export const hook_async = (getter, deps, fallback) => {
	DEBUG && assert_hook(HOOK.ASYNC, false_, deps);

	/**
		@type {TYPE_SLOT}
	*/
	let slot;

	const stack = DEBUG ? stack_get() : '';

	if (
		(
			current_slots_index < current_slots.length
			?	(
				slot = /** @type {TYPE_SLOT} */ (
					current_slots[current_slots_index++]
				),
				false_
			)
			:	(
				slot = current_slots[current_slots_index++] =
				/** @type {TYPE_SLOT} */ ({
					htype: HOOK.ASYNC,
					deps_comp: deps_comp_get(deps),
					deps: deps || Array_empty,
					hvalue: null_,
				})
			)
		) ||
		deps && slot.deps_comp(slot.deps, deps) && (
			slot.deps = deps
		)
	) {
		VERBOSE && log('async start', deps);

		fallback !== undefined_ && (
			slot.hvalue = fallback
		);

		const current_slots_ = /** @type {TYPE_SLOTS} */ (current_slots);
		const promise = getter(
			...slot.deps
		)
		.then(value => (
			VERBOSE && log('async end ' + instance_name_get(instance_current_get(current_slots_)), value),

			(
				slot.hvalue !== value &&
				slot.deps === deps
			) && (
				slot.hvalue = value,
				dirtify(current_slots_)
			)
		));
		DEBUG &&
			promise.catch(thrown => {
				callback_error(stack);
				throw thrown;
			});
	}

	return slot.hvalue;
}

/**
	get persistent state
	@param {*} initial
	@return {!Array}
*/
export const hook_state = initial => {
	DEBUG && assert_hook(HOOK.STATE, false_, null_);

	if (current_slots_index < current_slots.length) {
		return /** @type {!Array} */ (current_slots[current_slots_index++].hvalue);
	}

	const current_slots_ = /** @type {TYPE_SLOTS} */ (current_slots);
	const slot = [
		initial,
		value => {
			VERBOSE && log('state set ' + instance_name_get(instance_current_get(current_slots_)), value);

			slot[0] !== value && (
				slot[0] = value,
				dirtify(current_slots_)
			);
		},
		() => slot[0]
	];
	current_slots[current_slots_index++] =
	/** @type {TYPE_SLOT} */ ({
		htype: HOOK.STATE,
		hvalue: slot,
	});
	return slot;
}

/**
	get persistent constant
	@param {*=} value
	@return {*}
*/
export const hook_static = value => (
	DEBUG && assert_hook(HOOK.STATIC, false_, null_),

	(
		current_slots_index < current_slots.length
		?	current_slots[current_slots_index++]
		:	(
			current_slots[current_slots_index++] =
			/** @type {TYPE_SLOT} */ ({
				htype: HOOK.STATIC,
				hvalue: value === undefined_ ? {} : value,
			})
		)
	).hvalue
)

/**
	generate value on deps
	@param {function(...?):*} getter
	@param {?Array=} deps
	@return {*}
*/
export const hook_memo = (getter, deps) => (
	DEBUG && assert_hook(HOOK.MEMO, false_, deps),

	current_slots_index >= current_slots.length
	// initial?
	?	(
		VERBOSE && log('memo initial', deps),

		current_slots[current_slots_index++] =
		/** @type {TYPE_SLOT} */ ({
			htype: HOOK.MEMO,
			deps_comp: deps_comp_get(deps),
			deps: deps = deps || Array_empty,
			hvalue: getter(...deps),
		})
	).hvalue
	// rerender?
	:	(
		(
			deps &&
			(current_slots[current_slots_index].deps_comp)(
				current_slots[current_slots_index].deps,
				deps
			)
		)
		// regenerate?
		?	(
			VERBOSE && log('memo again', deps),

			current_slots[current_slots_index].hvalue =
			getter(
				...(
					current_slots[current_slots_index++].deps =
					deps
				)
			)
		)
		// do nothing?
		:	current_slots[current_slots_index++].hvalue
	)
)

/**
	get value from previous rendering
	@param {*} value
	@param {*=} initial
	@return {*}
*/
export const hook_prev = (value, initial) => (
	DEBUG && assert_hook(HOOK.PREV, false_, null_),

	current_slots_index < current_slots.length
	?	(
		initial = current_slots[current_slots_index].hvalue,
		current_slots[current_slots_index++].hvalue = value
	)
	:	(
		current_slots[current_slots_index++] =
		/** @type {TYPE_SLOT} */ ({
			htype: HOOK.PREV,
			hvalue: value,
		})
	),

	initial
)

/**
	returns stable callback
	@param {function():*} callback
	@param {!Array} deps
	@return {function():*}
*/
export const hook_callback = (callback, deps) => {
	const stack = (
		DEBUG &&
		current_slots_index >= current_slots.length
		?	stack_get()
		:	''
	);

	DEBUG &&
	(!deps || !deps.length) &&
		error('deps required, use hook_static instead');

	const state = hook_static();

	DEBUG &&
	state.deps &&
		assert_hook_deps(state.deps, deps);

	state.deps = deps;
	return (
		state.callback || (
			state.callback = (...args) => (
				DEBUG
				?	callback_wrap(callback, [...state.deps, ...args], stack)
				:	callback(...state.deps, ...args)
			)
		)
	);
}

/**
	used for the hook_delay
	@param {number} delay
	@param {function(boolean):void} expired_set
	@return {function():void}
*/
const hook_delay_effect = (delay, expired_set) => (
	delay = (
		LEGACY
		?	setTimeout_
		:	setTimeout
	)(
		() => expired_set(true_),
		delay
	),

	() => (
		LEGACY
		?	clearTimeout_
		:	clearTimeout
	)(delay)
)

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
	@param {function(...?):*} getter
	@param {?Array=} deps
	@return {*}
*/
export const hook_sub = (getter, deps) => {
	DEBUG && assert_hook(HOOK.SUB, false_, deps);

	/**
		@type {?TYPE_SLOT}
	*/
	let slot = null_;

	// rerender?
	if (current_slots_index < current_slots.length) {
		// had another getter before?
		if (
			(
				slot =
				/** @type {TYPE_SLOT} */ (current_slots[current_slots_index])
			).getter !== getter
		) {
			VERBOSE && log('sub getter change', deps);
			hooks_unmount(slot.slots);
			slot = null_;
		}
		// not dirty and same deps?
		else if (
			slot.clean &&
			!(
				deps &&
				slot.deps_comp(
					slot.deps,
					deps
				)
			)
		) {
			++current_slots_index;
			return slot.hvalue;
		}
		// dirty or deps change?
		else {
			VERBOSE && log(slot.clean ? 'sub deps change' : 'sub dirty', deps);

			deps && (
				slot.deps = deps
			);
			slot.clean = true_;
		}
	}
	// initial?
	else if (VERBOSE) {
		log('sub initial', deps);
	}

	// context push
	const current_first_before = current_first;
	const current_slots_before = current_slots;
	const current_slots_index_before = current_slots_index;

	// initial?
	if (
		current_first =
		!slot
	) {
		(
			current_slots[current_slots_index] = slot =
			/** @type {TYPE_SLOT} */ ({
				htype: HOOK.SUB,
				deps_comp: deps_comp_get(deps),
				deps: deps || Array_empty,
				hvalue: null_,
				getter: getter,
				clean: true_,
				slots: [],
			})
		).slots[0] =
		/** @type {TYPE_SLOT} */ ({
			htype: HOOK.HEAD_SUB,
			hparent: current_slots,
			hslot: slot,
		});
	}

	current_slots = slot.slots;
	current_slots_index = 1;

	try {
		slot.hvalue = getter(
			...slot.deps
		);
	}
	catch (thrown) {
		if (
			DEBUG &&
			thrown !== dom_cache
		) throw thrown;
	}

	// context pop
	current_first = current_first_before;
	current_slots = current_slots_before;
	current_slots_index = current_slots_index_before + 1;

	return slot.hvalue;
}

/**
	dynamic hook blocks for each item
	@param {function(...?):*} getter
	@param {TYPE_LIST} list_data
	@param {?Array=} deps
	@return {!Array}
*/
export const hook_map = (getter, list_data, deps) => {
	DEBUG && assert_hook(HOOK.MAP, false_, deps);

	let slot = null_;
	let dirty = true_;

	// rerender?
	if (current_slots_index < current_slots.length) {
		if (
			(
				slot = /** @type {TYPE_SLOT} */ (current_slots[current_slots_index])
			).getter !== getter
		) {
			VERBOSE && log('map getter change', deps);
			hook_map_unmount(slot);
			slot = null_;
		}
		else if (
			slot.clean &&
			!(
				deps &&
				slot.deps_comp(
					slot.deps,
					deps
				)
			)
		) {
			if (list_data === slot.list_data) {
				++current_slots_index;
				return /** @type {!Array} */ (slot.hvalue);
			}
			VERBOSE && log('map data change', list_data);
			dirty = false_;
		}
		else {
			VERBOSE && (
				slot.clean
				?	log('map deps change', deps)
				:	log('map dirty')
			);
			slot.deps = deps || Array_empty;
			slot.clean = true_;
		}
	}
	// initial?
	else {
		VERBOSE && log('map initial', deps);
	}

	// context push
	const current_first_before = current_first;
	const current_slots_before = current_slots;
	const current_slots_index_before = ++current_slots_index;

	const items_data_map = {};
	const items_order = [];
	const items_objects = (
		list_data.length > 0 &&
		list_data_index(list_data, items_data_map, items_order)
	);

	DEBUG &&
	list_data.length === 0 &&
		hook_static();
	
	// initial?
	if (!slot) {
		current_slots[current_slots_index_before - 1] = slot =
		/** @type {TYPE_SLOT} */ ({
			htype: HOOK.MAP,
			deps_comp: deps_comp_get(deps),
			deps: deps || Array_empty,
			hvalue: [],
			clean: true_,
			getter: getter,
			item_comp: items_objects ? object_comp_get(
				/** @type {!Object} */ (list_data[0])
			) : null_,
			items_order: [],
			items_map: {},
			list_data: list_data,
		});
	}
	// rerender?
	else {
		slot.hvalue = [];

		if (slot.list_data !== list_data) {
			slot.list_data = list_data;
			// remove items
			for (const key of slot.items_order) {
				if (
					LEGACY
					?	items_data_map[key] !== undefined_
					:	key in items_data_map
				) continue;
	
				VERBOSE && log('map item remove: ' + key);
				hooks_unmount(slot.items_map[key]);
				delete slot.items_map[key];
			}
		}
	}

	// run/rerun all items
	for (const key of items_order) {
		let slots = slot.items_map[key];
		if (
			current_first =
			!slots
		) {
			VERBOSE && log('map item add: ' + key);

			slot.items_map[key] = slots = [/** @type {TYPE_SLOT} */ ({
				htype: HOOK.HEAD_MAP,
				hparent: current_slots_before,
				hslot: slot,
				item_data: null_,
				hvalue: null_,
			})];
		}

		slots = /** @type {TYPE_SLOTS} */ (slots);

		if (
			dirty ||
			current_first || (
				items_objects
				?	slot.item_comp(
						items_data_map[key],
						/** @type {!Object} */ (slots[0].item_data)
					)
				:	items_data_map[key] !== slots[0].item_data
			)
		) {
			current_slots = slots;
			current_slots_index = 1;

			try {
				slots[0].hvalue = getter(
					slots[0].item_data = items_data_map[key],
					...slot.deps
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
		slot.hvalue.push(slots[0].hvalue);
	}

	// context pop
	current_first = current_first_before;
	current_slots = current_slots_before;
	current_slots_index = current_slots_index_before;

	slot.items_order = items_order;
	return slot.hvalue;
}

/**
	umount all contained hooks
	@param {TYPE_SLOT} slot
	@noinline
*/
const hook_map_unmount = slot => {
	for (const key of slot.items_order)
		hooks_unmount(slot.items_map[key]);
}

/**
	parameters for current transition
	@param {number} goal
	@param {number} delay
	@param {{goal: number}} state
*/
const hook_transition_memo = (goal, delay, state) => ({
	value_start: state.goal,
	value_end: goal,
	time_start: render_time,
	time_end: (
		current_first
		?	render_time
		:	render_time + delay
	)
})

/**
	smooth transition
	@param {number} goal
	@param {number} delay in ms
	@return {number}
*/
export const hook_transition = (goal, delay) => {
	const state = hook_static({goal});
	const transition = hook_memo(
		hook_transition_memo,
		[goal, delay, state]
	);

	return (
		state.goal = (
			transition.time_end <= render_time
			?	transition.value_end
			:	(
				hook_rerender(),
				transition.time_start === render_time
				?	transition.value_start
				:	transition.value_start +
					(transition.value_end - transition.value_start) *
					(render_time - transition.time_start) /
					(transition.time_end - transition.time_start)
			)
		)
	);
}

/**
	get all changed properties
	@param {!Object} object
	@return {!Array<string>} keys
*/
export const hook_object_changes = object => {
	DEBUG && (
		typeof object === 'object' &&
		object ||
			error('object required')
	);
	const prev = hook_prev(object, null_);
	return (
		prev
		?	object_diff(/** @type {!Object} */ (prev), object)
		:	Object_keys(object)
	);
}

/**
	get persistent state with custom reducer list
	@param {!Array<function(...?):*>} reducer
	@return {!Array}
*/
export const hook_reducer = reducer => {
	DEBUG && (
		assert_hook(HOOK.REDUCEA, false_, null_),
		reducer &&
		reducer.constructor !== Array_ &&
			error('actions array required'),
		typeof reducer === 'function' &&
			error('array required, use hook_reducer_f instead')
	);

	if (current_slots_index < current_slots.length)
		return /** @type {!Array} */ (current_slots[current_slots_index++].hvalue);

	const current_slots_ = /** @type {TYPE_SLOTS} */ (current_slots);
	const stack = DEBUG ? stack_get() : '';
	const slot = [
		(0, reducer[0])(null_),
		(cmd, payload) => {
			VERBOSE && log('reducer ' + instance_name_get(instance_current_get(current_slots_)) + ' -> #' + cmd, payload);
			const value = (
				DEBUG
				?	callback_wrap(reducer[cmd], [slot[0], payload], stack)
				:	(0, reducer[cmd])(slot[0], payload)
			);
			if (slot[0] === value) return;
			slot[0] = value;
			dirtify(current_slots_);
		},
	];
	current_slots[current_slots_index++] =
	/** @type {TYPE_SLOT} */ ({
		htype: HOOK.REDUCEA,
		hvalue: slot,
	});
	return slot;
}

/**
	get persitent state with custom reducer function
	@param {function(*, *):*} reducer
	@param {function():*} initializer
	@return {!Array}
*/
export const hook_reducer_f = (reducer, initializer) => {
	DEBUG && (
		assert_hook(HOOK.REDUCEF, false_, null_),
		typeof reducer !== 'function' &&
			error('reducer function required'),
		initializer &&
		typeof initializer !== 'function' &&
			error('initializer must be a function')
	);

	if (current_slots_index < current_slots.length)
		return /** @type {!Array} */ (current_slots[current_slots_index++].hvalue);

	const current_slots_ = /** @type {TYPE_SLOTS} */ (current_slots);
	const stack = DEBUG ? stack_get() : '';
	const slot = [
		(
			initializer
			?	initializer()
			:	null_
		),
		payload => {
			VERBOSE && log('reducer ' + instance_name_get(instance_current_get(current_slots_)), payload);
			const value = (
				DEBUG
				?	callback_wrap(reducer, [slot[0], payload], stack)
				:	reducer(slot[0], payload)
			);
			if (slot[0] === value) return;
			slot[0] = value;
			dirtify(current_slots_);
		},
	];
	current_slots[current_slots_index++] =
	/** @type {TYPE_SLOT} */ ({
		htype: HOOK.REDUCEF,
		hvalue: slot,
	});
	return slot;
}

/**
	syncs dom attributes
	@param {?TYPE_PROPS} attributes
	@return {HTMLElement}
*/
const hook_dom_common = attributes => {
	DEBUG &&
		assert_hook_equal(!attributes, 'attributes presence');
	const {dom} = current;

	if (attributes) {
		for (const key of hook_object_changes(attributes)) {
			DEBUG &&
			key.length > 1 &&
			key.charAt(0).toLowerCase() !== key.charAt(0) &&
				error('capital prop: ' + key);

			switch (
				LEGACY
				?	key
				:	key.charCodeAt(0)
			) {
				case (LEGACY ? 'F' : 70):
					DEBUG && (
						typeof attributes.F === 'object' &&
						attributes.F ||
							error('invalid css flags')
					);

					dom.className = (
						Object_keys(
							/** @type {!Object} */ (attributes.F)
						)
						.filter(key => attributes.F[key])
						.join(' ')
					);

					VERBOSE && log('dom flags', dom.className.split(' '));

					continue;
				case (LEGACY ? 'R' : 82):
					DEBUG &&
					typeof attributes.R !== 'function' &&
						error('invalid ref');

					(attributes.R)(dom);
				case (LEGACY ? 'C' : 67):
				case (LEGACY ? 'D' : 68):
				case (LEGACY ? 'S' : 83):
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
			assert_hook_equal(!attributes.D, 'dataset presence');
		if (attributes.D)
		for (const key of hook_object_changes(attributes.D)) {
			VERBOSE && log('dom data ' + key + '=' + attributes.D[key]);
			if (LEGACY || RJS)
				dom.setAttribute(
					'data-' + key.replace(regexp_uppercase, '-$&').toLowerCase(),
					/** @type {string} */ (attributes.D[key])
				);
			else
				dom.dataset[key] = /** @type {string} */ (attributes.D[key]);
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
		assert_hook(null_, true_, null_),
		current = /** @type {TYPE_INSTANCE} */ (current),
		current.dom
		?	current_first && error('hook_dom called twice')
		:	current_first || error('hook_dom skipped before'),
		attributes && (
			attributes.C &&
				error('hook_dom cannot have childs'),
			attributes.R &&
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
		childs &&
		childs.constructor !== Array_ &&
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
	@param {TYPE_LIST} list_data
	@param {TYPE_PROPS=} props
	@return {TYPE_INSTANCE_CALL}
*/
export const node_map = (component, list_data, props) => (
	node(
		/** @type {TYPE_COMPONENT} */ (object_comp_get),
		{
			component,
			list_data,
			props: props || null_
		}
	)
)

/**
	mounts the root component
	@param {function():!Array} root
	@param {HTMLElement=} dom_c
*/
export const init = (root, dom_c) => {
	VERBOSE && log('init');

	DEBUG && (
		RJS
		?	(
				dom_c ||
					error('no root element specified'),
				dom_c.lui &&
					error('root element already mounted'),
				dom_c.lui = true_
			)
		:	(
				current ||
				render_queue.length ||
				render_queue_next.length
			) &&
				error('init called more than once'),
		typeof root !== 'function' &&
			error('no init function specified')
	);

	let result;//[props, childs]

	const dom_d = document_.body;
	(RJS ? dom_c : dom_d).innerHTML = '';

	/**
		@type {TYPE_COMPONENT}
	*/
	const component = () => (
		DEBUG && (
			(
				!(
					result = root()
				) ||
				result.length !== 2
			) && error('root component must return [props, childs]'),
			assert_hook_equal(!result[0], 'attributes presence'),
			result[0] !== null_ && (
				typeof result[0] !== 'object' &&
					error('invalid props type'),
				assert_keys(
					/** @type {!Object} */ (hook_prev(result[0], result[0])),
					result[0]
				),
				result[0].C &&
					error('root childs must be in second return value')
			)
		),
		hook_dom_common(
			(
				DEBUG
				?	result
				:	result = root()
			)[0]
		),
		result[1]
	);

	DEBUG && (
		component['name_'] = '$root'
	);

	(
		current = {
			icall: {
				component,
				props: null_,
			},
			props_comp: null_,
			iparent: null_,
			ilevel: 0,
			parent_index: 0,
			slots: [],
			childs: null_,
			dom: /** @type {HTMLElement} */ (RJS ? dom_c : dom_d),
			dom_first: /** @type {HTMLElement} */ (RJS ? dom_c : dom_d),
			dirty: true_,
		}
	).slots[0] = {
		htype: HOOK.HEAD_INSTANCE,
		hinstance: current,
	};
	render_queue[0] = [current];

	DEBUG && (
		current = current_slots = null_
	);

	render();
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
const render = () => {
	current_first = render_time <= 0;
	VERBOSE && log('render ' + (current_first ? 'initial' : 'again'));

	render_time = Date_.now();

	// in case there was a synchronous rerender after an asynchronous one was requested
	rerender_requested &&
		cancelAnimationFrame(rerender_requested);

	rerender_deferred = true_;
	rerender_requested = 0;

	let queue;
	let rerender_count = 0;
	while (
		(queue = render_queue).length
	) {
		DEBUG &&
		++rerender_count > 10 &&
			error('rerender loop detected');
		render_queue = [];
		for (const group of queue) {
			if (group)
			for (current of group) {
				// already rerendered?
				if (!current.dirty) continue;
				// simple update?
				if (current.dom) {
					instance_render(null_, null_);
				}
				// complicated update?
				else {
					//get parent element and next sibling
					let dom_parent = null_;
					let dom_after = null_;
					let dom_first = current.dom_first;
					let dom_parent_instance = current;
					let instance = current;

					while (
						!(
							dom_parent = (
								dom_parent_instance = dom_parent_instance.iparent
							).dom
						)
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
								childs[index] &&
								!(
									dom_after = childs[index].dom_first
								)
							)
						) {}
					}
					while (
						!dom_after &&
						instance !== dom_parent_instance
					);

					instance = current;

					instance_render(
						dom_parent,
						dom_after
					);
					
					if (instance.dom_first !== dom_first)//TODO it better
					while (
						!(
							instance = instance.iparent
						).dom
					) {
						dom_first = null_;
						for (const child of instance.childs) {//TODO skip n items if possible
							if (
								child &&
								(
									dom_first = child.dom_first
								)
							)
								break;
						}
						if (dom_first === instance.dom_first) break;
						instance.dom_first = dom_first;
					}
				}
				current_first = false_;
			}
		}
	}
	rerender_deferred = false_;

	DEBUG && (
		current = current_slots = null_
	);

	if (render_queue_next.length) {
		render_queue = render_queue_next;
		render_queue_next = queue;
		rerender_request();
	}
}

/**
	raf wrapper
	@return {number} raf id
	@noinline
*/
const rerender_request = () => (
	VERBOSE && log('animation frame requested'),
	rerender_requested || (
		rerender_requested = requestAnimationFrame(render)
	)
)

/**
	do not automatically render on state changes
	@return {number} raf id
*/
export const defer = () => (
	DEBUG &&
	current &&
		error('defer while rendering'),

	VERBOSE && log('rerendering deferred'),

	rerender_deferred = true_,
	rerender_request()
)

/**
	render deferred changes now
*/
export const defer_end = (
	DEBUG
	?	() => (
		current &&
			error('defer_end while rendering'),
		rerender_deferred ||
			error('nothing was deferred'),

		VERBOSE && log('rerendering rectified now'),

		render()
	)
	:	render
)


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
	if (!dom) {
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
	if (!component) {
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
			props && props.C || null_
		);

		DEBUG && (
			component['name_'] = '$' + descriptor
		);
	}
	return component;
}

DEBUG && (
	window_.onerror = () => (
		current &&
			log('error in component'),
		render_queue =
		render_queue_next = [],
		false_
	)
);


/// POLYFILLS ///

if (LEGACY || RJS) {
	const Array_prototype = Array_.prototype;
	const String_prototype = String.prototype;


	Array_prototype['fill'] || ( // chrome < 45 || ie

	Array_prototype['fill'] =
	/**
		@type {function(this:Array, *):!Array}
	*/
	(function(value) {
		for (
			var length = this.length,
				index = 0;
			index < length;
			++index
		) {
			this[index] = value;
		}
		return this;
	}),


	!LEGACY || window_.requestAnimationFrame || ( // chrome < 24 || ie < 10

	requestAnimationFrame =
		window_.mozRequestAnimationFrame ||
		(
			window_.webkitCancelAnimationFrame &&
			window_.webkitRequestAnimationFrame
		) ||
		(callback => setTimeout_(callback, 20)),

	cancelAnimationFrame =
		window_.mozCancelAnimationFrame ||
		window_.webkitCancelAnimationFrame ||
		clearTimeout_,


	Date_['now'] || ( // chrome < 5 || ie < 9

	Date_['now'] = function() {
		return (
			/** @type {{getTime: function():number}} */ (new (
				/** @type {function(new:Date)} */ (Date_)
			))
		).getTime();
	},


	Array_prototype['map'] || ( // ie < 9

	Array_prototype['filter'] =
	/**
		@type {function(this:Array, function(*, number):boolean):!Array}
	*/
	(function(callback) {
		for (
			var result = [],
				length = this.length,
				result_index = -1,
				index = 0;
			index < length;
			++index
		) {
			callback(this[index], index) &&
				(result[++result_index] = this[index]);
		}
		return result;
	}),

	Array_prototype['indexOf'] =
	/**
		@type {function(this:Array, *, number=):number}
	*/
	(function(search, index) {
		index = index || 0;
		for (
			var length = this.length;
			index < length;
			++index
		) {
			if (this[index] === search) {
				return index;
			}
		}
		return -1;
	}),

	Array_prototype['map'] =
	/**
		@type {function(this:Array, function(*, number):*):!Array}
	*/
	(function(callback) {
		for (
			var result = [],
				length = this.length,
				index = 0;
			index < length;
			++index
		) {
			result[index] = callback(this[index], index);
		}
		return result;
	}),


	Array_prototype['push'] || ( // ie < 6

	Array_prototype['push'] =
	/**
		@type {function(this:Array, *)}
	*/
	(function(item) {
		this[this.length] = item;
	}),

	Function.prototype['apply'] =
	/**
		@type {function(this:Function, ...*):*}
	*/
	(function(this_, args) {
		this_ == null_
		?	(window_['_'] = this, this_ = window_)
		:	(Object_.prototype['_'] = this);
		switch (args ? args.length : 0) {
			case 0: return this_['_']();
			case 1: return this_['_'](args[0]);
			case 2: return this_['_'](args[0], args[1]);
			case 3: return this_['_'](args[0], args[1], args[2]);
			case 4: return this_['_'](args[0], args[1], args[2], args[3]);
			case 5: return this_['_'](args[0], args[1], args[2], args[3], args[4]);
			default: return this_['_'](args[0], args[1], args[2], args[3], args[4], args[5]);
		}
	}),


	Array_prototype['join'] || ( // ie < 5

	Array_prototype['concat'] =
	/**
		@type {function(this:Array, ...!Array):!Array}
	*/
	(function() {
		for (
			var args = arguments,
				source = this,
				result = [],
				sources_length = args.length,
				source_length = source.length,
				sources_index = 0,
				source_index = 0,
				result_index = -1;
			source_index < source_length;
			++source_index
		) {
			result[++result_index] = source[source_index];
		}
		for (
			;
			sources_index < sources_length;
			++sources_index
		)
		for (
			source_length = (
				source_index = 0,
				source = args[sources_index]
			).length;
			source_index < source_length;
			++source_index
		) {
			result[++result_index] = source[source_index];
		}
		return result;
	}),

	Array_prototype['join'] =
	/**
		@type {function(this:Array, string):string}
	*/
	(function(separator) {
		for (
			var result = '',
				length = this.length - 1,
				index = 0;
			index < length;
			++index
		) {
			result += this[index] + separator;
		}
		if (index < length + 1) {
			result += this[index];
		}
		return result;
	}),

	String_prototype['charAt'] =
	/**
		@type {function(this:string, number):string}
	*/
	(function(index) {
		return this[index];
	}),

	String_prototype['indexOf'] =
	/**
		@type {function(this:string, string, number=):number}
	*/
	(function(search, index) {
		search = search[0];
		index = index || 0;
		for (
			var length = this.length;
			index < length;
			++index
		) {
			if (this[index] === search) {
				return index;
			}
		}
		return -1;
	}),

	String_prototype['split'] =
	/**
		@type {function(this:string, string):!Array<string>}
	*/
	(function(separator) {
		for (
			var result = [],
				length = this.length,
				separator_length = separator.length,
				result_index = -1,
				index_head = 0,
				index_tail = 0;
			(index_tail = this.indexOf(separator, index_head)) >= 0;
			index_head = index_tail + separator_length
		) {
			result[++result_index] =
				this.substring(index_head, index_tail);
		}
		if (index_head < length) {
			result[++result_index] = this.substr(index_head);
		}
		return result;
	}),

	String_prototype['substr'] =
	/**
		@type {function(this:string, number):string}
	*/
	(function(start) {
		return this.substring(start, this.length);
	}),

	String_prototype['substring'] =
	/**
		@type {function(this:string, number, number):string}
	*/
	(function(start, end) {
		for (
			var result = '';
			start < end;
			++start
		) {
			result += this[start];
		}
		return result;
	})

	))))));
}
