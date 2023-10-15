import { mergeConfig } from "vitest/config";
import config from "../../app/vite.config";

export default mergeConfig(config, {
    test: {
        root: "..",
        include: ["test/app/**/*.spec.ts"],
        cache: {
            dir: "../node_modules/.vitest/app"
        },
        setupFiles: "test/app/setup.ts",
        environment: "jsdom",
        coverage: {
            all: true,
            include: ["app/**/*.ts", "app/**/*.svelte"],
            reportsDirectory: "test/app/coverage"
        }
    }
});
