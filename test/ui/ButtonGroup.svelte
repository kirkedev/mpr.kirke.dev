<script context="module">
    import ButtonGroup from "app/ui/ButtonGroup.svelte";
    import { Story, Template } from "@storybook/addon-svelte-csf";
    import Period, { Periods } from "lib/Period";

    export const meta = {
        title: "ButtonGroup",
        component: ButtonGroup
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
    selected: Period.ThreeMonths
}}/>
