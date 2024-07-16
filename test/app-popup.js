import {
	hook_effect,
	init,
	node_dom,
} from '../src/lui.js';

function Popup({
	popup,
}) {
	hook_effect(() => {
		popup.document.title = 'My popup';
	});

	return [
		node_dom('h1[innerText=Hello from popup!]'),
		node_dom('button[innerText=Close me!]', {
			onclick: () => {
				popup.close();
			},
		}),
	];
}

function Root() {
	return [
		node_dom('button[innerText=Popup]', {
			onclick: () => {
				const popup = open('about:blank', '_blank', 'popup=true');
				popup && init(Popup, popup.document.body, {
					popup,
				});
			},
		}),
	];
}

init(Root);
