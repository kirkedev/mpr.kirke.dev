import { test, expect } from "vitest";
import Meta, { Default, Andrew } from "./Hello.stories";
import { render, waitFor, getByText } from "@testing-library/svelte";

test("default greeting", async () => {
    const { container } = render(Meta.component, Default.args);
    await waitFor(() => {
        expect(getByText(container, "World")).toBeInTheDocument();
    });
});

test("greet Andrew", async () => {
    const { container } = render(Meta.component, Andrew.args);
    await waitFor(() => {
        expect(getByText(container, "Andrew")).toBeInTheDocument();
    });
});
