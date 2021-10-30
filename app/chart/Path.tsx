import { area } from "d3-shape";
import type { ScaleLinear, ScaleTime } from "d3-scale";
import type { Data, Series } from ".";
import type { JSXElement } from "solid-js";

interface Props {
    x: ScaleTime<number, number>;
    y: ScaleLinear<number, number>;
    data: Series;
    marker: Data;
}

function Path(props: Props): JSXElement {
    const { x, y } = props;

    const path = area<Data>()
        .x(({ date }) => x(date))
        .y(({ value }) => y(value));

    return <g>
        <path class="series" d={path(props.data) as string}/>
        <circle r={6} cx={props.x(props.marker.date)} cy={props.y(props.marker.value)} />
    </g>;
}

export default Path;
