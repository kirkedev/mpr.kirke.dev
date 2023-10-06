import { defineConfig } from "cypress";
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
import createBundler from "@bahmutov/cypress-esbuild-preprocessor";
import { createEsbuildPlugin } from "@badeball/cypress-cucumber-preprocessor/esbuild";

export default defineConfig({
    downloadsFolder: "downloads",
    fixturesFolder: "fixtures",
    screenshotsFolder: "screenshots",
    videosFolder: "videos",
    screenshotOnRunFailure: false,
    video: false,
    e2e: {
        baseUrl: "http://localhost:3000",
        specPattern: "**/*.feature",
        supportFile: false,
        async setupNodeEvents(on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions): Promise<Cypress.PluginConfigOptions> {
            await addCucumberPreprocessorPlugin(on, config);

            on("file:preprocessor", createBundler({
                plugins: [createEsbuildPlugin(config)]
            }));

            return config;
        }
    }
});
