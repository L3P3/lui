# lui.js

About 1½ years ago, I was introduced to [React](https://github.com/facebook/react). I like it a lot. However, I soon discovered that you need to load about 100k of code in order to use it. So I was looking for a more minimal approach. This led me to [mithril.js](https://github.com/MithrilJS/mithril.js). Of course, I like it even more, since it only needs about 10k, 1/10 of React. In the last few weeks, I re-invented the wheel and well... lui.js is below 2k.

## Features

- Supports components, just like React, Angular, mithril etc.
- Components get stateful using [hooks](https://reactjs.org/docs/hooks-intro.html)
- Not terribly inefficient
- Will be compatible with down to [Internet Explorer 5](https://en.wikipedia.org/wiki/Internet_Explorer_5)
- Pretty much production ready, in my terms
- Supports error checking and debugging messages in console
- Can be bundled together with application code
- [JSX](https://reactjs.org/docs/introducing-jsx.html) compatible
- Very intuitive way of declaring conditional css classes
- 0 dependencies

## Demo

[Small demonstation app](http://l3p3.de/dev/lui/demo.html), check out its source!

## Getting started

Just download the demo file above and modify it as you like! You may also want to download the `lui.js` file linked in that to prevent breaking changes.

When you are developing your app, use `lui.dev.js` instead to get debugging stuff enabled. When you always want to use the latest lui.js version, just add the following to your HTML file (before your call to `init`, of course):
```html
<script src=//l3p3.de/shr/lui.js></script>
```

PLEASE, do not try to use the uncompiled lui.js in production, it would hurt me badly.

## API

The compiled script file offers a global `lui` object containing these functions:

Function | Description
--- | ---
`init(Body):void` | This mounts the body once, you give it the so-to-say body component. But unlinke actual components, you return the props for the body element and its content. So `Body` looks like this: `function():[body_props: Object, body_content: Array<node>]`
`node(Component, props: Object [, childs: ?Array<node>]):node` | This is how you add child components. If you want to add html components, pass the lowercase tagname in a string as the first argument. If, like html components do, the added component accepts content, you can pass that as the third argument as an array of nodes.
`node_list(Component, props: Object, data: Array)` | When you want to add a component n times for each entry of an array, this is the (proper) way to go. If the array items are objects, the [keys](https://reactjs.org/docs/lists-and-keys.html) are directly taken from an `id` property.
`hook_async(function(...deps):Promise<T>, deps: ?Array):T` | If you need to wait for some data until it is available, use this instead of `hook_memo`.
`hook_delay(msecs: number):boolean` | Turns `true` after the specified delay.
`hook_effect(function(...deps):destroy, deps: ?Array):void` | Run the given function once and every time an `deps` item changes. That function _may_ return another function that gets called before the effect appears again or when the component gets unmounted.
`hook_first():boolean` | This just tells you if this is the first time the component is being rendered.
`hook_memo(function(...deps):T, deps: ?Array):T` | When you need to do some data transformation, put your transformation code inside this hook and it only gets called when a `deps` entry changes.
`hook_object_changes(object):Array<string>` | This gives you a list of properties that changed since the last rendering.
`hook_prev(T, initial: T):T` | If you want to compare something to its version from the previous rendering, use this. At first rendering, `initial` is returned.
`hook_reducer(Array<function>):[value, dispatch]` | If you use a state that has some logic with it, use this.
`hook_reducer_f(reducer, initializer):[value, dispatch]` | This is a bit _simpler_ than the array approach above.
`hook_rerender():void` | When this is called, this component will be rendered again next frame, only intended for _animations_.
`hook_state(T):[value, setter, getter]` | A simple component state. The first argument is the _initial_ value.
`hook_static(T):T` | This is a much cheaper version of `hook_memo`: What you put in it the first time will _always_ come out of it.
`hook_transition(target: number, msecs: number):number` | When `target` changes, the output number will smoothly pass to the new target, taking the specified time for that transition.

### Initialization

You component tree's root is just this one call to `init` where you pass what the body should look like and what you want to be in it. You should call `init` only once but there may be edge cases where you may call it again. But don't. You may be fired otherwise.

### Components

A component is a node of the component tree. Yes, that is not very helpful. But [React's explaination](https://reactjs.org/docs/components-and-props.html) will be!

In lui.js, components are just simple functions. They get the props as the single argument and they return either null or an array of its child components.

### Hooks

Instead of using object oriented syntax like `this.number = 42;` inside components, you call hooks. This may be very confusing at first but when you understand it, it will be very easy to work with.

To understand the concept of hooks, I highly recommend [React's documentation](https://reactjs.org/docs/hooks-intro.html)!

Just in case you did not read all of React's text, one very important thing is: Never change the order in which hooks are called! Never put a hook inside an `if` or `for` or whatever. Hooks may only stand where they will get executed on _each_ rendering! There is one exception, however: You can early-exit in a component, so you can `return null;` before a hook. But I think that will not work in the body component.

Some hooks also exist in React, some don't. And some React hooks I never used.

lui.js | React
--- | ---
hook_async | -
hook_delay | -
hook_effect | [useEffect](https://reactjs.org/docs/hooks-reference.html#useeffect)
hook_first | -
hook_memo | [useMemo](https://reactjs.org/docs/hooks-reference.html#usememo)
hook_object_changes | -
hook_prev | -
hook_reducer | -
hook_reducer_f | [useReducer](https://reactjs.org/docs/hooks-reference.html#usereducer)
hook_rerender | -
hook_state | [useState](https://reactjs.org/docs/hooks-reference.html#usestate)
hook_static | [useRef](https://reactjs.org/docs/hooks-reference.html#useref)
hook_transition | -

## HTML components

There are 3 props you can give to any HTML component, including body:
prop | Description
--- | ---
C: Array<node> | The nodes that should come into it. Instead of as a prop, you can pass this array as the third argument to the `node` function.
F: Object<string, boolean> | An object of applied css classes. Each key with a `true` value will be applied. Others not.
S: Object<string, string> | Pretty much the same as element.style, keys are the css properties, values their values.

## Contribution and Support

I am quite sure that no one wants to know anything of this project but if you have ideas or some other kind of feedback, feel free to open an issue or write me a mail.
