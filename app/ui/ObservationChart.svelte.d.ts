import { type SvelteComponent } from "svelte";
import type { ScaleLinear, ScaleTime } from "d3-scale";

declare interface Props {
    dates: readonly [Date, Date];
    values: readonly [number, number];
    width?: number;
    height?: number;
}

declare interface Events {
    selectDate: CustomEvent<Date>;
    resetDate: void;
}

declare interface Slots {
    plot: {
        x: ScaleLinear<number, number>;
        y: ScaleTime<number, Date>;
    };
}

declare class ObservationChart extends SvelteComponent<Props, Events, Slots> {}

export default ObservationChart;
