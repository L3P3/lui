/** @externs */

/**
	@typedef {!Object<string, boolean>}
	@dict
*/
var TYPE_PROPS_HTML_F;

/**
	@typedef {!Object<string, string>}
	@dict
*/
var TYPE_PROPS_HTML_S;

/**
	@typedef {?{
		C: (Array<TYPE_INSTANCE_CALL<*>>|void),
		F: (TYPE_PROPS_HTML_F|void),
		S: (TYPE_PROPS_HTML_S|void)
	}}
	@dict
*/
var TYPE_PROPS_HTML;

/**
	@typedef {{
		hook_rerender,
		hook_first,
		hook_effect,
		hook_async,
		hook_state,
		hook_static,
		hook_memo,
		hook_prev,
		hook_delay,
		hook_transition,
		hook_object_changes,
		hook_reducer,
		hook_reducer_f,
		node,
		node_list,
		init
	}}
*/
window.lui;
