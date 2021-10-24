import type { Offset } from ".";
import type { PropsWithChildren } from "solid-js";

type Props = PropsWithChildren & Partial<Offset>;

const Plot = ({ children, left = 0, top = 0 }: Props) =>
    <g transform={`translate(${left},${top})`}>
        {children}
    </g>;

export default Plot;
