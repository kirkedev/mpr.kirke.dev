const extractColorVars = (colorObj, colorGroup = "") =>
    Object.keys(colorObj).reduce((vars, colorKey) => {
        const value = colorObj[colorKey];
        const newVars = typeof value === "string"
            ? {
                [`.stroke${colorGroup}-${colorKey}`]: { stroke: value },
                [`.fill${colorGroup}-${colorKey}`]: { fill: value }
            }
            : extractColorVars(value, `-${colorKey}`);

        return { ...vars, ...newVars };
    }, {});

module.exports = {
    mode: "jit",
    purge: ["index.html", "**/*.tsx", "**/*.module.css"],
    darkMode: false,
    theme: {
        extend: {
            fill: {
                none: "none"
            }
        },
    },
    variants: {
        extend: {},
    },
    plugins: [
        function({ addUtilities, theme }) {
            const colors = extractColorVars(theme("colors"));
            console.log(colors)
            addUtilities(colors);
        }
    ]
}
