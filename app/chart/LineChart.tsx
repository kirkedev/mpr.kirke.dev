import type { JSXElement } from "solid-js";
import { createSignal, Index } from "solid-js";
import { timeFormat } from "d3-time-format";
import { bisector, extent } from "d3-array";
import { scaleLinear, scaleTime } from "d3-scale";
import { pointer, select } from "d3-selection";
import type Observation from "lib/Observation";
import { flatMap } from "lib/itertools/map";
import type { Data, Dimensions, Offset, Series } from ".";
import Plot from "./Plot";
import Path from "./Path";
import { BottomAxis, RightAxis } from "./Axis";
import AxisMarker from "./AxisMarker";
import MarkerLine from "./MarkerLine";
import "./chart.css";

interface Props extends Dimensions, Partial<Offset> {
    data: Series[];
}

const formatDate = timeFormat("%b %d");

const { center: bisectDate } = bisector<Observation, Date>(observation => observation.date);

const extendBy = ([min = 0, max = 0]: [number?, number?], multiple: number): [number, number] =>
    [Math.floor(min / multiple) * multiple, Math.ceil(max / multiple) * multiple];

function LineChart({ data, width, height, left = 0, bottom = 0, right = 0, top = 0 }: Props): JSXElement {
    const array = data.map(series => Array.from(series));
    const [markers, setMarkers] = createSignal<Data[]>(array.map(series => series[series.length - 1]));

    const dates = scaleTime()
        .range([left, width - right])
        .domain(extent(flatMap(data, record => record.date)) as [Date, Date]);

    const values = scaleLinear()
        .range([height - bottom, top])
        .domain(extendBy(extent(flatMap(data, record => record.value)), 5));

    function updateMarkers(event: MouseEvent) {
        const target = event.currentTarget as Element;
        const [position] = pointer(event, target);
        const x0 = dates.invert(position);
        const detail = array.map(series => series[bisectDate(series, x0)] ?? series[series.length - 1]);
        setMarkers(detail);
        select(target).dispatch("stats", { detail, bubbles: true, cancelable: true });
    }

    function resetMarkers(event: MouseEvent) {
        const target = event.target as Element;
        const detail = array.map(series => series[series.length - 1]);
        setMarkers(detail);
        select(target).dispatch("stats", { detail, bubbles: true, cancelable: true });
    }

    return <svg
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid meet"
        onmousemove={updateMarkers}
        onmouseleave={resetMarkers}>

        <Plot>
            <Index each={data}>
                { (series, index) =>
                    <Path data={series()} x={dates} y={values} marker={markers()[index]}/>
                }
            </Index>
        </Plot>

        <RightAxis
            scale={values}
            left={width - right}
            tickSize={left - width + right}
            tickCount={5}
            tickPadding={16}/>

        <BottomAxis
            top={height - bottom}
            scale={dates}
            tickCount={8}
            tickPadding={24}/>

        <MarkerLine
            left={dates(markers()[0].date)}
            top={values(markers()[0].value)}
            bottom={height - bottom}/>

        <AxisMarker left={dates(markers()[0].date) - 24} top={height - bottom}>
            {formatDate(markers()[0].date)}
        </AxisMarker>
    </svg>;
}

export default LineChart;
