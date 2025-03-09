'use client';

import dynamic from 'next/dynamic';

// Import HomePage secara dinamis dengan SSR dimatikan
const HomePage = dynamic(() => import('./HomePage'), {
  ssr: false,
});

export default function ClientWrapper() {
  return <HomePage />;
}