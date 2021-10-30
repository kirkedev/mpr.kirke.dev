import type { JSXElement } from "solid-js";
import { createSignal, Index } from "solid-js";
import styles from "./Cutout.module.css";
import type { Data } from "../chart";
import { format } from "d3-format";
import type { CutoutIndex } from "lib/CutoutIndex";
import LineChart from "../chart/LineChart";

interface Props {
    cutout: CutoutIndex[];
}

const formatNumber = format(".2f");

const series = (cutout: CutoutIndex[]): Data[][] => [
    cutout.map(({ date, indexPrice: value }) => ({ date, value })),
    cutout.map(({ date, carcassPrice: value }) => ({ date, value }))
];

const labels = ["Cutout", "Index"];

function Report(props: Props): JSXElement {
    const data = series(props.cutout);
    const [getStats, setStats] = createSignal<Data[]>(data.map(series => series[series.length - 1]));
    const updateStats = ({ detail }: CustomEvent<Data[]>): Data[] => setStats(detail);

    return <div on:stats={updateStats} class={styles.cutout}>
        <div class={styles.stats}>
            <Index each={getStats().reverse()}>
                { (stat, index) => <div class={styles.stat}>
                    <h5 class={styles.label}>
                        {labels[index]}
                    </h5>

                    <h3 class={styles.value}>
                        {formatNumber(stat().value)}
                    </h3>
                </div>
                }
            </Index>
        </div>

        <LineChart
            width={640}
            height={360}
            right={48}
            bottom={48}
            left={32}
            top={32}
            data={data}
        />
    </div>;
}

export default Report;
