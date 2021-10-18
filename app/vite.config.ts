import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";

const { API_URL } = process.env;

export default defineConfig({
    plugins: [solidPlugin()],
    build: {
        outDir: "build",
        target: "esnext",
        polyfillDynamicImport: false
    },
    server: {
        proxy: {
            "/api": {
                target: API_URL,
                rewrite: path => path.replace(/^\/api/, "")
            }
        }
    }
});
