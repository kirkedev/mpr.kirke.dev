import type { JSXElement } from "solid-js";
import { createSignal } from "solid-js";
import type { CashIndex } from "lib/CashIndex";
import { bisectDate, formatNumber } from "../report";
import type { Data } from "../chart";
import LineChart from "../chart/LineChart";
import styles from "./Cash.module.css";

interface Props {
    cash: CashIndex[];
}

const series = (data: CashIndex[]): Data[][] => [
    data.map(({ date, indexPrice: value }) => ({ date, value }))
];

function Report({ cash }: Props): JSXElement {
    const [data] = series(cash);
    const [selected, setSelected] = createSignal<Data>(data[data.length - 1]);
    const getDate = (date: Date): Data => data[bisectDate(data, date)];

    return <div class={styles.cash} on:selectDate={({ detail }) => setSelected(getDate(detail))} >
        <div class={styles.stats}>
            <h2>Cash Index</h2>

            <div class={styles.stat}>
                <h2 class={styles.value}>
                    {formatNumber(selected().value)}
                </h2>
            </div>
        </div>

        <LineChart
            width={640}
            height={360}
            right={48}
            bottom={48}
            left={32}
            top={32}
            data={[data]}
            marker={selected()} />
    </div>;
}

export default Report;
