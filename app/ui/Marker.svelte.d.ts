import { type SvelteComponent } from "svelte";

declare interface Props {
    height: number;
    width: number;
    left: number;
    top: number;
    bottom: number;
}

declare class Marker extends SvelteComponent<Props> {}

export default Marker;
