const extractColorVars = (colorObj, colorGroup = "") =>
    Object.keys(colorObj).reduce((vars, colorKey) => {
        const value = colorObj[colorKey];

        const newVars = typeof value === 'string'
            ? { [`--color${colorGroup}-${colorKey}`]: value }
            : extractColorVars(value, `-${colorKey}`);

        return { ...vars, ...newVars };
    }, {});

module.exports = {
    purge: ["index.html", "**/*.tsx", "**/*.module.css"],
    darkMode: false,
    theme: {
        extend: {},
    },
    variants: {
        extend: {},
    },
    plugins: [
        function({ addBase, theme }) {
            addBase({ ":root": extractColorVars(theme("colors")) });
        }
    ]
}
