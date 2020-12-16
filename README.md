# lui.js

When I was introduced to [React](https://github.com/facebook/react), I liked it but soon discovered that browsers need to download about **100k** of code in order to use it. So I switched to [mithril.js](https://github.com/MithrilJS/mithril.js) which weights only about **10k**. In late 2020, I re-invented the wheel and well...

## Features

- Under **5k** code size (<3k compressed)
- **Stateful components** using [hooks](https://reactjs.org/docs/hooks-intro.html)
- Will be **compatible** with down to [Internet Explorer 5](https://en.wikipedia.org/wiki/Internet_Explorer_5)
- Optional **development mode**
- **Animations** integrated
- Conditional css classes on elements
- Not terribly inefficient
- Can be bundled together with your application
- 0 dependencies
- Almost production ready

## Demo

[Small demonstation app](https://l3p3.de/dev/lui/demo.html), check out its source!

[TODO app](https://l3p3.de/dev/lui/todo.html)

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

A component is a function which takes props and returns a list of its child components. By recursion, you can build up a dom tree in a very flexible way. I also recommend reading [React's explaination](https://reactjs.org/docs/components-and-props.html).

Here is a very simple component. It takes two props (one of which is optional) and it contains just one node.

```js
function ColoredText({
    color = 'red',
    text
}) {
    return [
        node_dom(
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

In the above example, we use the `span` [dom component](#dom-components). If you want to use a custom component like `ColoredText` above, just refer to it like this:

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

The component you pass to `node_list` gets mounted for each item of the array you pass to it. The component gets a prop `I` containing the corresponding array item. If you pass props as the third argument, every child will get them in addition to `I`.

Allowed array items are numbers, strings and objects. If you pass objects, they must have an unique `id` property. There must not be two items of the same value or id.

### DOM components

The leaves of your component tree are mostly made out of native dom elements. To use such a component, use `node_dom` instead of `node`. The signature is the same, except for the first argument being a descriptor, similar to css selectors: `tagName[attr1=value][attr2][...]`

The `tagName` is required but number and order of attributes are optional. Having static attributes in the descriptor instead of in the props improves efficiency (re-using of nodes, reduced diffing).

Props are directly mapped to dom attributes, except these 4 special props:
prop | Description
--- | ---
`C: Array<node>` | The nodes that should come into it. Instead of as a prop, you can pass this array as the third argument to the `node` function.
`F: Object<string, boolean>` | An object of applied css classes. Each key with a `true` value will be applied. Others not.
`R: function(HTMLElement)` | This function is given the instance's dom element after it is created.
`S: Object<string, string>` | Pretty much the same as element.style, keys are the css properties, values their values.

### Initialization

The component tree's root is defined by just the one and only call to `init`. It gets a callback which then returns the body props and its childs.

The (virtual) body component is an dom component, so the same rules as above apply to the props object returned by the root component. Except for the `C` prop since body childs must be returned separately.

What we pass to init is pretty much a component without incoming props, a different return value and [early exit](#early-exit) is prohibited.

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

If you are building your application code with [JSX](https://reactjs.org/docs/introducing-jsx.html) support, you _could_ theoretically write components like this:

```js
function YellowText({
    text
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

**Stateless hooks** (`hook_assert`, `hook_first` and `hook_rerender`) may be called anywhere in your component.

Using any hook in a **callback** is probably a very bad idea.

### Comparision with React's Hooks

I highly recommend [React's documentation about hooks](https://reactjs.org/docs/hooks-intro.html) since their concept is very similar.

But while some hooks also exist in React, some do not. And on the other hand, I never used some hooks so I did not implement them. Please note that there are differences in behaviour. For example, in lui deps actually _are_ passed as arguments while in React, they are not.

lui | React
--- | ---
`hook_assert` | -
`hook_async` | -
`hook_await` | -
`hook_callback` | [useCallback](https://reactjs.org/docs/hooks-reference.html#usecallback)
`hook_delay` | -
`hook_dom` | -
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

### Accessing dom elements

In React, you pass an object to [dom components](#dom-components) via the prop `ref`. In lui, you pass a function (eg. a setter) via the prop `R`. This way, you can get properties of the element or manipulate it in a way impossible via the props provided by dom components.

### Early exit

When the component relies on some kind of condition or possibly unresolved promise, you may use `hook_assert` or `hook_await` to interrupt the rendering. Here is an example for the first:

```js
function UserName({
    id
}) {
    const name = hook_async(user_name_get, [id]);
    hook_assert(name !== null);
    const NAME = name.toUppercase();
    return [
        node_dom(
            'span[className=user-name]',
            {
                innerText: NAME,
                title: name
            }
        )
    ];
}
```

Here, `user_name_get` is an _async_ function, meaning it returns a promise. When the promise is not yet resolved, this component will just not display anything. Also notice the `NAME` line: Without `hook_assert`, we would get an error, since we cannot call methods on `null`.

When you already know that the condition will be false, just call it like this: `hook_assert();` This is similar to `return null;` but it can be called in _any_ component (including root) or hook.

### Full API

Function | Description
--- | ---
`init(Body):void` | This mounts the body once, you give it the so-to-say body component. But unlinke actual components, you return the props for the body element and its content. So `Body` looks like this: `function():[body_props: Object, body_content: Array<node>]`
`node(Component, props: ?Object=, childs: ?Array<node>=):node` | This is how you add child components. If the added component accepts childs (`C` prop), you can pass that as the third argument as an array of nodes.
`node_dom(descriptor: string, props=, childs=):node` | When you want to add dom components, use this function. It is very similar to `node` but needs a descriptor instead.
`node_list(Component, data: Array, props: Object=)` | When you want to add a component n times for each entry of an array, this is the (proper) way to go. If the array items are objects, the [keys](https://reactjs.org/docs/lists-and-keys.html) are directly taken from an `id` property.
`now():number` | The _relative_ point of time of the latest rerendering call. Do not use this as persistent time reference but just inside of run time. Useful for custom animations.
`hook_assert(condition: boolean):void` | When the condition is falsy, rendering of the current component is interrupted. May be used for error handling or anything else.
`hook_async(function(...deps):Promise<T>, deps: ?Array, fallback):T` | If you need to wait for some data until it is available, use this instead of `hook_memo`. As long as the promise is pending, `fallback` is returned. If no fallback is given, either `null` or the latest value is returned.
`hook_await(promise):void` | As long as the promise is not resolved yet, rendering of the current component will be interrupted here.
`hook_callback(function, deps):function` | Returns a function that never changes. It passes all arguments down to the given function after the `deps`. Use this when you need to pass a callback as props that needs `deps`. If that callback is independent of the current component (has no `deps`), move the callback out of the component.
`hook_delay(msecs: number):boolean` | Turns `true` after the specified delay.
`hook_dom(descriptor, props=):dom` | Alternative to a single `node_dom` child. Returned childs will be wrapped by this element. Must not be skipped or called twice per component.
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
