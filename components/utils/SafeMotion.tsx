'use client';

import { ReactNode } from 'react';
import { m, MotionProps } from 'framer-motion';
import ClientOnly from './ClientOnly';

export interface SafeMotionProps extends MotionProps {
  children: ReactNode;
  className?: string;
}

export default function SafeMotion({ children, ...props }: SafeMotionProps) {
  return (
    <ClientOnly fallback={<div className={props.className}>{children}</div>}>
      <m {...props}>{children}</m>
    </ClientOnly>
  );
}