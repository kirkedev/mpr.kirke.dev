import { describe, expect, test } from "vitest";
import { get } from "svelte/store";
import { count } from "lib/itertools/accumulate";
import { first, last } from "lib/itertools/slice";
import Period from "lib/time/Period";
import api from "app/api";

describe("fetch periods", () => {
    test("fetch one month of data", async () => {
        api.fetch(Period.OneMonth);
        const { cutoutIndex, purchases, cashIndex, primals } = await get(api);

        expect(count(cutoutIndex)).toBe(22);
        expect(first(cutoutIndex).date).toEqual(new Date(2021, 10, 23));
        expect(last(cutoutIndex).date).toEqual(new Date(2021, 11, 23));

        expect(count(purchases)).toBe(189);
        expect(first(purchases).date).toEqual(new Date(2021, 10, 23));
        expect(last(purchases).date).toEqual(new Date(2021, 11, 22));

        expect(count(cashIndex)).toBe(21);
        expect(first(cashIndex).date).toEqual(new Date(2021, 10, 23));
        expect(last(cashIndex).date).toEqual(new Date(2021, 11, 22));

        expect(count(primals)).toBe(22);
        expect(first(primals).date).toEqual(new Date(2021, 10, 23));
        expect(last(primals).date).toEqual(new Date(2021, 11, 23));
    });

    test("fetch three months of data", async () => {
        api.fetch(Period.ThreeMonths);
        const { cutoutIndex, purchases, cashIndex, primals } = await get(api);

        expect(count(cutoutIndex)).toBe(65);
        expect(first(cutoutIndex).date).toEqual(new Date(2021, 8, 23));
        expect(last(cutoutIndex).date).toEqual(new Date(2021, 11, 23));

        expect(count(purchases)).toBe(576);
        expect(first(purchases).date).toEqual(new Date(2021, 8, 23));
        expect(last(purchases).date).toEqual(new Date(2021, 11, 22));

        expect(count(cashIndex)).toBe(64);
        expect(first(cashIndex).date).toEqual(new Date(2021, 8, 23));
        expect(last(cashIndex).date).toEqual(new Date(2021, 11, 22));

        expect(count(primals)).toBe(65);
        expect(first(primals).date).toEqual(new Date(2021, 8, 23));
        expect(last(primals).date).toEqual(new Date(2021, 11, 23));
    });

    test("fetch six months of data", async () => {
        api.fetch(Period.SixMonths);
        const { cutoutIndex, purchases, cashIndex, primals } = await get(api);

        expect(count(cutoutIndex)).toBe(129);
        expect(first(cutoutIndex).date).toEqual(new Date(2021, 5, 23));
        expect(last(cutoutIndex).date).toEqual(new Date(2021, 11, 23));

        expect(count(purchases)).toBe(1152);
        expect(first(purchases).date).toEqual(new Date(2021, 5, 23));
        expect(last(purchases).date).toEqual(new Date(2021, 11, 22));

        expect(count(cashIndex)).toBe(128);
        expect(first(cashIndex).date).toEqual(new Date(2021, 5, 23));
        expect(last(cashIndex).date).toEqual(new Date(2021, 11, 22));

        expect(count(primals)).toBe(129);
        expect(first(primals).date).toEqual(new Date(2021, 5, 23));
        expect(last(primals).date).toEqual(new Date(2021, 11, 23));
    });

    test("fetch one year of data", async () => {
        api.fetch(Period.OneYear);
        const { cutoutIndex, purchases, cashIndex, primals } = await get(api);

        expect(count(cutoutIndex)).toBe(255);
        expect(first(cutoutIndex).date).toEqual(new Date(2020, 11, 23));
        expect(last(cutoutIndex).date).toEqual(new Date(2021, 11, 23));

        expect(count(purchases)).toBe(2286);
        expect(first(purchases).date).toEqual(new Date(2020, 11, 23));
        expect(last(purchases).date).toEqual(new Date(2021, 11, 22));

        expect(count(cashIndex)).toBe(254);
        expect(first(cashIndex).date).toEqual(new Date(2020, 11, 23));
        expect(last(cashIndex).date).toEqual(new Date(2021, 11, 22));

        expect(count(primals)).toBe(255);
        expect(first(primals).date).toEqual(new Date(2020, 11, 23));
        expect(last(primals).date).toEqual(new Date(2021, 11, 23));
    });
});
