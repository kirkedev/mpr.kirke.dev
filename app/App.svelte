<script lang="ts" context="module">
    import Result from "lib/async/Result";
    import Period, { Periods } from "lib/time/Period";
    import Api from "./api";
    import Cash from "./reports/Cash.svelte";
    import Cutout from "./reports/Cutout.svelte";
    import Purchases from "./reports/Purchases.svelte";
    import Primals from "./reports/Primals.svelte";
    import ButtonGroup from "./ui/ButtonGroup.svelte";
</script>

<style lang="postcss">
    @import "App.css";
</style>

<script lang="ts">
    const request = new Api();
    let period = Period.ThreeMonths;
    $: request.fetch(period);
</script>

<svelte:options immutable={true}/>

<div class={Result.isLoading($request) ? "loading app" : "app"}>
    <header>
        <h3 class="title">Lean Hog Reports</h3>
        <div class="timepicker">
            <h3>Time Period</h3>
            <ButtonGroup items={Array.from(Periods)} bind:selected={period}/>
        </div>
    </header>
    {#if Result.isFailure($request)}
        <div class="error">{$request.error}</div>
    {:else if $request.data}
        <div class="reports">
            <Cash cash={$request.data.cashIndex}/>
            <Cutout cutout={$request.data.cutoutIndex}/>
            <Purchases purchases={$request.data.purchases}/>
            <Primals cutout={$request.data.cutout}/>
        </div>
    {/if}
</div>
