import {
	init,
	node_dom,
} from '../src/lui.js';

init(() => {
	return [
		node_dom('div[id=root][innerText=FAIL]'),
	];
});

init(() => {
	return [
		node_dom('h1[innerText=PASS]'),
	];
}, document.querySelector('#root'));
