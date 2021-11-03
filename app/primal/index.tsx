import type { JSXElement } from "solid-js";
import { createEffect, createMemo, createSignal, Index } from "solid-js";
import type Cutout from "lib/cutout";
import type { Data } from "../chart";
import styles from "./Primal.module.css";
import { formatNumber, getObservation } from "../App";
import LineChart from "../chart/LineChart";

interface Props {
    cutout: Cutout[];
    end: Date;
}

const mapData = (cutout: Cutout[]): Data[][] => [
    cutout.map(record => ({ date: record.date, value: record.bellyPrice })),
    cutout.map(record => ({ date: record.date, value: record.hamPrice })),
    cutout.map(record => ({ date: record.date, value: record.loinPrice })),
    cutout.map(record => ({ date: record.date, value: record.buttPrice })),
    cutout.map(record => ({ date: record.date, value: record.ribPrice })),
    cutout.map(record => ({ date: record.date, value: record.picnicPrice }))
];

const labels = ["Belly", "Ham", "Loin", "Butt", "Rib", "Picnic"];

function Primal(props: Props): JSXElement {
    const data = mapData(props.cutout);
    const [date, setDate] = createSignal(props.end);
    const [selected, setSelected] = createSignal(0);
    const stats = createMemo<Data[]>(() => data.map(series => getObservation(series, date())));
    createEffect(() => setDate(getObservation(data[selected()], props.end).date));

    return <div class={styles.primal} on:selectDate={({ detail: date }) => setDate(date)}>
        <div class={styles.stats}>
            <Index each={stats()}>
                { (stat, index) =>
                    <div class={styles.stat}
                        classList={{ "active": selected() === index }}
                        onclick={() => setSelected(index)}>

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
            data={[data[selected()]]}
            marker={stats()[selected()]}
            end={getObservation(data[selected()], props.end).date}/>
    </div>;
}

export default Primal;
