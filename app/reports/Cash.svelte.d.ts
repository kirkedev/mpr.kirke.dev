import { type SvelteComponent } from "svelte";
import type CashIndex from "lib/slaughter/CashIndex";

declare interface Props {
    cash: Iterable<CashIndex>;
}

declare class Cash extends SvelteComponent<Props> {}

export default Cash;
