import type { PropsWithChildren } from "solid-js";
import type { Offset } from ".";

type Props = Required<Pick<Offset, "left" | "top">> & PropsWithChildren;

const Plot = ({ left, top, children }: Props) =>
    <g transform={`translate(${left},${top})`}>
        {children}
    </g>;

export default Plot;
