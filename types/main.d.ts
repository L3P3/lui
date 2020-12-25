// Main type definitions for Lui
//
// Version: 0.1.0

// Type Aliases
type NodeData = (string | number | { id: (string | number) });

type NodeDataList = string[] | number[] | { id: string }[] | { id: number }[];

type LuiNode = Object;

type LuiNodeList = (LuiNode | boolean | null)[];

type Component<T extends Props> = (props: T | null) => LuiNodeList;

/**
 * Descriptor for dom tags using following syntax:
 * 'element[attr1=value][attr2=value]'
 */
type TagDescriptor = string;

interface Props {
    C: void | LuiNodeList,
    F: void | { [key: string]: boolean },
    R: void | ((element: HTMLElement) => void),
    S: void | { [key: string]: string },
    I: void | NodeData,
    [key: string]: any
}

// Library Namespace
declare namespace lui {
    /**
     * Conditionally interrupt the component's rendering process
     */
    function hook_assert(condition: boolean): void;

    /**
     * Wait for data until it's available, until then the fallback will be returned
     */
    function hook_async<T, U extends any[]>(getter: (...U) => Promise<T>, deps?: U, fallback?: T): T;

    /**
     * Returns a constant function
     */
    function hook_callback<T extends any[], U extends any[], V>(callback: (...[U, T]) => V, deps?: U): (...T) => V;

    /**
     * Turns true after the specified delay
     */
    function hook_delay(msecs: number): boolean;

    /**
     * Alternative to a single node_dom child
     */
    function hook_dom(descriptor: TagDescriptor, props?: Props): HTMLElement;

    /**
     * (Re)run function after passed deps changed (in the (re)render process of a component
     */
    function hook_effect<T extends any[]>(callback: (...T) => (void | ((...T) => void)), deps?: T): void;

    /**
     * Returns whether the component has been rendered for the first time
     */
    function hook_first(): boolean;

    /**
     * Transform data on dep-changes
     */
    function hook_memo<T extends any[], U>(getter: (...T) => U, deps?: T): U;

    /**
     * List of changed properties since last rendering
     */
    function hook_object_changes(object: Object): string[];

    /**
     * Compare data to its version of previous rendering
     */
    function hook_prev<T>(value: T, initial?: T): T;

    /**
     * Useful for states including any logic
     */
    function hook_reducer<T, U extends any[]>(mutations: ((current: T, ...U) => T)[]): [value: T, dispatch: (index: number, ...U) => void];

    /**
     * Simplified reducer approach
     */
    function hook_reducer_f<T, U extends any[]>(reducer: (current: T, ...U) => T, initializer?: () => T): [value: T, dispatch: (...U) => void];

    /**
     * Request rendering in the next frame
     */
    function hook_rerender(): void;

    /**
     * Simple component state. The first argument is the initial value.
     */
    function hook_state<T>(initial: T): [value: T, setter: (value: T) => void, getter: () => T];

    /**
     * Cheaper version of hook_memo
     */
    function hook_static<T>(initial: T): T;

    /**
     * hook_memo with dynamic getter and included hook support
     */
    function hook_sub<T extends any[], U>(getter: (...T) => U, deps?: T): U;

    /**
     * Transitions the value over the given delay
     */
    function hook_transition(target: number, msecs: number): number;

    /**
     * Mounts the body/root component
     */
    function init(body: () => ([bodyProps: Props, bodyContent: LuiNodeList])): void;

    /**
     * Component instantiation
     */
    function node<T extends Props>(component: Component<T>, props?: T | null, children?: LuiNodeList): LuiNode;

    /**
     * Instantiate DOM Elements
     */
    function node_dom(descriptor: TagDescriptor, props?: Props, children?: LuiNodeList): LuiNode;

    /**
     * Component list of unspecified length for dynamic renderings
     */
    function node_map<T extends Props>(component: Component<T>, data: NodeDataList, props?: T): LuiNode;

    /**
     * Relative point of last rendering
     */
    function now(): number;
}
