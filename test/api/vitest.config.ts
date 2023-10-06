import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        root: "..",
        include: ["test/api/**/*.spec.ts"],
        cache: {
            dir: "../node_modules/.vitest/api"
        },
        globalSetup: "api/setup.ts",
        coverage: {
            all: true,
            provider: "istanbul",
            include: ["api/**/*.ts"],
            reportsDirectory: "test/api/coverage"
        }
    }
});
