import { describe, expect, test } from "vitest";
import { get } from "svelte/store";
import cutoutStore from "app/cutout/store";
import Period from "lib/Period";
import api from "app/api";

describe("Cutout ViewModel", async () => {
    api.fetch(Period.OneMonth);
    const store = await get(api).then(({ cutout }) => cutoutStore(cutout));

    test("derive Cutout ViewModel from api response", () => {
        const model = get(store);
        expect(model.date).toEqual(new Date(2021, 11, 23));

        expect(model.cutout.slice(-5)).toEqual([{
            date: new Date(2021, 11, 17),
            value: 85.82
        }, {
            date: new Date(2021, 11, 20),
            value: 86.49
        }, {
            date: new Date(2021, 11, 21),
            value: 84.91
        }, {
            date: new Date(2021, 11, 22),
            value: 84.67
        }, {
            date: new Date(2021, 11, 23),
            value: 91.47
        }]);

        expect(model.stats).toContainEqual({
            label: "Index",
            value: "86.80"
        });

        expect(model.stats).toContainEqual({
            label: "Cutout",
            value: "91.47"
        });
    });

    test("selecting a date updates the stats", () => {
        let model = get(store);
        expect(model.date).toEqual(new Date(2021, 11, 23));
        store.selectDate(new Date(2021, 11, 17));

        model = get(store);
        expect(model.date).toEqual(new Date(2021, 11, 17));

        expect(model.stats).toContainEqual({
            label: "Index",
            value: "87.50"
        });

        expect(model.stats).toContainEqual({
            label: "Cutout",
            value: "85.82"
        });
    });

    test("reset date after selecting date", () => {
        store.selectDate(new Date(2021, 11, 17));
        let model = get(store);
        expect(model.date).toEqual(new Date(2021, 11, 17));

        expect(model.stats).toContainEqual({
            label: "Index",
            value: "87.50"
        });

        expect(model.stats).toContainEqual({
            label: "Cutout",
            value: "85.82"
        });

        store.resetDate();
        model = get(store);

        expect(model.stats).toContainEqual({
            label: "Index",
            value: "86.80"
        });

        expect(model.stats).toContainEqual({
            label: "Cutout",
            value: "91.47"
        });
    });
});
