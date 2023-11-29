<script lang="ts" context="module">
    import { tweened } from "svelte/motion";
    import { cubicOut, cubicInOut } from "svelte/easing";
    import { draw } from "svelte/transition";
    import type { ScaleLinear, ScaleTime } from "d3-scale";
    import { line } from "d3-shape";
    import { interpolate } from "polymorph-js";
    import type { Nullable } from "lib";
    import type Series from "lib/time/Series";
    import type { Data } from "lib/time/Series";
</script>

<script lang="ts">
    export let x: ScaleTime<number, number>;
    export let y: ScaleLinear<number, number>;
    export let data: Series;

    const path = line<Data>()
        .x(data => x(data.date))
        .y(data => y(data.value));

    const d = tweened<Nullable<string>>(null, {
        duration: 200,
        easing: cubicOut,
        interpolate: (a, b) => interpolate([a, b])
    });

    $: d.set(path(data));
</script>

<path class="series" d={$d} transition:draw={{ duration: 500, easing: cubicInOut }}/>
