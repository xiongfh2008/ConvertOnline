import { paraglideVitePlugin } from "@inlang/paraglide-js";
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig, type PluginOption } from "vite";
import svg from "@poppanator/sveltekit-svg";
import wasm from "vite-plugin-wasm";
import { execSync } from "child_process";

let commitHash = "unknown";
try {
	commitHash = execSync("git rev-parse --short HEAD").toString().trim();
} catch (e) {
	console.warn("Could not determine Git commit hash:", e);
}

export default defineConfig(({ command }) => {
	const plugins: PluginOption[] = [
		sveltekit(),
		paraglideVitePlugin({
			project: "./project.inlang",
			outdir: "./src/lib/paraglide",
			strategy: ["localStorage", "preferredLanguage", "baseLocale"],
		}),
		svg({
			includePaths: ["./src/lib/assets"],
			svgoOptions: {
				multipass: true,
				plugins: [
					{
						name: "preset-default",
						params: { overrides: { removeViewBox: false } },
					},
					{ name: "removeAttrs", params: { attrs: "(fill|stroke)" } },
				],
			},
		}),
	];

	if (command === "serve") {
		plugins.unshift(wasm());
	}

	return {
		plugins,
		worker: {
			plugins: () => [wasm()],
			format: "es",
		},
		optimizeDeps: {
			exclude: ["@ffmpeg/core-mt", "@ffmpeg/ffmpeg", "@ffmpeg/util"],
		},
		css: {
			preprocessorOptions: {
				scss: {
					api: "modern",
				},
			},
		},
		build: {
			target: "esnext",
			rollupOptions: {
				output: {
					manualChunks: (id) => {
						// Code splitting for better performance
						if (id.includes("node_modules")) {
							// Split large libraries
							if (id.includes("@ffmpeg")) {
								return "ffmpeg";
							}
							if (id.includes("@imagemagick")) {
								return "imagemagick";
							}
							if (id.includes("lucide-svelte")) {
								return "icons";
							}
							// Other vendor chunks
							return "vendor";
						}
					},
					assetFileNames: (assetInfo) => {
						// Optimize asset file names
						if (assetInfo.name && /\.(png|jpe?g|svg|gif|webp)$/.test(assetInfo.name)) {
							return "assets/images/[name]-[hash][extname]";
						}
						if (assetInfo.name && /\.(woff2?|eot|ttf|otf)$/.test(assetInfo.name)) {
							return "assets/fonts/[name]-[hash][extname]";
						}
						return "assets/[name]-[hash][extname]";
					},
				},
			},
			chunkSizeWarningLimit: 1000,
			cssCodeSplit: true,
			minify: "terser",
			terserOptions: {
				compress: {
					drop_console: true,
					drop_debugger: true,
				},
			},
		},
		define: {
			__COMMIT_HASH__: JSON.stringify(commitHash),
		},
	};
});
