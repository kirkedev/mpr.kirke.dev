<script>
    import Period, { Periods } from "lib/Period";
    import ButtonGroup from "./ui/ButtonGroup.svelte";
</script>

<ButtonGroup on:select selected={Period.ThreeMonths} items={Periods} />
