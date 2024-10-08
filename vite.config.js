import dns from "dns";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import autoprefixer from "autoprefixer";
import svgr from "vite-plugin-svgr";

dns.setDefaultResultOrder("verbatim");

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		rollupOptions: {
			output: {
				manualChunks(id) {
					if (id.includes("node_modules")) {
						return "vendor";
					}
				}
			}
		}
	},
	css: {
		postcss: {
			plugins: [autoprefixer]
		}
	},
	plugins: [
		react(),
		svgr()
	],
	server: {
		port: 3000
	}
});
