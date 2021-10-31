import type { JSXElement, PropsWithChildren } from "solid-js";
import type { Offset } from ".";

type Props = PropsWithChildren & Partial<Offset>;

const Plot = (props: Props): JSXElement =>
    <g class="plot" transform={`translate(${props.left ?? 0},${props.top ?? 0})`}>
        {props.children}
    </g>;

export default Plot;
