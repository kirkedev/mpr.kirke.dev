<script lang="ts" context="module">
    import { select } from "d3-selection";
    import { axisBottom, type AxisScale } from "d3-axis";
    import "d3-transition";
</script>

<style lang="postcss">
    @import "Axis.css";
</style>

<script lang="ts">
    export let scale: AxisScale<Date>;
    export let ticks = 5;
    export let tickSizeInner = 10;
    export let tickSizeOuter = 0;
    export let tickPadding = 24;

    function axis(element: SVGGElement): void {
        select(element).transition()
            .call(axisBottom(scale)
                .ticks(ticks)
                .tickSizeInner(tickSizeInner)
                .tickSizeOuter(tickSizeOuter)
                .tickPadding(tickPadding));
    }
</script>

<g class="x axis" use:axis/>
