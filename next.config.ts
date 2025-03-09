import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // This will ignore ESLint errors during build
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;