<script lang="ts" context="module">
    import type CashIndex from "lib/slaughter/CashIndex";
    import CashIndexInteractor from "lib/slaughter/CashIndexInteractor";
    import ObservationChart from "../ui/ObservationChart.svelte";
    import Circle from "../ui/Circle.svelte";
    import Marker from "../ui/Marker.svelte";
    import Path from "../ui/Path.svelte";
</script>

<style lang="postcss">
    @import "Cash.css";
</style>

<script lang="ts">
    export let cash: Iterable<CashIndex>;
    $: model = new CashIndexInteractor(cash);
    $: ({ stats, selected } = model);
</script>

<div class="cash report">
    <div class="stats">
        <h2 class="label">{$stats.label}</h2>
        <h2 class="value">{$stats.value}</h2>
    </div>

    <ObservationChart
        dates={model.dates}
        values={model.values}
        on:selectDate={event => model.selectDate(event.detail)}
        on:resetDate={model.resetDate}>

        <g class="plot" slot="plot" let:x let:y>
            <Marker {x} {y} point={$selected}/>
            <Path {x} {y} series={model.series} />
            <Circle {x} {y} point={$selected}/>
        </g>
    </ObservationChart>
</div>
