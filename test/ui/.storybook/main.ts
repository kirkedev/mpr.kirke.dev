import type { StorybookConfig } from "@storybook/svelte-vite";

const config: StorybookConfig = {
    stories: [
        "../**/*.mdx",
        "../**/*.stories.@(js|jsx|ts|tsx|svelte)",
    ],
    addons: [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/addon-interactions",
        "@storybook/addon-svelte-csf"
    ],
    framework: {
        name: "@storybook/svelte-vite",
        options: {
            builder: {
                viteConfigPath: "../app/vite.config.ts"
            }
        }
    }
};

export default config;
