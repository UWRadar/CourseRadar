import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import autoprefixer from "autoprefixer";
import eslint from "@rollup/plugin-eslint";
import svgr from "vite-plugin-svgr";
import { viteCommonjs } from "@originjs/vite-plugin-commonjs";

// https://vitejs.dev/config/
export default defineConfig({
	css: {
		postcss: {
			plugins: [autoprefixer]
		}
	},
	plugins: [
		react(),
		svgr(),
		viteCommonjs(),
		{
			...eslint({
				include: ["src/**/*.{js,jsx}"]
			}),
			enforce: "pre"
		}
	],
	server: {
		port: 3000
	}
});
