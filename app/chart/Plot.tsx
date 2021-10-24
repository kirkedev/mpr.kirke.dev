import type { PropsWithChildren } from "solid-js";
import type { Offset } from ".";

type Props = Offset & PropsWithChildren;

const Plot = ({ left = 0, top = 0, children }: Props) =>
    <g transform={`translate(${left},${top})`}>
        {children}
    </g>;

export default Plot;
