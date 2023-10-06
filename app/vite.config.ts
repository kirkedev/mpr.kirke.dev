import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";

export default defineConfig({
    plugins: [solidPlugin()],
    cacheDir: "../node_modules/.vite",
    build: {
        outDir: "build",
        target: "esnext",
        sourcemap: "inline"
    },
    server: {
        port: 3000,
        proxy: {
            "^/api/[^.]*$": {
                target: process.env.API_URL,
                rewrite: path => path.replace(/^\/api/, "")
            }
        }
    }
});
