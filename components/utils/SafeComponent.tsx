'use client';

import React, { ComponentType } from 'react';
import dynamic from 'next/dynamic';
import ClientOnly from './ClientOnly';

// Fungsi untuk membuat versi SSR-safe dari setiap komponen
export function createSafeComponent<T>(Component: ComponentType<T>) {
  // Buat komponen dinamis dengan ssr: false
  const DynamicComponent = dynamic(() => Promise.resolve(Component), { ssr: false });
  
  // Kembalikan pembungkus yang aman untuk digunakan
  const SafeComponent = (props: T & { fallback?: React.ReactNode }) => {
    const { fallback, ...componentProps } = props;
    
    return (
      <ClientOnly fallback={fallback}>
        <DynamicComponent {...componentProps as T} />
      </ClientOnly>
    );
  };
  
  return SafeComponent;
}