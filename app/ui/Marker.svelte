<script lang="ts" context="module">
    import { format } from "date-fns";
    import { type ScaleLinear, type ScaleTime } from "d3-scale";
    import type { Data } from "lib/time/Series";
</script>

<style lang="postcss">
    @import "Marker.css";
</style>

<script lang="ts">
    export let x: ScaleTime<number, number>;
    export let y: ScaleLinear<number, number>;
    export let padding: number = 8;
    export let point: Data;

    const height = 26;
    const width = 58;

    $: left = x(point.date);
    $: [bottom, top] = y.range();
</script>

<g class="marker" transform={`translate(${left})`}>
    <line y1={top} y2={bottom}/>;
    <g class="tooltip" transform={`translate(${-width / 2}, ${bottom + padding - height / 2})`}>
        <rect height={height} width={width} rx={4} y={height / 2 - 1} />
        <text dominant-baseline="middle" text-anchor="middle" y={height} x={width / 2}>
            {format(point.date, "MMM dd")}
        </text>
    </g>
</g>;
