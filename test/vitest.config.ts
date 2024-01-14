import { mergeConfig } from "vitest/config";
import config from "../app/vite.config";

export default mergeConfig(config, {
    envDir: "test",
    test: {
        root: "..",
        include: ["{api,app,lib}/**/*.spec.ts"],
        coverage: {
            all: true,
            include: ["{api,app,lib}/**/*.ts", "app/**/*.svelte"],
            exclude: ["**/*.d.ts", "api/client.ts", "api/index.ts", "app/svg-colors.ts"],
            reportsDirectory: "test/coverage"
        }
    }
});
