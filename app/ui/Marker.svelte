<style lang="postcss">
    @import "Marker.css";
</style>

<script lang="ts">
    export let height: number;
    export let width: number;
    export let left: number;
    export let top: number;
    export let bottom: number;
</script>

<g class="marker" transform={`translate(${left - width / 2},${top})`}>
    <rect height={height} width={width} rx={4} y={height / 2 - 4} />
    <text dominant-baseline="middle" text-anchor="middle" y={height - 2} x={width / 2}>
        <slot name="caption"/>
    </text>
    <line y1={top} y2={bottom} />;
</g>;
