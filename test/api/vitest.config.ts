import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        root: "..",
        include: ["test/api/**/*.spec.ts"],
        cache: {
            dir: "node_modules/.vitest/api"
        },
        globalSetup: "test/api/setup.ts",
        coverage: {
            all: true,
            include: ["api/**/*.ts"],
            reportsDirectory: "test/api/coverage"
        }
    }
});
