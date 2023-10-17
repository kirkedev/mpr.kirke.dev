import type { Meta, StoryObj } from "@storybook/svelte";
import ButtonGroup from "app/ui/ButtonGroup.svelte";
import Period, { Periods } from "lib/Period";

const Component = {
    title: "Button Group",
    component: ButtonGroup
} satisfies Meta<ButtonGroup>;

export default Component;

type Story = StoryObj<typeof Component>;

export const PeriodSelector: Story = {
    args: {
        items: Periods,
        selected: Period.ThreeMonths
    }
};
