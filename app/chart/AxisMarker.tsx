import type { JSXElement, PropsWithChildren } from "solid-js";
import type { Offset } from ".";
import "./chart.css";

interface Props extends PropsWithChildren, Partial<Offset> {}

const AxisMarker = (props: Props): JSXElement =>
    <g class={"marker"} transform={`translate(${(props.left ?? 0) - 28},${props.top ?? 0})`}>
        <rect height={24} width={56} rx={4} y={16}/>
        <text dominant-baseline="middle" text-anchor="middle" y={20} x={28} dy={"0.71em"}>
            { props.children }
        </text>
    </g>;

export default AxisMarker;
