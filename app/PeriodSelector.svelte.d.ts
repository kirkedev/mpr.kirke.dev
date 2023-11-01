import type Period from "lib/Period";
import { SvelteComponent } from "svelte";

interface Props {

}

interface Events {
    select: CustomEvent<Period>;
}

declare class PeriodSelector extends SvelteComponent<Props, Events> {}

export default PeriodSelector;
