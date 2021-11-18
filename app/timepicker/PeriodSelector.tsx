import type { JSXElement } from "solid-js";
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

function PeriodSelector(props: Props): JSXElement {
    return <>
        <h3 class={styles.caption}>Time Period</h3>
        <div class={styles.periods}>
            <Index each={Periods}>
                { value =>
                    <span classList={{ [styles.active]: props.selected.equals(value()) }}
                        onClick={event => {
                            if (event.target.className.includes(styles.active)) return false;
                            dispatch.call(event.target, "selectPeriod", value());
                        }}>
                        { value().description }
                    </span>
                }
            </Index>
        </div>
    </>;
}

export default PeriodSelector;
