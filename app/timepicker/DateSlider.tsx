import type { JSXElement } from "solid-js";
import { createMemo, onCleanup, onMount } from "solid-js";
import { timeFormat } from "d3-time-format";
import { scaleTime } from "d3-scale";
import { select } from "d3-selection";
import { drag } from "d3-drag";
import { dispatch } from "../dom";
import styles from "./DateSlider.module.css";

interface Props {
    start: Date;
    end: Date;
    date: Date;
}

declare module "solid-js" {
    namespace JSX {
        interface CustomEvents {
            selectDate: CustomEvent<Date>;
        }
    }
}

const formatDate = timeFormat("%b %d");

function DateSlider(props: Props): JSXElement {
    const scale = createMemo(() => scaleTime().clamp(true)
        .domain([props.start, props.end])
        .range([0, 100]));

    function dateSlider(element: Element): void {
        onMount(() => select(element).call(drag().on("drag end", function(event) {
            const date = scale().invert(100 * event.x / element.clientWidth);
            dispatch.call(element, "selectDate", date);
        })));

        onCleanup(() => select(element).on(".drag", null));
    }

    return <div class={styles.track} ref={dateSlider}>
        <div class={styles.slider} style={{ left: `${scale()(props.date)}%` }}>
            <span class={styles.caption}>{formatDate(props.date)}</span>
        </div>
    </div>;
}

export default DateSlider;
