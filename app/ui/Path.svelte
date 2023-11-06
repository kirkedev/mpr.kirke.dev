<script lang="ts" context="module">
    import { select } from "d3-selection";
    import "d3-transition";
    import { area } from "d3-shape";
    import type { ScaleLinear, ScaleTime } from "d3-scale";
    import type { Data, Series } from "lib/Series";
</script>

<script lang="ts">
    export let x: ScaleTime<number, number>;
    export let y: ScaleLinear<number, number>;
    export let data: Series;

    function path(element: SVGPathElement): void {
        select(element).datum(data).transition()
            .attr("d", area<Data>()
                .x(data => x(data.date))
                .y(data => y(data.value)));
    }
</script>

<path d="" class="series" use:path />
