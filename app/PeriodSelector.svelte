<script lang="ts" context="module">
    import Period, { Periods } from "lib/Period";
    import { ButtonGroup } from "./ui";
</script>

<ButtonGroup items={Array.from(Periods)} selected={Period.ThreeMonths} on:select/>
