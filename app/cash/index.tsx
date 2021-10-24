import type { JSXElement } from "solid-js";
import { createResource, Match, Switch } from "solid-js";
import cashIndex from "../api/cashIndex";
import type { CashIndex } from "lib/CashIndex";
import LineChart from "../chart/LineChart";
import { map } from "lib/itertools/map";
import type { Data } from "../chart";

const series = (data: CashIndex[]): Iterable<Data>[] => [
    map(data, ({ date, indexPrice: value }) => ({ date, value })),
    map(data, ({ date, dailyPrice: value }) => ({ date, value }))
];

function Cash(): JSXElement {
    const [data] = createResource(() =>
        cashIndex.query(new Date(2021, 7, 2), new Date(2021, 9, 3)));

    return <Switch
        fallback={<LineChart width={640} height={360} bottom={24} data={series(data() as CashIndex[])}/>}>

        <Match when={data.loading}>
            <div>Loading...</div>
        </Match>

        <Match when={data.error}>
            <div>Error</div>
        </Match>
    </Switch>;
}

export default Cash;
