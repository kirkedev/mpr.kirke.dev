<script>
    import ButtonGroup from "app/ui/ButtonGroup.svelte";
    import Period, { Periods } from "lib/Period";
</script>

<ButtonGroup on:select selected={Period.ThreeMonths} items={Periods} />
