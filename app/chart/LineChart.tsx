import type { JSXElement } from "solid-js";
import { createSignal, Index } from "solid-js";
import { timeFormat } from "d3-time-format";
import { bisector, extent } from "d3-array";
import { scaleLinear, scaleTime } from "d3-scale";
import { pointer } from "d3-selection";
import type Observation from "lib/Observation";
import { flatMap } from "lib/itertools/map";
import type { Data, Dimensions, Offset, Series } from ".";
import Plot from "./Plot";
import Path from "./Path";
import { BottomAxis, RightAxis } from "./Axis";
import AxisMarker from "./AxisMarker";
import MarkerLine from "./MarkerLine";
import "./Chart.module.css";

interface Props extends Dimensions, Partial<Offset> {
    data: Series[];
}

const formatDate = timeFormat("%b %d");

const { center: bisectDate } = bisector<Observation, Date>(observation => observation.date);

const extendBy = ([min = 0, max = 0]: [number?, number?], multiple: number): [number, number] =>
    [Math.floor(min / multiple) * multiple, Math.ceil(max / multiple) * multiple];

function dispatch<T>(this: Element, name: string, detail: T, options?: EventInit) {
    const event = new CustomEvent(name, Object.assign({ detail }, options ?? {
        bubbles: true,
        cancelable: true
    }));

    this.dispatchEvent(event);
}

function LineChart({ data, width, height, left = 0, bottom = 0, right = 0, top = 0 }: Props): JSXElement {
    right = width - right;
    bottom = height - bottom;

    const array = data.map(series => Array.from(series));
    const [markers, setMarkers] = createSignal<Data[]>(array.map(series => series[series.length - 1]));

    const dates = scaleTime()
        .range([left, right])
        .domain(extent(flatMap(data, record => record.date)) as [Date, Date]);

    const values = scaleLinear()
        .range([bottom, top])
        .domain(extendBy(extent(flatMap(data, record => record.value)), 5));

    function updateMarkers(event: MouseEvent) {
        const target = event.currentTarget as Element;
        const [position] = pointer(event, target);
        const x0 = dates.invert(position);
        const markers = array.map(series => series[bisectDate(series, x0)] ?? series[series.length - 1]);
        setMarkers(markers);
        dispatch.call(target, "stats", markers);
    }

    function resetMarkers(event: MouseEvent) {
        const target = event.target as Element;
        const markers = array.map(series => series[series.length - 1]);
        setMarkers(markers);
        dispatch.call(target, "stats", markers);
    }

    return <div class={"chart"} onmousemove={updateMarkers} onmouseleave={resetMarkers}>
        <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid meet">
            <Plot>
                <Index each={data}>
                    { (series, index) =>
                        <Path data={series()} x={dates} y={values} marker={markers()[index]}/>
                    }
                </Index>
            </Plot>

            <RightAxis
                scale={values}
                left={width}
                tickSize={-width}
                tickCount={5}
                tickPadding={12}/>

            <BottomAxis
                top={bottom}
                scale={dates}
                tickCount={8}
                tickPadding={24}/>

            <MarkerLine
                left={dates(markers()[0].date)}
                top={values(markers()[0].value)}
                bottom={bottom}/>

            <AxisMarker left={dates(markers()[0].date)} top={bottom}>
                {formatDate(markers()[0].date)}
            </AxisMarker>
        </svg>
    </div>;
}

export default LineChart;
