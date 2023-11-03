import Observation, { type Series } from "./Observation";

interface Stat {
    label: string;
    value: string;
}

const { format: formatNumber } = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
});

namespace Stat {
    export const from = (label: string, series: Series, date: Date): Stat => ({
        label,
        value: formatNumber(Observation.find(series, date).value)
    });
}

export default Stat;
