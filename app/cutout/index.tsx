import type { JSXElement } from "solid-js";
import { createEffect, createMemo, createSignal, Index } from "solid-js";
import styles from "./Cutout.module.css";
import type { CutoutIndex } from "lib/CutoutIndex";
import type { Data } from "../chart";
import LineChart from "../chart/LineChart";
import { formatNumber, getObservation } from "../App";

interface Props {
    cutout: CutoutIndex[];
    date: Date;
}

const series = (cutout: CutoutIndex[]): Data[][] => [
    cutout.map(record => ({ date: record.date, reportDate: record.reportDate, value: record.carcassPrice })),
    cutout.map(record => ({ date: record.date, reportDate: record.reportDate, value: record.indexPrice }))
];

const labels = ["Cutout", "Index"];

function Cutout(props: Props): JSXElement {
    const data = createMemo(() => series(props.cutout));
    const [date, setDate] = createSignal(props.date);
    const stats = createMemo<Data[]>(() => data().map(series => getObservation(series, date())));
    const end = createMemo<Date>(() => getObservation(data()[0], props.date).date);

    createEffect(() => setDate(end()));

    return <div id="cutout" class={styles.cutout} on:selectDate={({ detail: date }) => setDate(date)}>
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
            right={32}
            bottom={48}
            left={32}
            top={32}
            data={data()}
            marker={stats()[0]}
            end={end()}/>
    </div>;
}

export default Cutout;
