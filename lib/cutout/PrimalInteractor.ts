import Interactor from "../Interactor";
import type Primal from "./Primal";
import PrimalViewModel from "./PrimalViewModel";
import type Cutout from ".";

class PrimalInteractor extends Interactor<PrimalViewModel> {
    public constructor(cutout: Iterable<Cutout>) {
        super(PrimalViewModel.from(cutout));
    }

    public selectDate(date: Date): void {
        this.execute(PrimalViewModel.selectDate(date));
    }

    public resetDate(): void {
        this.execute(PrimalViewModel.selectDate());
    }

    public selectPrimal(primal: Primal): void {
        this.execute(PrimalViewModel.selectPrimal(primal));
    }
}

export default PrimalInteractor;
