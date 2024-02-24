<script lang="ts" context="module">
    import type CutoutIndex from "lib/cutout/CutoutIndex";
    import CutoutViewModel from "lib/cutout/CutoutViewModel";
    import ObservationChart from "../ui/ObservationChart.svelte";
    import Circle from "../ui/Circle.svelte";
    import Marker from "../ui/Marker.svelte";
    import Path from "../ui/Path.svelte";
</script>

<style lang="postcss">
    @import "Cutout.css";
</style>

<script lang="ts">
    export let cutout: Iterable<CutoutIndex>;
    $: model = CutoutViewModel.from(cutout);
    $: ({ stats, selected } = model);
</script>

<div class="cutout report">
    <div class="stats">
        {#each $stats as stat}
            <div class="stat">
                <h5 class="label">{stat.label}</h5>
                <h3 class="value">{stat.value}</h3>
            </div>
        {/each}
    </div>

    <ObservationChart
        dates={model.dates}
        values={model.values}
        on:selectDate={event => model.selectDate(event.detail)}
        on:resetDate={model.resetDate}>

        <g class="plot" slot="plot" let:x let:y>
            <Marker {x} {y} point={$selected}/>
            <Path {x} {y} series={model.cutout}/>
            <Path {x} {y} series={model.index}/>
            <Circle {x} {y} point={$selected}/>
        </g>
    </ObservationChart>
</div>
