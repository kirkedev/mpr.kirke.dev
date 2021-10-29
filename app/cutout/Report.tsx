import { createSignal, JSXElement } from "solid-js";
import LineChart from "../chart/LineChart";
import styles from "./Cutout.module.css";
import { Data } from "../chart";
import { timeFormat } from "d3-time-format";
import { format } from "d3-format";
import type { CutoutIndex } from "lib/CutoutIndex";

interface Props {
    cutout: CutoutIndex[]
}

const formatDate = timeFormat("%b %d, %Y");

const formatNumber = format("(.2f");

const series = (cutout: CutoutIndex[]) => [
    cutout.map(({ date, indexPrice: value }) => ({ date, value })),
    cutout.map(({ date, carcassPrice: value }) => ({ date, value })),
];

function Report(props: Props): JSXElement {
    const data = series(props.cutout);
    const [getStats, setStats] = createSignal<Data>(data[1][data.length - 1]);
    const updateStats = ({ detail }: CustomEvent<Data[]>) => setStats(detail[1]);

    return <div on:stats={updateStats} class={styles.cutout}>
        <div class={styles.stats}>
            <h2>Cutout</h2>

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
            right={32}
            bottom={48}
            left={32}
            top={16}
            data={data}
        />
    </div>;
}

export default Report;
