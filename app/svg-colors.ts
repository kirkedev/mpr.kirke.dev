import plugin from "tailwindcss/plugin";

// Adds tailwindcss utilities to use theme colors on svg fill and stroke properties

const svgUtilities = (colorObj: Record<string, string | Record<string, string>>, colorGroup = ""): Record<string, string> =>
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

export default plugin(({ addUtilities, theme }) => addUtilities(svgUtilities(theme("colors"))));
