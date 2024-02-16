import { test, expect } from "playwright/test";

test("Update stats by hovering over chart", async ({ page }) => {
    await page.goto("/");

    await test.step("Cash index stats", async () => {
        await expect(page.locator(".label:text-is(\"Cash Index\") + .value")).toContainText("71.67");
        await expect(page.locator(".cash .tooltip > text")).toContainText("Dec 22");

        await page.mouse.move(300, 300);
        await expect(page.locator(".label:text-is(\"Cash Index\") + .value")).toContainText("78.69");
        await expect(page.locator(".cash .tooltip > text")).toContainText("Nov 04");

        await page.mouse.move(400, 300);
        await expect(page.locator(".label:text-is(\"Cash Index\") + .value")).toContainText("72.56");
        await expect(page.locator(".cash .tooltip > text")).toContainText("Nov 23");

        await page.mouse.move(600, 300);
        await expect(page.locator(".label:text-is(\"Cash Index\") + .value")).toContainText("71.67");
        await expect(page.locator(".cash .tooltip > text")).toContainText("Dec 22");
    });

    await test.step("Cutout stats", async () => {
        await expect(page.locator(".label:text-is(\"Cutout\") + .value")).toContainText("91.47");
        await expect(page.locator(".label:text-is(\"Index\") + .value")).toContainText("86.80");
        await expect(page.locator(".cutout .tooltip > text")).toContainText("Dec 23");

        await page.mouse.move(928, 300);
        await expect(page.locator(".label:text-is(\"Cutout\") + .value")).toContainText("97.69");
        await expect(page.locator(".label:text-is(\"Index\") + .value")).toContainText("96.19");
        await expect(page.locator(".cutout .tooltip > text")).toContainText("Nov 04");

        await page.mouse.move(1028, 300);
        await expect(page.locator(".label:text-is(\"Cutout\") + .value")).toContainText("84.92");
        await expect(page.locator(".label:text-is(\"Index\") + .value")).toContainText("86.85");
        await expect(page.locator(".cutout .tooltip > text")).toContainText("Nov 23");

        await page.mouse.move(1228, 300);
        await expect(page.locator(".label:text-is(\"Cutout\") + .value")).toContainText("91.47");
        await expect(page.locator(".label:text-is(\"Index\") + .value")).toContainText("86.80");
        await expect(page.locator(".cutout .tooltip > text")).toContainText("Dec 23");
    });

    await test.step("Purchases stats", async () => {
        await page.locator(".purchases .tooltip > text").scrollIntoViewIfNeeded();
        await expect(page.locator(".label:text-is(\"Formula\") + .value")).toContainText("70.84");
        await expect(page.locator(".purchases .tooltip > text")).toContainText("Dec 22");

        await page.mouse.move(300, 500);
        await expect(page.locator(".label:text-is(\"Formula\") + .value")).toContainText("78.29");
        await expect(page.locator(".purchases .tooltip > text")).toContainText("Nov 04");

        await page.mouse.move(400, 500);
        await expect(page.locator(".label:text-is(\"Formula\") + .value")).toContainText("70.79");
        await expect(page.locator(".purchases .tooltip > text")).toContainText("Nov 23");

        await page.mouse.move(600, 500);
        await expect(page.locator(".label:text-is(\"Formula\") + .value")).toContainText("70.84");
        await expect(page.locator(".purchases .tooltip > text")).toContainText("Dec 22");
    });

    await test.step("Primals stats", async () => {
        await expect(page.locator(".label:text-is(\"Belly\") + .value")).toContainText("126.70");
        await expect(page.locator(".label:text-is(\"Ham\") + .value")).toContainText("80.65");
        await expect(page.locator(".label:text-is(\"Loin\") + .value")).toContainText("82.35");
        await expect(page.locator(".label:text-is(\"Butt\") + .value")).toContainText("111.92");
        await expect(page.locator(".label:text-is(\"Rib\") + .value")).toContainText("152.06");
        await expect(page.locator(".label:text-is(\"Picnic\") + .value")).toContainText("69.90");
        await expect(page.locator(".primals .tooltip > text")).toContainText("Dec 23");

        await page.mouse.move(928, 500);
        await expect(page.locator(".label:text-is(\"Belly\") + .value")).toContainText("163.21");
        await expect(page.locator(".label:text-is(\"Ham\") + .value")).toContainText("72.26");
        await expect(page.locator(".label:text-is(\"Loin\") + .value")).toContainText("102.83");
        await expect(page.locator(".label:text-is(\"Butt\") + .value")).toContainText("91.61");
        await expect(page.locator(".label:text-is(\"Rib\") + .value")).toContainText("133.69");
        await expect(page.locator(".label:text-is(\"Picnic\") + .value")).toContainText("70.85");
        await expect(page.locator(".primals .tooltip > text")).toContainText("Nov 04");

        await page.mouse.move(1028, 500);
        await expect(page.locator(".label:text-is(\"Belly\") + .value")).toContainText("123.42");
        await expect(page.locator(".label:text-is(\"Ham\") + .value")).toContainText("76.41");
        await expect(page.locator(".label:text-is(\"Loin\") + .value")).toContainText("78.01");
        await expect(page.locator(".label:text-is(\"Butt\") + .value")).toContainText("94.38");
        await expect(page.locator(".label:text-is(\"Rib\") + .value")).toContainText("136.61");
        await expect(page.locator(".label:text-is(\"Picnic\") + .value")).toContainText("59.52");
        await expect(page.locator(".primals .tooltip > text")).toContainText("Nov 23");

        await page.mouse.move(1228, 500);
        await expect(page.locator(".label:text-is(\"Belly\") + .value")).toContainText("126.70");
        await expect(page.locator(".label:text-is(\"Ham\") + .value")).toContainText("80.65");
        await expect(page.locator(".label:text-is(\"Loin\") + .value")).toContainText("82.35");
        await expect(page.locator(".label:text-is(\"Butt\") + .value")).toContainText("111.92");
        await expect(page.locator(".label:text-is(\"Rib\") + .value")).toContainText("152.06");
        await expect(page.locator(".label:text-is(\"Picnic\") + .value")).toContainText("69.90");
        await expect(page.locator(".primals .tooltip > text")).toContainText("Dec 23");
    });
});
