import type { JSXElement, JSX } from "solid-js";
import { Index } from "solid-js";
import type Period from "lib/Period";
import { Periods } from "lib/Period";
import { dispatch } from "../dom";
import styles from "./Periods.module.css";

interface Props {
    selected: Period;
}

declare module "solid-js" {
    namespace JSX {
        interface CustomEvents {
            selectPeriod: CustomEvent<Period>;
        }
    }
}

const selectPeriod = (period: Period): JSX.EventHandler<Element, MouseEvent> =>
    function(event: MouseEvent & { target: Element }): void {
        if (event.target.className.includes(styles.active)) return;
        dispatch.call(event.target, "selectPeriod", period);
    };

const PeriodSelector = (props: Props): JSXElement => <>
    <h3 class={styles.caption}>Time Period</h3>

    <div class={styles.periods}>
        <Index each={Periods}>
            { value =>
                <span onClick={selectPeriod(value())}
                    classList={{ [styles.active]: props.selected.equals(value()) }}>
                    { value().description }
                </span>
            }
        </Index>
    </div>
</>;

export default PeriodSelector;
