import type { JSXElement } from "solid-js";
import { createEffect, createMemo, createSignal, Index } from "solid-js";
import styles from "./Cutout.module.css";
import type { Data } from "../chart";
import type { CutoutIndex } from "lib/CutoutIndex";
import LineChart from "../chart/LineChart";
import { formatNumber, getObservation } from "../App";

interface Props {
    cutout: CutoutIndex[];
    end: Date;
}

const series = (cutout: CutoutIndex[]): Data[][] => [
    cutout.map(record => ({ date: record.date, value: record.indexPrice })),
    cutout.map(record => ({ date: record.date, value: record.carcassPrice }))
];

const labels = ["Cutout", "Index"];

function Cutout(props: Props): JSXElement {
    const data = series(props.cutout);
    const [date, setDate] = createSignal(props.end);
    const stats = createMemo<Data[]>(() => data.map(series => getObservation(series, date())).reverse());
    createEffect(() => setDate(getObservation(data[0], props.end).date));

    return <div class={styles.cutout} on:selectDate={({ detail: date }) => setDate(date)}>
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
            end={getObservation(data[0], props.end).date}/>
    </div>;
}

export default Cutout;
