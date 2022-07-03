import {
	EXTENDED,
	RJS,
} from './flags.js';
import {
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
	now,
	window_,
} from './lui.js';

const lui = (
	EXTENDED
	?	{
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
		now,
	}
	// basic variant
	:	{
		defer,
		defer_end,
		hook_assert,
		hook_async,
		hook_dom,
		hook_effect,
		hook_first,
		hook_memo,
		hook_prev,
		hook_reducer,
		hook_reducer_f,
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
