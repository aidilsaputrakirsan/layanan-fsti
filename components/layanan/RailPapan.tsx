'use client';

import { useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/utils';
import { ratakan, teks, type Bahasa } from '@/lib/layanan-search';
import type { Layanan } from '@/lib/data/layanan';

interface Props {
  daftar: { layanan: Layanan; kode: string }[];
  bahasa: Bahasa;
}

/**
 * Legenda papan yang menetap di tepi kiri.
 *
 * Ini satu momen gerak yang diarahkan pada halaman ini: penanda emas
 * "Anda di sini" meluncur turun mengikuti pelat yang sedang dibaca, persis
 * seperti penunjuk posisi pada papan direktori gedung.
 */
export default function RailPapan({ daftar, bahasa }: Props) {
  const [aktif, setAktif] = useState<string | null>(daftar[0]?.layanan.id ?? null);
  const daftarRef = useRef(daftar);
  daftarRef.current = daftar;

  useEffect(() => {
    const target = daftarRef.current
      .map((d) => document.getElementById(d.layanan.id))
      .filter((el): el is HTMLElement => el !== null);
    if (target.length === 0) return;

    // Ambang atas dipasang tepat di bawah bilah navigasi yang menempel,
    // sehingga pelat dianggap "sedang dibaca" saat kepalanya menyentuh sana.
    const pengamat = new IntersectionObserver(
      (entri) => {
        const terlihat = entri
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (terlihat[0]) setAktif(terlihat[0].target.id);
      },
      { rootMargin: '-120px 0px -55% 0px', threshold: 0 }
    );

    target.forEach((el) => pengamat.observe(el));
    return () => pengamat.disconnect();
  }, [daftar]);

  return (
    <nav aria-label={bahasa === 'en' ? 'Board legend' : 'Legenda papan'} className="sticky top-24">
      <p className="legenda mb-3 border-b border-tinta-200 pb-2">
        {bahasa === 'en' ? 'On this board' : 'Isi papan ini'}
      </p>
      <ul className="max-h-[calc(100vh-11rem)] space-y-px overflow-y-auto pr-1">
        {daftar.map(({ layanan, kode }) => {
          const jumlah = ratakan([layanan]).length;
          const sedangAktif = aktif === layanan.id;
          return (
            <li key={layanan.id}>
              <a
                href={`#${layanan.id}`}
                aria-current={sedangAktif ? 'true' : undefined}
                className={cn(
                  'group relative flex items-baseline gap-2.5 rounded-sm py-1.5 pl-3 pr-2 text-[0.8125rem] leading-snug transition-colors',
                  sedangAktif
                    ? 'bg-primary-50 text-primary-800'
                    : 'text-tinta-500 hover:bg-tinta-50 hover:text-tinta-900'
                )}
              >
                <span
                  aria-hidden
                  className={cn(
                    'absolute bottom-1 left-0 top-1 w-[3px] rounded-full transition-all duration-300 ease-rambu',
                    sedangAktif ? 'bg-arah-400 opacity-100' : 'bg-tinta-200 opacity-0'
                  )}
                />
                <span className="legenda angka-pelat shrink-0 tracking-wider text-tinta-300 group-hover:text-tinta-500">
                  {kode}
                </span>
                <span className="min-w-0 flex-1">{teks(layanan.title, bahasa)}</span>
                <span className="angka-pelat shrink-0 text-[0.6875rem] text-tinta-300">
                  {jumlah}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
