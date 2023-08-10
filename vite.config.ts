import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [dts()],
  build: {
    target: "es2015",
    lib: {
      name: "InView",
      entry: "src/inview.ts",
      fileName: "inview",
    },
  },
});
