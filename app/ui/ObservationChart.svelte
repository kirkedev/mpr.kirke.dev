<script lang="ts" context="module">
    import { createEventDispatcher } from "svelte";
    import { scaleLinear, scaleTime } from "d3-scale";
    import { pointer } from "d3-selection";
    import { bottomAxis, rightAxis } from "./axis";
</script>

<style lang="postcss">
    @import "ObservationChart.css";
</style>

<script lang="ts">
    export let width = 640;
    export let height = 340;
    export let dates: [Date, Date];
    export let values: [number, number];

    const margin = 24;
    const bottomMargin = 30;
    $: right = width - margin;
    $: bottom = height - bottomMargin;
    $: x = scaleTime().domain(dates).rangeRound([0, right]);
    $: y = scaleLinear().domain(values).rangeRound([bottom, 0]).nice();

    type Events = {
        selectDate: Date;
        resetDate: void;
    };

    const dispatch = createEventDispatcher<Events>();
    let svg: SVGSVGElement;

    function selectDate(event: PointerEvent): void {
        const [position] = pointer(event, svg);
        const date = x.invert(Math.max(Math.min(position, right), 0));
        dispatch("selectDate", date);
    }

    function resetDate(): void {
        dispatch("resetDate");
    }
</script>

<div class="chart" on:pointermove={selectDate} on:pointerleave={resetDate}>
    <svg bind:this={svg} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid meet">
        <g class="x axis" use:bottomAxis={{ scale: x, tickPadding: 16 }} transform={`translate(0,${bottom})`}/>
        <g class="y axis" use:rightAxis={{ scale: y, tickSize: -width }} transform={`translate(${width},0)`}/>
        <slot name="plot" x={x} y={y}/>
    </svg>
</div>
