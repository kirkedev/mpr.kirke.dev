import { type SvelteComponent } from "svelte";
import type { AxisScale } from "d3-axis";

declare interface Props {
    scale: AxisScale<number>;
    ticks?: number;
    tickSizeInner?: number;
    tickSizeOuter?: number;
    tickPadding?: number;
}

declare class RightAxis extends SvelteComponent<RightAxisProps> {}

export default RightAxis;
