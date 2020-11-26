# lui.js

When I was introduced to [React](https://github.com/facebook/react), I liked it but soon discovered that browsers need to download about **100k** of code in order to use it. So I switched to [mithril.js](https://github.com/MithrilJS/mithril.js) which weights only about **10k**. In late 2020, I re-invented the wheel and well...

## Features

- Under **4k** code size (<2k compressed)
- **Stateful components** using [hooks](https://reactjs.org/docs/hooks-intro.html)
- Will be **compatible** with down to [Internet Explorer 5](https://en.wikipedia.org/wiki/Internet_Explorer_5)
- Offers **development mode**
- Can be **bundled** together with your application
- Compatible with [**JSX**](https://reactjs.org/docs/introducing-jsx.html)
- Conditional css classes on elements
- Not terribly inefficient
- 0 dependencies
- Almost production ready

## Demo

[Small demonstation app](https://l3p3.de/dev/lui/demo.html), check out its source!

## Getting started

Just download the demo file above and modify it as you like!

When you are developing your app, use `lui.dev.js` instead to get debugging stuff enabled.

Before serious consideration, check out the issues to see if there is some crucial feature not working (yet).

## How to get lui

There are several ways to include lui into your project:

### Load the latest standalone from my server

When you want to automatically include the latest version, just add the following to your HTML file:

```html
<script src=https://l3p3.de/shr/lui.js></script>
```

### Host the standalone by yourself

When load speed, reliability or privacy is important enough, you should mirror the released file whereever you want. You can find it and some details on the [releases page](https://github.com/L3P3/lui/releases).

### Bundle lui with your app

I will add lui to npm later so that you can simply `npm install` it. The following method is not really recommended but a temporary workaround.

When you want to store everything in just one file (eg. by using [closure compiler](https://github.com/google/closure-compiler)), just place `src/lui.js` anywhere reasonable and import from it whenever you need to.

Please do NOT try to use the uncompiled `src/lui.js` in production!

## API

When using the standalone file mentioned above, that script file registers a global `lui` object containing all functions mentioned here.

If you bundle lui together with your app, you can access these functions by a simple `import` statement.

### Components

A component is a function which takes props and returns a list of its child components. Any html descriptor can be used as a component but you can also create your own components for abstraction. By recursion, you can build up a html tree in a very flexible way. I also recommend reading [React's explaination](https://reactjs.org/docs/components-and-props.html).

Here is a very simple component. It takes two props (one of which is optional) and it contains just one node.

```js
function ColoredText({
    color = 'red',
    text
}) {
    return [
        node(
            'span',
            {
                S: {color},
                innerText: text
            }
        )
    ];
}
```

To have child components, you have to return nodes. It does not matter where you create nodes as long as you always return them in the same order in components. In order to not use a node, return a boolean or something falsy in its place.

In the above example, we use the `span` [html component](#html-components). If you want to use a custom component like `ColoredText` above, just refer to it like this:

```js
function BlueText({
    text
}) {
    return [
        node(
            ColoredText,
            {
                color: 'blue',
                text
            }
        )
    ];
}
```

### Variable number of child nodes

If you want to map an array with changing order or length to a list of components, use `node_list` instead of calling `node` for each item to keep the invariant that nodes must have a stable order.

### HTML components

If you pass a string to the `node` function, an html component is used instead of a custom one.

There are 4 special props you can give to any HTML component, including body:
prop | Description
--- | ---
`C: Array<node>` | The nodes that should come into it. Instead of as a prop, you can pass this array as the third argument to the `node` function.
`F: Object<string, boolean>` | An object of applied css classes. Each key with a `true` value will be applied. Others not.
`R: function(HTMLElement)` | This function is given the instance's html element after it is created.
`S: Object<string, string>` | Pretty much the same as element.style, keys are the css properties, values their values.

### Initialization

The component tree's root is defined by just the one and only call to `init`. It gets a callback which then returns what the body should look like and contain.

This callback is pretty much a component but unlike them, it returns the body element's props in addition to the child nodes.

```js
init(() => {
    return [
        {
            S: {background: 'black'}
        },
        [
            node(BlueText, {text: 'Hello, world!'})
        ]
    ];
});
```

This approach is neccessary since there is no `body` component to use.

### JSX

If you are building your application code with [JSX](https://reactjs.org/docs/introducing-jsx.html) support, you can write components like this, theoretically:

```js
function YellowText({
    text
}) {
    return (
        <span style="color: yellow">{text}</span>
    );
}
```

However, you need to set up babel and the jsx plugin properly and I have not tried that yet. The plugin must use `node` instead of `React.createElement`. And nodes must always be supplied in a flat array. Personally, I am not interested in that feature.

### Hooks

Instead of using object oriented syntax like `this.number = 42;` inside components, you call hooks. Actually, from application code, there is no way to access component instances at all! This may be very confusing at first but once you understood it, it will be very easy to work with.

**Stateful hooks** are identified by their _calling order_ per instance. Keep that order by never placing a hook in an `if`, a loop or a `switch` body – unless their condition, item order or key will stay the same per instance.

**Stateless hooks** (`hook_first` and `hook_rerender`) may be called anywhere in your component.

Using any hook in a **callback** is probably a very bad idea.

### Comparision with React's Hooks

I highly recommend [React's documentation about hooks](https://reactjs.org/docs/hooks-intro.html) since their concept is very similar.

But while some hooks also exist in React, some do not. And on the other hand, I never used some hooks so I did not implement them. Please note that there are differences in behaviour. For example, in lui deps actually _are_ passed as arguments while in React, they are not.

lui | React
--- | ---
`hook_async` | -
`hook_callback` | [useCallback](https://reactjs.org/docs/hooks-reference.html#usecallback)
`hook_delay` | -
`hook_effect` | [useEffect](https://reactjs.org/docs/hooks-reference.html#useeffect)
`hook_first` | -
`hook_memo` | [useMemo](https://reactjs.org/docs/hooks-reference.html#usememo)
`hook_object_changes` | -
`hook_prev` | -
`hook_reducer` | -
`hook_reducer_f` | [useReducer](https://reactjs.org/docs/hooks-reference.html#usereducer)
`hook_rerender` | -
`hook_state` | [useState](https://reactjs.org/docs/hooks-reference.html#usestate)
`hook_static` | [useRef](https://reactjs.org/docs/hooks-reference.html#useref)
`hook_transition` | -

### Callbacks

If a function is passed as a prop (eg. for event handlers), it should be defined outside of the component, so it will not get redefined on each rendering.

If the callback requires something from your component, wrap it in `hook_callback`. This way, the child component does not update on each render call since `new Function() !== new Function()`.

This _may_ just have a small impact on performance and you may as well just use closures as the React guys are doing it. Modern browsers are quite efficient in frequent function definitions. But older browsers would heavily profit from externalizing function definitions.

### Accessing the html element

In React, you pass an object to [html components](#html-components) via the prop `ref`. In lui, you pass a function (eg. a setter) via the prop `R`. This way, you can get properties of the element or manipulate it in a way impossible via the props provided by html components.

### Early exit

If a component decides that it should not (yet) mount anything, it may `return null;` (early-exit) at any time, even before some hooks were reached.

### Full API

Function | Description
--- | ---
`init(Body):void` | This mounts the body once, you give it the so-to-say body component. But unlinke actual components, you return the props for the body element and its content. So `Body` looks like this: `function():[body_props: Object, body_content: Array<node>]`
`node(Component, props: Object [, childs: ?Array<node>]):node` | This is how you add child components. If you want to add html components, pass the lowercase tagname in a string as the first argument. If, like html components do, the added component accepts content, you can pass that as the third argument as an array of nodes.
`node_list(Component, props: Object, data: Array)` | When you want to add a component n times for each entry of an array, this is the (proper) way to go. If the array items are objects, the [keys](https://reactjs.org/docs/lists-and-keys.html) are directly taken from an `id` property.
`now():number` | The _relative_ point of time of the latest rerendering call. Do not use this as persistent time reference but just inside of run time. Useful for custom animations.
`hook_async(function(...deps):Promise<T>, deps: ?Array):T` | If you need to wait for some data until it is available, use this instead of `hook_memo`.
`hook_callback(function, deps):function` | Returns a function that never changes. It passes all arguments down to the given function after the `deps`. Use this when you need to pass a callback as props that needs `deps`. If that callback is independent of the current component (has no `deps`), move the callback out of the component.
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

## Contribution and Support

I am quite sure that no one wants to know anything of this project but if you have ideas or some other kind of feedback, feel free to open an issue or write me a mail.
