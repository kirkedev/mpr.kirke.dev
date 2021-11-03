import type { JSXElement } from "solid-js";
import { createResource, createSignal, Match, Switch } from "solid-js";
import { format } from "d3-format";
import { timeFormat } from "d3-time-format";
import { bisector } from "d3-array";
import type { CutoutIndex } from "lib/CutoutIndex";
import cutoutIndex from "lib/CutoutIndex";
import type Observation from "lib/Observation";
import type { CashIndex } from "lib/CashIndex";
import cashIndex from "lib/CashIndex";
import type Cutout from "lib/cutout";
import { dropWhile } from "lib/itertools/drop";
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
const formatDate = timeFormat("%b %d, %Y");
const { right: bisectDate } = bisector<Observation, Date>(observation => observation.date);

const getObservation = (data: Data[], date: Date): Data =>
    data[Math.min(bisectDate(data, date) - 1, data.length - 1)];

const fetch = ({ start, end }: DateRange): Promise<Resources> =>
    Promise.all<Cutout[], Slaughter[]>([
        cutout.query(new Date(new Date(start).setDate(start.getDate() - 7)), end),
        slaughter.query(new Date(new Date(start).setDate(start.getDate() - 7)), end)
    ]).then(([cutout, slaughter]) => ({
        cutout: Array.from(dropWhile(cutout, record => record.date < start)),
        cutoutIndex: Array.from(dropWhile(cutoutIndex(cutout), record => record.date < start)),
        cashIndex: Array.from(dropWhile(cashIndex(slaughter), record => record.date < start))
    }));

function App(): JSXElement {
    const [dateRange] = createSignal<DateRange>({
        start: new Date(2021, 7, 9),
        end: new Date(2021, 9, 3)
    });

    const [end, setEnd] = createSignal<Date>(dateRange().end);

    const [data] = createResource(dateRange, fetch, {
        initialValue: {
            cutout: [],
            cutoutIndex: [],
            cashIndex: []
        }
    });

    return <div class={styles.App}>
        <div class={styles.datepicker}>
            <div>
                <h3>{formatDate(end())}</h3>

                <input type="range"
                    min={dateRange().start.getTime()}
                    max={dateRange().end.getTime()}
                    value={end().getTime()}
                    step={1000 * 60 * 60 * 24}
                    oninput={event => setEnd(new Date(parseInt(event.currentTarget.value, 10)))}/>
            </div>
        </div>

        <Switch fallback={
            <div class={styles.reports}
                classList={{ [styles.selected]: end().getTime() < dateRange().end.getTime() }}>

                <CashIndexChart
                    cash={data().cashIndex}
                    end={end()}/>

                <CutoutChart
                    cutout={data().cutoutIndex}
                    end={end()}/>

                <PrimalChart
                    cutout={data().cutout}
                    end={end()}/>
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
