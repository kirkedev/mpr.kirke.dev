import type { Meta, StoryObj } from "@storybook/svelte";
import Hello from "app/Hello.svelte";

const Greeting = {
    title: "Greeting Component",
    component: Hello
} satisfies Meta<Hello>;

export default Greeting;

type Story = StoryObj<typeof Greeting>;

export const Default: Story = {};

export const Andrew: Story = {
    args: {
        name: "Andrew"
    }
};
