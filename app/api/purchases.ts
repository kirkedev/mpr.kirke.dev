import Repository from "lib/Repository";
import Purchase from "lib/purchases";
import { formatDate } from "lib/time";

const purchases = (start: Date, end: Date): Promise<Purchase[]> =>
    fetch(`${window.location.origin}/api/purchases?start=${formatDate(start)}&end=${formatDate(end)}`)
        .then(response => response.json())
        .then(Purchase.parse);

const repository = new Repository(purchases);

export default repository;
