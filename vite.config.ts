import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tailwindcss from "@tailwindcss/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ command }) => ({
  plugins: [
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    tailwindcss(),
    // tanstackStart must be registered before the React plugin.
    tanstackStart({
      // Route TanStack Start's server entry through src/server.ts, which wraps
      // SSR failures in a branded error page instead of a raw JSON 500.
      server: { entry: "server" },
      importProtection: {
        behavior: "error",
        client: { files: ["**/server/**"], specifiers: ["server-only"] },
      },
    }),
    viteReact(),
    // Build only. No preset is pinned, so nitro detects the host it is building
    // for (Vercel, Netlify, Cloudflare) and falls back to a Node server.
    ...(command === "build" ? [nitro()] : []),
  ],
  resolve: {
    // A duplicate copy of React breaks hooks; a duplicate router breaks context.
    dedupe: ["react", "react-dom", "@tanstack/react-router", "@tanstack/react-query"],
  },
  server: { port: 5173 },
}));
