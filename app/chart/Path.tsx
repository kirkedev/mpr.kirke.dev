import type { JSXElement } from "solid-js";
import { select } from "d3-selection";
import "d3-transition";
import { area } from "d3-shape";
import type { ScaleLinear, ScaleTime } from "d3-scale";
import type { Data, Series } from ".";

interface Props {
    x: ScaleTime<number, number>;
    y: ScaleLinear<number, number>;
    data: Series;
    marker: Data;
}

function Path(props: Props): JSXElement {
    const path = area<Data>();

    return <g>
        <path class="series" ref={el =>
            select(el).datum(props.data).transition()
                .attr("d", path
                    .x(data => props.x(data.date))
                    .y(data => props.y(data.value)))
        }/>

        <circle r={6} cx={props.x(props.marker.date)} cy={props.y(props.marker.value)} />
    </g>;
}

export default Path;
