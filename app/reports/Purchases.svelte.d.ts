import { type SvelteComponent } from "svelte";
import type Purchase from "lib/purchases";

declare interface Props {
    purchases: Iterable<Purchase>;
}

declare class Purchases extends SvelteComponent<Props> {}

export default Purchases;
