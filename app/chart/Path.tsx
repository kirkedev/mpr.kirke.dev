import { onMount } from "solid-js";
import { select } from "d3-selection";
import type { ScaleLinear, ScaleTime } from "d3-scale";
import type { Data, Series } from ".";
import styles from "./Chart.module.css";
import { area, curveBasis } from "d3-shape";

interface Props {
    x: ScaleTime<number, number>;
    y: ScaleLinear<number, number>;
    data: Series;
}

function Path({ x, y, data }: Props) {
    let path: SVGPathElement;

    onMount(() =>
        select(path).datum(data)
            .attr("d", area<Data>()
                .curve(curveBasis)
                .x(({ date }) => x(date))
                .y(({ value }) => y(value))));

    return <path class={styles.series} ref={el => path = el}/>;
}

export default Path;
