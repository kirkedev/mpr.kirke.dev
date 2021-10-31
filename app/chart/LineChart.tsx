import type { JSXElement } from "solid-js";
import { createMemo, Index } from "solid-js";
import { timeFormat } from "d3-time-format";
import { extent } from "d3-array";
import { scaleLinear, scaleTime } from "d3-scale";
import { pointer } from "d3-selection";
import { flatMap } from "lib/itertools/map";
import { dispatch, getElement } from "../dom";
import type { Data, Dimensions, Offset, Series } from ".";
import { BottomAxis, RightAxis } from "./Axis";
import Path from "./Path";
import Plot from "./Plot";
import MarkerLine from "./MarkerLine";
import AxisMarker from "./AxisMarker";
import "./chart.css";

interface Props extends Dimensions, Partial<Offset> {
    data: Series[];
    marker: Data;
}

declare module "solid-js" {
    namespace JSX {
        interface CustomEvents {
            selectDate: CustomEvent<Date>;
        }
    }
}

const formatDate = timeFormat("%b %d");

const extendBy = ([min = 0, max = 0]: [number?, number?], multiple: number): [number, number] =>
    [Math.floor(min / multiple) * multiple, Math.ceil(max / multiple) * multiple];

function LineChart(props: Props): JSXElement {
    const { width, height, top = 0, left = 0 } = props;
    const bottom = height - (props.bottom ?? 0);
    const right = width - (props.right ?? 0);

    const dates = createMemo(scale =>
        scale.copy().domain(extent(flatMap(props.data, record => record.date)) as [Date, Date]),
    scaleTime().range([left, right]), {
        equals: function(prev, next) {
            const domain = prev.domain();
            const [y0, y1] = next.domain();
            return y0 === domain[0] && y1 === domain[1];
        }
    });

    const values = createMemo(scale =>
        scale.copy().domain(extendBy(extent(flatMap(props.data, record => record.value)), 5)),
    scaleLinear().range([bottom, top]), {
        equals: function(prev, next) {
            const domain = prev.domain();
            const [y0, y1] = next.domain();
            return y0 === domain[0] && y1 === domain[1];
        }
    });

    const getPlot = getElement(".plot");

    function updateMarkers(event: MouseEvent): void {
        const target = event.currentTarget as HTMLElement;
        const [position] = pointer(event, getPlot(target));
        const date = dates().invert(position);
        dispatch.call(target, "selectDate", date);
    }

    function resetMarkers(event: MouseEvent): void {
        dispatch.call(event.currentTarget as EventTarget, "selectDate", dates().domain()[1]);
    }

    return <div class="chart"
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
                left={dates()(props.marker.date)}
                top={values()(props.marker.value)}
                bottom={bottom + 14}/>

            <Plot>
                <Index each={props.data}>
                    { series => <Path data={series()} x={dates()} y={values()} marker={props.marker}/> }
                </Index>
            </Plot>

            <AxisMarker left={dates()(props.marker.date)} top={bottom}>
                {formatDate(props.marker.date)}
            </AxisMarker>
        </svg>
    </div>;
}

export default LineChart;
