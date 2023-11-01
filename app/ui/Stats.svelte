<script lang="ts">
    import type Stat from "lib/Stat";

    export let stats: Stat[];
</script>

<style lang="postcss">
    @import "Stats.css";
</style>

<div class="stats">
    {#each stats as stat}
        <div class="stat">
            <h5 class="label">{stat.label}</h5>
            <h3 class="value">{stat.value}</h3>
        </div>
    {/each}
</div>
