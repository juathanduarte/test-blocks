import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react(), tailwindcss()],
	resolve: {
		alias: {
			"@": "/src",
			"@components": "/src/components",
			"@pages": "/src/pages",
			"@assets": "/src/assets",
			"@hooks": "/src/hooks",
			"@contexts": "/src/contexts",
			"@services": "/src/services",
			"@utils": "/src/utils",
			"@models": "/src/models",
			"@enums": "/src/enums",
			"@helpers": "/src/helpers",
		},
	},
});
