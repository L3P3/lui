/**
	@preserve lui.js web frame work
	inspired by react and mithril
	L3P3.de 2020
*/

const DEBUG = true;
const VERBOSE = false;

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

/** @typedef {TYPE_COMPONENT<TYPE_PROPS_HTML>} */
var TYPE_COMPONENT_HTML;

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
var TYPE_PROPS_HTML;

/** @typedef {[number, ...*]} */
var TYPE_SLOT;

/**
	@template {TYPE_PROPS} T
	@typedef {{
		F: TYPE_COMPONENT<T>,
		P: T
	}}
*/
var TYPE_INSTANCE_CALL;

/**
	@template {TYPE_PROPS} T
	@typedef {{
		A: TYPE_INSTANCE_CALL<T>,
		P: ?TYPE_INSTANCE<*>,
		S: Array<TYPE_SLOT>,
		C: ?Array<TYPE_INSTANCE<*>>,
		D: ?HTMLElement
	}}
*/
var TYPE_INSTANCE;

/** @typedef {Set<TYPE_INSTANCE<*>>} */
var TYPE_QUEUE;


/// STATE ///

/**
	currently rendered instance
	@type {?TYPE_INSTANCE<*>}
*/
let current = null;

/**
	first render call for current instance
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


DEBUG && (
	window.onerror = () => {
		current && log('error');
		render_queue.clear();
		render_queue_next.clear();
	}
);


/// ALIAS ///

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
	while (item !== null) {
		stack.unshift(
			component_name_get(item.A.F)
		);
		item = item.P;
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
	current === null &&
		error('hook called outside of component rendering');

	type !== undefined &&
	current_index < current.S.length &&
	current.S[current_index][0] !== type &&
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
	checks if tuples are equal
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
*/
const render = instance => {
	const parent = current;

	(
		current_first = (
			current = instance
		).S === null
	) && (
		current.S = []
	);
	current_index = 0;

	VERBOSE && log('render');
	render_queue.delete(instance);

	const child_calls = (instance.A.F)(instance.A.P);

	if (instance.D === null) {
		instance.D = document_.createElement('span');//TODO
	}

	if (child_calls !== null) {
		let childs_index = child_calls.length;
		let child_d_last = null;
		let child_call;

		DEBUG &&
		childs_index === 0 &&
			error('returned childs list empty');

		DEBUG &&
		!current_first &&
		childs_index !== instance.C.length &&
			error('returned childs count changed');

		/** @type {Array<TYPE_INSTANCE<*>>} */
		const instance_childs = (
			current_first
			?	(
					instance.C =
						new Array_(childs_index).fill(null)
				)
			:	instance.C
		);

		do {
			if (
				(
					child_call = child_calls[--childs_index]
				) &&
				child_call !== true
			) {
				DEBUG &&
				instance_childs[childs_index] &&
				instance_childs[childs_index].A.F !== child_call.F &&
					error('child type changed at ' + childs_index);

				if (instance_childs[childs_index] === null) {
					VERBOSE && log('mount ' + component_name_get(child_call.F));

					render(
						instance_childs[childs_index] = {
							A: child_call,
							P: instance,
							S: null,
							C: null,
							D: null
						}
					);

					instance.D.insertBefore(
						instance_childs[childs_index].D,
						child_d_last
					);
				}
				else if (
					!object_comp(
						instance_childs[childs_index].A.P,
						child_call.P
					)
				) {
					VERBOSE && log('props changed', object_diff(instance_childs[childs_index].A.P, child_call.P));
					instance_childs[childs_index].A = child_call;
					render(instance_childs[childs_index]);
				}

				child_d_last = instance_childs[childs_index].D;
			}
			else if (instance_childs[childs_index] !== null) {
				instance.D.removeChild(
					instance_childs[childs_index].D
				);
				unmount(instance_childs[childs_index]);
				instance_childs[childs_index] = null;
			}
		}
		while (childs_index > 0);
	}
	else {
		DEBUG &&
		instance.C !== null &&
			error('no child list returned anymore');
	}

	current = parent;
}

