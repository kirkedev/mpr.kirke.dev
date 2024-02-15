import { test, expect } from "playwright/test";

test("loads data from the api and renders charts and stats", async function({ page }) {
    const value = /\d{2,3}\.\d{2}/;
    const path = /^.{100,}$/;

    // Page load
    await page.goto("/");
    await expect(page).toHaveTitle("Mpr Dashboard");
    await expect(page.locator(".error")).not.toBeAttached();
    await expect(page.locator(".reports")).toBeVisible();

    // Stats
    await expect(page.locator(".label:text-is(\"Cash Index\") + .value")).toContainText(value);
    await expect(page.locator(".label:text-is(\"Cutout\") + .value")).toContainText(value);
    await expect(page.locator(".label:text-is(\"Index\") + .value")).toContainText(value);
    await expect(page.locator(".label:text-is(\"Formula\") + .value")).toContainText(value);
    await expect(page.locator(".label:text-is(\"Belly\") + .value")).toContainText(value);
    await expect(page.locator(".label:text-is(\"Ham\") + .value")).toContainText(value);
    await expect(page.locator(".label:text-is(\"Loin\") + .value")).toContainText(value);
    await expect(page.locator(".label:text-is(\"Butt\") + .value")).toContainText(value);
    await expect(page.locator(".label:text-is(\"Rib\") + .value")).toContainText(value);
    await expect(page.locator(".label:text-is(\"Picnic\") + .value")).toContainText(value);

    // Charts
    await expect(page.locator("div[class*=cash] path.series")).toHaveAttribute("d", path);
    await expect(page.locator("div[class*=cutout] path.series").first()).toHaveAttribute("d", path);
    await expect(page.locator("div[class*=cutout] path.series").last()).toHaveAttribute("d", path);
    await expect(page.locator("div[class*=purchases] path.series")).toHaveAttribute("d", path);
    await expect(page.locator("div[class*=primal] path.series")).toHaveAttribute("d", path);
});
