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
    export let width = 660;
    export let height = 325;
    export let dates: [Date, Date];
    export let values: [number, number];

    export let rightMargin = 30;
    export let bottomMargin = 34;
    export let top = 14;
    export let left = 30;

    $: right = width - rightMargin;
    $: bottom = height - bottomMargin;
    $: x = scaleTime().domain(dates).rangeRound([left, right]);
    $: y = scaleLinear().domain(values).rangeRound([bottom, top]).nice();

    type Events = {
        selectDate: Date;
        resetDate: void;
    };

    let svg: SVGSVGElement;

    const dispatch = createEventDispatcher<Events>();

    function selectDate(event: PointerEvent): void {
        const [position] = pointer(event, svg);
        const date = x.invert(Math.max(Math.min(position, right), left));
        dispatch("selectDate", date);
    }

    function resetDate(): void {
        dispatch("resetDate");
    }
</script>

<div class="chart" on:pointermove={selectDate} on:pointerleave={resetDate}>
    <svg bind:this={svg} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid meet">
        <g class="x axis" use:bottomAxis={{ scale: x, tickPadding: 16 }} transform={`translate(0,${bottom})`}/>
        <g class="y axis" use:rightAxis={{ scale: y, tickSize: left - width }} transform={`translate(${width}, 0)`}/>
        <slot name="plot" x={x} y={y}/>
    </svg>
</div>