/**
	unmount an instance
	@param {TYPE_INSTANCE<*>} instance
*/
const unmount = instance => {
	VERBOSE && log('unmount ' + component_name_get(instance.A.F));

	const childs = instance.C;
	if (childs) {
		instance.C = null;
		for (const child of childs) {
			unmount(child);
		}
	}

	for (const slot of instance.S) {
		switch (slot[0]) {
			case HOOK_EFFECT:
				slot[2] !== null && slot[2](slot[1]);
				break;
			case HOOK_ASYNC:
				slot[1] = null;
				break;
			default:
		}
	}

	render_queue.delete(instance);
	render_queue_next.delete(instance);
}

/**
	request rerendering for instance
	@param {TYPE_INSTANCE<*>} instance
*/
const dirtify = instance => {
	VERBOSE &&
	!render_queue.has(instance) &&
		log('dirtify ' + component_name_get(instance.A.F));

	render_queue.add(instance);
	//TODO order

	rerender_pending ||
		rerender(null);
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
	get if this is the first render call
	@return {boolean}
*/
export const hook_first = () => (
	DEBUG && assert_hook(),
	current_first
)

/**
	fire an effect on deps change
	@param {function(...*=):(void|function(...*=):void)} effect
	@param {Array=} deps
*/
export const hook_effect = (effect, deps) => {
	DEBUG && assert_hook(HOOK_EFFECT);

	if (current_index < current.S.length) {
		const slot = current.S[current_index++];
		if (!tuple_comp(slot[1], deps)) {
			VERBOSE && log('effect again', deps);
			slot[2] !== null &&
				(slot[2])(
					...slot[1]
				);
			slot[2] = (
				effect(
					...(
						slot[1] = deps || []
					)
				) ||
				null
			);
		}
	}
	else {
		VERBOSE && log('effect initial', deps);
		current.S[current_index++] = [
			HOOK_EFFECT,
			deps = deps || [],
			effect(...deps) || null
		];
	}

	DEBUG &&
	current.S[current_index - 1][2] &&
	current.S[current_index - 1][2].then &&
		error('effect function must be synchronous, use hook_async instead');
}

/**
	request value on deps change
	@template T
	@param {function(...*=):Promise<T>} getter
	@param {Array=} deps
	@param {boolean=} nullify
	@return {?T}
*/
export const hook_async = (getter, deps, nullify) => {
	DEBUG && assert_hook(HOOK_ASYNC);

	const slot = (
		current_index < current.S.length
		?	current.S[current_index++]
		:	(
			current.S[current_index++] = [
				HOOK_ASYNC,
				null,
				null
			]
		)
	);

	if (
		slot[1] !== null &&
		tuple_comp(slot[1], deps)
	) {
		return slot[2];
	}

	VERBOSE && log('async start', deps);

	nullify && (
		slot[2] = null
	);

	const current_ = current;
	getter(
		...(
			slot[1] = deps =
				deps || []
		)
	)
	.then(value => {
		VERBOSE && log('async end ' + component_name_get(current_.A.F));
		if (
			slot[2] === value ||
			slot[1] !== deps
		) return;
		slot[2] = value;
		dirtify(current_);
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

	if (current_index < current.S.length) {
		return current.S[current_index++][1];
	}

	const current_ = current;
	/** @type [T, function(T):void, function():T] */
	const slot = [
		initial,
		value => {
			VERBOSE && log('state set ' + component_name_get(current_.A.F), value);
			if (slot[0] === value) return;
			slot[0] = value;
			dirtify(current_);
		},
		() => slot[0]
	];
	current.S[current_index++] = [HOOK_STATE, slot];
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
		current_index < current.S.length
		?	current.S[current_index++]
		:	(
			current.S[current_index++] = [
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

	if (current_index < current.S.length) {
		const slot = current.S[current_index++];
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
	current.S[current_index++] = [HOOK_MEMO, deps, value];
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

	if (current_index < current.S.length) {
		const slot = current.S[current_index++];
		const prev = slot[1];
		slot[1] = value;
		return prev;
	}

	current.S[current_index++] = [HOOK_PREV, value];
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
	@param {number} target
	@param {number} delay in ms
	@return {number}
*/
export const hook_transition = (target, delay) => {
	const state = hook_static({target});
	const transition = hook_memo(
		(target, delay) => ({
			value_start: state.target,
			value_end: target,
			time_start: render_time,
			time_end: (
				current_first
				?	render_time
				:	render_time + delay
			)
		}),
		[target, delay]
	);

	if (transition.time_end <= render_time) {
		return (
			state.target = transition.value_end
		);
	}

	hook_rerender();
	return (
		state.target =
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

	if (current_index < current.S.length)
		return current.S[current_index++][1];

	const current_ = current;
	/** @type {[T, function(number, *):void]} */
	const slot = [
		reducer[0](),
		(cmd, payload) => {
			VERBOSE && log('reducer ' + component_name_get(current_.A.F) + ' -> #' + cmd, payload);
			const value = reducer[cmd](slot[0], payload);
			if (slot[0] === value) return;
			slot[0] = value;
			dirtify(current_);
		}
	];
	current.S[current_index++] = [HOOK_REDUCEA, slot];
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

	if (current_index < current.S.length)
		return current.S[current_index++][1];

	const current_ = current;
	/** @type {[T, function(U=):void]} */
	const slot = [
		(
			initializer
			?	initializer()
			:	null
		),
		payload => {
			VERBOSE && log('reducer ' + component_name_get(current_.A.F), payload);
			const value = reducer(slot[0], payload);
			if (slot[0] === value) return;
			slot[0] = value;
			dirtify(current_);
		}
	];
	current.S[current_index++] = [HOOK_REDUCEF, slot];
	return slot;
}


/// INTERFACE ///

/**
	use a component with props and childs
	@template {TYPE_PROPS} T
	@param {(TYPE_COMPONENT<T>|string)} component
	@param {T=} props
	@param {Array<TYPE_INSTANCE_CALL<*>>=} childs
	@return {TYPE_INSTANCE_CALL<T>}
*/
export const node = (component, props, childs) => {
	DEBUG &&
	childs !== undefined && (
		!childs ||
		childs.constructor !== Array_
	) &&
		error('invalid childs type');

	return {
		F: (
			typeof component === 'string'
			?	(
				component_html_cache[component] || (
					component_html_cache[component] =
						component_html_get(component)
				)
			)
			:	component
		),
		P: (
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
					:	null
				)
		)
	};
}

/**
	create/use a component with props and childs
	@param {!(TYPE_COMPONENT|string)} component
	@param {TYPE_PROPS} props
	@param {!Array} data
	@return {?TYPE_INSTANCE_CALL}
*/
export const node_list = (component, props, data) => {
	DEBUG && error('not implemented yet');
	return null;
}

/**
	mounts the body component
	@param {function():[TYPE_PROPS, Array<TYPE_INSTANCE_CALL>]} body
*/
export const init = body => {
	VERBOSE && log('init');

	DEBUG &&
	(
		current !== null ||
		render_queue.size > 0
	) &&
		error('init called more than once');

	DEBUG &&
	typeof body !== 'function' &&
		error('init function requires body component');

	const dom = document_.body;
	dom.innerHTML = '';

	const component_body = () => {
		const [props, childs] = body();
		DEBUG && (
			assert_hook_equal(!props),
			props && assert_keys(hook_prev(props, props), props),
			props && props.C && error('body childs must be in second return value')
		);
		component_html_generic(props);
		return childs;
	};

	DEBUG && (component_body['name_'] = '$body');

	dirtify({
		A: {
			F: component_body,
			P: null
		},
		P: null,
		S: null,
		C: null,
		D: dom
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
	let rerenders = 0;
	do {
		DEBUG &&
		++rerenders > 5 &&
			error('too many immediate rerenders');

		for (const instance of render_queue) {
			render(instance);
		}
	}
	while (render_queue.size > 0);
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


/// HTML COMPONENTS ///

/**
	@dict
	@type {!Object<string, TYPE_COMPONENT_HTML>}
*/
const component_html_cache = {};

/**
	creates a new component for descriptor
	@param {string} code
	@return {TYPE_COMPONENT_HTML}
*/
const component_html_get = code => {
	VERBOSE && log('create html ' + code);

	const index_sqb = code.indexOf('[');
	const index_ht = code.indexOf('#');
	const tag = (
		index_sqb >= 0 && index_ht >= 0
		?	code.substr(0, Math.min(index_sqb, index_ht))
		:	index_sqb < 0 && index_ht < 0
		?	code.substr(0)
		:	code.substr(0, index_sqb < 0 ? index_ht : index_sqb)
	);

	DEBUG && (
		tag.length === 0 ||
		tag !== tag.toLowerCase() ||
		tag.includes(' ')
	) &&
		error('selector: invalid tag');

	DEBUG &&
	index_sqb > 0 &&
	index_ht > 0 &&
	code.lastIndexOf(']') < index_ht &&
	index_ht > index_sqb &&
		error('selector: ID must be at tag');

	const dom = document_.createElement(tag);

	if (index_ht >= 1) {
		dom.id = (
			index_sqb < 0
			?	code.substr(index_ht + 1)
			:	code.substring(index_ht + 1, index_sqb)
		);

		DEBUG && (
			!dom.id ||
			dom.id.includes(' ')
		) &&
			error('selector: invalid ID');
	}

	if (index_sqb >= 1) {
		DEBUG &&
		!code.endsWith(']') &&
			error('selector: ] missing');

		for (
			const sqbi of
			code
			.substring(
				index_sqb + 1,
				code.length - 1
			)
			.split('][')
		) {
			DEBUG &&
			!sqbi &&
				error('selector: empty attribute');

			DEBUG &&
			(sqbi.includes('[') || sqbi.includes(']')) &&
				error('selector: attributes screwed up');

			const eqi = sqbi.indexOf('=');

			DEBUG &&
			sqbi.includes(' ') && (
				eqi < 0 ||
				sqbi.indexOf(' ') < eqi
			) &&
				error('selctor: invalid attribute name');

			if (eqi < 0) {
				dom[sqbi] = true;
			}
			else {
				DEBUG &&
				sqbi.substr(0, eqi) === 'id' &&
					error('selector: use tag#ID');

				dom[
					sqbi.substr(0, eqi)
				] =
					sqbi.substr(eqi + 1);
			}
		}
	}

	/** @type {TYPE_COMPONENT_HTML} */
	const component = props => {
		if (current_first)
			current.D = /** @type {HTMLElement} */ (dom.cloneNode(true));

		return component_html_generic(props);
	}

	DEBUG && (component['name_'] = '$' + code);

	return component;
}

/**
	html component base
	@type {TYPE_COMPONENT_HTML}
*/
const component_html_generic = props => {
	if (props === null) {
		return null;
	}

	const dom = current.D;

	for (const key of hook_object_changes(props)) {
		DEBUG &&
		key.length > 1 &&
		key.charAt(0).toLowerCase() !== key.charAt(0) &&
			error('capital prop: ' + key);

		switch (key.charCodeAt(0)) {
			case 70://F
				dom.className = (
					Object_.keys(props.F)
					.filter(key => props.F[key])
					.join(' ')
				);

				VERBOSE && log('html flags', dom.className.split(' '));

				continue;
			case 82://R
				(props.R)(dom);
			case 67://C
			case 83://S
				continue;
			default:
				DEBUG &&
				key.charCodeAt(0) < 97 &&
					error('invalid prop: ' + key);

				VERBOSE && log('html prop ' + key, props[key]);

				dom[key] = props[key];
		}
	}

	DEBUG && assert_hook_equal(!props.S);
	if (props.S)
		for (const key of hook_object_changes(props.S)) {
			VERBOSE && log('html css ' + key + '=' + props.S[key]);
			dom.style[key] = props.S[key];
		}

	DEBUG && assert_hook_equal(!props.C);
	return props.C || null;
}
