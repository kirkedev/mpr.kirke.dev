import { type ScaleTime, type ScaleLinear } from "d3-scale";
import { type SvelteComponent } from "svelte";
import type { Data } from "lib/Observation";

declare interface Props {
    x: ScaleTime<number, number>;
    y: ScaleLinear<number, number>;
    padding?: number;
    point: Data;
}

declare class Marker extends SvelteComponent<Props> {}

export default Marker;
