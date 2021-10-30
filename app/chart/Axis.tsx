import type { JSXElement } from "solid-js";
import { select } from "d3-selection";
import type { Axis, AxisDomain, AxisScale } from "d3-axis";
import { axisBottom, axisLeft, axisRight, axisTop } from "d3-axis";
import type { Offset } from ".";
import styles from "./Axis.module.css";

interface Props<Domain extends AxisDomain> extends Partial<Offset> {
    tickSize?: number;
    tickCount?: number;
    tickPadding?: number;
    scale: AxisScale<Domain>;
}

interface AxisProps<Domain extends AxisDomain> extends Partial<Offset>{
    axis: Axis<Domain>;
}

const mapProps = <Domain extends AxisDomain>(
    axis: (scale: AxisScale<Domain>) => Axis<Domain>,
    props: Props<Domain>
): AxisProps<Domain> => ({
    left: props.left,
    top: props.top,
    axis: axis(props.scale)
        .ticks(props.tickCount)
        .tickSizeInner(props.tickSize ?? 0)
        .tickSizeOuter(0)
        .tickPadding(props.tickPadding ?? 8)
});

const HorizontalAxis = <Domain extends AxisDomain>({ axis, left = 0, top = 0 }: AxisProps<Domain>): JSXElement =>
    <g class={styles.axis}
        ref={el => select(el).call(axis)}
        transform={`translate(${left},${top})`} />;

const VerticalAxis = <Domain extends AxisDomain>({ axis, left = 0, top = 0 }: AxisProps<Domain>): JSXElement =>
    <g class={`${styles.vertical} ${styles.axis}`}
        transform={`translate(${left},${top})`}
        ref={el => select(el).call(axis)} />;

const LeftAxis = <Domain extends AxisDomain>(props: Props<Domain>): JSXElement =>
    <VerticalAxis { ...mapProps(axisLeft, props) }/>;

const RightAxis = <Domain extends AxisDomain>(props: Props<Domain>): JSXElement =>
    <VerticalAxis { ...mapProps(axisRight, props) }/>;

const BottomAxis = <Domain extends AxisDomain>(props: Props<Domain>): JSXElement =>
    <HorizontalAxis { ...mapProps(axisBottom, props) }/>;

const TopAxis = <Domain extends AxisDomain>(props: Props<Domain>): JSXElement =>
    <HorizontalAxis { ...mapProps(axisTop, props) }/>;

export { LeftAxis, BottomAxis, RightAxis, TopAxis };
