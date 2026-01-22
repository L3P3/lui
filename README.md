# lui.js

When I was introduced to [React](https://github.com/facebook/react), I liked it but soon discovered that browsers need to download about **100k** of code in order to use it. So I switched to [mithril.js](https://github.com/MithrilJS/mithril.js) which weights only about **10k**. In late 2020, I re-invented the wheel and well...

## Features

- Less than **3k** gzip size (about 5k raw)
- **Stateful components** using [hooks](https://react.dev/reference/react)
- Optional **development mode**
- CSS-less **Animations** possible
- **Fast and efficient**, [benchmark](https://krausest.github.io/js-framework-benchmark/current.html)
- 0 dependencies
- No toolchain neccessary
- [TypeScript](https://www.typescriptlang.org) compatible
- [RequireJS](https://requirejs.org) compatible
- [Server-side rendering](https://github.com/L3P3/lui-ssr) possible
- [Template files](https://github.com/L3P3/lui-templates) supported (soon)
- [Production ready](https://softwareengineering.stackexchange.com/questions/61726)
- Compatible with down to [20th century browsers](https://youtu.be/97GrGEZiIWY), basic polyfills included
- Created and actively maintained by a [perfectionist](https://www.webdesignerdepot.com/2010/04/the-ups-and-downs-of-being-a-perfectionist)
- ... and more (see [API](#api))

## Examples

- [minicraft](https://github.com/L3P3/minicraft)
- [Small demonstation app](https://l3p3.de/dev/lui/demo.html)
- [TODO app that runs in IE5](https://l3p3.de/dev/lui/todo-legacy.html), [ssr variant](https://l3p3.de/dev/lui/todo-legacy-static.html), [simpler variant](https://l3p3.de/dev/lui/todo.html)
- [Animated sidebar](https://l3p3.de/dev/lui/app.html)
- [prog](https://l3p3.de/prog)
- [TicTacToe](https://l3p3.de/dev/lui/ttt.html)
- [Text encryption toy](https://l3p3.de/dev/lui/crypto.html)
- [RequireJS](https://l3p3.de/dev/lui/rjs.html)
- [Clock for MS Windows](http://l3p3.de/dev/lui/lui-uhr.hta)

## Getting started

Just download a demo file from above and modify it as you like! Also look into the app files in the `examples` directory. Especially check out minicraft!

> [!TIP]
> While coding, use `lui.dev.js` instead for fancy error detection.

## How to include lui

Just add the following line to your HTML file before where lui is used:

```html
<script src="https://cdn.jsdelivr.net/gh/L3P3/lui@2/lui.js"></script>
```

> [!TIP]
> To not block page loading, add [`defer`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script#defer) to the script tags.

> [!TIP]
> For type information in your code editor, just copy `lui-link.js` and `index.d.ts` from this repo into your project, rename them to `lui.js` and `lui.d.ts` and import from the `js` file.

## Variants

There are several features represented in dedicated variants of lui. These features are:

Feature | Description
------- | ---
x | Extended variant, includes [some nice ui features](#full-api) not needed by most apps
r | Loaded by RequireJS, [read more](#include-lui-via-requirejs)
dev | Includes many error checks and prints helpful messages into the console
legacy | Supports old browsers down to IE5, [read more](#legacy-variant)
noeval | Does not generate code at runtime, [read more](#noeval-variant)

To see which combinations exist, see [the dist branch](https://github.com/L3P3/lui/tree/dist). If you need a combination that is not yet there, contact me.

## API

When using the standalone file mentioned above, it registers a global `lui` object containing all functions mentioned here.

When the app is transpiled/bundled, use a wrapper as explained [above](#how-to-include-lui).

To bundle lui itself with your app, just `import {...} from 'lui'`. Learn more [here](#bundle-lui-with-your-app).

### Components

A component is a function which takes props and returns a list of its child nodes. Components can be instantiated as nodes in other components. By recursion, you can build up a dom tree in a very flexible way. I also recommend reading [React's explaination](https://react.dev/learn/your-first-component).

Here is a very simple component. It takes two props (`color` is optional) and it consists of just one node.

```js
function ColoredText({
	color = 'red',
	text,
}) {
	return [
		node_dom('span', {
			S: {color},
			innerText: text,
		}),
	];
}
```

To have child components, you have to return nodes. It does not matter where you create nodes as long as you always return them in the same order in components. In order to not use a node, return a boolean or something falsy in its place.

In the above example, we use the `span` [dom component](#dom-components). If you want to use a custom component like `ColoredText` above, just refer to it like this:

```js
function BlueText({
	text,
}) {
	return [
		node(ColoredText, {
			color: 'blue',
			text,
		}),
	];
}
```

### Variable number of child nodes

If you want to map an array with changing order or length to a list of components, use `node_map` instead of calling `node` for each item to keep the invariant that nodes must have a stable order.

The component you pass to `node_map` gets mounted for each item of the array you pass to it. The component gets a prop `I` containing the corresponding array item. If you pass props as the third argument, every child will get them in addition to `I`.

> [!IMPORTANT]
> Allowed array items are numbers, strings and objects. If you pass objects, they must have an unique `id` property. There must not be two items of the same value or id.

### DOM components

The leaves of your component tree are mostly made out of native dom elements. To use such a component, use `node_dom` instead of `node`. The signature is the same, except for the first argument being a descriptor, similar to css selectors: `tagName[attr1=value][attr2][...]`

The `tagName` is required but number and order of attributes are optional. Having static attributes in the descriptor instead of in the props improves efficiency (re-using of nodes, reduced diffing). For that reason, always sort attributes alphabetically.

Props are strings directly mapped to dom attributes, except these 4 special non-string props:

prop | Description
--- | ---
`C: Array<node>` | The nodes that should come into it. Instead of as a prop, you can pass this array as the third argument to the `node` function.
`D: Object<string, *>` | `element.dataset` mapping object, to set `data-` attributes.
`F: Object<string, boolean>` | An object of applied css classes. Each key with a `true` value will be applied. Others not.
`R: function(HTMLElement)` | This function is given the instance's dom element after it is created.
`S: Object<string, string>` | `element.style` mapping.

> [!TIP]
> For inline css, css classes and data attributes, use these special props!

### Virtual components

When you wanna use hooks for component-like abstraction without always having to return nodes as in components, lui offers `hook_sub` and `hook_map`. They are a mixture of `hook_memo` with `node` and `node_map`, respectively. But that's some high-level shit; average Joe won't really need (nor understand) it.

### Initialization

The component tree's root is defined by just the one and only call to `init`. It gets passed your root component.

To set attributes on the root element itself, use `hook_dom`. In old lui versions, we returned `[host attributes, childs]` in root components but that was stupid.

```js
init(() => {
	hook_dom('', {
		S: {background: 'black'},
	});
	return [
		node(BlueText, {
			text: 'Hello, world!',
		}),
	];
});
```

By default, the body is used as the root element. You can also specify another one as the second argument to `init`.

Optionally, static props to the root component can also be passed as a third argument.

> [!WARNING]
> After calling `init` on a root element, leave it and its content alone. It belongs to lui now.

### DOM templates

Instead of defining all the dom elements in your components, you can define them once and then use them as templates. This is especially useful for elements that have many/long attributes. Reference them by their handle, prefixed with `#`.

```js
dom_define('my-button', 'button[disabled]');

// ...

node_dom('#my-button', {
	innerText: 'Try to click me!',
});
```

### JSX

If you are building your application code with [JSX](https://react.dev/learn/writing-markup-with-jsx) support, you _could_ theoretically write components like this:

```js
function YellowText({
	text,
}) {
	return (
		<span style="color: yellow">{text}</span>
	);
}
```

However, you need to set up babel and the jsx plugin properly and I have not tried that yet. The plugin must use `node` or `node_dom` instead of `React.createElement`. And nodes must always be supplied in a flat array. Personally, I am not interested in that feature.

### Hooks

Instead of using object oriented syntax like `this.number = 42;` (or `this.setNumber(42);` allowing automatic updates) inside components, you call hooks. Actually, from application code, there is no way to access component _instances_ at all! This may be very confusing at first but once you understood it, it will be very easy to work with.

**Stateful hooks** are identified by their _calling order_ per instance. Keep that order by never placing a hook in an `if`, a loop or a `switch` body – unless their condition, item order or key will stay the same per instance.

**Stateless hooks** (`hook_assert` and `hook_rerender`) may be called anywhere in your component.

> [!WARNING]
> Placing any hook in a callback/if/loop is not allowed. Only use them directly in component functions.

### Comparision with React's Hooks

I highly recommend [React's documentation about hooks](https://react.dev/reference/react) since their concept is very similar.

But while some hooks also exist in React, some do not. And on the other hand, I never used some hooks so I did not implement them. Please note that there are differences in behaviour. For example, in lui deps actually _are_ passed as arguments while in React, they are not.

lui | React
--- | ---
`hook_assert` | -
`hook_async` | -
`hook_callback` | [useCallback](https://react.dev/reference/react/useCallback)
`hook_delay` | -
`hook_dom` | -
`hook_effect` | [useEffect](https://react.dev/reference/react/useEffect)
`hook_map` | -
`hook_memo` | [useMemo](https://react.dev/reference/react/useMemo)
`hook_model` | [useReducer](https://react.dev/reference/react/useReducer)
`hook_object_changes` | -
`hook_prev` | -
`hook_rerender` | -
`hook_state` | [useState](https://react.dev/reference/react/useState)
`hook_static` | [useRef](https://react.dev/reference/react/useRef)
`hook_sub` | -
`hook_transition` | -

### State machine

For more complex component/app states than simple primitives like `number` or `boolean`, I highly recommend to use a model, together with transformations. If you already know Redux, then yes, it is just like Redux. If not, [see here](https://redux.js.org/introduction/core-concepts).

To have a state machine in lui, use `hook_model`. To this hook, you pass a set of transformation functions. All of them get the current state and return the new state, no modifications of the current state are allowed in order to allow for efficient change detection. Keep in mind that these transformations must be [pure functions](https://en.wikipedia.org/wiki/Pure_function), so no side effects are allowed. Their only effects/changes appear in their return value!

You can find a good practical example [here](https://github.com/LFF5644/site-Wecker/blob/master/app.js#L51). Here is another one, generated by [ChatGPT](https://chat.openai.com):

```js
const { hook_model, init, node, node_dom } = lui;

const model = {
	init: () => 0,
	increment: state => state + 1,
	decrement: state => state - 1,
};

function Counter() {
	const [count, { increment, decrement }] = hook_model(model);

	return [
		node_dom('div', null, [
			node_dom('span', { innerText: `Count: ${count}` }),
			node_dom('button[innerText=Increment]', { onclick: increment }),
			node_dom('button[innerText=Decrement]', { onclick: decrement }),
		]),
	];
}

init(Counter);
```

Just copy this code into ChatGPT and let it explain this, it does a really good job in that!

### Callbacks

If a function is passed as a prop (eg. for event handlers), it should be defined outside of the component, so it will not get redefined on each rendering.

If the callback requires something from your component, wrap it in `hook_callback`. This way, the child component does not update on each render call since `new Function() !== new Function()`.

This _may_ just have a small impact on performance and you may as well just use closures as the React guys are doing it. Modern browsers are quite efficient in frequent function definitions. But older browsers would heavily profit from externalizing function definitions.

### Accessing dom elements

In React, you pass an object to [dom components](#dom-components) via the prop `ref`. In lui, you pass a function (eg. a setter) via the prop `R`. This way, you can get properties of the element or manipulate it in a way impossible via the props provided by dom components.

### Early exit

When the component relies on some kind of condition or possibly unresolved promise, you may use `hook_assert` to interrupt the rendering. Here is an example for the first:

```js
function UserName({
	id,
}) {
	const name = hook_async(user_name_get, [id]);
	hook_assert(name !== null);
	const NAME = name.toUppercase();
	return [
		node_dom('span[className=user-name]', {
			innerText: NAME,
			title: name,
		}),
	];
}
```

Here, `user_name_get` is an _async_ function, meaning it returns a promise. When the promise is not yet resolved, this component will just not display anything. Also notice the `NAME` line: Without `hook_assert`, we would get an error, since we cannot call methods on `null`.

When you already know that the condition will be false, just call it like this: `hook_assert();` This is similar to `return null;` but it can be called in _any_ component (including root) or hook.

### Merging updates

By default, every state change gets rendered synchronously. In most cases, this is very useful. When a state is set, the view will already be updated when the setter returns.

However, in some rare cases, multiple (or many) setters are called in one go, causing many redundant rerenders. To prevent this and rerender all changes in one single go, use the `defer` method like this:

```js
function someEvent(value) {
	defer();
	foo_set(value);
	bar_set(value);
}
```

When `someEvent` is called, lui will rerender only once instead of twice. The rendering will happen at the next frame. When you need it to happen instantly, call `defer_end` after your state mutations. See [React's article](https://react.dev/learn/queueing-a-series-of-state-updates) about merged/batched updates.

### Full API

For the exact signatures, see [the typescript definition file](index.d.ts)! You should somehow integrate it into your project anyway, so your IDE will show you the types automatically.

The third column says if that function is included in the core variant `lui.js` or if you need to use the extended variant `luix.js`. (Only needed when using the [script tag method](#how-to-include-lui) above. See [variants](#variants).)

Function | Description | V
--- | --- | ---
`defer()` | Disables synchronous rerenders until the next frame. | C
`defer_end()` | Enables synchronous rerenders again and rectifies deferred updates. | C
`dom_define(handle, descriptor, props{})` | Defines a [dom template](#dom-templates). | C
`hook_assert(boolean)` | When the condition is falsy, rendering of the current component is interrupted. May be used for error handling or anything else. | C
`hook_async((...deps)=>Promise<T>, deps[], fallback):T` | If you need to wait for some data until it is available, use this instead of `hook_memo`. As long as the promise is pending, `fallback` is returned. If no fallback is given, either `null` or the latest value is returned. | C
`hook_callback(function, deps[]):function` | Returns a function that never changes. It passes all arguments down to the given function after the `deps`. Use this when you need to pass a callback as props that needs `deps`. If that callback is independent of the current component (has no `deps`), move the callback out of the component. | E
`hook_delay(msecs):boolean` | Turns `true` after the specified delay. | E
`hook_dom(descriptor, props{}):element` | Alternative to a single `node_dom` child. Returned childs will be wrapped by this element. Must not be skipped or called twice per component. Can also be used to access the root element. | C
`hook_effect((...deps)=>destroy, deps[])` | Run the given function once and every time an `deps` item changes. That function _may_ return another function that gets called before the effect appears again or when the component gets unmounted. | C
`hook_map((item, ...deps)=>T, items[], deps[]):T[]` | Like `hook_sub` but for each data item as in `node_map`. | E
`hook_memo((...deps)=>T, deps[]):T` | When you need to do some data transformation, put your transformation code inside this hook and it only gets called when a `deps` entry changes. | C
`hook_model({init, ...}):[value, {...}]` | If you use a state that has some logic with it, use this. This replaces `hook_reducer`. | C
`hook_object_changes(object):keys[]` | This gives you a list of properties that changed since the last rendering. | E
`hook_prev(current, initial):prev` | If you want to compare something to its version from the previous rendering, use this. At first rendering, `initial` is returned. | C
`hook_rerender()` | When this is called, this component will be rendered again next frame, only intended for _animations_. | C
`hook_state(initial):[value, setter(), getter()]` | A simple component state. The first argument is the _initial_ value. | C
`hook_static(initial):initial` | This is a much cheaper version of `hook_memo`: What you put in it the first time will _always_ come out of it. | C
`hook_sub((...deps)=>T, deps[]):T` | Like `hook_memo` but the getter function may be swapped and it may contain hooks. | E
`hook_transition(target, msecs):current` | When `target` changes, the output number will smoothly pass to the new target, taking the specified time for that transition. | E
`init(RootComponent, root_element, props)` | This mounts the body (or root_element) once, you pass it your root component. | C
`node(Component, props{}, childs[]):node` | This is how you add child components. If the added component accepts childs (`C` prop), you can pass that as the third argument as an array of nodes. | C
`node_dom('descriptor', attrs{}, childs[]):node` | When you want to add dom components, use this function. It is very similar to `node` but needs a descriptor instead. | C
`node_map(Component, data[], props{})` | When you want to add a component n times for each entry of an array, this is the (proper) way to go. If the array items are objects, the [keys](https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key) are directly taken from an `id` property. | C
`now():number` | The _relative_ point of time of the latest rerendering call. Do not use this as persistent time reference but just inside of run time. Useful for custom animations. | C

## Alternative ways to use lui

Maybe you want to use lui in a more special case. No problem!

### Bundle lui with your app

You can simply run `npm install https://github.com/l3p3/lui` to install it. Later, when lui ist complete enough, I may add it to npm as well.

> [!CAUTION]
> When bundling for production, you should make sure to automatically set `DEBUG` to `false` in `node_modules/lui/src/flags.js`. If that is not done, the result will be bigger and slower.

> [!IMPORTANT]
> Please do NOT try to use the uncompiled `src/lui.js` in production! It is written specifically for being compiled.

### Include lui via RequireJS

Normally, lui controls the entire page. But it is also possible to dynamically load lui and let it control just a part of the page. This is useful if you work on a big project like Magento and want to use lui.

```js
require.config({
	map: {
		'*': {
			'lui': 'https://cdn.jsdelivr.net/gh/L3P3/lui@2/lui.r.js'
		}
	}
});
```

Use `lui.r.dev.js` when developing. And here is your widget's file:

```js
define(['lui'], function(lui) {
	var init = lui.init;
	var node_dom = lui.node_dom;

	function Root() {
		return [
			node_dom('h1[innerText=Moin!]')
		];
	}

	return function(root) {
		init(Root, root);
	};
});
```

This variant supports older browsers.

### Legacy variant

In case you want to support browsers down to Internet Explorer 5, you can use the legacy variant `lui.legacy.js`. It has many tiny polyfills included so you do not need to care about that stuff.

Of course, your code still needs to have the most basic _syntax_, so no arrow functions, no `const` or `let`, no deconstructing, no trailing commas and so on. Transpilers like closure compiler with the target set to ES3 take care of most of that. But you can out of the box use _methods_ like `[].map`, `Object.assign` or `fn.apply()`. And yes, IE5 does not come with that! In order to not get a second set of polyfills from your transpiler, [set it up to not include them](https://github.com/google/closure-compiler/wiki/Polyfills).

When using lui's polyfills, note that they are not complete or true to specification at all but just made to make lui itself work. Many methods are not included and some have some restrictions thay _may_ cause issues in unusual use cases. Polyfills already take up about a quarter of the file so I want to keep them small, but pretty fast.

See the [demo section](#demos) for examples.

### Noeval variant

Some websites forbid libraries generating code at runtime. This library uses this cool feature to speed up some things but if you cannot use lui due to CSP, use this variant.

It may be slightly slower in theory but probably you would not notice the difference in practice.

Check out this example with restrcting CSP: [normal lui](https://l3p3.de/dev/lui/todo-legacy.html?noeval=0) and [noeval lui](https://l3p3.de/dev/lui/todo-legacy.html?noeval=1). See the console and network tab to see what happens in the background.

See [#50](https://github.com/L3P3/lui/issues/50) for some background.

## Contribution and Support

I am quite sure that no one wants to know anything of this project but if you have ideas or some other kind of feedback, feel free to open an issue, pull request or write me a mail.
