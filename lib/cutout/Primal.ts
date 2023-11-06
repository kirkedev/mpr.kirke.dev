import map from "../itertools/map";
import Series from "../time/Series";
import type Cutout from ".";

enum Primal {
    Belly = "Belly",
    Ham = "Ham",
    Loin = "Loin",
    Butt = "Butt",
    Rib = "Rib",
    Picnic = "Picnic"
}

const Primals = [Primal.Belly, Primal.Ham, Primal.Loin, Primal.Butt, Primal.Rib, Primal.Picnic];

namespace Primal {
    export const belly = (cutout: Iterable<Cutout>): Series =>
        Series.sort(map(cutout, ({ date, bellyPrice: value }) => ({
            date, value
        })));

    export const ham = (cutout: Iterable<Cutout>): Series =>
        Series.sort(map(cutout, ({ date, hamPrice: value }) => ({
            date, value
        })));

    export const loin = (cutout: Iterable<Cutout>): Series =>
        Series.sort(map(cutout, ({ date, loinPrice: value }) => ({
            date, value
        })));

    export const butt = (cutout: Iterable<Cutout>): Series =>
        Series.sort(map(cutout, ({ date, buttPrice: value }) => ({
            date, value
        })));

    export const rib = (cutout: Iterable<Cutout>): Series =>
        Series.sort(map(cutout, ({ date, ribPrice: value }) => ({
            date, value
        })));

    export const picnic = (cutout: Iterable<Cutout>): Series =>
        Series.sort(map(cutout, ({ date, picnicPrice: value }) => ({
            date, value
        })));
}

export default Primal;

export { Primals };
