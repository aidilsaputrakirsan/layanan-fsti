'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { ChevronDown, Menu, X } from 'lucide-react';

import LanguageToggle from '@/components/ui/LanguageToggle';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { cn } from '@/lib/utils';

/**
 * Bilah navigasi dua tingkat.
 *
 * Empat logo institusi wajib tampil, dan menunya ada tujuh. Menjejalkan
 * keduanya ke satu baris membuat logo bertabrakan dengan teks menu — itu cacat
 * yang ada pada versi sebelumnya. Tingkat atas memikul identitas, tingkat bawah
 * memikul navigasi, dan tingkat atas melipat saat digulir agar bilah yang
 * menempel tetap ringkas.
 */

const LOGO = [
  { src: '/images/logotut.png', alt: 'Tut Wuri Handayani', w: 'w-9' },
  { src: '/images/logosaintek.png', alt: 'Diktisaintek Berdampak', w: 'w-16' },
  { src: '/images/logoitk.png', alt: 'Institut Teknologi Kalimantan', w: 'w-9' },
  { src: '/images/logofsti.png', alt: 'FSTI Prestasi', w: 'w-14' },
];

interface Menu {
  href: string;
  kunci: string;
  anak?: { href: string; kunci: string }[];
}

const MENU: Menu[] = [
  { href: '/', kunci: 'nav.home' },
  {
    href: '/tentang-fsti',
    kunci: 'nav.about',
    anak: [
      { href: '/tentang-fsti', kunci: 'nav.aboutFSTI' },
      { href: '/tentang-fsti/tracer-study', kunci: 'nav.tracerStudy' },
    ],
  },
  { href: '/peraturan-kebijakan', kunci: 'nav.regulations' },
  { href: '/layanan-administrasi', kunci: 'nav.adminServices' },
  { href: '/tracking', kunci: 'nav.docTracking' },
  { href: '/survey-kepuasan', kunci: 'nav.survey' },
  { href: '#kontak', kunci: 'nav.contact' },
];

function sedangAktif(pathname: string | null, menu: Menu): boolean {
  if (menu.href === '#kontak') return false;
  if (menu.href === '/') return pathname === '/';
  return Boolean(pathname?.startsWith(menu.href));
}

