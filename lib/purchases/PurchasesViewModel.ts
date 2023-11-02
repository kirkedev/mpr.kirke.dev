import { extent, today } from "..";
import map from "../itertools/map";
import type { Action } from "../Interactor";
import type { Data } from "../Observation";
import Observation, { type Series } from "../Observation";
import Stat from "../Stat";
import Purchase from ".";

class PurchasesViewModel {
    public static from = (purchases: Iterable<Purchase>): PurchasesViewModel =>
        new PurchasesViewModel(today(), Purchase.marketFormula(purchases));

    public static selectDate = (date = today()): Action<PurchasesViewModel> =>
        model => new PurchasesViewModel(date, model.#series);

    readonly #date: Date;
    readonly #series: Series;

    private constructor(date: Date, series: Series) {
        this.#series = series;
        this.#date = date;
    }

    public get stats(): Stat {
        return Stat.from("Cash", this.#series, this.#date);
    }

    public get series(): Series {
        return this.#series;
    }

    public get dates(): readonly [Date, Date] {
        return Observation.extent(this.#series);
    }

    public get values(): readonly [number, number] {
        return extent(map<Data, number>(this.#series, record => record.value));
    }

    public get selected(): Data {
        return Observation.find(this.series, this.#date);
    }
}

export default PurchasesViewModel;
