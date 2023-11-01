import { type SvelteComponent } from "svelte";
import type { AxisScale } from "d3-axis";

declare interface Props {
    scale: AxisScale<Date>;
    ticks?: number;
    tickSizeInner?: number;
    tickSizeOuter?: number;
    tickPadding?: number;
}

declare class BottomAxis extends SvelteComponent<Props> {}

export default BottomAxis;
