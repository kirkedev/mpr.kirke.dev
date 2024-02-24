import ObservableState from "../async/ObservableState";
import { extentBy } from "../itertools/accumulate";
import { today } from "../time";
import Series, { type Data } from "../time/Series";
import Stat from "../Stat";
import CashIndex from "./CashIndex";

class CashIndexViewModel {
    public static from = (cash: Iterable<CashIndex>): CashIndexViewModel =>
        new CashIndexViewModel(CashIndex.index(cash));

    readonly #series: Series;
    public readonly selected: ObservableState<Data>;
    public readonly stats: ObservableState<Stat>;

    private constructor(series: Series) {
        this.#series = series;

        const cash = Series.find(series, today());
        this.selected = new ObservableState(cash);
        this.stats = new ObservableState(Stat.from("Cash Index", cash.value));
    }

    public get series(): Series {
        return this.#series;
    }

    public get dates(): readonly [Date, Date] {
        return Series.extent(this.#series);
    }

    public get values(): readonly [number, number] {
        return extentBy(this.#series, record => record.value);
    }

    public selectDate = (date = today()): void => {
        const cash = Series.find(this.#series, date);
        this.selected.state = cash;
        this.stats.state = Stat.from("Cash Index", cash.value);
    };

    public resetDate = (): void => this.selectDate();
}

export default CashIndexViewModel;
