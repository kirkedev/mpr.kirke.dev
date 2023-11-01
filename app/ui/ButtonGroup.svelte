<style lang="postcss">
    @import "./ButtonGroup.css";
</style>

<script lang="ts">
    import { createEventDispatcher } from "svelte";

    type T = $$Generic<object>;

    interface Events {
        select: T;
    }

    export let items: readonly T[];
    export let selected: T = items[0];
    const dispatch = createEventDispatcher<Events>();

    const select = (item: T) =>
        function(event: MouseEvent & { currentTarget: HTMLElement }): void {
            if (event.currentTarget.dataset.selected === "true") return;
            selected = item;
            dispatch("select", item);
        };
</script>

<div class="items">
    {#each items as item}
        <button class="item" data-selected={item === selected} on:click={select(item)} >
            { item.toString() }
        </button>
    {/each}
</div>
