import { defineConfig } from "playwright/test";

export default defineConfig({
    reporter: "list",
    use: {
        baseURL: "http://localhost"
    },
    webServer: {
        command: "yarn run -T start",
        url: "http://localhost",
        reuseExistingServer: true,
        stderr: "ignore"
    },
    outputDir: "results"
});
