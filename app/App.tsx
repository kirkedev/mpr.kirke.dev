import type { JSXElement } from "solid-js";
import { createResource, createSignal, Match, Switch } from "solid-js";
import CashIndexChart from "./cash";
import CutoutChart from "./cutout";
import PrimalsChart from "./primals";
import styles from "./App.module.css";
import type { CutoutIndex } from "lib/CutoutIndex";
import cutoutIndex from "lib/CutoutIndex";
import type { CashIndex } from "lib/CashIndex";
import cashIndex from "lib/CashIndex";
import type Cutout from "lib/cutout";
import cutout from "./api/cutout";
import slaughter from "./api/slaughter";
import type Slaughter from "lib/slaughter";

interface Data {
    cutout: Cutout[];
    cutoutIndex: CutoutIndex[];
    cashIndex: CashIndex[];
}

interface DateRange {
    start: Date;
    end: Date;
}

const fetch = ({ start, end }: DateRange): Promise<Data> =>
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

    return <div class={styles.App}>
        <div class={styles.reports}>
            <Switch fallback={<>
                <CashIndexChart cash={data().cashIndex} />
                <CutoutChart cutout={data().cutoutIndex}/>
                <PrimalsChart cutout={data().cutout} />
            </>}>
                <Match when={data.loading}>
                    <div>Loading...</div>
                </Match>

                <Match when={data.error}>
                    <div>Error</div>
                </Match>
            </Switch>
        </div>
    </div>;
}

export default App;
