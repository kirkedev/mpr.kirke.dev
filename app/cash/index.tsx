import type { JSXElement } from "solid-js";
import { createResource, Match, Switch } from "solid-js";
import type { CashIndex } from "lib/CashIndex";
import cashIndex from "../api/cashIndex";
import Report from "./Report";

function Cash(): JSXElement {
    const [data] = createResource(() => cashIndex.query(new Date(2021, 7, 2), new Date(2021, 9, 3)));

    return <Switch fallback={<Report cash={data() as CashIndex[]}/>}>
        <Match when={data.loading}>
            <div>Loading...</div>
        </Match>

        <Match when={data.error}>
            <div>Error</div>
        </Match>
    </Switch>;
}

export default Cash;
