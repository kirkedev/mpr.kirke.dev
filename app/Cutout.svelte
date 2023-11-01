<script lang="ts" context="module">
    import type CutoutIndex from "lib/cutout/CutoutIndex";
    import CutoutInteractor from "lib/cutout/CutoutInteractor";
    import ObservationChart from "./ui/ObservationChart.svelte";
    import Path from "./ui/Path.svelte";
    import Stats from "./ui/Stats.svelte";
    import store from "./store";
</script>

<style lang="postcss">
    @import "./Cutout.css";
</style>

<script lang="ts">
    export let cutout: Iterable<CutoutIndex>;
    const interactor = new CutoutInteractor(cutout);
    const model = store(interactor);
</script>

<div class="cutout">
    <Stats stats={$model.stats} />

    <ObservationChart
      dates={$model.dates}
      values={$model.values}
      on:selectDate={event => interactor.selectDate(event.detail)}
      on:resetDate={interactor.resetDate}>
        <svelte:fragment slot="plot" let:x let:y>
            <Path x={x} y={y} data={$model.cutout} />
            <Path x={x} y={y} data={$model.index} />
        </svelte:fragment>
    </ObservationChart>
</div>
