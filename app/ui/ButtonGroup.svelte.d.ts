import { type SvelteComponentTyped } from "svelte";

declare interface Props<T extends object> {
    items: T[];
    selected?: T;
}

declare interface Events<T extends object> {
    select: T;
}

export default class extends SvelteComponentTyped<Props<T>, Events<T>, never> {}
