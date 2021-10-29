import type { JSXElement } from "solid-js";
import { createResource, Match, Switch } from "solid-js";
import Report from "./Report";
import type { CutoutIndex } from "lib/CutoutIndex";
import cutoutIndex from "lib/CutoutIndex";
import cutout from "../api/cutout";

function Cash(): JSXElement {
    const [data] = createResource(() =>
        cutout.query(new Date(2021, 7, 2), new Date(2021, 9, 3))
            .then(cutoutIndex)
            .then(Array.from));

    return <Switch fallback={<Report cutout={data() as CutoutIndex[]}/>}>
        <Match when={data.loading}>
            <div>Loading...</div>
        </Match>

        <Match when={data.error}>
            <div>Error</div>
        </Match>
    </Switch>;
}

export default Cash;
