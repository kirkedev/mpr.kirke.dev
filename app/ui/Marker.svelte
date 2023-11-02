<script lang="ts" context="module">
    import { format } from "date-fns";
    import { type ScaleTime, type ScaleLinear } from "d3-scale";
    import type { Data } from "lib/Observation";
</script>

<style lang="postcss">
    @import "Marker.css";
</style>

<script lang="ts">
    export let x: ScaleTime<number, number>;
    export let y: ScaleLinear<number, number>;
    export let point: Data;

    $: left = x(point.date);
    $: [bottom, top] = y.range();

    const height = 26;
    const width = 64;
</script>

<g class="marker" transform={`translate(${left})`}>
    <line y1={top} y2={bottom}/>;
    <g class="tooltip" transform={`translate(${-width / 2}, ${bottom - height / 2 + 4})`}>
        <rect height={height} width={width} rx={4} y={height / 2 - 1} />
        <text dominant-baseline="middle" text-anchor="middle" y={height} x={width / 2}>
            {format(point.date, "MMM dd")}
        </text>
    </g>
</g>;
