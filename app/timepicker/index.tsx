import type { JSXElement } from "solid-js";
import type { Period } from "./Periods";
import Periods from "./Periods";
import DateSlider from "./DateSlider";
import styles from "./index.module.css";

interface Props {
    date: Date;
    start: Date;
    end: Date;
    period: Period;
}

function TimePicker(props: Props): JSXElement {
    return <>
        <div class={styles.period}>
            <Periods selected={props.period} />
        </div>
        <div class={styles.datepicker}>
            <DateSlider start={props.start} end={props.end} date={props.date} />
        </div>
    </>;
}

export default TimePicker;
