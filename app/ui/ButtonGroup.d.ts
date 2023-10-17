import { type SvelteComponent } from "svelte";

interface ButtonGroupProps<T> {
    items: T[];
    selected?: T;
}

export type ButtonGroup<T> = SvelteComponent<ButtonGroupProps<T>>;
