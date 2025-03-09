import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  eslint: {
    // This will ignore ESLint errors during build
    ignoreDuringBuilds: true,
  },
  // Tambahan untuk membantu dengan framer-motion
  transpilePackages: ['framer-motion'],
};
export default nextConfig;