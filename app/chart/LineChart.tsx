import type { JSXElement } from "solid-js";
import { createMemo, Index } from "solid-js";
import { timeFormat } from "d3-time-format";
import { extent } from "d3-array";
import type { NumberValue } from "d3-scale";
import { scaleLinear, scaleTime } from "d3-scale";
import { pointer } from "d3-selection";
import { flatMap } from "lib/itertools/map";
import { dispatch, getElement } from "../dom";
import type { Data, Dimensions, Offset, Series } from ".";
import { BottomAxis, RightAxis } from "./Axis";
import AxisMarker from "./AxisMarker";
import MarkerLine from "./MarkerLine";
import Plot from "./Plot";
import Path from "./Path";
import "./chart.css";
import styles from "./Path.module.css";

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

const extendBy = ([min = 0, max = 0]: [number?, number?], multiple: number): [number, number] =>
    [Math.floor(min / multiple) * multiple, Math.ceil(max / multiple) * multiple];

const getDateRange = (data: Series[]): [Date, Date] =>
    extent(flatMap(data, record => record.date)) as [Date, Date];

const getValueRange = (data: Series[]): [number, number] =>
    extent(flatMap(data, record => record.value)) as [number, number];

const equals = <T extends NumberValue>(array: T[], other: T[]): boolean =>
    array.every((value, index) => value === other[index]);

function LineChart(props: Props): JSXElement {
    const { width, height, top = 0, left = 0 } = props;
    const bottom = height - (props.bottom ?? 0);
    const right = width - (props.right ?? 0);

    const dates = createMemo(scale =>
        scale.copy().domain(getDateRange(props.data)),
    scaleTime().range([left, right]), {
        equals: (previous, current) =>
            equals(previous.domain(), current.domain())
    });

    const values = createMemo(scale =>
        scale.copy().domain(extendBy(getValueRange(props.data), 5)),
    scaleLinear().range([bottom, top]), {
        equals: (previous, current) =>
            equals(previous.domain(), current.domain())
    });

    const marker = createMemo(() => ({
        left: dates()(props.marker.date),
        top: values()(props.marker.value),
        end: dates()(props.end)
    }));

    const getPlot = getElement(".plot");

    function selectDate(event: MouseEvent): void {
        const target = event.currentTarget as HTMLElement;
        const [position] = pointer(event, getPlot(target));
        const date = dates().invert(Math.min(Math.max(position, left), marker().end));
        dispatch.call(target, "selectDate", date);
    }

    function resetDate(event: MouseEvent): void {
        dispatch.call(event.currentTarget as EventTarget, "selectDate", props.end);
    }

    return <div class="chart" onmousemove={selectDate} onmouseleave={resetDate}>
        <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid meet">
            <defs>
                <mask id={styles.active}>
                    <rect x={0} y={top} width={marker().end} height={bottom} fill="white"/>
                    <rect x={marker().end} width={right - marker().end} height={bottom} fill="white" opacity={.4}/>
                </mask>
            </defs>

            <RightAxis
                scale={values}
                left={width}
                tickSize={-width}
                tickCount={5}
                tickPadding={12}/>

            <BottomAxis
                top={bottom}
                scale={dates}
                tickCount={5}
                tickPadding={24}/>

            <MarkerLine
                left={marker().left}
                top={top}
                bottom={bottom + 16}/>

            <AxisMarker width={64} height={32} top={bottom} left={marker().left}>
                {formatDate(props.marker.date)}
            </AxisMarker>

            <Plot>
                <Index each={props.data}>
                    { series => <Path data={series()} x={dates()} y={values()} marker={props.marker}/> }
                </Index>
            </Plot>
        </svg>
    </div>;
}

export default LineChart;
