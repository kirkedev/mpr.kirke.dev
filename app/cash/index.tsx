import type { JSXElement } from "solid-js";
import { createMemo } from "solid-js";
import type { CashIndex } from "lib/CashIndex";
import { formatNumber, getDate } from "../App";
import type { Data } from "../chart";
import LineChart from "../chart/LineChart";
import styles from "./Cash.module.css";

interface Props {
    cash: CashIndex[];
    selected: Date;
}

const series = (data: CashIndex[]): Data[][] => [
    data.map(({ date, indexPrice: value }) => ({ date, value }))
];

function Cash(props: Props): JSXElement {
    const data = series(props.cash);
    const stats = createMemo<Data>(() => getDate(data[0], props.selected));

    return <div class={styles.cash}>
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
            marker={stats()} />
    </div>;
}

export default Cash;
