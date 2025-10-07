import type { Config } from "@react-router/dev/config";
import { vercelPreset } from "@vercel/react-router/vite";

export default {
  // Server-side render by default, to enable SPA mode set this to `false`
  ssr: true,
  // Vercel preset for enhanced functionality
  presets: [vercelPreset()],
  // React Router will automatically handle static builds for your app
  prerender: [],
  // React Router will serve your app from this path
  basename: "/",
  // React Router will build your app to this directory
  buildDirectory: "build",
  // React Router dev server port (defaults to 3000)
  dev: {
    port: 3001,
  },
} satisfies Config;
