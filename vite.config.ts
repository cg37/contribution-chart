import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import { resolve } from "path";

export default defineConfig(({ mode }) => {
  if (mode === "lib") {
    return {
      plugins: [vue(), cssInjectedByJsPlugin()],
      base: "./",
      build: {
        lib: {
          entry: resolve(__dirname, "src/index.js"),
          name: "ContributionChart",
          fileName: (format) => `contribution-chart.${format}.js`
        },
        rollupOptions: {
          external: ["vue"],
          output: {
            globals: {
              vue: "Vue"
            }
          }
        }
      }
    };
  }
  return {
    plugins: [vue()],
    server: {
      host: "0.0.0.0",
      port: 3031
    },
    resolve: {
      alias: {
        "@": resolve(__dirname, "src")
      }
    }
  };
});
