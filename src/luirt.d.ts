/**
	Type definitions for lui
	@author Johann Laur <jl.01@icloud.com>
	@author L3P3 <dev@l3p3.de>
*/

declare namespace lui {
	/**
		Data mapped to a child instance's `I` prop
	*/
	type NodeData = (string | number | { id: (string | number) });

	type NodeDataOptional = NodeData | void;

	/**
		Child instance symbol, should not be modified but can be cached
	*/
	interface LuiNode {}

	/**
		List of child instance symbols, an entry can be replaced with `true`, `false` or `null` to skip it
	*/
	type LuiNodeList = (LuiNode | boolean | null)[];

	/**
		Descriptor for dom elements using following syntax:
		`element[attr1=value][attr2=value]`
	*/
	type DomDescriptor = string;

	/**
		Data passed from a parent to a child instance
	*/
	interface Props<T extends NodeDataOptional> {
		/**
			Nodes to be put inside the component instance
		*/
		C?: LuiNodeList,
		/**
			Data item for this instance when mounted by node_map
		*/
		I: T,
		[key: string]: any
	}

	type PropsOptional<T extends NodeDataOptional> = Props<T> | null;

	/**
		Attributes passed to dom hooks
	*/
	interface Attrs extends Omit<HTMLElement, 'style'> {
		/**
			CSS classes and their conditions
		*/
		F?: { [key: string]: boolean },
		/**
			CSS properties and their values
		*/
		S?: CSSStyleDeclaration,
		/**
			CSS properties as string
		*/
		style?: string
	}

	/**
		Attributes passed to dom nodes
	*/
	interface AttrsNode extends Attrs {
		/**
			Nodes to be put inside the dom instance
		*/
		C?: LuiNodeList,
		/**
			Reference setter for element
		*/
		R?: (element: HTMLElement) => void
	}

	/**
		View element with its own logic, its instances will have their own state
	*/
	type Component<T extends NodeDataOptional, U extends PropsOptional<T>> = (props: U) => LuiNodeList;

	/**
		Conditionally interrupt the instance's rendering process
	*/
	export function hook_assert(condition: boolean): void;

	/**
		Wait for data until it is available, until then the fallback will be returned if specified
	*/
	export function hook_async<T, U extends any[]>(getter: (...deps: U) => Promise<T>, deps?: U, fallback?: T): T;

	/**
		Returns a persistent function to prevent pointless updates
	*/
	export function hook_callback<T extends any[], U extends any[], V>(callback: (...depsargs: [...U, ...T]) => V, deps?: U): (...args: T) => V;

	/**
		Turns `true` after the specified delay
	*/
	export function hook_delay(msecs: number): boolean;

	/**
		Alternative to a single `node_dom` wrapping the returned childs, must not be skipped if present
	*/
	export function hook_dom(descriptor: DomDescriptor, attrs?: Attrs): HTMLElement;

	/**
		Call a function and redo it on deps change, _unmount_ function can be returned
	*/
	export function hook_effect<T extends any[]>(callback: (...deps: T) => (void | ((...deps: T) => void)), deps?: T): void;

	/**
		Returns whether the component is being rendered for the first time
	*/
	export function hook_first(): boolean;

	/**
		Transform data and redo it on deps change
	*/
	export function hook_memo<T extends any[], U>(getter: (...deps: T) => U, deps?: T): U;

	/**
		List of changed properties since previous rendering
	*/
	export function hook_object_changes(object: Object): string[];

	/**
		Returns the value from previous rendering
	*/
	export function hook_prev<T>(value: T, initial?: T): T;

	/**
		Model state with set of methods, the first returning the initial state
	*/
	export function hook_reducer<T, U extends any[]>(mutations: ((current: T, ...args: U) => T)[]): [value: T, dispatch: (index: number, ...args: U) => void];

	/**
		Model state with just one method
	*/
	export function hook_reducer_f<T, U extends any[]>(reducer: (current: T, ...args: U) => T, initializer?: () => T): [value: T, dispatch: (...args: U) => void];

	/**
		Request rerendering for the next display refresh
	*/
	export function hook_rerender(): void;

	/**
		Simple state containment
	*/
	export function hook_state<T>(initial?: T): [value: T, setter: (value: T) => void, getter: () => T];

	/**
		Returns the value from first rendering
	*/
	export function hook_static<T>(initial: T): T;

	/**
		hook_memo with switchable getter and contained hooks support
	*/
	export function hook_sub<T extends any[], U>(getter: (...deps: T) => U, deps?: T): U;

	/**
		Transitions value over given delay
	*/
	export function hook_transition(target: number, msecs: number): number;

	/**
		Mounts root component on document's body
	*/
	export function init(body: () => [bodyProps: PropsOptional<void>, bodyContent: LuiNodeList]): void;

	/**
		Component instantiation
	*/
	export function node<T extends PropsOptional<void>>(component: Component<void, T>, props?: T | null, children?: LuiNodeList): LuiNode;

	/**
		DOM element instantiation
	*/
	export function node_dom(descriptor: DomDescriptor, attrs?: AttrsNode, children?: LuiNodeList): LuiNode;

	/**
		Dynamic component instantiation from data array
	*/
	export function node_map<T extends NodeData, U extends Props<T>>(component: Component<T, U>, data: T[], props?: U): LuiNode;

	/**
		Reference time of current rendering
	*/
	export function now(): number;
}
