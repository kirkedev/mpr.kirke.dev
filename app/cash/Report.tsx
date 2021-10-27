import { createSignal, JSXElement } from "solid-js";
import { timeFormat } from "d3-time-format";
import type { CashIndex } from "lib/CashIndex";
import type { Data } from "../chart";
import LineChart from "../chart/LineChart";
import styles from "./Cash.module.css";
import { format } from "d3-format";

interface Props {
    cash: CashIndex[];
}

declare module "solid-js" {
    namespace JSX {
        interface CustomEvents {
            stats: CustomEvent<Data[]>;
        }
    }
}

const formatDate = timeFormat("%b %d, %Y");

const formatNumber = format("(.2f");

const series = (data: CashIndex[]): Data[] =>
    data.map(({ date, indexPrice: value }) => ({ date, value }));

function Report({ cash }: Props): JSXElement {
    const data = series(cash);
    const [getStats, setStats] = createSignal<Data>(data[data.length - 1]);
    const updateStats = ({ detail }: CustomEvent<Data[]>) => setStats(detail[0]);

    return <div on:stats={updateStats} class={styles.cash}>
        <div class={styles.stats}>
            <h2>Cash Index</h2>

            <div class={styles.stat}>
                <h3 class={styles.value}>
                    {formatNumber(getStats().value)}
                </h3>

                <h5 class={styles.date}>
                    {formatDate(getStats().date)}
                </h5>
            </div>
        </div>

        <LineChart
            width={640}
            height={360}
            right={56}
            bottom={40}
            left={28}
            top={16}
            data={[data]}
        />
    </div>;
}

export default Report;
