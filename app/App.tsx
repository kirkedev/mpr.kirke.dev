import type { JSXElement } from "solid-js";
import { createResource, createSignal, Match, Switch } from "solid-js";
import { format } from "d3-format";
import { bisector } from "d3-array";
import type { CutoutIndex } from "lib/CutoutIndex";
import cutoutIndex from "lib/CutoutIndex";
import type Observation from "lib/Observation";
import type { CashIndex } from "lib/CashIndex";
import cashIndex from "lib/CashIndex";
import type Cutout from "lib/cutout";
import cutout from "./api/cutout";
import slaughter from "./api/slaughter";
import type Slaughter from "lib/slaughter";
import type { Data } from "./chart";
import CashIndexChart from "./cash";
import CutoutChart from "./cutout";
import PrimalChart from "./primal";
import styles from "./App.module.css";

interface Resources {
    cutout: Cutout[];
    cutoutIndex: CutoutIndex[];
    cashIndex: CashIndex[];
}

interface DateRange {
    start: Date;
    end: Date;
}

const formatNumber = format(".2f");

const { center: bisectDate } = bisector<Observation, Date>(observation => observation.date);

const getObservation = (data: Data[], date: Date): Data => data[bisectDate(data, date)];

const fetch = ({ start, end }: DateRange): Promise<Resources> =>
    Promise.all<Cutout[], Slaughter[]>([
        cutout.query(start, end),
        slaughter.query(start, end)
    ]).then(([cutout, slaughter]) => ({
        cutout,
        cutoutIndex: Array.from(cutoutIndex(cutout)),
        cashIndex: Array.from(cashIndex(slaughter))
    }));

function App(): JSXElement {
    const [dateRange] = createSignal<DateRange>({
        start: new Date(2021, 7, 2),
        end: new Date(2021, 9, 3)
    });

    const [data] = createResource(dateRange, fetch, {
        initialValue: {
            cutout: [],
            cutoutIndex: [],
            cashIndex: []
        }
    });

    const [selected, setSelected] = createSignal<Date>(dateRange().end);

    return <div class={styles.App}>
        <Switch fallback={
            <div class={styles.reports} on:selectDate={({ detail: date }) => setSelected(date ?? dateRange().end)}>
                <CashIndexChart
                    cash={data().cashIndex}
                    selected={selected()}/>

                <CutoutChart
                    cutout={data().cutoutIndex}
                    selected={selected()}/>

                <PrimalChart
                    cutout={data().cutout}
                    selected={selected()}/>
            </div>
        }>
            <Match when={data.loading}>
                <div class={styles.loading}>Loading...</div>
            </Match>

            <Match when={data.error}>
                <div class={styles.error}>Error</div>
            </Match>
        </Switch>
    </div>;
}

export default App;

export { formatNumber, getObservation };
