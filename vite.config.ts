import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
	plugins: [dts()],
	build: {
		target: "es2015",
		lib: {
			entry: {
				inview: "src/inview.ts",
				"inview-vue": "src/inview-vue.ts",
			},
			name: "InView",
		},
	},
});
