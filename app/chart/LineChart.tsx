import type { JSXElement } from "solid-js";
import { createSignal, Index } from "solid-js";
import { timeFormat } from "d3-time-format";
import { bisector, extent } from "d3-array";
import { scaleLinear, scaleTime } from "d3-scale";
import { pointer } from "d3-selection";
import type Observation from "lib/Observation";
import { flatMap } from "lib/itertools/map";
import { dispatch, getElement } from "../dom";
import type { Data, Dimensions, Offset, Series } from ".";
import { BottomAxis, RightAxis } from "./Axis";
import AxisMarker from "./AxisMarker";
import MarkerLine from "./MarkerLine";
import Plot from "./Plot";
import Path from "./Path";
import "./chart.css";

interface Props extends Dimensions, Partial<Offset> {
    data: Series[];
}

const formatDate = timeFormat("%b %d");

const { center: bisectDate } = bisector<Observation, Date>(observation => observation.date);

const extendBy = ([min = 0, max = 0]: [number?, number?], multiple: number): [number, number] =>
    [Math.floor(min / multiple) * multiple, Math.ceil(max / multiple) * multiple];

function LineChart({ data, width, height, left = 0, bottom = 0, right = 0, top = 0 }: Props): JSXElement {
    right = width - right;
    bottom = height - bottom;

    const array = data.map(series => Array.from(series));
    const [markers, setMarkers] = createSignal<Data[]>(array.map(series => series[series.length - 1]));
    const [showMarkers, setShowMarkers] = createSignal<boolean>(false);

    const dates = scaleTime()
        .range([left, right])
        .domain(extent(flatMap(data, record => record.date)) as [Date, Date]);

    const values = scaleLinear()
        .range([bottom, top])
        .domain(extendBy(extent(flatMap(data, record => record.value)), 5));

    const getPlot = getElement(".plot");

    function updateMarkers(event: MouseEvent) {
        const target = event.currentTarget as HTMLElement;
        const [position] = pointer(event, getPlot(target));
        const date = dates.invert(position);
        const markers = array.map(series => series[bisectDate(series, date)] ?? series[series.length - 1]);
        setMarkers(markers);
        setShowMarkers(true);
        dispatch.call(target, "stats", markers);
    }

    function resetMarkers(event: MouseEvent) {
        const markers = array.map(series => series[series.length - 1]);
        setMarkers(markers);
        setShowMarkers(false);
        dispatch.call(event.currentTarget as EventTarget, "stats", markers);
    }

    return <div class={"chart"}
        classList={{ "with-markers": showMarkers() }}
        onmousemove={updateMarkers}
        onmouseleave={resetMarkers}>

        <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid meet">
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

            <Plot>
                <Index each={data}>
                    { (series, index) =>
                        <Path data={series()} x={dates} y={values} marker={markers()[index]}/>
                    }
                </Index>
            </Plot>

            <AxisMarker left={dates(markers()[0].date)} top={bottom}>
                {formatDate(markers()[0].date)}
            </AxisMarker>
        </svg>
    </div>;
}

export default LineChart;
