import { describe, expect, test } from "vitest";
import { get } from "svelte/store";
import type Result from "lib/async/Result";
import { count } from "lib/itertools/accumulate";
import { first, last } from "lib/itertools/slice";
import Period from "lib/time/Period";
import ApiService, { type Resources } from "app/api/service";

describe("fetch periods", () => {
    const api = new ApiService();

    test("fetch three months of data", async () => {
        await api.fetch(Period.ThreeMonths);
        const { data } = get(api) as Result.Success<Resources>;
        const { cutoutIndex, purchases, cashIndex, cutout } = data;

        expect(count(cutoutIndex)).toBe(64);
        expect(first(cutoutIndex).date).toEqual(new Date(2021, 8, 23));
        expect(last(cutoutIndex).date).toEqual(new Date(2021, 11, 22));

        expect(count(purchases)).toBe(576);
        expect(first(purchases).date).toEqual(new Date(2021, 8, 23));
        expect(last(purchases).date).toEqual(new Date(2021, 11, 22));

        expect(count(cashIndex)).toBe(64);
        expect(first(cashIndex).date).toEqual(new Date(2021, 8, 23));
        expect(last(cashIndex).date).toEqual(new Date(2021, 11, 22));

        expect(count(cutout)).toBe(64);
        expect(first(cutout).date).toEqual(new Date(2021, 8, 23));
        expect(last(cutout).date).toEqual(new Date(2021, 11, 22));
    });

    test("fetch six months of data", async () => {
        await api.fetch(Period.SixMonths);
        const { data } = get(api) as Result.Success<Resources>;
        const { cutoutIndex, purchases, cashIndex, cutout } = data;

        expect(count(cutoutIndex)).toBe(128);
        expect(first(cutoutIndex).date).toEqual(new Date(2021, 5, 23));
        expect(last(cutoutIndex).date).toEqual(new Date(2021, 11, 22));

        expect(count(purchases)).toBe(1152);
        expect(first(purchases).date).toEqual(new Date(2021, 5, 23));
        expect(last(purchases).date).toEqual(new Date(2021, 11, 22));

        expect(count(cashIndex)).toBe(128);
        expect(first(cashIndex).date).toEqual(new Date(2021, 5, 23));
        expect(last(cashIndex).date).toEqual(new Date(2021, 11, 22));

        expect(count(cutout)).toBe(128);
        expect(first(cutout).date).toEqual(new Date(2021, 5, 23));
        expect(last(cutout).date).toEqual(new Date(2021, 11, 22));
    });

    test("fetch one year of data", async () => {
        await api.fetch(Period.OneYear);
        const { data } = get(api) as Result.Success<Resources>;
        const { cutoutIndex, purchases, cashIndex, cutout } = data;

        expect(count(cutoutIndex)).toBe(254);
        expect(first(cutoutIndex).date).toEqual(new Date(2020, 11, 23));
        expect(last(cutoutIndex).date).toEqual(new Date(2021, 11, 22));

        expect(count(purchases)).toBe(2286);
        expect(first(purchases).date).toEqual(new Date(2020, 11, 23));
        expect(last(purchases).date).toEqual(new Date(2021, 11, 22));

        expect(count(cashIndex)).toBe(254);
        expect(first(cashIndex).date).toEqual(new Date(2020, 11, 23));
        expect(last(cashIndex).date).toEqual(new Date(2021, 11, 22));

        expect(count(cutout)).toBe(254);
        expect(first(cutout).date).toEqual(new Date(2020, 11, 23));
        expect(last(cutout).date).toEqual(new Date(2021, 11, 22));
    });
});
