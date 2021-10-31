import type { JSXElement } from "solid-js";
import { createResource, Match, Switch } from "solid-js";
import Report from "./Report";
import cutout from "../api/cutout";
import type Cutout from "lib/cutout";

function Primals(): JSXElement {
    const [data] = createResource(() =>
        cutout.query(new Date(2021, 7, 2), new Date(2021, 9, 3)));

    return <Switch fallback={<Report cutout={data() as Cutout[]}/>}>
        <Match when={data.loading}>
            <div>Loading...</div>
        </Match>

        <Match when={data.error}>
            <div>Error</div>
        </Match>
    </Switch>;
}

export default Primals;
