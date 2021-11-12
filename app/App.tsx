import type { JSXElement } from "solid-js";
import { createMemo, createResource, createSignal, Match, Switch } from "solid-js";
import { format } from "d3-format";
import { bisector } from "d3-array";
import Week from "lib/Week";
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
import { Period } from "./timepicker/Periods";
import TimePicker from "./timepicker";
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

const formatNumber = format("3>.2f");
const { right: bisectDate } = bisector<Observation, Date>(observation => observation.date);

const getObservation = (data: Data[], date: Date): Data =>
    data[Math.min(Math.max(bisectDate(data, date) - 1, 0), data.length - 1)];

const fetch = ({ start, end }: DateRange): Promise<Resources> =>
    Promise.all<Cutout[], Slaughter[]>([
        cutout.query(Week.with(start).previous.start, end),
        slaughter.query(Week.with(start).previous.start, end)
    ]).then(([cutout, slaughter]) => ({
        cutout: Array.from(dropWhile(cutout, record => record.date < start)),
        cutoutIndex: Array.from(dropWhile(cutoutIndex(cutout), record => record.date < start)),
        cashIndex: Array.from(dropWhile(cashIndex(slaughter), record => record.date < start))
    }));

function App(): JSXElement {
    const [period, setPeriod] = createSignal(Period.ThreeMonths);

    const range = createMemo(function(): DateRange {
        const start = new Date();
        const end = new Date();

        switch (period()) {
            case Period.OneMonth: {
                start.setMonth(start.getMonth() - 1);
                break;
            }

            case Period.ThreeMonths: {
                start.setMonth(start.getMonth() - 3);
                break;
            }

            case Period.SixMonths: {
                start.setMonth(start.getMonth() - 6);
                break;
            }

            case Period.OneYear: {
                start.setFullYear(start.getFullYear() - 1);
                break;
            }
        }

        return { start, end };
    });

    const [data] = createResource(range, fetch, {
        initialValue: {
            cutout: [],
            cutoutIndex: [],
            cashIndex: []
        }
    });

    const [date, setDate] = createSignal<Date>(range().end);

    function selectDate(event: CustomEvent<Date>): void {
        setDate(event.detail);
    }

    function selectPeriod(event: CustomEvent<Period>): void {
        setPeriod(event.detail);
        setDate(range().end);
    }

    return <div class={styles.App}>
        <div class={styles.timepicker} on:selectDate={selectDate} on:selectPeriod={selectPeriod}>
            <TimePicker
                date={date()}
                start={range().start}
                end={range().end}
                period={period()} />
        </div>

        <Switch fallback={
            <div class={styles.reports}>
                <CashIndexChart
                    cash={data().cashIndex}
                    date={date()}/>

                <CutoutChart
                    cutout={data().cutoutIndex}
                    date={date()}/>

                <PrimalChart
                    cutout={data().cutout}
                    date={date()}/>
            </div>
        }>
            <Match when={data.loading}>
                <div class={styles.loading}/>
            </Match>

            <Match when={data.error}>
                <div>Error</div>
            </Match>
        </Switch>
    </div>;
}

export default App;

export { formatNumber, getObservation };
