import ObservableState from "../async/ObservableState";
import type Primal from "./Primal";
import PrimalViewModel from "./PrimalViewModel";
import type Cutout from ".";

class PrimalInteractor extends ObservableState<PrimalViewModel> {
    public constructor(cutout: Iterable<Cutout>) {
        super(PrimalViewModel.from(cutout));
    }

    public selectDate = (date: Date): void => {
        this.dispatch(PrimalViewModel.selectDate(date));
    };

    public resetDate = (): void => {
        this.dispatch(PrimalViewModel.selectDate());
    };

    public selectPrimal = (primal: Primal): void => {
        this.dispatch(PrimalViewModel.selectPrimal(primal));
    };
}

export default PrimalInteractor;
