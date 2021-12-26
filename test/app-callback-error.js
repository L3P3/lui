import {
	hook_async,
	hook_callback,
	hook_effect,
	hook_reducer,
	hook_reducer_f,
	init,
} from '../src/lui.js';

const test = Number(prompt('Select test:\nasync, callback, reducer, reducer_f', 0));

init(() => {
	if (test === 0) {
		hook_async(async () => {
			await new Promise(resolve => setTimeout(resolve, 1e3));
			window.gibtsnicht();
		});
	}

	if (test === 1) {
		const callback = hook_callback(x => {
			window.gibtsnicht(x);
		}, [42]);
		hook_effect(() => {
			setTimeout(() => {
				callback();
			}, 1e3);
		});
	}

	if (test === 2) {
		const [_, dispatch] = hook_reducer([
			() => null,
			() => {
				window.gibtsnicht();
			},
		]);
		hook_effect(() => {
			setTimeout(() => {
				dispatch(1);
			}, 1e3);
		});
	}

	if (test === 3) {
		const [_, dispatch] = hook_reducer_f(() => {
			window.gibtsnicht();
		});
		hook_effect(() => {
			setTimeout(() => {
				dispatch();
			}, 1e3);
		});
	}

	return [null, null];
});
