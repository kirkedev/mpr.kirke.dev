import { test, expect } from "playwright/test";
import { path } from ".";

test("View data from different time periods", async ({ page }) => {
    await page.goto("/");

    await test.step("View six months of data", async () => {
        await page.getByText("6M").click();

        await expect(page.getByText("6M")).toHaveAttribute("data-selected", "true");
        await expect(page.getByText("3M")).toHaveAttribute("data-selected", "false");
        await expect(page.getByText("1Y")).toHaveAttribute("data-selected", "false");

        await expect(page.locator("div[class*=cash] path.series")).toHaveAttribute("d", expect.stringMatching(path(964)));
        await expect(page.locator("div[class*=cutout] path.series").first()).toHaveAttribute("d", expect.stringMatching(path(977)));
        await expect(page.locator("div[class*=cutout] path.series").last()).toHaveAttribute("d", expect.stringMatching(path(979)));
        await expect(page.locator("div[class*=purchases] path.series")).toHaveAttribute("d", expect.stringMatching(path(961)));
        await expect(page.locator("div[class*=primal] path.series")).toHaveAttribute("d", expect.stringMatching(path(978)));
    });

    await test.step("View one year of data", async () => {
        await page.getByText("1Y").click();

        await expect(page.getByText("1Y")).toHaveAttribute("data-selected", "true");
        await expect(page.getByText("3M")).toHaveAttribute("data-selected", "false");
        await expect(page.getByText("6M")).toHaveAttribute("data-selected", "false");

        await expect(page.locator("div[class*=cash] path.series")).toHaveAttribute("d", expect.stringMatching(path(1909)));
        await expect(page.locator("div[class*=cutout] path.series").first()).toHaveAttribute("d", expect.stringMatching(path(1935)));
        await expect(page.locator("div[class*=cutout] path.series").last()).toHaveAttribute("d", expect.stringMatching(path(1939)));
        await expect(page.locator("div[class*=purchases] path.series")).toHaveAttribute("d", expect.stringMatching(path(1915)));
        await expect(page.locator("div[class*=primal] path.series")).toHaveAttribute("d", expect.stringMatching(path(1941)));
    });

    await test.step("View three months of data", async () => {
        await page.getByText("3M").click();

        await expect(page.getByText("3M")).toHaveAttribute("data-selected", "true");
        await expect(page.getByText("6M")).toHaveAttribute("data-selected", "false");
        await expect(page.getByText("1Y")).toHaveAttribute("data-selected", "false");

        await expect(page.locator("div[class*=cash] path.series")).toHaveAttribute("d", expect.stringMatching(path(490)));
        await expect(page.locator("div[class*=cutout] path.series").first()).toHaveAttribute("d", expect.stringMatching(path(502)));
        await expect(page.locator("div[class*=cutout] path.series").last()).toHaveAttribute("d", expect.stringMatching(path(502)));
        await expect(page.locator("div[class*=purchases] path.series")).toHaveAttribute("d", expect.stringMatching(path(490)));
        await expect(page.locator("div[class*=primal] path.series")).toHaveAttribute("d", expect.stringMatching(path(495)));
    });
});
