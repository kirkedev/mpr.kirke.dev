import type { JSXElement } from "solid-js";
import { createEffect, createMemo, createSignal } from "solid-js";
import type { CashIndex } from "lib/CashIndex";
import { formatNumber, getObservation } from "../App";
import type { Data } from "../chart";
import LineChart from "../chart/LineChart";
import styles from "./Cash.module.css";

interface Props {
    cash: CashIndex[];
    date: Date;
}

const series = (data: CashIndex[]): Data[][] => [
    data.map(({ date, reportDate, indexPrice: value }) => ({ date, reportDate, value }))
];

function Cash(props: Props): JSXElement {
    const [date, setDate] = createSignal(props.date);
    const data = createMemo(() => series(props.cash));
    const stats = createMemo<Data>(() => getObservation(data()[0], date()));
    const end = createMemo<Date>(() => getObservation(data()[0], props.date).date);

    createEffect(() => setDate(end()));

    return <div id="cash" class={styles.cash} on:selectDate={({ detail: date }) => setDate(date)}>
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
            right={32}
            bottom={48}
            left={32}
            top={32}
            data={data()}
            marker={stats()}
            end={end()}/>
    </div>;
}

export default Cash;
