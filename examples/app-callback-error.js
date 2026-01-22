import {
	hook_async,
	hook_callback,
	hook_effect,
	hook_model,
	init,
} from '../src/lui.js';

const test = Number(prompt('Select test:\nasync, callback, model', 0));

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
		const [_, {callback}] = hook_model({
			init: () => null,
			callback: () => {
				window.gibtsnicht();
			},
		});
		hook_effect(() => {
			setTimeout(() => {
				callback();
			}, 1e3);
		});
	}

	return null;
});
