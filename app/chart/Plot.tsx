import type { JSXElement, PropsWithChildren } from "solid-js";
import type { Offset } from ".";

type Props = PropsWithChildren & Partial<Offset>;

function Plot({ children, left = 0, top = 0 }: Props): JSXElement {
    return <g class={"plot"} transform={`translate(${left},${top})`}>
        {children}
    </g>;
}

export default Plot;
