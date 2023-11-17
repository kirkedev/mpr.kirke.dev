<script lang="ts" context="module">
    import type Period from "lib/time/Period";
    import PeriodSelector from "./PeriodSelector.svelte";
    import Cash from "./reports/Cash.svelte";
    import Cutout from "./reports/Cutout.svelte";
    import Purchases from "./reports/Purchases.svelte";
    import Primals from "./reports/Primals.svelte";
    import data from "./api";
</script>

<style lang="postcss">
    @import "App.css";
</style>

<script lang="ts">
    function fetch({ detail: period }: CustomEvent<Period>): void {
        data.fetch(period);
    }
</script>

<div class="app">
    <div class="timepicker">
        <h3>Time Period</h3>
        <PeriodSelector on:select={fetch}/>
    </div>
    <div class="reports">
    {#await $data}
        <div class="loading">Loading...</div>
    {:then data}
        <Cash cash={data.cashIndex}/>
        <Cutout cutout={data.cutoutIndex}/>
        <Purchases purchases={data.purchases}/>
        <Primals cutout={data.cutout}/>
    {:catch error}
        <div class="error">{error.message}</div>
    {/await}
    </div>
</div>
