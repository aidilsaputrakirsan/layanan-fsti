/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
      // Ini akan mengabaikan error ESLint saat build
      ignoreDuringBuilds: true,
    },
  };
  
  module.exports = nextConfig;