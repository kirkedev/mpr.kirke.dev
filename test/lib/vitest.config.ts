import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        root: "..",
        include: ["test/lib/**/*.spec.ts"],
        cache: {
            dir: "../node_modules/.vitest/lib"
        },
        coverage: {
            all: true,
            include: ["lib/**/*.ts"],
            reportsDirectory: "test/lib/coverage"
        }
    }
});
