import Interactor from "../Interactor";
import type CutoutIndex from "./CutoutIndex";
import CutoutViewModel from "./CutoutViewModel";

class CutoutInteractor extends Interactor<CutoutViewModel> {
    public constructor(cutout: Iterable<CutoutIndex>) {
        super(CutoutViewModel.from(cutout));
    }

    public selectDate = (date: Date): void => {
        this.execute(CutoutViewModel.selectDate(date));
    };

    public resetDate = (): void => {
        this.execute(CutoutViewModel.selectDate());
    };
}

export default CutoutInteractor;
