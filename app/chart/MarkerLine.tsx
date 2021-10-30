import type { JSXElement } from "solid-js";
import type { Offset } from ".";

type Props = Partial<Offset>;

const MarkerLine = (props: Props): JSXElement =>
    <line class="marker-line" transform={`translate(${props.left},0)`}
        y1={props.top}
        y2={props.bottom} />;

export default MarkerLine;
