/** @externs */

/**
	@typedef {(string|number|{id: (string|number)})}
*/
var TYPE_LIST_ITEM;

/**
	@typedef {!Object<string, boolean>}
	@dict
*/
var TYPE_PROPS_F;

/**
	@typedef {!Object<string, string>}
	@dict
*/
var TYPE_PROPS_S;

/**
	@typedef {{
		C: (void|Array<TYPE_INSTANCE_CALL_OPTIONAL>),
		F: (void|TYPE_PROPS_F),
		R: (void|function(HTMLElement):void),
		S: (void|TYPE_PROPS_S),
		I: (void|TYPE_LIST_ITEM)
	}}
	@dict
*/
var TYPE_PROPS;

/**
	@typedef {{
		hook_assert,
		hook_async,
		hook_await,
		hook_callback,
		hook_delay,
		hook_dom,
		hook_effect,
		hook_first,
		hook_memo,
		hook_object_changes,
		hook_prev,
		hook_reducer,
		hook_reducer_f,
		hook_rerender,
		hook_state,
		hook_static,
		hook_transition,
		init,
		node,
		node_dom,
		node_map,
		now
	}}
*/
window.lui;
