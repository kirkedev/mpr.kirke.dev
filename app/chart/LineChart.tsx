import type { JSXElement } from "solid-js";
import { For } from "solid-js";
import { extent } from "d3-array";
import { scaleLinear, scaleTime } from "d3-scale";
import { flatMap } from "lib/itertools/map";
import type { Dimensions, Offset, Series } from ".";
import { Position } from ".";
import Axis from "./Axis";
import Plot from "./Plot";
import Path from "./Path";

interface Props extends Dimensions, Required<Offset> {
    data: Series[];
}

function LineChart({ data, width, height, left, bottom, right, top }: Props): JSXElement {
    const dates = scaleTime()
        .domain(extent(flatMap(data, record => record.date)) as [Date, Date])
        .range([left, width - right]);

    const values = scaleLinear()
        .domain(extent(flatMap(data, record => record.value)) as [number, number])
        .range([height - bottom, top]);

    return <svg width={"100%"} height={"100%"} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid meet">
        <Axis position={Position.Left} left={left} top={top} scale={values}/>
        <Axis position={Position.Bottom} left={left} top={height - bottom} scale={dates}/>
        <Plot left={left} top={top}>
            <For each={data}>
                { series => <Path data={series} x={dates} y={values}/> }
            </For>
        </Plot>
    </svg>;
}

export default LineChart;
