<script lang="ts" context="module">
    import { select } from "d3-selection";
    import { axisBottom, type AxisScale } from "d3-axis";
    import "d3-transition";
</script>

<style lang="postcss">
    @import "./Axis.css";
</style>

<script lang="ts">
    export let scale: AxisScale<Date>;
    export let left = 0;
    export let top = 0;
    export let ticks = 5;
    export let tickPadding = 12;

    function axis(element: SVGGElement): void {
        select(element).transition()
            .call(axisBottom(scale)
                .ticks(ticks)
                .tickSizeInner(0)
                .tickSizeOuter(0)
                .tickPadding(tickPadding));
    }
</script>

<g class="x axis" transform={`translate(${left}, ${top})`} use:axis/>
