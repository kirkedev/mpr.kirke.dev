import type { JSXElement, PropsWithChildren } from "solid-js";
import type { Offset } from ".";

type Props = PropsWithChildren & Partial<Offset>;

const Plot = ({ children, left = 0, top = 0 }: Props): JSXElement =>
    <g class={"plot"} transform={`translate(${left},${top})`}>
        {children}
    </g>;

export default Plot;
