import type { JSXElement } from "solid-js";
import { onMount } from "solid-js";
import { select } from "d3-selection";
import type { Axis, AxisDomain, AxisScale } from "d3-axis";
import { axisBottom, axisLeft, axisRight, axisTop } from "d3-axis";
import type { Offset } from ".";

interface ChartAxisProps<Domain extends AxisDomain> extends Partial<Offset> {
    axis: Axis<Domain>;
}

interface AxisProps<Domain extends AxisDomain> extends Partial<Offset> {
    scale: AxisScale<Domain>
}

function ChartAxis<Domain extends AxisDomain>({ axis, left = 0, top = 0 }: ChartAxisProps<Domain>): JSXElement {
    let group: SVGGElement;
    onMount(() => select(group).call(axis));
    return <g ref={el => group = el} transform={`translate(${left},${top})`}/>;
}

const LeftAxis = <Domain extends AxisDomain>({ scale, top, left }: AxisProps<Domain>) =>
    <ChartAxis left={left} top={top} axis={axisLeft(scale)}/>;

const BottomAxis = <Domain extends AxisDomain>({ scale, top, left }: AxisProps<Domain>) =>
    <ChartAxis left={left} top={top} axis={axisBottom(scale)}/>;

const TopAxis = <Domain extends AxisDomain>({ scale, top, left }: AxisProps<Domain>) =>
    <ChartAxis left={left} top={top} axis={axisTop(scale)}/>;

const RightAxis = <Domain extends AxisDomain>({ scale, top, left }: AxisProps<Domain>) =>
    <ChartAxis left={left} top={top} axis={axisRight(scale)}/>;

export { LeftAxis, BottomAxis, RightAxis, TopAxis };
