import type { NextConfig } from "next";

// Site estático: o build gera `out/`, publicado no GitHub Pages pelo workflow.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
