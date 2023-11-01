<script lang="ts" context="module">
    import { createEventDispatcher } from "svelte";
    import { scaleLinear, scaleTime } from "d3-scale";
    import { pointer } from "d3-selection";
    import BottomAxis from "./BottomAxis.svelte";
    import RightAxis from "./RightAxis.svelte";
</script>

<style lang="postcss">
    @import "ObservationChart.css";
</style>

<script lang="ts">
    export let width = 640;
    export let height = 340;
    export let dates: [Date, Date];
    export let values: [number, number];
    let plot: SVGElement;

    type Events = {
        selectDate: Date;
        resetDate: void;
    };

    const dispatch = createEventDispatcher<Events>();
    const x = scaleTime().domain(dates).rangeRound([0, width]);
    const y = scaleLinear().domain(values).rangeRound([height, 0]);

    function selectDate(event: MouseEvent | TouchEvent): void {
        const [position] = pointer(event, plot);
        const date = x.invert(position);
        dispatch("selectDate", date);
    }

    function resetDate(): void {
        dispatch("resetDate");
    }
</script>

<div class="chart" on:pointermove={selectDate} on:pointerleave={resetDate}>
    <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid meet">
        <BottomAxis scale={x}/>
        <RightAxis scale={y}/>
        <g class="plot" bind:this={plot}>
            <slot name="plot" x={x} y={y}/>
        </g>
    </svg>
</div>
