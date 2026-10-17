import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['framer-motion'],
  async redirects() {
    return [
      // URL lama yang mungkin sudah tersebar di grup/WA
      { source: '/layanan-administrasi', destination: '/layanan', permanent: true },
      { source: '/tracking/mahasiswa', destination: '/tracking?jenis=mahasiswa', permanent: true },
      { source: '/tracking/dosen', destination: '/tracking?jenis=dosen', permanent: true },
    ];
  },
};

export default nextConfig;
