import type { Action } from "../Interactor";
import type Stat from "../Stat";
import { today } from "../time";
import { extentBy } from "../itertools/accumulate";
import Series, { type Data } from "../time/Series";
import type Cutout from ".";
import Primal, { Primals } from "./Primal";

class PrimalViewModel {
    public static from = (cutout: Iterable<Cutout>): PrimalViewModel =>
        new PrimalViewModel(today(), Primal.Belly, [
            Primal.belly(cutout),
            Primal.ham(cutout),
            Primal.loin(cutout),
            Primal.butt(cutout),
            Primal.rib(cutout),
            Primal.picnic(cutout)
        ]);

    public static selectDate = (date = today()): Action<PrimalViewModel> =>
        model => new PrimalViewModel(date, model.#primal, model.#series);

    public static selectPrimal = (primal: Primal): Action<PrimalViewModel> =>
        model => new PrimalViewModel(model.#date, primal, model.#series);

    readonly #date: Date;
    readonly #primal: Primal;
    readonly #series: Series[];

    private constructor(date: Date, primal: Primal, series: Series[]) {
        this.#date = date;
        this.#primal = primal;
        this.#series = series;
    }

    public get stats(): Stat[] {
        return Primals.map((label, index) =>
            Series.stat(label, this.#series[index], this.#date));
    }

    public get series(): Series {
        return this.#series[Primals.indexOf(this.#primal)];
    }

    public get dates(): readonly [Date, Date] {
        return Series.extent(this.series);
    }

    public get values(): readonly [number, number] {
        return extentBy(this.series, record => record.value);
    }

    public get selected(): Data {
        return Series.find(this.series, this.#date);
    }
}

export default PrimalViewModel;
