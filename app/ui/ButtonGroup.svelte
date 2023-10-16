<style lang="postcss">
    @import "./ButtonGroup.css";
</style>

<script lang="ts">
    import { createEventDispatcher } from "svelte";
    type T = $$Generic<object>;

    interface SelectEvent {
        select: T;
    }

    export let items: T[];
    export let selected: T = items[0];
    const dispatch = createEventDispatcher<SelectEvent>();

    const select = (item: T) =>
        function(event: MouseEvent & { currentTarget: Element }): void {
            if (event.currentTarget.className.includes("selected")) return;
            selected = item;
            dispatch("select", item);
        };
</script>

<div class="items">
    {#each items as item}
        <button class={item === selected ? "selected item" : "item"} on:click={select(item)} >
            { item.toString() }
        </button>
    {/each}
</div>
