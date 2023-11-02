<script context="module" lang="ts">
    import { Story } from "@storybook/addon-svelte-csf";
    import ObservationChart from "app/ui/ObservationChart.svelte";
    import Path from "app/ui/Path.svelte";
    import Circle from "app/ui/Circle.svelte";
    import Marker from "app/ui/Marker.svelte";

    export const meta = {
        title: "Time Series Chart",
        component: ObservationChart,
        argTypes: {
            "selectDate": {
                action: "selectDate"
            },
            "resetDate": {
                action: "resetDate"
            }
        }
    };
</script>

<style lang="postcss">
    :global(.plot path) {
        @apply stroke-emerald-400;
        stroke-width: 4;
    }

    .container {
        width: 640px;
        @apply mx-auto;
    }

    :global(.marker rect) {
        @apply fill-emerald-400;
    }

    :global(circle) {
        @apply fill-emerald-400;
    }
</style>

<script lang="ts">
    const data = [
        { date: new Date(2023, 9, 2), value: 84.55 },
        { date: new Date(2023, 9, 3), value: 84.28 },
        { date: new Date(2023, 9, 4), value: 83.68 },
        { date: new Date(2023, 9, 5), value: 83.02 },
        { date: new Date(2023, 9, 6), value: 82.46 },
        { date: new Date(2023, 9, 9), value: 82.26 },
        { date: new Date(2023, 9, 10), value: 82.40 },
        { date: new Date(2023, 9, 11), value: 82.42 },
        { date: new Date(2023, 9, 12), value: 82.11 },
        { date: new Date(2023, 9, 13), value: 81.60 },
        { date: new Date(2023, 9, 16), value: 81.15 },
        { date: new Date(2023, 9, 17), value: 80.70 },
        { date: new Date(2023, 9, 18), value: 80.45 },
        { date: new Date(2023, 9, 19), value: 79.79 },
        { date: new Date(2023, 9, 20), value: 79.07 },
        { date: new Date(2023, 9, 23), value: 78.67 },
        { date: new Date(2023, 9, 24), value: 78.41 },
        { date: new Date(2023, 9, 25), value: 78.19 },
        { date: new Date(2023, 9, 26), value: 77.95 },
        { date: new Date(2023, 9, 27), value: 77.51 },
        { date: new Date(2023, 9, 30), value: 77.13 },
        { date: new Date(2023, 9, 31), value: 76.94 }
    ];

    const selected = data[12];
</script>

<Story name="Line Chart">
    <div class="container">
        <ObservationChart on:selectDate on:resetDate
            dates={[new Date(2023, 9, 2), new Date(2023, 9, 31)]}
            values={[76.94, 84.55]}>

            <svelte:fragment slot="plot" let:x let:y>
                <Path x={x} y={y} data={data}/>
            </svelte:fragment>
        </ObservationChart>
    </div>
</Story>

<Story name="Line Chart with Marker">
    <div class="container">
        <ObservationChart on:selectDate on:resetDate
            dates={[new Date(2023, 9, 2), new Date(2023, 9, 31)]}
            values={[76.94, 84.55]}>

            <svelte:fragment slot="plot" let:x let:y>
                <Marker x={x} y={y} point={selected}/>
                <Path x={x} y={y} data={data}/>
                <Circle x={x} y={y} point={selected}/>
            </svelte:fragment>
        </ObservationChart>
    </div>
</Story>
