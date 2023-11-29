import type { ActionReturn } from "svelte/action";
import { select } from "d3-selection";
import { axisRight, axisBottom, axisLeft, axisTop, type Axis, type AxisDomain, type AxisScale } from "d3-axis";
import "d3-transition";

interface Props<T extends AxisDomain> {
    scale: AxisScale<T>;
    ticks?: number;
    tickPadding?: number;
    tickSize?: number;
}

function createAxis<T extends AxisDomain>(axis: (scale: AxisScale<T>) => Axis<T>) {
    return function(element: SVGGElement, { scale, ticks = 5, tickPadding = 12, tickSize = 0 }: Props<T>): ActionReturn<Props<T>> {
        select(element).call(axis(scale)
            .ticks(ticks)
            .tickSizeInner(tickSize)
            .tickSizeOuter(0)
            .tickPadding(tickPadding));

        return {
            update({ scale, ticks = 5, tickPadding = 12, tickSize = 0 }: Props<T>) {
                select(element).transition().call(axis(scale)
                    .ticks(ticks)
                    .tickSizeInner(tickSize)
                    .tickSizeOuter(0)
                    .tickPadding(tickPadding));
            }
        };
    };
}

const bottomAxis = createAxis(axisBottom);
const rightAxis = createAxis(axisRight);
const topAxis = createAxis(axisTop);
const leftAxis = createAxis(axisLeft);

export { bottomAxis, rightAxis, topAxis, leftAxis };
