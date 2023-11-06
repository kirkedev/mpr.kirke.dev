<script lang="ts" context="module">
    import type Period from "lib/time/Period";
    import data from "./api";
    import Cutout from "./reports/Cutout.svelte";
</script>

<style lang="postcss">
    @import "App.css";
</style>

<script lang="ts">
    import PeriodSelector from "./PeriodSelector.svelte";

    function fetchData({ detail: period }: CustomEvent<Period>): void {
        data.fetch(period);
    }
</script>

<div class="app">
    <div class="timepicker">
        <h3>Time Period</h3>
        <PeriodSelector on:select={fetchData}/>
    </div>
    <div class="reports">
    {#await $data}
        <div class="loading">Loading...</div>
    {:then data}
        <Cutout cutout={data.cutoutIndex}/>
    {:catch error}
        <div class="loading">{error.message}</div>
    {/await}
    </div>
</div>
