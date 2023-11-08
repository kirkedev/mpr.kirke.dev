interface Stat {
    label: string;
    value: string;
}

const { format: formatNumber } = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
});

namespace Stat {
    export const from = (label: string, value: number): Stat => ({
        label,
        value: formatNumber(value)
    });
}

export default Stat;
