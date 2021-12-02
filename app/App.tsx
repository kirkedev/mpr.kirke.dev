import type { JSXElement } from "solid-js";
import { createMemo, createResource, createSignal, Match, Switch } from "solid-js";
import { format } from "d3-format";
import { bisector } from "d3-array";
import Week from "lib/Week";
import type { CutoutIndex } from "lib/CutoutIndex";
import cutoutIndex from "lib/CutoutIndex";
import type Observation from "lib/Observation";
import Period from "lib/Period";
import { dropWhile } from "lib/itertools/drop";
import type { CashIndex } from "lib/CashIndex";
import cashIndex from "lib/CashIndex";
import type Cutout from "lib/cutout";
import type Purchase from "lib/purchases";
import cutout from "./api/cutout";
import slaughter from "./api/slaughter";
import purchases from "./api/purchases";
import type { Data } from "./chart";
import TimePicker from "./timepicker";
import CashIndexChart from "./cash";
import CutoutChart from "./cutout";
import PrimalChart from "./primal";
import PurchasesChart from "./purchases";
import styles from "./App.module.css";

interface Resources {
    cutout: Cutout[];
    cutoutIndex: CutoutIndex[];
    cashIndex: CashIndex[];
    purchases: Purchase[];
}

interface DateRange {
    start: Date;
    end: Date;
}

const formatNumber = format(".2f");

const { center: bisectDate } = bisector<Observation, Date>(observation => observation.date);

const getObservation = (data: Data[], date: Date): Data =>
    data[bisectDate(data, date)];

const fetch = ({ start, end }: DateRange): Promise<Resources> =>
    Promise.all([
        cutout.query(Week.with(start).previous.start, end),
        slaughter.query(Week.with(start).previous.start, end),
        purchases.query(Week.with(start).previous.start, end)
    ]).then(([cutout, slaughter, purchases]) => ({
        cutout: Array.from(dropWhile(cutout, record => record.date < start)),
        cutoutIndex: Array.from(dropWhile(cutoutIndex(cutout), record => record.date < start)),
        cashIndex: Array.from(dropWhile(cashIndex(slaughter), record => record.date < start)),
        purchases: Array.from(dropWhile(purchases, record => record.date < start))
    }));

function App(): JSXElement {
    const [period, setPeriod] = createSignal(Period.ThreeMonths);

    const range = createMemo(function(): DateRange {
        const end = new Date();
        return { start: period().from(end), end };
    });

    const [data] = createResource(range, fetch, {
        initialValue: {
            cutout: [],
            cutoutIndex: [],
            cashIndex: [],
            purchases: []
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

                <PurchasesChart
                    purchases={data().purchases}
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
