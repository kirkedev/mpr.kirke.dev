<script lang="ts" context="module">
    import Period, { Periods } from "lib/time/Period";
    import ButtonGroup from "./ui/ButtonGroup.svelte";
</script>

<ButtonGroup items={Array.from(Periods)} selected={Period.ThreeMonths} on:select/>
