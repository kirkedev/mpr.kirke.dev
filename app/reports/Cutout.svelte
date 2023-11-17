<script lang="ts" context="module">
    import type CutoutIndex from "lib/cutout/CutoutIndex";
    import CutoutInteractor from "lib/cutout/CutoutInteractor";
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
    const model = new CutoutInteractor(cutout);
</script>

<div class="cutout report">
    <div class="stats">
        {#each $model.stats as stat}
            <div class="stat">
                <h5 class="label">{stat.label}</h5>
                <h3 class="value">{stat.value}</h3>
            </div>
        {/each}
    </div>

    <ObservationChart
        dates={$model.dates}
        values={$model.values}
        on:selectDate={event => model.selectDate(event.detail)}
        on:resetDate={model.resetDate}>

        <g class="plot" slot="plot" let:x let:y>
            <Marker x={x} y={y} point={$model.selected}/>
            <Path x={x} y={y} data={$model.cutout}/>
            <Path x={x} y={y} data={$model.index}/>
            <Circle x={x} y={y} point={$model.selected}/>
        </g>
    </ObservationChart>
</div>
