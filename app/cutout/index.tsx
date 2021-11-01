import type { JSXElement } from "solid-js";
import { createMemo, Index } from "solid-js";
import styles from "./Cutout.module.css";
import type { Data } from "../chart";
import type { CutoutIndex } from "lib/CutoutIndex";
import LineChart from "../chart/LineChart";
import { formatNumber, getDate } from "../App";

interface Props {
    cutout: CutoutIndex[];
    selected: Date;
}

const series = (cutout: CutoutIndex[]): Data[][] => [
    cutout.map(record => ({ date: record.date, value: record.indexPrice })),
    cutout.map(record => ({ date: record.date, value: record.carcassPrice }))
];

const labels = ["Cutout", "Index"];

function Cutout(props: Props): JSXElement {
    const data = series(props.cutout);

    const stats = createMemo<Data[]>(() =>
        data.map(series => getDate(series, props.selected)).reverse());

    return <div class={styles.cutout}>
        <div class={styles.stats}>
            <Index each={stats()}>
                { (stat, index) =>
                    <div class={styles.stat}>
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
            marker={stats()[0]}
        />
    </div>;
}

export default Cutout;
