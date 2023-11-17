<script lang="ts" context="module">
    import { area } from "d3-shape";
    import type { ScaleLinear, ScaleTime } from "d3-scale";
    import type Series from "lib/time/Series";
    import type { Data } from "lib/time/Series";
</script>

<script lang="ts">
    export let x: ScaleTime<number, number>;
    export let y: ScaleLinear<number, number>;
    export let data: Series;

    $: line = area<Data>()
        .x(data => x(data.date))
        .y(data => y(data.value));
</script>

<path d={line(data)} class="series"/>
