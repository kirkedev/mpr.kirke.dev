import type Stat from "lib/Stat";
import { SvelteComponent } from "svelte";

declare interface Props {
    stats: Stat[];
}

declare class Stats extends SvelteComponent<Props> {}

export default Stats;
