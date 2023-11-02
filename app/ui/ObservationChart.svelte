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

    const margin = 24;
    $: right = width - margin;
    $: bottom = height - margin;
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
        <BottomAxis
            scale={x}
            top={bottom}/>

        <RightAxis
            scale={y}
            left={width}
            tickSize={-width}/>

        <g class="plot">
            <slot name="plot" x={x} y={y}/>
        </g>
    </svg>
</div>
