import { type SvelteComponent } from "svelte";
import type { AxisScale } from "d3-axis";

declare interface Props {
    scale: AxisScale<Date>;
    left?: number;
    top?: number;
    ticks?: number;
    tickPadding?: number;
}

declare class BottomAxis extends SvelteComponent<Props> {}

export default BottomAxis;
