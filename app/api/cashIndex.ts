import Repository from "lib/Repository";
import type { CashIndex } from "lib/CashIndex";
import cashIndex from "lib/CashIndex";
import slaughter from "./slaughter";

const getCashIndex = (start: Date, end: Date): Promise<CashIndex[]> =>
    slaughter.query(start, end)
        .then(cashIndex)
        .then(cash => Array.from(cash));

const repository = new Repository(getCashIndex);

export default repository;
