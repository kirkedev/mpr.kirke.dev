import { describe, expect, test } from "vitest";
import { get } from "svelte/store";
import Period from "lib/Period";
import api from "app/api";

describe("fetch periods", () => {
    test("fetch one month of data", async () => {
        api.fetch(Period.OneMonth);
        const { cutout, purchases, slaughter } = await get(api);

        expect(cutout.length).toBe(28);
        expect(cutout[0].date).toEqual(new Date(2021, 10, 15));
        expect(cutout[27].date).toEqual(new Date(2021, 11, 23));

        expect(purchases.length).toBe(243);
        expect(purchases[0].date).toEqual(new Date(2021, 10, 15));
        expect(purchases[242].date).toEqual(new Date(2021, 11, 22));

        expect(slaughter.length).toBe(216);
        expect(slaughter[0].date).toEqual(new Date(2021, 10, 15));
        expect(slaughter[215].date).toEqual(new Date(2021, 11, 22));
    });

    test("fetch three months of data", async () => {
        api.fetch(Period.ThreeMonths);
        const { cutout, purchases, slaughter } = await get(api);

        expect(cutout.length).toBe(73);
        expect(cutout[0].date).toEqual(new Date(2021, 8, 13));
        expect(cutout[72].date).toEqual(new Date(2021, 11, 23));

        expect(purchases.length).toBe(648);
        expect(purchases[0].date).toEqual(new Date(2021, 8, 13));
        expect(purchases[647].date).toEqual(new Date(2021, 11, 22));

        expect(slaughter.length).toBe(576);
        expect(slaughter[0].date).toEqual(new Date(2021, 8, 13));
        expect(slaughter[575].date).toEqual(new Date(2021, 11, 22));
    });

    test("fetch six months of data", async () => {
        api.fetch(Period.SixMonths);
        const { cutout, purchases, slaughter } = await get(api);

        expect(cutout.length).toBe(136);
        expect(cutout[0].date).toEqual(new Date(2021, 5, 14));
        expect(cutout[135].date).toEqual(new Date(2021, 11, 23));

        expect(purchases.length).toBe(1215);
        expect(purchases[0].date).toEqual(new Date(2021, 5, 14));
        expect(purchases[1214].date).toEqual(new Date(2021, 11, 22));

        expect(slaughter.length).toBe(1080);
        expect(slaughter[0].date).toEqual(new Date(2021, 5, 14));
        expect(slaughter[1079].date).toEqual(new Date(2021, 11, 22));
    });

    test("fetch one year of data", async () => {
        api.fetch(Period.OneYear);
        const { cutout, purchases, slaughter } = await get(api);

        expect(cutout.length).toBe(262);
        expect(cutout[0].date).toEqual(new Date(2020, 11, 14));
        expect(cutout[261].date).toEqual(new Date(2021, 11, 23));

        expect(purchases.length).toBe(2349);
        expect(purchases[0].date).toEqual(new Date(2020, 11, 14));
        expect(purchases[2348].date).toEqual(new Date(2021, 11, 22));

        expect(slaughter.length).toBe(2088);
        expect(slaughter[0].date).toEqual(new Date(2020, 11, 14));
        expect(slaughter[2087].date).toEqual(new Date(2021, 11, 22));
    });
});
