import type { JSXElement } from "solid-js";
import { createEffect, createMemo, createSignal } from "solid-js";
import type { CashIndex } from "lib/CashIndex";
import { formatNumber, getObservation } from "../App";
import type { Data } from "../chart";
import LineChart from "../chart/LineChart";
import styles from "./Cash.module.css";

interface Props {
    cash: CashIndex[];
    end: Date;
}

const series = (data: CashIndex[]): Data[][] => [
    data.map(({ date, indexPrice: value }) => ({ date, value }))
];

function Cash(props: Props): JSXElement {
    const data = series(props.cash);
    const [date, setDate] = createSignal(props.end);
    const stats = createMemo<Data>(() => getObservation(data[0], date()));
    createEffect(() => setDate(props.end));

    return <div class={styles.cash} on:selectDate={({ detail: date }) => setDate(date)}>
        <div class={styles.stats}>
            <h2>Cash Index</h2>

            <div class={styles.stat}>
                <h2 class={styles.value}>
                    {formatNumber(stats().value)}
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
            data={data}
            marker={stats()}
            end={getObservation(data[0], props.end).date}/>
    </div>;
}

export default Cash;
