import type { JSXElement } from "solid-js";
import { createEffect } from "solid-js";
import type { AxisDomain, AxisScale } from "d3-axis";
import { axisBottom, axisRight } from "d3-axis";
import { select } from "d3-selection";
import "d3-transition";
import type { Offset } from ".";
import styles from "./Axis.module.css";

interface Props<Domain extends AxisDomain> extends Partial<Offset> {
    tickSize?: number;
    tickCount?: number;
    tickPadding?: number;
    scale: AxisScale<Domain>;
}

function RightAxis<Domain extends AxisDomain>(props: Props<Domain>): JSXElement {
    const { tickCount, left = 0, top = 0, tickSize = 0, tickPadding = 8 } = props;

    const axis = (element: SVGGElement): void =>
        createEffect(() => select(element).transition()
            .call(axisRight(props.scale)
                .ticks(tickCount)
                .tickSizeInner(tickSize)
                .tickSizeOuter(0)
                .tickPadding(tickPadding)));

    return <g class={`${styles.vertical} ${styles.axis}`}
        transform={`translate(${left},${top})`}
        ref={axis}/>;
}

function BottomAxis<Domain extends AxisDomain>(props: Props<Domain>): JSXElement {
    const { tickCount, left = 0, top = 0, tickSize = 0, tickPadding = 8 } = props;

    const axis = (element: SVGGElement): void =>
        createEffect(() => select(element).transition()
            .call(axisBottom(props.scale)
                .ticks(tickCount)
                .tickSizeInner(tickSize)
                .tickSizeOuter(0)
                .tickPadding(tickPadding)));

    return <g class={styles.axis}
        transform={`translate(${left},${top})`}
        ref={axis}/>;
}

export { BottomAxis, RightAxis };
