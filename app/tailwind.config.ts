import plugin from "tailwindcss/plugin";
import type { Config } from "tailwindcss";

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

module.exports = {
    content: ["index.html", "**/*.tsx", "**/*.css", "**/*.module.css"],
    plugins: [
        plugin(({ addUtilities, theme }) => addUtilities(svgUtilities(theme("colors"))))
    ]
} satisfies Config;
