import { defineConfig, type UserConfig } from "vite";
import { svelte, vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import autoprefixer from "autoprefixer";
import tailwindcss from "tailwindcss";
import type { Plugin } from "postcss";

export default defineConfig({
    cacheDir: "../node_modules/.vite",
    build: {
        outDir: "build",
        minify: true
    },
    plugins: [
        svelte({ preprocess: vitePreprocess() })
    ],
    css: {
        postcss: {
            plugins: [autoprefixer(), tailwindcss() as Plugin]
        }
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
}) satisfies UserConfig;