export default function Navbar() {
  const [menuTerbuka, setMenuTerbuka] = useState(false);
  const [dropdownTerbuka, setDropdownTerbuka] = useState(false);
  const [terlipat, setTerlipat] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);
  const pathname = usePathname();
  const { t } = useLanguage();

  useEffect(() => {
    const gulir = () => setTerlipat(window.scrollY > 24);
    gulir();
    window.addEventListener('scroll', gulir, { passive: true });
    return () => window.removeEventListener('scroll', gulir);
  }, []);

  useEffect(() => {
    setMenuTerbuka(false);
    setDropdownTerbuka(false);
  }, [pathname]);

  useEffect(() => {
    const klikLuar = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownTerbuka(false);
      }
    };
    const tekanEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setDropdownTerbuka(false);
        setMenuTerbuka(false);
      }
    };
    document.addEventListener('mousedown', klikLuar);
    document.addEventListener('keydown', tekanEsc);
    return () => {
      document.removeEventListener('mousedown', klikLuar);
      document.removeEventListener('keydown', tekanEsc);
    };
  }, []);

  // Mengunci guliran latar saat menu layar kecil terbuka.
  useEffect(() => {
    document.body.style.overflow = menuTerbuka ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuTerbuka]);

  return (
    <header className="sticky top-0 z-50 bg-white">
      {/* ── Tingkat 1: identitas institusi ─────────────────────────────── */}
      <div
        className={cn(
          'overflow-hidden border-b border-tinta-100 transition-[height,opacity] duration-300 ease-rambu',
          terlipat ? 'h-0 opacity-0' : 'h-14 opacity-100 sm:h-16'
        )}
      >
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4 sm:h-16 sm:px-6">
          <Link
            href="/"
            aria-label={t('nav.home')}
            className="flex items-center gap-3 sm:gap-5"
          >
            {LOGO.map((l) => (
              <span key={l.src} className={cn('relative block h-7 shrink-0 sm:h-8', l.w)}>
                <Image src={l.src} alt={l.alt} fill className="object-contain" sizes="72px" />
              </span>
            ))}
          </Link>

        </div>
      </div>

      {/* ── Tingkat 2: navigasi ────────────────────────────────────────── */}
      <nav
        aria-label={t('nav.home')}
        className={cn(
          'border-b border-tinta-200 bg-white transition-shadow duration-300',
          terlipat && 'shadow-pelat'
        )}
      >
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
          {/* Jejak institusi yang tetap terlihat setelah tingkat 1 melipat. */}
          <Link
            href="/"
            className={cn(
              'flex shrink-0 items-center gap-2.5 overflow-hidden transition-all duration-300 ease-rambu',
              terlipat ? 'max-w-[14rem] opacity-100' : 'max-w-0 opacity-0'
            )}
          >
            <span className="relative block h-7 w-9 shrink-0">
              <Image
                src="/images/logoitk.png"
                alt=""
                fill
                className="object-contain"
                sizes="36px"
              />
            </span>
            <span className="legenda hidden whitespace-nowrap text-tinta-900 sm:block">
              FSTI ITK
            </span>
          </Link>

          <div className="hidden items-center gap-2 lg:flex">
          <ul className="flex items-center gap-0.5">
            {MENU.map((menu) => {
              const aktif = sedangAktif(pathname, menu);

              if (menu.anak) {
                return (
                  <li key={menu.href} className="relative" ref={dropdownRef}>
                    <button
                      type="button"
                      onClick={() => setDropdownTerbuka((v) => !v)}
                      aria-expanded={dropdownTerbuka}
                      aria-haspopup="true"
                      className={cn(
                        'relative flex h-14 items-center gap-1 px-3 text-sm font-medium transition-colors',
                        aktif ? 'text-primary-700' : 'text-tinta-700 hover:text-primary-700'
                      )}
                    >
                      {t(menu.kunci)}
                      <ChevronDown
                        aria-hidden
                        className={cn(
                          'h-3.5 w-3.5 transition-transform duration-200',
                          dropdownTerbuka && 'rotate-180'
                        )}
                      />
                      {aktif && <PenandaAktif />}
                    </button>

                    {dropdownTerbuka && (
                      <div className="absolute left-0 top-full z-10 w-60 overflow-hidden rounded-md border border-tinta-200 bg-white shadow-angkat">
                        {menu.anak.map((anak, i) => (
                          <Link
                            key={anak.href}
                            href={anak.href}
                            onClick={() => setDropdownTerbuka(false)}
                            className={cn(
                              'block px-4 py-3 text-sm text-tinta-700 transition-colors hover:bg-tinta-50 hover:text-primary-700',
                              i > 0 && 'border-t border-tinta-100',
                              pathname === anak.href && 'bg-primary-50 text-primary-800'
                            )}
                          >
                            {t(anak.kunci)}
                          </Link>
                        ))}
                      </div>
                    )}
                  </li>
                );
              }

              return (
                <li key={menu.href}>
                  <Link
                    href={menu.href}
                    aria-current={aktif ? 'page' : undefined}
                    className={cn(
                      'relative flex h-14 items-center px-3 text-sm font-medium transition-colors',
                      aktif ? 'text-primary-700' : 'text-tinta-700 hover:text-primary-700'
                    )}
                  >
                    {t(menu.kunci)}
                    {aktif && <PenandaAktif />}
                  </Link>
                </li>
              );
            })}
          </ul>

            <span aria-hidden className="mx-1 h-5 w-px bg-tinta-200" />
            <LanguageToggle />
          </div>

          {/* ── Kendali layar kecil ─────────────────────────────────────── */}
          <div className="flex items-center gap-2 lg:hidden">
            <LanguageToggle />
            <button
              type="button"
              onClick={() => setMenuTerbuka((v) => !v)}
              aria-expanded={menuTerbuka}
              aria-label={menuTerbuka ? 'Tutup menu' : 'Buka menu'}
              className="flex h-10 w-10 items-center justify-center rounded-sm text-tinta-900 transition-colors hover:bg-tinta-50"
            >
              {menuTerbuka ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* ── Panel menu layar kecil ─────────────────────────────────────── */}
      {menuTerbuka && (
        <div className="fixed inset-x-0 bottom-0 top-[3.5rem] z-40 overflow-y-auto bg-white lg:hidden">
          <ul className="mx-auto max-w-7xl px-4 py-2 sm:px-6">
            {MENU.map((menu) => {
              const aktif = sedangAktif(pathname, menu);
              return (
                <li key={menu.href} className="border-b border-tinta-100">
                  <Link
                    href={menu.href}
                    onClick={() => setMenuTerbuka(false)}
                    aria-current={aktif ? 'page' : undefined}
                    className={cn(
                      'relative block py-4 pl-4 pr-2 text-base font-medium transition-colors',
                      aktif ? 'text-primary-700' : 'text-tinta-900 hover:text-primary-700'
                    )}
                  >
                    {aktif && (
                      <span
                        aria-hidden
                        className="absolute bottom-2 left-0 top-2 w-[3px] rounded-full bg-arah-400"
                      />
                    )}
                    {t(menu.kunci)}
                  </Link>

                  {menu.anak && (
                    <ul className="pb-2 pl-4">
                      {menu.anak.map((anak) => (
                        <li key={anak.href}>
                          <Link
                            href={anak.href}
                            onClick={() => setMenuTerbuka(false)}
                            className={cn(
                              'block py-2.5 pl-4 text-sm transition-colors',
                              pathname === anak.href
                                ? 'text-primary-700'
                                : 'text-tinta-500 hover:text-primary-700'
                            )}
                          >
                            {t(anak.kunci)}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </header>
  );
}

/** Penanda halaman aktif: pita emas penunjuk arah, sejajar tepi bawah bilah. */
function PenandaAktif() {
  return <span aria-hidden className="absolute inset-x-2 bottom-0 h-[3px] bg-arah-400" />;
}
