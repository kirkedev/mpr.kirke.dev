import type Cutout from ".";
import Interactor, { type Action } from "../Interactor";
import cutoutIndex from "../CutoutIndex";
import type Period from "../Period";
import { dropWhile } from "../itertools/drop";
import map from "../itertools/map";
import { formatNumber, getObservation } from "app/api/lib";
import type { Series } from "app/ui/LineChart";

interface Stat {
    label: string;
    value: string;
}

interface CutoutViewModel {
    date: Date;
    stats: Stat[];
    cutout: Series;
    index: Series;
}

const getStat = (series: Series, date: Date): string =>
    formatNumber(getObservation(series, date).value);

const selectDate = (date: Date): Action<CutoutViewModel> =>
    ({ cutout, index }) => ({
        date,
        cutout,
        index,
        stats: [{
            label: "Cutout",
            value: getStat(cutout, date)
        }, {
            label: "Index",
            value: getStat(index, date)
        }]
    });

class CutoutInteractor extends Interactor<CutoutViewModel> {
    public constructor(result: Cutout[], period: Period) {
        const { start, end: date } = period;
        const records = dropWhile(cutoutIndex(result), record => record.date < start);

        const index = Array.from(map(records, ({ date, indexPrice: value }) => ({
            date, value
        })));

        const cutout = Array.from(map(records, ({ date, carcassPrice: value }) => ({
            date, value
        })));

        super({
            date,
            cutout,
            index,
            stats: [{
                label: "Cutout",
                value: getStat(cutout, date)
            }, {
                label: "Index",
                value: getStat(index, date)
            }]
        });
    }

    public selectDate(date: Date): void {
        this.execute(selectDate(date));
    }
}

export default CutoutInteractor;

export { type CutoutViewModel };
