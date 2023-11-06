import Series from "./time/Series";

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
        value: formatNumber(Series.find(series, date).value)
    });
}

export default Stat;
