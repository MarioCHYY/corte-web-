import type { NextConfig } from "next";

// Sitio 100% estático: `npm run build` genera la carpeta out/ lista para subir
// a cualquier hosting (Vercel, Netlify, Cloudflare Pages, GitHub Pages...).
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
