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
    request.fetch(Period.ThreeMonths);
</script>

<div class={Result.isLoading($request) ? "loading app" : "app"}>
    <div class="timepicker">
        <ButtonGroup items={Array.from(Periods)} on:select={event => request.fetch(event.detail)}/>
    </div>
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
