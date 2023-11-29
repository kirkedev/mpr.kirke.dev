import ObservableState from "../async/ObservableState";
import type { Data } from "../time/Series";
import type Series from "../time/Series";
import type Stat from "../Stat";
import type CashIndex from "./CashIndex";
import CashIndexViewModel from "./CashIndexViewModel";

class CashIndexInteractor {
    #model: CashIndexViewModel;
    public readonly stats: ObservableState<Stat>;
    public readonly selected: ObservableState<Data>;

    public constructor(cash: Iterable<CashIndex>) {
        this.#model = CashIndexViewModel.from(cash);
        this.stats = new ObservableState(this.#model.stats);
        this.selected = new ObservableState(this.#model.selected);
    }

    public selectDate = (date: Date): this => {
        this.#model = this.#model.selectDate(date);
        this.stats.state = this.#model.stats;
        this.selected.state = this.#model.selected;
        return this;
    };

    public resetDate = (): this => {
        this.#model = this.#model.selectDate();
        this.stats.state = this.#model.stats;
        this.selected.state = this.#model.selected;
        return this;
    };

    public get dates(): readonly [Date, Date] {
        return this.#model.dates;
    }

    public get values(): readonly [number, number] {
        return this.#model.values;
    }

    public get series(): Series {
        return this.#model.series;
    }
}

export default CashIndexInteractor;
