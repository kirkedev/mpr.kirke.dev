import { beforeEach, describe, expect, test, vi } from "vitest";
import { render, within } from "@testing-library/svelte";
import { userEvent } from "@testing-library/user-event";
import Period, { Periods } from "lib/time/Period";
import ButtonGroup from "app/ui/ButtonGroup.svelte";

function assertSelected(this: HTMLElement, selected: string): void {
    Periods.forEach(({ description }) => {
        expect(within(this).getByText(description))
            .toHaveAttribute("data-selected", `${selected === description}`);
    });
}

describe("Period Selection", () => {
    const user = userEvent.setup();
    const handler = vi.fn();

    const { container, component } = render(ButtonGroup, {
        props: {
            items: Array.from(Periods)
        }
    });

    component.$on("select", handler);

    beforeEach(function() {
        vi.resetAllMocks();
    });

    test("Clicking already selected period does nothing", async () => {
        assertSelected.call(container, "3M");
        await user.click(within(container).getByText("3M"));
        assertSelected.call(container, "3M");
        expect(handler).toHaveBeenCalledTimes(0);
    });

    test("Select 6M", async () => {
        await user.click(within(container).getByText("6M"));
        assertSelected.call(container, "6M");
        expect(handler).toHaveBeenCalledOnce();
        expect(handler).toHaveBeenCalledWith(expect.objectContaining({ detail: Period.SixMonths }));
    });

    test("Select 1Y", async () => {
        await user.click(within(container).getByText("1Y"));
        assertSelected.call(container, "1Y");
        expect(handler).toHaveBeenCalledOnce();
        expect(handler).toHaveBeenCalledWith(expect.objectContaining({ detail: Period.OneYear }));
    });

    test("Select 3M", async () => {
        await user.click(within(container).getByText("3M"));
        assertSelected.call(container, "3M");
        expect(handler).toHaveBeenCalledOnce();
        expect(handler).toHaveBeenCalledWith(expect.objectContaining({ detail: Period.ThreeMonths }));
    });
});
