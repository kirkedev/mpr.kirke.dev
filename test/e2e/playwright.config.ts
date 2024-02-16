import { defineConfig } from "playwright/test";

export default defineConfig({
    reporter: "list",
    use: {
        baseURL: "http://localhost:3000"
    },
    projects: [
        {
            name: "e2e"
        }, {
            name: "smoke",
            testDir: "../smoke"
        }
    ],
    webServer: {
        command: "yarn run -T dev",
        url: "http://localhost:3000",
        reuseExistingServer: true,
        stderr: "ignore"
    },
    outputDir: "results"
});
