import type { JSXElement } from "solid-js";
import { onMount } from "solid-js";
import { select } from "d3-selection";
import type { AxisDomain, AxisScale } from "d3-axis";
import { axisBottom, axisLeft, axisRight, axisTop } from "d3-axis";
import type { Offset } from ".";
import { Position } from ".";

interface Props<Domain extends AxisDomain> extends Offset {
    scale: AxisScale<Domain>;
    position: Position;
}

function Axis<Domain extends AxisDomain>({ scale, position, left = 0, top = 0 }: Props<Domain>): JSXElement {
    let group: SVGGElement;

    switch (position) {
        case Position.Left: {
            onMount(() => select(group).call(axisLeft(scale)));
            break;
        }

        case Position.Bottom: {
            onMount(() => select(group).call(axisBottom(scale)));
            break;
        }

        case Position.Right: {
            onMount(() => select(group).call(axisRight(scale)));
            break;
        }

        case Position.Top: {
            onMount(() => select(group).call(axisTop(scale)));
            break;
        }
    }

    return <g ref={el => group = el} transform={`translate(${left},${top})`}/>;
}

export default Axis;
