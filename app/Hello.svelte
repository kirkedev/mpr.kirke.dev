<script lang="ts">
    export let name = "World";
</script>

<style lang="postcss">
    .name {
        @apply font-bold;
    }
</style>

<div>
    Hello, <span class="name">{name}</span>!
</div>
