import map from "../itertools/map";
import type { Action } from "../Interactor";
import Series, { type Data } from "../time/Series";
import type Stat from "../Stat";
import Purchase from ".";
import { today } from "../time";
import { extent } from "../itertools";

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
        return Series.stat("Formula", this.#series, this.#date);
    }

    public get series(): Series {
        return this.#series;
    }

    public get dates(): readonly [Date, Date] {
        return Series.extent(this.#series);
    }

    public get values(): readonly [number, number] {
        return extent(map<Data, number>(this.#series, record => record.value));
    }

    public get selected(): Data {
        return Series.find(this.#series, this.#date);
    }
}

export default PurchasesViewModel;
