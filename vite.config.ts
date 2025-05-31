import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import svgLoader from "vite-svg-loader";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  if (mode === "lib") {
    return {
      plugins: [vue()],
      build: {
        lib: {
          entry: resolve(__dirname, "src/index.js"),
          name: "ContributionChart",
          fileName: (format) => `contribution-chart.${format}.js`
        },
        rollupOptions: {
          external: ["vue", "axios"],
          output: {
            globals: {
              vue: "Vue",
              axios: "axios"
            }
          }
        }
      }
    };
  }
  return {
    plugins: [
      vue(),
      svgLoader(),
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      })
    ],
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
