"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { ChevronDown, Menu, X, Ticket } from 'lucide-react';
import { menu } from '@/data/situs';

const logo = [
  { src: '/images/logotut.png', alt: 'Tut Wuri Handayani', w: 500, h: 500 },
  { src: '/images/logosaintek.png', alt: 'Diktisaintek Berdampak', w: 834, h: 299 },
  { src: '/images/logoitk.png', alt: 'Institut Teknologi Kalimantan', w: 947, h: 1007 },
  { src: '/images/logofsti.png', alt: 'FSTI ITK', w: 343, h: 123 },
];

const aktif = (pathname: string, href?: string) =>
  !!href && (href === '/' ? pathname === '/' : pathname.startsWith(href));

const Navbar = () => {
  const pathname = usePathname() || '/';
  const [buka, setBuka] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setBuka(null);
    setMobile(false);
  }, [pathname]);

  useEffect(() => {
    const klik = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setBuka(null);
    };
    const esc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setBuka(null);
        setMobile(false);
      }
    };
    document.addEventListener('mousedown', klik);
    document.addEventListener('keydown', esc);
    return () => {
      document.removeEventListener('mousedown', klik);
      document.removeEventListener('keydown', esc);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobile ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobile]);

  return (
    <header className="sticky top-0 z-40 border-b border-garis bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85">
      <div className="wadah flex h-16 items-center gap-3 lg:h-[72px]">
        <Link href="/" className="flex shrink-0 items-center gap-3" aria-label="Beranda Layanan FSTI">
          <span className="flex items-center gap-2 sm:gap-2.5">
            {logo.map((l) => (
              <Image key={l.src} src={l.src} alt={l.alt} width={l.w} height={l.h} className="h-7 w-auto sm:h-9" priority />
            ))}
          </span>
          <span className="hidden border-l border-garis pl-3 leading-tight xl:block">
            <span className="block text-[15px] font-bold text-ink">Layanan FSTI</span>
            <span className="block text-xs text-ink-3">Institut Teknologi Kalimantan</span>
          </span>
        </Link>

        <nav ref={navRef} className="ml-auto hidden items-center gap-1 lg:flex" aria-label="Menu utama">
          {menu.map((m) =>
            m.anak ? (
              <div key={m.label} className="relative">
                <button
                  type="button"
                  aria-expanded={buka === m.label}
                  onClick={() => setBuka(buka === m.label ? null : m.label)}
                  className={`flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
                    m.anak.some((a) => aktif(pathname, a.href)) ? 'text-primary-700' : 'text-ink-2 hover:text-ink'
                  }`}
                >
                  {m.label}
                  <ChevronDown className={`h-4 w-4 transition-transform ${buka === m.label ? 'rotate-180' : ''}`} />
                </button>
                {buka === m.label && (
                  <div className="absolute right-0 top-full mt-2 w-80 animate-muncul rounded-2xl border border-garis bg-white p-2 shadow-angkat">
                    {m.anak.map((a) => (
                      <Link
                        key={a.href}
                        href={a.href}
                        className={`block rounded-xl px-3 py-2.5 transition-colors hover:bg-primary-50 ${
                          aktif(pathname, a.href) ? 'bg-primary-50' : ''
                        }`}
                      >
                        <span className="block text-sm font-semibold text-ink">{a.label}</span>
                        {a.ket && <span className="block text-xs text-ink-3">{a.ket}</span>}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={m.label}
                href={m.href!}
                className={`rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
                  aktif(pathname, m.href) ? 'text-primary-700' : 'text-ink-2 hover:text-ink'
                }`}
              >
                {m.label}
              </Link>
            ),
          )}
        </nav>

        <Link href="/tracking" className="tombol-utama ml-auto hidden sm:inline-flex lg:ml-2">
          <Ticket className="h-4 w-4" />
          Cek Status
        </Link>

        <button
          type="button"
          onClick={() => setMobile((v) => !v)}
          className="ml-auto -mr-2 rounded-lg p-2 text-ink sm:ml-1 lg:hidden"
          aria-label={mobile ? 'Tutup menu' : 'Buka menu'}
          aria-expanded={mobile}
        >
          {mobile ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {mobile && (
        <div className="fixed inset-x-0 bottom-0 top-16 overflow-y-auto border-t border-garis bg-white lg:hidden">
          <div className="wadah space-y-6 py-6">
            <Link href="/tracking" className="tombol-utama w-full py-3 sm:hidden">
              <Ticket className="h-4 w-4" />
              Cek Status Permohonan
            </Link>
            {menu.map((m) =>
              m.anak ? (
                <div key={m.label}>
                  <p className="label-kecil mb-2 text-ink-3">{m.label}</p>
                  <div className="divide-y divide-garis rounded-2xl border border-garis">
                    {m.anak.map((a) => (
                      <Link key={a.href} href={a.href} className="flex items-center justify-between px-4 py-3">
                        <span>
                          <span className={`block font-semibold ${aktif(pathname, a.href) ? 'text-primary-700' : 'text-ink'}`}>
                            {a.label}
                          </span>
                          {a.ket && <span className="block text-sm text-ink-3">{a.ket}</span>}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={m.label}
                  href={m.href!}
                  className={`block text-lg font-bold ${aktif(pathname, m.href) ? 'text-primary-700' : 'text-ink'}`}
                >
                  {m.label}
                </Link>
              ),
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
