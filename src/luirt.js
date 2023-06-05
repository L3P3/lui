import {
	EXTENDED,
	RJS,
} from './flags.js';
import {
	defer,
	defer_end,
	dom_define,
	hook_assert,
	hook_async,
	hook_callback,
	hook_delay,
	hook_dom,
	hook_effect,
	hook_map,
	hook_memo,
	hook_model,
	hook_object_changes,
	hook_prev,
	hook_rerender,
	hook_state,
	hook_static,
	hook_sub,
	hook_transition,
	init,
	node,
	node_dom,
	node_map,
	now,
	window_,
} from './lui.js';

const lui = (
	EXTENDED
	?	{
		defer,
		defer_end,
		dom_define,
		hook_assert,
		hook_async,
		hook_callback,
		hook_delay,
		hook_dom,
		hook_effect,
		hook_map,
		hook_memo,
		hook_model,
		hook_object_changes,
		hook_prev,
		hook_rerender,
		hook_state,
		hook_static,
		hook_sub,
		hook_transition,
		init,
		node,
		node_dom,
		node_map,
		now,
	}
	// basic variant
	:	{
		defer,
		defer_end,
		dom_define,
		hook_assert,
		hook_async,
		hook_dom,
		hook_effect,
		hook_memo,
		hook_model,
		hook_prev,
		hook_rerender,
		hook_state,
		hook_static,
		init,
		node,
		node_dom,
		node_map,
		now,
	}
);

if (RJS) {
	define(lui);
}
else {
	window_['lui'] = lui;
}
