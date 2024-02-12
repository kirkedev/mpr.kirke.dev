<script context="module" lang="ts">
    import { Story, Template } from "@storybook/addon-svelte-csf";
    import Period, { Periods } from "lib/time/Period";
    import ButtonGroup from "app/ui/ButtonGroup.svelte";

    export const meta = {
        title: "ButtonGroup",
        component: ButtonGroup,
        argTypes: {
            "select": {
                action: "select"
            }
        }
    };
</script>

<Template let:args>
    <ButtonGroup {...args} on:select/>
</Template>

<Story name="Fruits" args={{
    items: ["Apples", "Oranges", "Bananas", "Pears"]
}}/>

<Story name="Period Selector" args={{
    items: Periods,
    selected: Period.ThreeMonths,
    onSelect: "action"
}}/>
