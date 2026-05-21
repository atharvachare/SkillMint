// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Detect if we are building on Vercel
const isVercel = !!process.env.VERCEL || !!process.env.NOW_BUILDER;

// Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper)
// only when we are not building on Vercel. Vercel expects the default Node.js entry point.
export default defineConfig({
  tanstackStart: {
    server: isVercel ? undefined : { entry: "server" },
  },
});

