/** @externs */

/**
	@typedef {!Object<string, boolean>}
	@dict
*/
var TYPE_PROPS_DOM_F;

/**
	@typedef {!Object<string, string>}
	@dict
*/
var TYPE_PROPS_DOM_S;

/**
	@typedef {?{
		C: (Array<TYPE_INSTANCE_CALL<*>>|void),
		F: (TYPE_PROPS_DOM_F|void),
		R: (function(HTMLElement):void|void),
		S: (TYPE_PROPS_DOM_S|void),
		I: (*|void)
	}}
	@dict
*/
var TYPE_PROPS_DOM;

/**
	@typedef {{
		hook_rerender,
		hook_first,
		hook_assert,
		hook_effect,
		hook_async,
		hook_state,
		hook_static,
		hook_memo,
		hook_prev,
		hook_callback,
		hook_delay,
		hook_transition,
		hook_object_changes,
		hook_reducer,
		hook_reducer_f,
		hook_await,
		hook_dom,
		node,
		node_dom,
		node_list,
		now,
		init
	}}
*/
window.lui;
