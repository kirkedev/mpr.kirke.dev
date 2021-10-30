import { area } from "d3-shape";
import type { ScaleLinear, ScaleTime } from "d3-scale";
import type { Data, Series } from ".";

interface Props {
    x: ScaleTime<number, number>;
    y: ScaleLinear<number, number>;
    data: Series;
    marker: Data;
}

function Path(props: Props) {
    const path = area<Data>()
        .x(({ date }) => props.x(date))
        .y(({ value }) => props.y(value));

    return <g>
        <path class="series" d={path(props.data) as string}/>
        <circle r={6} cx={props.x(props.marker.date)} cy={props.y(props.marker.value)} />
    </g>;
}

export default Path;
