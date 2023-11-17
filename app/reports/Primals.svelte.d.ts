import { type SvelteComponent } from "svelte";
import type Cutout from "lib/cutout/Cutout";

declare interface Props {
    cutout: Iterable<Cutout>;
}

declare class Primals extends SvelteComponent<Props> {}

export default Primals;
