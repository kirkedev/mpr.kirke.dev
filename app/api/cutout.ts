import { formatDate } from "lib";
import Repository from "lib/Repository";
import Cutout from "lib/cutout";

const cutout = (start: Date, end: Date): Promise<Cutout[]> =>
    fetch(`/api/cutout?start=${formatDate(start)}&end=${formatDate(end)}`)
        .then(response => response.json())
        .then(Cutout.parse);

const repository = new Repository(cutout);

export default repository;
