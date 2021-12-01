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
import AxisMarker from "./AxisMarker";
import Line from "./Line";
import Plot from "./Plot";
import Path from "./Path";
import "./chart.css";

interface Props extends Dimensions, Partial<Offset> {
    data: Series[];
    marker: Data;
    end: Date;
}

declare module "solid-js" {
    namespace JSX {
        interface CustomEvents {
            selectDate: CustomEvent<Date>;
        }
    }
}

const formatDate = timeFormat("%b %d");

const getDateRange = (data: Series[]): [Date, Date] =>
    extent(flatMap(data, record => record.date)) as [Date, Date];

const getValueRange = (data: Series[]): [number, number] =>
    extent(flatMap(data, record => record.value)) as [number, number];

function LineChart(props: Props): JSXElement {
    const { width, height, top = 0, left = 0 } = props;
    const bottom = height - (props.bottom ?? 0);
    const right = width - (props.right ?? 0);
    const getPlot = getElement(".plot");

    const dates = createMemo(scale =>
        scale.copy().domain(getDateRange(props.data)),
    scaleTime().rangeRound([left, right]));

    const values = createMemo(scale =>
        scale.copy().domain(getValueRange(props.data)).nice(),
    scaleLinear().rangeRound([bottom, top]));

    const marker = createMemo(() => ({
        left: dates()(props.marker.date),
        top: values()(props.marker.value),
        end: dates()(props.end)
    }));

    function selectDate(event: MouseEvent): void {
        const target = event.currentTarget as HTMLElement;
        const [position] = pointer(event, getPlot(target));
        const date = dates().invert(Math.min(Math.max(position, left), marker().end));
        dispatch.call(target, "selectDate", date);
    }

    function resetDate(event: MouseEvent): void {
        dispatch.call(event.currentTarget as EventTarget, "selectDate", props.end);
    }

    const mask = Math.random().toString(32).substring(2, 7) + Math.random().toString(32).substring(2, 7);

    return <div class="chart" onmousemove={selectDate} onmouseleave={resetDate}>
        <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid meet">
            <defs>
                <mask id={mask}>
                    <rect x={0} y={top} width={marker().end} height={bottom} fill="white"/>
                    <rect x={marker().end} width={right - marker().end} height={bottom} fill="white" opacity={.5}/>
                </mask>
            </defs>

            <RightAxis
                scale={values()}
                left={width}
                tickSize={-width}
                tickCount={5}
                tickPadding={12}/>

            <BottomAxis
                top={bottom}
                scale={dates()}
                tickCount={5}
                tickPadding={24}/>

            <Line
                left={marker().left}
                top={top}
                bottom={bottom + 16}/>

            <AxisMarker width={64} height={32} top={bottom} left={marker().left}>
                {formatDate(props.marker.date)}
            </AxisMarker>

            <Plot>
                <Index each={props.data}>
                    { series =>
                        <Path data={series()} x={dates()} y={values()} marker={props.marker} mask={`url(#${mask})`}/>
                    }
                </Index>
            </Plot>
        </svg>
    </div>;
}

export default LineChart;
