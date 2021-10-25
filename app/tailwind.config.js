const svgUtilities = (colorObj, colorGroup = "") =>
    Object.keys(colorObj).reduce((vars, colorKey) => {
        const value = colorObj[colorKey];

        const newVars = typeof value === "string"
            ? {
                [`.stroke${colorGroup}-${colorKey}`]: { stroke: value },
                [`.fill${colorGroup}-${colorKey}`]: { fill: value }
            }
            : svgUtilities(value, `-${colorKey}`);

        return { ...vars, ...newVars };
    }, {});

module.exports = {
    mode: "jit",
    purge: ["index.html", "**/*.tsx", "**/*.module.css"],
    darkMode: false,
    variants: {
        extend: {},
    },
    plugins: [
        ({ addUtilities, theme }) => addUtilities(svgUtilities(theme("colors")))
    ]
}
