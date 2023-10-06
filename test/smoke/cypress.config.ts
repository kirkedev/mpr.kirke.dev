import { defineConfig } from "cypress";

export default defineConfig({
    downloadsFolder: "downloads",
    fixturesFolder: "fixtures",
    screenshotsFolder: "screenshots",
    videosFolder: "videos",
    screenshotOnRunFailure: false,
    video: false,
    e2e: {
        baseUrl: "http://localhost:3000",
        specPattern: "smoke/**/*.spec.ts",
        supportFile: false
    }
});
