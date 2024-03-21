import state, { type State, type MutableState } from "../async/state";
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
        new PrimalViewModel([
            Primal.belly(cutout),
            Primal.ham(cutout),
            Primal.loin(cutout),
            Primal.butt(cutout),
            Primal.rib(cutout),
            Primal.picnic(cutout)
        ], primal);

    readonly #primal: Primal;
    readonly #series: Series[];
    readonly #date: MutableState<Date>;

    public readonly stats: State<PrimalStat[]>;
    public readonly selected: State<Data>;

    private constructor(series: Series[], primal: Primal) {
        this.#series = series;
        this.#primal = primal;
        this.#date = state(today());

        this.stats = this.#date.map(date => {
            const observations = map(series, findByDate(date));

            const stats = map(zip(Primals, observations), ([label, observation]) => ({
                ...Stat.from(label, observation.value), selected: label === primal
            }));

            return Array.from(stats);
        });

        this.selected = this.#date.map(date => Series.find(this.series, date));
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

    public selectDate = (date: Date): void => {
        this.#date.value = date;
    };

    public resetDate = (): void => {
        this.selectDate(today());
    };
}

export default PrimalViewModel;

export { type PrimalStat };
