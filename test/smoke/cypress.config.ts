import { defineConfig } from "cypress";

export default defineConfig({
    downloadsFolder: "downloads",
    fixturesFolder: "fixtures",
    screenshotsFolder: "screenshots",
    videosFolder: "videos",
    screenshotOnRunFailure: false,
    video: false,
    e2e: {
        baseUrl: "http://localhost",
        specPattern: "smoke/**/*.spec.ts",
        supportFile: false
    }
});
