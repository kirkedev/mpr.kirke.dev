import type { JSXElement, PropsWithChildren } from "solid-js";
import type { Offset } from ".";
import styles from "./Chart.module.css";

type Props = PropsWithChildren & Partial<Offset>;

function Plot({ children, left = 0, top = 0 }: Props): JSXElement {
    return <g class={styles.plot} transform={`translate(${left},${top})`}>
        {children}
    </g>;
}

export default Plot;
