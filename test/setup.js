import { beforeEach } from 'bun:test';
import { JSDOM } from 'jsdom';

// Initial setup for module loading
const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
global.window = dom.window;
global.document = dom.window.document;
global.HTMLElement = dom.window.HTMLElement;
global.Node = dom.window.Node;
global.Element = dom.window.Element;
global.requestAnimationFrame = (callback) => setTimeout(callback, 0);
global.cancelAnimationFrame = clearTimeout;

// Reset DOM before each test to ensure clean state
beforeEach(() => {
	const freshDom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
	global.window = freshDom.window;
	global.document = freshDom.window.document;
	global.HTMLElement = freshDom.window.HTMLElement;
	global.Node = freshDom.window.Node;
	global.Element = freshDom.window.Element;
});

// Helper function to create a unique root element for each test
export const root_create = () => {
	const root = document.createElement('div');
	document.body.appendChild(root);
	return root;
};
