import type Cutout from ".";
import Interactor, { type Action } from "../Interactor";
import CutoutIndex from "./CutoutIndex";
import type Period from "../Period";
import { dropWhile } from "../itertools/drop";
import type Observation from "../Observation";
import { type Series } from "../Observation";
import Stat from "../Stat";

interface CutoutViewModel extends Observation {
    stats: Stat[];
    cutout: Series;
    index: Series;
}

const selectDate = (date: Date): Action<CutoutViewModel> =>
    ({ cutout, index }) => ({
        date,
        cutout,
        index,
        stats: [{
            label: "Cutout",
            value: Stat.from(cutout, date)
        }, {
            label: "Index",
            value: Stat.from(index, date)
        }]
    });

class CutoutInteractor extends Interactor<CutoutViewModel> {
    public constructor(result: Cutout[], period: Period) {
        const { start, end: date } = period;
        const records = dropWhile(CutoutIndex.from(result), record => record.date < start);
        const index = CutoutIndex.indexSeries(records);
        const cutout = CutoutIndex.dailySeries(records);

        super({
            date,
            cutout,
            index,
            stats: [{
                label: "Cutout",
                value: Stat.from(cutout, date)
            }, {
                label: "Index",
                value: Stat.from(index, date)
            }]
        });
    }

    public selectDate(date: Date): void {
        this.execute(selectDate(date));
    }
}

export default CutoutInteractor;

export { type CutoutViewModel };
