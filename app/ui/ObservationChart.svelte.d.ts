import { type SvelteComponent } from "svelte";
import type { ScaleLinear, ScaleTime } from "d3-scale";

declare interface Props {
    dates: readonly [Date, Date];
    values: readonly [number, number];
    width?: number;
    height?: number;
    leftMargin?: number;
    topMargin?: number;
    rightMargin?: number;
    bottomMargin?: number;
}

declare interface Events {
    selectDate: CustomEvent<Date>;
    resetDate: void;
}

declare interface Slots {
    plot: {
        x: ScaleTime<number, number>;
        y: ScaleLinear<number, number>;
    };
}

declare class ObservationChart extends SvelteComponent<Props, Events, Slots> {}

export default ObservationChart;
