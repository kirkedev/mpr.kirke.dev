import { type SvelteComponent } from "svelte";
import type { ScaleLinear, ScaleTime } from "d3-scale";
import type { Series } from "lib/Observation";

declare interface Props {
    x: ScaleTime<number, number>;
    y: ScaleLinear<number, number>;
    data: Series;
}

declare class Path extends SvelteComponent<Props> {}

export default Path;
