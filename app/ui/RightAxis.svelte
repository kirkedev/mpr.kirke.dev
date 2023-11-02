<script lang="ts" context="module">
    import { select } from "d3-selection";
    import { axisRight, type AxisScale } from "d3-axis";
    import "d3-transition";
</script>

<style lang="postcss">
    @import "./Axis.css";
</style>

<script lang="ts">
    export let scale: AxisScale<number>;
    export let left = 0;
    export let top = 0;
    export let ticks = 5;
    export let tickSize = 0;
    export let tickPadding = 12;

    function axis(element: SVGGElement): void {
        select(element).transition()
            .call(axisRight(scale)
                .ticks(ticks)
                .tickSizeInner(tickSize)
                .tickSizeOuter(0)
                .tickPadding(tickPadding));
    }
</script>

<g class="y axis" transform={`translate(${left}, ${top})`} use:axis/>
