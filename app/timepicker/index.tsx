import type { JSXElement } from "solid-js";
import type Period from "lib/Period";
import PeriodSelector from "./PeriodSelector";
import DateSlider from "./DateSlider";
import styles from "./index.module.css";

interface Props {
    date: Date;
    start: Date;
    end: Date;
    period: Period;
}

function TimePicker(props: Props): JSXElement {
    return <div id="timepicker">
        <div class={styles.period}>
            <PeriodSelector selected={props.period} />
        </div>
        <div class={styles.datepicker}>
            <DateSlider start={props.start} end={props.end} date={props.date} />
        </div>
    </div>;
}

export default TimePicker;
