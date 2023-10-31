import Observation, { type Series } from "./Observation";

const formatNumber =
    new Intl.NumberFormat("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format;

interface Stat {
    label: string;
    value: string;
}

namespace Stat {
    export const from = (series: Series, date: Date): string =>
        formatNumber(Observation.find(series, date).value);
}

export default Stat;
