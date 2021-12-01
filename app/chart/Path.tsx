import type { JSXElement } from "solid-js";
import { createEffect } from "solid-js";
import { select } from "d3-selection";
import { area } from "d3-shape";
import "d3-transition";
import type { ScaleLinear, ScaleTime } from "d3-scale";
import type { Data, Series } from ".";

interface Props {
    x: ScaleTime<number, number>;
    y: ScaleLinear<number, number>;
    data: Series;
    marker: Data;
    mask?: string;
}

function Path(props: Props): JSXElement {
    const path = (element: SVGPathElement): void =>
        createEffect(() => select(element).datum(props.data).transition()
            .attr("d", area<Data>()
                .x(data => props.x(data.date))
                .y(data => props.y(data.value))));

    return <g>
        <path class="series" ref={path} mask={props.mask}/>
        <circle r={6} cx={props.x(props.marker.date)} cy={props.y(props.marker.value)}/>
    </g>;
}

export default Path;
