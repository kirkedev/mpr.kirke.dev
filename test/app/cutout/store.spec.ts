import { describe, test, expect, beforeEach } from "vitest";
import Period from "lib/Period";
import store, { type CutoutViewModel } from "app/cutout/store";
import api from "app/api";
import { promisify } from "..";

describe("derive Cutout ViewModel from api", () => {
    const cutout = store(api);
    let result: CutoutViewModel;

    beforeEach(async () => {
        api.fetch(Period.OneMonth);
        result = await promisify(cutout);
    });

    test("initial state from api", () => {
        expect(result.date).toEqual(new Date(2021, 11, 23));

        expect(result.cutout.slice(-5)).toEqual([{
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

        expect(result.stats).toContainEqual({
            label: "Index",
            value: "86.80"
        });

        expect(result.stats).toContainEqual({
            label: "Cutout",
            value: "91.47"
        });
    });

    test("selecting a date updates the stats", async () => {
        expect.hasAssertions();
        cutout.select(new Date(2021, 11, 17));
        const result = await promisify(cutout);

        expect(result.date).toEqual(new Date(2021, 11, 17));

        expect(result.stats).toContainEqual({
            label: "Index",
            value: "87.50"
        });

        expect(result.stats).toContainEqual({
            label: "Cutout",
            value: "85.82"
        });
    });
});
