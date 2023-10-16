import { expect, describe, test, vi, beforeEach } from "vitest";
import { render, within } from "@testing-library/svelte";
import { userEvent } from "@testing-library/user-event";
import PeriodSelector from "app/periods/PeriodSelector.svelte";
import Period from "lib/Period";

describe("Period Selection", () => {
    const user = userEvent.setup();
    const handler = vi.fn();
    const { container, component } = render(PeriodSelector);
    component.$on("select", handler);

    beforeEach(function() {
        vi.resetAllMocks();
    });

    test("Clicking already selected period does nothing", async () => {
        expect(within(container).getByText("3M")).toHaveClass("selected");
        await user.click(within(container).getByText("3M"));
        expect(within(container).getByText("3M")).toHaveClass("selected");
        expect(handler).toHaveBeenCalledTimes(0);
    });

    test("Select 1M", async () => {
        await user.click(within(container).getByText("1M"));
        expect(within(container).getByText("1M")).toHaveClass("selected");
        expect(handler).toHaveBeenCalledOnce();
        expect(handler).toHaveBeenCalledWith(expect.objectContaining({ detail: Period.OneMonth }));
    });

    test("Select 3M", async () => {
        await user.click(within(container).getByText("3M"));
        expect(within(container).getByText("3M")).toHaveClass("selected");
        expect(handler).toHaveBeenCalledOnce();
        expect(handler).toHaveBeenCalledWith(expect.objectContaining({ detail: Period.ThreeMonths }));
    });

    test("Select 6M", async () => {
        await user.click(within(container).getByText("6M"));
        expect(within(container).getByText("6M")).toHaveClass("selected");
        expect(handler).toHaveBeenCalledOnce();
        expect(handler).toHaveBeenCalledWith(expect.objectContaining({ detail: Period.SixMonths }));
    });

    test("Select 1Y", async () => {
        await user.click(within(container).getByText("1Y"));
        expect(within(container).getByText("1Y")).toHaveClass("selected");
        expect(handler).toHaveBeenCalledOnce();
        expect(handler).toHaveBeenCalledWith(expect.objectContaining({ detail: Period.OneYear }));
    });
});
