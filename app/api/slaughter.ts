import Slaughter from "lib/slaughter";
import { formatDate } from "lib";
import Repository from "../../lib/Repository";

const slaughter = (start: Date, end: Date): Promise<Slaughter[]> =>
    fetch(`/api/slaughter?start=${formatDate(start)}&end=${formatDate(end)}`)
        .then(response => response.json())
        .then(Slaughter.parse);

const repository = new Repository(slaughter);

export default repository;
