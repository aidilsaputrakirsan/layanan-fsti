'use client';

import dynamic from 'next/dynamic';

// Import HomePage dinamis dengan SSR dinonaktifkan
// Perubahan: Perbaikan path import yang benar
const HomePage = dynamic(() => import('@/components/HomePage'), {
  ssr: false,
});

export default function ClientWrapper() {
  return <HomePage />;
}