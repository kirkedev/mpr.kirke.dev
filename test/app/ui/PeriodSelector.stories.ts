import type { Meta, StoryObj } from "@storybook/svelte";
import Period, { Periods } from "lib/time/Period";
import ButtonGroup from "app/ui/ButtonGroup.svelte";

const meta: Meta<ButtonGroup<unknown>> = {
    title: "ButtonGroup",
    component: ButtonGroup,
    args: {
        items: Array.from(Periods),
        selected: Period.ThreeMonths
    }
};

const PeriodSelector: StoryObj<typeof meta> = {};

export default meta;

export { PeriodSelector };
