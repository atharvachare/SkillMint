import { defineConfig as defineVercelConfig } from "vite";
import react from "@vitejs/plugin-react";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig as defineLovableConfig } from "@lovable.dev/vite-tanstack-config";

// Detect if we are building on Vercel
const isVercel = !!process.env.VERCEL || !!process.env.NOW_BUILDER;

export default isVercel
  ? defineVercelConfig({
      plugins: [
        tsconfigPaths(),
        tanstackStart(),
        react(),
      ],
    })
  : defineLovableConfig({
      tanstackStart: {
        server: { entry: "server" },
      },
    });


