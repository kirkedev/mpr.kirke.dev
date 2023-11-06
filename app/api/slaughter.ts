import Repository from "lib/Repository";
import Slaughter from "lib/slaughter";
import { formatDate } from "lib/time";

const slaughter = (start: Date, end: Date): Promise<Slaughter[]> =>
    fetch(`${window.location.origin}/api/slaughter?start=${formatDate(start)}&end=${formatDate(end)}`)
        .then(response => response.json())
        .then(Slaughter.parse);

const repository = new Repository(slaughter);

export default repository;
