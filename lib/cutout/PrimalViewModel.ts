import { extentBy } from "../itertools/accumulate";
import { today } from "../time";
import Series, { type Data } from "../time/Series";
import type Stat from "../Stat";
import type Cutout from ".";
import Primal, { Primals } from "./Primal";

interface PrimalStat extends Stat {
    selected: boolean;
}

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

    readonly #date: Date;
    readonly #primal: Primal;
    readonly #series: Series[];

    private constructor(date: Date, primal: Primal, series: Series[]) {
        this.#date = date;
        this.#primal = primal;
        this.#series = series;
    }

    public get stats(): PrimalStat[] {
        return Primals.map((label, index) => ({
            ...Series.stat(label, this.#series[index], this.#date),
            selected: Primals[index] === this.#primal
        }));
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

    public selectDate = (date = today()): PrimalViewModel =>
        new PrimalViewModel(date, this.#primal, this.#series);

    public selectPrimal = (primal: Primal): PrimalViewModel =>
        new PrimalViewModel(this.#date, primal, this.#series);
}

export default PrimalViewModel;

export { type PrimalStat };
