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
    export const from = (label: string, series: Series, date: Date): Stat => ({
        label,
        value: formatNumber(Observation.find(series, date).value)
    });
}

export default Stat;
