import MutableState from "../async/MutableState";
import { extentBy } from "../itertools/accumulate";
import map from "../itertools/map";
import zip from "../itertools/zip";
import { findByDate, today } from "../time";
import Series, { type Data } from "../time/Series";
import Stat from "../Stat";
import type Cutout from ".";
import Primal, { Primals } from "./Primal";

interface PrimalStat extends Stat {
    selected: boolean;
}

class PrimalViewModel {
    public static from = (cutout: Iterable<Cutout>, primal = Primal.Belly): PrimalViewModel =>
        new PrimalViewModel(primal, [
            Primal.belly(cutout),
            Primal.ham(cutout),
            Primal.loin(cutout),
            Primal.butt(cutout),
            Primal.rib(cutout),
            Primal.picnic(cutout)
        ]);

    readonly #primal: Primal;
    readonly #series: Series[];

    public readonly stats: MutableState<PrimalStat[]>;
    public readonly selected: MutableState<Data>;

    private constructor(primal: Primal, series: Series[]) {
        const date = today();
        const observations = map(series, findByDate(date));

        const stats = map(zip(Primals, observations), ([label, observation]) => ({
            ...Stat.from(label, observation.value), selected: label === primal
        }));

        this.#primal = primal;
        this.#series = series;
        this.stats = MutableState.from(Array.from(stats));
        this.selected = MutableState.from(Series.find(this.series, date));
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

    public selectDate = (date = today()): void => {
        const observations = map(this.#series, findByDate(date));

        const stats = map(zip(Primals, observations), ([label, observation]) => ({
            ...Stat.from(label, observation.value), selected: label === this.#primal
        }));

        this.stats.value = Array.from(stats);
        this.selected.value = Series.find(this.series, date);
    };

    public resetDate = (): void => this.selectDate();
}

export default PrimalViewModel;

export { type PrimalStat };
