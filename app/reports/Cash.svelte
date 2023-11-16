<script lang="ts" context="module">
    import type CashIndex from "lib/slaughter/CashIndex";
    import CashIndexInteractor from "lib/slaughter/CashIndexInteractor";
    import ObservationChart from "../ui/ObservationChart.svelte";
    import Circle from "../ui/Circle.svelte";
    import Marker from "../ui/Marker.svelte";
    import Path from "../ui/Path.svelte";
    import store from "../store";
</script>

<style lang="postcss">
    @import "Cash.css";
</style>

<script lang="ts">
    export let cash: Iterable<CashIndex>;
    const interactor = new CashIndexInteractor(cash);
    const model = store(interactor);
</script>

<div class="cash report">
    <div class="stats">
        <h2 class="label">{$model.stats.label}</h2>
        <h2 class="value">{$model.stats.value}</h2>
    </div>

    <ObservationChart
        dates={$model.dates}
        values={$model.values}
        on:selectDate={event => interactor.selectDate(event.detail)}
        on:resetDate={interactor.resetDate}>

        <g class="plot" slot="plot" let:x let:y>
            <Marker x={x} y={y} point={$model.selected}/>
            <Path x={x} y={y} data={$model.series} />
            <Circle x={x} y={y} point={$model.selected}/>
        </g>
    </ObservationChart>
</div>
