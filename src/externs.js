/** @externs */

/**
	@typedef {(string|number|{id: (string|number)})}
*/
var TYPE_LIST_ITEM;

/**
	@typedef {!Object<string, boolean>}
*/
var TYPE_PROPS_F;

/**
	@typedef {!Object<string, string>}
*/
var TYPE_PROPS_S;

/**
	@typedef {{
		C: (void|Array<?>),
		F: (void|TYPE_PROPS_F),
		R: (void|function(HTMLElement):void),
		S: (void|TYPE_PROPS_S),
		I: (void|TYPE_LIST_ITEM)
	}}
*/
var TYPE_PROPS;

/**
	@typedef {{
		defer,
		defer_end,
		hook_assert,
		hook_async,
		hook_callback,
		hook_delay,
		hook_dom,
		hook_effect,
		hook_first,
		hook_map,
		hook_memo,
		hook_object_changes,
		hook_prev,
		hook_reducer,
		hook_reducer_f,
		hook_rerender,
		hook_state,
		hook_static,
		hook_sub,
		hook_transition,
		init,
		node,
		node_dom,
		node_map,
		now
	}}
*/
var TYPE_LUI;

/**
	@type {TYPE_LUI}
*/
window.lui;

/**
	@param {TYPE_LUI} lui
*/
function define(lui) {}
