import type { JSXElement, PropsWithChildren } from "solid-js";
import type { Offset } from ".";
import "./chart.css";

interface Props extends PropsWithChildren, Partial<Offset> {}

function AxisMarker(props: Props): JSXElement {
    const height = 32;
    const width = 64;

    return <g class={"marker"} transform={`translate(${(props.left ?? 0) - width / 2},${props.top ?? 0})`}>
        <rect height={height} width={width} rx={4} y={height / 2 - 4} />
        <text dominant-baseline="middle" text-anchor="middle" y={height - 2} x={width / 2}>
            {props.children}
        </text>
    </g>;
}

export default AxisMarker;
