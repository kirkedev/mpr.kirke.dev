import { onMount } from "solid-js";
import { select } from "d3-selection";
import type { ScaleLinear, ScaleTime } from "d3-scale";
import { curveBasis, line } from "d3-shape";
import type { Data, Series } from ".";
import styles from "./Chart.module.css";

interface Props {
    x: ScaleTime<number, number>;
    y: ScaleLinear<number, number>;
    data: Series;
}

function Path({ x, y, data }: Props) {
    let path: SVGPathElement;

    onMount(() =>
        select(path).datum(data)
            .attr("d", line<Data>()
                .curve(curveBasis)
                .x(({ date }) => x(date))
                .y(({ value }) => y(value))));

    return <path class={styles.series} ref={el => path = el}/>;
}

export default Path;
