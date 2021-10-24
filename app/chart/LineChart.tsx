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
import "./Chart.module.css";

interface Props extends Dimensions, Offset {
    data: Series[];
}

function LineChart({ data, width = 640, height = 360, left = 0, bottom = 0, right = 0, top = 0 }: Props): JSXElement {
    const dates = scaleTime()
        .domain(extent(flatMap(data, record => record.date)) as [Date, Date])
        .range([0, width - right]);

    const values = scaleLinear()
        .domain(extent(flatMap(data, record => record.value)) as [number, number])
        .range([height - top - bottom, 0]);

    return <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid meet">
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
