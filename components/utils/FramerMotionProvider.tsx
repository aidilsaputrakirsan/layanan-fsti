'use client';

import { useEffect, useState, ReactNode } from 'react';
import { LazyMotion, domAnimation } from 'framer-motion';

interface FramerMotionProviderProps {
  children: ReactNode;
}

export function FramerMotionProvider({ children }: FramerMotionProviderProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}