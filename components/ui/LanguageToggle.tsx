'use client';

import { useEffect, useRef, useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';

import { useLanguage, type Language } from '@/lib/i18n/LanguageContext';
import { cn } from '@/lib/utils';

/**
 * Pemilih bahasa.
 *
 * Bendera digambar sebagai SVG, bukan emoji: emoji bendera tidak dirender sama
 * sekali di Windows.
 */

const BenderaID = () => (
  <svg viewBox="0 0 640 480" aria-hidden className="h-3.5 w-5 shrink-0 rounded-[2px]">
    <path fill="#e70011" d="M0 0h640v240H0z" />
    <path fill="#fff" d="M0 240h640v240H0z" />
  </svg>
);

const BenderaEN = () => (
  <svg viewBox="0 0 60 30" aria-hidden className="h-3.5 w-5 shrink-0 rounded-[2px]">
    <rect width="60" height="30" fill="#bf0a30" />
    <rect y="2.31" width="60" height="2.31" fill="#fff" />
    <rect y="6.92" width="60" height="2.31" fill="#fff" />
    <rect y="11.54" width="60" height="2.31" fill="#fff" />
    <rect y="16.15" width="60" height="2.31" fill="#fff" />
    <rect y="20.77" width="60" height="2.31" fill="#fff" />
    <rect y="25.38" width="60" height="2.31" fill="#fff" />
    <rect width="24" height="16.15" fill="#002868" />
  </svg>
);

const BAHASA: { kode: Language; ringkas: string; nama: string; Bendera: () => React.ReactElement }[] =
  [
    { kode: 'id', ringkas: 'ID', nama: 'Bahasa Indonesia', Bendera: BenderaID },
    { kode: 'en', ringkas: 'EN', nama: 'English', Bendera: BenderaEN },
  ];

export default function LanguageToggle() {
  const { language, setLanguage, t } = useLanguage();
  const [terbuka, setTerbuka] = useState(false);
  const bungkusRef = useRef<HTMLDivElement>(null);

  const aktif = BAHASA.find((b) => b.kode === language) ?? BAHASA[0];

  useEffect(() => {
    const klikLuar = (e: MouseEvent) => {
      if (bungkusRef.current && !bungkusRef.current.contains(e.target as Node)) {
        setTerbuka(false);
      }
    };
    const tekanEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setTerbuka(false);
    };
    document.addEventListener('mousedown', klikLuar);
    document.addEventListener('keydown', tekanEsc);
    return () => {
      document.removeEventListener('mousedown', klikLuar);
      document.removeEventListener('keydown', tekanEsc);
    };
  }, []);

  return (
    <div className="relative" ref={bungkusRef}>
      <button
        type="button"
        onClick={() => setTerbuka((v) => !v)}
        aria-expanded={terbuka}
        aria-haspopup="menu"
        aria-label={t('nav.language')}
        className={cn(
          'flex h-9 items-center gap-2 rounded-sm border px-2.5 transition-colors',
          terbuka
            ? 'border-tinta-300 bg-tinta-50 text-tinta-900'
            : 'border-tinta-200 text-tinta-700 hover:border-tinta-300 hover:bg-tinta-50'
        )}
      >
        <aktif.Bendera />
        <span className="legenda">{aktif.ringkas}</span>
        <ChevronDown
          aria-hidden
          className={cn(
            'h-3.5 w-3.5 text-tinta-300 transition-transform duration-200',
            terbuka && 'rotate-180'
          )}
        />
      </button>

      {terbuka && (
        <div
          role="menu"
          className="absolute right-0 top-full z-50 mt-1.5 w-52 overflow-hidden rounded-md border border-tinta-200 bg-white shadow-angkat"
        >
          {BAHASA.map(({ kode, nama, Bendera }, i) => {
            const dipilih = kode === language;
            return (
              <button
                key={kode}
                type="button"
                role="menuitemradio"
                aria-checked={dipilih}
                onClick={() => {
                  setLanguage(kode);
                  setTerbuka(false);
                }}
                className={cn(
                  'flex w-full items-center gap-3 px-3.5 py-2.5 text-left text-sm transition-colors',
                  i > 0 && 'border-t border-tinta-100',
                  dipilih
                    ? 'bg-primary-50 font-medium text-primary-800'
                    : 'text-tinta-700 hover:bg-tinta-50 hover:text-tinta-900'
                )}
              >
                <Bendera />
                <span className="flex-1">{nama}</span>
                {dipilih && <Check aria-hidden className="h-4 w-4 shrink-0 text-arah-600" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
