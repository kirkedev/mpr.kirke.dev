import type { StorybookConfig } from "@storybook/svelte-vite";

import { join, dirname } from "path";

const getAbsolutePath = <T extends string>(value: string): T =>
    dirname(require.resolve(join(value, "package.json"))) as T;

const config: StorybookConfig = {
    stories: [
        "../app/**/*.mdx",
        "../app/**/*.stories.@(ts|svelte)"
    ],
    addons: [
        getAbsolutePath("@storybook/addon-links"),
        getAbsolutePath("@storybook/addon-essentials"),
        getAbsolutePath("@storybook/addon-coverage"),
        getAbsolutePath("@storybook/addon-interactions"),
        getAbsolutePath("@chromatic-com/storybook")
    ],
    framework: {
        name: getAbsolutePath("@storybook/svelte-vite"),
        options: {
            builder: {
                viteConfigPath: "../app/vite.config.ts"
            }
        }
    },
    docs: {
        autodocs: "tag"
    }
};

export default config;
