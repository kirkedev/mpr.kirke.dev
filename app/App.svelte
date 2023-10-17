<style lang="postcss">
    @import "app.css";
</style>

<script lang="ts">
    import PeriodSelector from "./PeriodSelector.svelte";
</script>

<div class="app">
    <div class="timepicker">
        <h3>Time Period</h3>
        <PeriodSelector class="period"/>
    </div>
    <div class="reports">
        <div>Reports</div>
    </div>
</div>
