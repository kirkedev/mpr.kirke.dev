import ObservableState from "../async/ObservableState";
import type CutoutIndex from "./CutoutIndex";
import CutoutViewModel from "./CutoutViewModel";

class CutoutInteractor extends ObservableState<CutoutViewModel> {
    public constructor(cutout: Iterable<CutoutIndex>) {
        super(CutoutViewModel.from(cutout));
    }

    public selectDate = (date: Date): void => {
        this.dispatch(CutoutViewModel.selectDate(date));
    };

    public resetDate = (): void => {
        this.dispatch(CutoutViewModel.selectDate());
    };
}

export default CutoutInteractor;
