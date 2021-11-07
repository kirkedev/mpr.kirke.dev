import type { JSXElement } from "solid-js";
import { Index } from "solid-js";
import { dispatch } from "../dom";
import styles from "./Periods.module.css";

enum Period {
    OneMonth = "1M",
    ThreeMonths = "3M",
    SixMonths = "6M",
    OneYear = "1Y"
}

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

function Periods(props: Props): JSXElement {
    return <>
        <h3 class={styles.caption}>Time Period</h3>
        <div class={styles.periods}>
            <Index each={Object.values(Period)}>
                { value =>
                    <span classList={{ [styles.active]: value() === props.selected }}
                        onClick={event => {
                            if (event.target.className.includes(styles.active)) return false;
                            dispatch.call(event.target, "selectPeriod", value());
                        }}>
                        { value() }
                    </span>
                }
            </Index>
        </div>
    </>;
}

export default Periods;

export { Period };
