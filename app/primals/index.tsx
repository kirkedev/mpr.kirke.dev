import type { JSXElement } from "solid-js";
import { createSignal, Index } from "solid-js";
import type Cutout from "lib/cutout";
import type { Data } from "../chart";
import styles from "./Primals.module.css";
import { bisectDate, formatNumber } from "../report";
import LineChart from "../chart/LineChart";

interface Props {
    cutout: Cutout[];
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

function Primals(props: Props): JSXElement {
    const data = mapData(props.cutout);
    const [selected, setSelected] = createSignal(0);
    const [stats, setStats] = createSignal<Data[]>(data.map(series => series[series.length - 1]));

    const updateStats = ({ detail }: CustomEvent<Date>) =>
        void setStats(data.map(series => series[bisectDate(series, detail)]));

    return <div on:selectDate={updateStats} class={styles.primals}>
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
        />
    </div>;
}

export default Primals;
