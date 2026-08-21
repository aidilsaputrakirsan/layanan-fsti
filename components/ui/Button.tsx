import React from 'react';
import Link from 'next/link';

import { cn } from '@/lib/utils';

/**
 * Tombol dalam bahasa sistem rambu: sudut kecil, bidang padat, tanpa gradasi
 * dan tanpa efek melar saat disentuh. Ini permukaan layanan publik — tombolnya
 * harus terbaca sebagai tombol, bukan sebagai animasi.
 */

type Varian = 'primary' | 'secondary' | 'outline' | 'white';
type Ukuran = 'sm' | 'md' | 'lg';

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: Varian;
  size?: Ukuran;
  className?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
  /** Dipertahankan demi kecocokan dengan pemanggil lama; tidak lagi berefek. */
  animate?: boolean;
}

const VARIAN: Record<Varian, string> = {
  primary: 'bg-primary-600 text-white hover:bg-primary-700',
  secondary: 'bg-primary-950 text-white hover:bg-primary-900',
  outline:
    'border border-tinta-200 bg-white text-tinta-900 hover:border-tinta-300 hover:bg-tinta-50',
  white: 'bg-white text-primary-700 hover:bg-tinta-50',
};

const UKURAN: Record<Ukuran, string> = {
  sm: 'h-9 gap-1.5 px-3.5 text-sm',
  md: 'h-11 gap-2 px-5 text-sm',
  lg: 'h-12 gap-2 px-6 text-base',
};

export default function Button({
  children,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  icon,
  disabled = false,
  onClick,
  type = 'button',
  fullWidth = false,
}: ButtonProps) {
  const kelas = cn(
    'inline-flex items-center justify-center rounded-sm font-medium transition-colors',
    VARIAN[variant],
    UKURAN[size],
    disabled && 'pointer-events-none opacity-50',
    fullWidth && 'w-full',
    className
  );

  const isi = (
    <>
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={kelas}>
        {isi}
      </Link>
    );
  }

  return (
    <button type={type} className={kelas} onClick={onClick} disabled={disabled}>
      {isi}
    </button>
  );
}
