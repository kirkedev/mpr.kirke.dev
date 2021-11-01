import type { JSXElement, PropsWithChildren } from "solid-js";
import type { Dimensions, Offset } from ".";
import "./chart.css";

interface Props extends PropsWithChildren, Dimensions, Partial<Offset> {}

function AxisMarker(props: Props): JSXElement {
    const { height, width, left = 0, top = 0 } = props;

    return <g class="marker" transform={`translate(${left - width / 2},${top})`}>
        <rect height={height} width={width} rx={4} y={height / 2 - 4} />
        <text dominant-baseline="middle" text-anchor="middle" y={height - 2} x={width / 2}>
            {props.children}
        </text>
    </g>;
}

export default AxisMarker;
