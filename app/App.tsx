import type { JSXElement } from "solid-js";
import { createMemo, createResource, createSignal, Index, Match, Switch } from "solid-js";
import { format } from "d3-format";
import { timeFormat } from "d3-time-format";
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

enum Period {
    OneMonth = "1M",
    ThreeMonths = "3M",
    SixMonths = "6M",
    OneYear = "1Y"
}

const formatNumber = format(".2f");
const formatDate = timeFormat("%b %d");
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
        const start = new Date(2021, 10, 7);
        const end = new Date(start);

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

    const [date, setDate] = createSignal<Date>(range().end);

    const [data] = createResource(range, fetch, {
        initialValue: {
            cutout: [],
            cutoutIndex: [],
            cashIndex: []
        }
    });

    return <div class={styles.App}>
        <div class={styles.timepicker}>
            <div class={styles.period}>
                <h3>Time Period</h3>
                <div class={styles.periods}>
                    <Index each={Object.values(Period)}>
                        { value =>
                            <span classList={{ [styles.active]: value() === period() }}
                                onClick={function() {
                                    setPeriod(value());
                                    setDate(range().end);
                                }}>
                                {value()}
                            </span>
                        }
                    </Index>
                </div>
            </div>

            <div class={styles.datepicker}>
                <div class={styles.tooltip}>
                    <span class={styles.caption}>{formatDate(date())}</span>
                    <div class={styles.arrow}/>
                </div>

                <input type="range"
                    min={range().start.getTime()}
                    max={range().end.getTime()}
                    value={date().getTime()}
                    step={1000 * 60 * 60 * 24}
                    oninput={event => setDate(new Date(parseInt(event.currentTarget.value, 10)))}/>
            </div>
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
