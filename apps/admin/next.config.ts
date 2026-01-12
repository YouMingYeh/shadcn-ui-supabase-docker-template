import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@workspace/ui"],
  reactCompiler: true,
  output: "standalone",
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },
};

export default nextConfig;
