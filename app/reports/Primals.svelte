<script lang="ts" context="module">
    import type Cutout from "lib/cutout";
    import Primal, { Primals } from "lib/cutout/Primal";
    import PrimalInteractor from "lib/cutout/PrimalInteractor";
    import { click } from "../ui";
    import ObservationChart from "../ui/ObservationChart.svelte";
    import Marker from "../ui/Marker.svelte";
    import Path from "../ui/Path.svelte";
    import Circle from "../ui/Circle.svelte";
</script>

<style lang="postcss">
    @import "Primals.css";
</style>

<script lang="ts">
    export let cutout: Iterable<Cutout>;
    let primal = Primal.Belly;

    $: model = new PrimalInteractor(cutout).selectPrimal(primal);
    $: ({ stats, selected } = model);
</script>

<div class="primals report">
    <div class="stats">
        {#each $stats as stat, index}
            <div role="button" tabindex="0" class={stat.selected ? "selected stat" : "stat"}
                on:click={() => primal = Primals[index]}
                on:keypress={click}>
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
            <Path {x} {y} series={model.series}/>
            <Circle {x} {y} point={$selected}/>
        </g>
    </ObservationChart>
</div>
