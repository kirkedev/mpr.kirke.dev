import { type SvelteComponent } from "svelte";
import type { AxisScale } from "d3-axis";

declare interface Props {
    scale: AxisScale<number>;
    left?: number;
    top?: number;
    ticks?: number;
    tickSize?: number;
    tickPadding?: number;
}

declare class RightAxis extends SvelteComponent<RightAxisProps> {}

export default RightAxis;
