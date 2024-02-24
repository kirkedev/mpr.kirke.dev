import { test, expect } from "playwright/test";
import { path } from ".";

test("View pricing data of each primal", async ({ page }) => {
    await page.goto("/");

    await test.step("View pricing data for hams", async () => {
        await page.getByText("Ham").click();
        await expect(page.locator("div[class*=primal] path.series")).toHaveAttribute("d", path(504));
    });

    await test.step("View pricing data for pork loins", async () => {
        await page.getByText("Loin").click();
        await expect(page.locator("div[class*=primal] path.series")).toHaveAttribute("d", path(495));
    });

    await test.step("View pricing data for pork butts", async () => {
        await page.getByText("Butt").click();
        await expect(page.locator("div[class*=primal] path.series")).toHaveAttribute("d", path(501));
    });

    await test.step("View pricing data for ribs", async () => {
        await page.getByText("Rib").click();
        await expect(page.locator("div[class*=primal] path.series")).toHaveAttribute("d", path(509));
    });

    await test.step("View pricing data for picnic cuts", async () => {
        await page.getByText("Picnic").click();
        await expect(page.locator("div[class*=primal] path.series")).toHaveAttribute("d", path(496));
    });

    await test.step("View pricing data for pork bellies", async () => {
        await page.getByText("Belly").click();
        await expect(page.locator("div[class*=primal] path.series")).toHaveAttribute("d", path(495));
    });
});
