import { type SvelteComponent } from "svelte";

declare interface Props<T extends object> {
    items: T[];
    selected?: T;
}

export declare interface Events<T extends object> {
    select: CustomEvent<T>;
}

declare class ButtonGroup<T> extends SvelteComponent<Props<T>, Events<T>> {}

export default ButtonGroup;
