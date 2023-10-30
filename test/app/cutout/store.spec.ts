import { describe, expect, test } from "vitest";
import { get } from "svelte/store";
import CutoutInteractor from "lib/cutout/Interactor";
import Period from "lib/Period";
import api from "app/api";

describe("Cutout ViewModel", async () => {
    api.fetch(Period.OneMonth);
    const interactor = await get(api).then(({ cutout }) => new CutoutInteractor(cutout, api.period));

    test("derive Cutout ViewModel from api response", () => {
        const model = interactor.state;
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

    test("selecting a date updates the stats", async () => {
        expect(interactor.state.date).toEqual(new Date(2021, 11, 23));

        const next = interactor.next();
        interactor.selectDate(new Date(2021, 11, 17));

        const result = await next;
        expect(result.value.date).toEqual(new Date(2021, 11, 17));

        expect(result.value.stats).toContainEqual({
            label: "Index",
            value: "87.50"
        });

        expect(result.value.stats).toContainEqual({
            label: "Cutout",
            value: "85.82"
        });
    });

    test("reset date after selecting date", () => {
        interactor.selectDate(new Date(2021, 11, 17));
        expect(interactor.state.date).toEqual(new Date(2021, 11, 17));

        expect(interactor.state.stats).toContainEqual({
            label: "Index",
            value: "87.50"
        });

        expect(interactor.state.stats).toContainEqual({
            label: "Cutout",
            value: "85.82"
        });

        interactor.selectDate(api.period.end);

        expect(interactor.state.stats).toContainEqual({
            label: "Index",
            value: "86.80"
        });

        expect(interactor.state.stats).toContainEqual({
            label: "Cutout",
            value: "91.47"
        });
    });
});
