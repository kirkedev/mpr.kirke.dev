<script lang="ts" context="module">
    import type { ScaleLinear, ScaleTime } from "d3-scale";
    import type { Data } from "lib/Observation";
</script>

<script lang="ts">
    export let x: ScaleTime<number, number>;
    export let y: ScaleLinear<number, number>;
    export let point: Data;
    export let size: number = 6;
</script>

<circle r={size} cx={x(point.date)} cy={y(point.value)}/>
