<script lang="ts" context="module">
    import type Purchase from "lib/purchases";
    import PurchasesInteractor from "lib/purchases/PurchasesInteractor";
    import ObservationChart from "../ui/ObservationChart.svelte";
    import Circle from "../ui/Circle.svelte";
    import Marker from "../ui/Marker.svelte";
    import Path from "../ui/Path.svelte";
</script>

<style lang="postcss">
    @import "Purchases.css";
</style>

<script lang="ts">
    export let purchases: Iterable<Purchase>;
    $: model = new PurchasesInteractor(purchases);
    $: stats = model.stats;
    $: selected = model.selected;
</script>

<div class="purchases report">
    <div class="stats">
        <div class="stat">
            <h5 class="label">{$stats.label}</h5>
            <h3 class="value">{$stats.value}</h3>
        </div>
    </div>

    <ObservationChart
        dates={model.dates}
        values={model.values}
        on:selectDate={event => model.selectDate(event.detail)}
        on:resetDate={model.resetDate}>

        <g class="plot" slot="plot" let:x let:y>
            <Marker x={x} y={y} point={$selected}/>
            <Path x={x} y={y} data={model.series}/>
            <Circle x={x} y={y} point={$selected}/>
        </g>
    </ObservationChart>
</div>
