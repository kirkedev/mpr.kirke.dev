<script lang="ts" context="module">
    import type Cutout from "lib/cutout";
    import { Primals } from "lib/cutout/Primal";
    import PrimalInteractor from "lib/cutout/PrimalInteractor";
    import { click } from "../ui";
    import ObservationChart from "../ui/ObservationChart.svelte";
    import Marker from "../ui/Marker.svelte";
    import Path from "../ui/Path.svelte";
    import Circle from "../ui/Circle.svelte";
    import store from "../store";
</script>

<style lang="postcss">
    @import "Primals.css";
</style>

<script lang="ts">
    export let cutout: Iterable<Cutout>;
    const interactor = new PrimalInteractor(cutout);
    const model = store(interactor);
</script>

<div class="primals report">
    <div class="stats">
        {#each $model.stats as stat, index}
            <div role="button" tabindex="0" class={stat.selected ? "selected stat" : "stat"}
                on:click={interactor.selectPrimal.bind(interactor, Primals[index])}
                on:keypress={click}>
                <h5 class="label">{stat.label}</h5>
                <h3 class="value">{stat.value}</h3>
            </div>
        {/each}
    </div>

    <ObservationChart
        dates={$model.dates}
        values={$model.values}
        on:selectDate={event => interactor.selectDate(event.detail)}
        on:resetDate={interactor.resetDate}>

        <g class="plot" slot="plot" let:x let:y>
            <Marker x={x} y={y} point={$model.selected}/>
            <Path x={x} y={y} data={$model.series}/>
            <Circle x={x} y={y} point={$model.selected}/>
        </g>
    </ObservationChart>
</div>
