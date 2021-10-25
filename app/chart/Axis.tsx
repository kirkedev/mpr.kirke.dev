import type { JSXElement } from "solid-js";
import { onMount } from "solid-js";
import { select } from "d3-selection";
import type { Axis, AxisDomain, AxisScale } from "d3-axis";
import { axisBottom, axisLeft, axisRight, axisTop } from "d3-axis";
import type { Offset } from ".";
import styles from "./Chart.module.css";

interface BaseProps extends Partial<Offset> {
    tickSize?: number;
    tickCount?: number;
}

interface ChartAxisProps<Domain extends AxisDomain> extends BaseProps {
    axis: Axis<Domain>;
}

interface AxisProps<Domain extends AxisDomain> extends BaseProps {
    scale: AxisScale<Domain>
}

function ChartAxis<Domain extends AxisDomain>({ axis, tickCount, tickSize = 0, left = 0, top = 0 }: ChartAxisProps<Domain>): JSXElement {
    let group: SVGGElement;

    onMount(() =>
        select(group).call(axis
            .ticks(tickCount)
            .tickSizeOuter(0)
            .tickSizeInner(tickSize)
            .tickPadding(8)));

    return <g class={styles.axis} ref={el => group = el} transform={`translate(${left},${top})`}/>;
}

const LeftAxis = <Domain extends AxisDomain>({ scale, tickSize, tickCount, top, left }: AxisProps<Domain>) =>
    <ChartAxis left={left} top={top} axis={axisLeft(scale)} tickCount={tickCount} tickSize={tickSize}/>;

const BottomAxis = <Domain extends AxisDomain>({ scale, tickSize, tickCount, top, left }: AxisProps<Domain>) =>
    <ChartAxis left={left} top={top} axis={axisBottom(scale)} tickCount={tickCount} tickSize={tickSize}/>;

const TopAxis = <Domain extends AxisDomain>({ scale, tickSize, tickCount, top, left }: AxisProps<Domain>) =>
    <ChartAxis left={left} top={top} axis={axisTop(scale)} tickCount={tickCount} tickSize={tickSize}/>;

const RightAxis = <Domain extends AxisDomain>({ scale, tickSize, tickCount, top, left }: AxisProps<Domain>) =>
    <ChartAxis left={left} top={top} axis={axisRight(scale)} tickCount={tickCount} tickSize={tickSize}/>;

export { LeftAxis, BottomAxis, RightAxis, TopAxis };
