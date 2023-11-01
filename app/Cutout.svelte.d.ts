import { type SvelteComponent } from "svelte";
import type CutoutIndex from "lib/cutout/CutoutIndex";

declare interface Props {
    cutout: Iterable<CutoutIndex>;
}

declare class Cutout extends SvelteComponent<Props> {}

export default Cutout;
