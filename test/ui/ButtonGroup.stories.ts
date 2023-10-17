import type { Meta, StoryObj } from "@storybook/svelte";
import { within, userEvent } from "@storybook/testing-library";
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
        items: Periods
    },
    play: async (context): Promise<void> => {
        const container = within(context.canvasElement);
        await userEvent.click(container.getByText("1M"));
        await userEvent.click(container.getByText("3M"));
        await userEvent.click(container.getByText("6M"));
        await userEvent.click(container.getByText("1Y"));
    }
};

export const WithSelection: Story = {
    args: {
        items: Periods,
        selected: Period.ThreeMonths
    }
};
