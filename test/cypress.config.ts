import { defineConfig } from "cypress";
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
import createBundler from "@bahmutov/cypress-esbuild-preprocessor";
import { createEsbuildPlugin } from "@badeball/cypress-cucumber-preprocessor/esbuild";
import viteConfig from "app/vite.config";

export default defineConfig({
    screenshotOnRunFailure: false,
    video: false,

    e2e: {
        baseUrl: "http://localhost:3000",
        specPattern: ["features/**/*.feature", "smoke/**/*.spec.ts"],
        supportFile: false,
        async setupNodeEvents(on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions): Promise<Cypress.PluginConfigOptions> {
            await addCucumberPreprocessorPlugin(on, config);

            on("file:preprocessor", createBundler({
                plugins: [createEsbuildPlugin(config)]
            }));

            return config;
        }
    },

    component: {
        supportFile: "app/support.ts",
        specPattern: ["app/**/*.spec.ts"],
        indexHtmlFile: "app/index.html",
        devServer: {
            framework: "svelte",
            bundler: "vite",
            viteConfig
        }
    }
});
