'use client';

import { useCallback, useEffect, useState } from 'react';
import { ArrowUpRight, Check, Link2 } from 'lucide-react';

import { cn } from '@/lib/utils';
import { LABEL_TUJUAN } from './ikon';
import { penggalSorot, teks, type Bahasa, type Hasil } from '@/lib/layanan-search';

interface Props {
  hasil: Omit<Hasil, 'skor'>;
  bahasa: Bahasa;
  /** Kueri aktif; dipakai untuk menyorot bagian yang cocok. */
  kueri?: string;
  /** Tampilkan jalur kategori. Wajib pada mode pencarian. */
  tampilkanJalur?: boolean;
  /** Baris ini sedang dituju oleh tautan yang dibagikan. */
  disorot?: boolean;
}

function Sorot({ sumber, kueri }: { sumber: string; kueri?: string }) {
  if (!kueri) return <>{sumber}</>;
  return (
    <>
      {penggalSorot(sumber, kueri).map((p, i) =>
        p.cocok ? (
          <mark key={i} className="bg-arah-100 text-tinta-900 rounded-[2px] px-px">
            {p.teks}
          </mark>
        ) : (
          <span key={i}>{p.teks}</span>
        )
      )}
    </>
  );
}

export default function BarisTautan({
  hasil,
  bahasa,
  kueri,
  tampilkanJalur = false,
  disorot = false,
}: Props) {
  const [tersalin, setTersalin] = useState(false);
  const label = teks(hasil.label, bahasa);
  const tujuan = LABEL_TUJUAN[hasil.tujuan][bahasa === 'en' ? 'en' : 'id'];

  useEffect(() => {
    if (!tersalin) return;
    const jeda = setTimeout(() => setTersalin(false), 2200);
    return () => clearTimeout(jeda);
  }, [tersalin]);

  const salinAlamat = useCallback(async () => {
    const alamat = `${window.location.origin}${window.location.pathname}#${hasil.slug}`;
    try {
      await navigator.clipboard.writeText(alamat);
      setTersalin(true);
    } catch {
      // Clipboard ditolak (izin atau konteks non-HTTPS): jatuhkan ke hash saja,
      // agar pengguna tetap bisa menyalin dari bilah alamat peramban.
      window.location.hash = hasil.slug;
    }
  }, [hasil.slug]);

  return (
    <li
      id={hasil.slug}
      className={cn(
        'group relative scroll-mt-32 border-t border-tinta-100 first:border-t-0',
        disorot && 'bg-arah-100/60'
      )}
    >
      {/* Penanda posisi: pita emas penunjuk arah di tepi kiri. */}
      <span
        aria-hidden
        className={cn(
          'absolute left-0 top-0 bottom-0 w-[3px] origin-top bg-arah-400 transition-transform duration-200 ease-rambu',
          disorot ? 'scale-y-100' : 'scale-y-0 group-hover:scale-y-100 group-focus-within:scale-y-100'
        )}
      />

      <div className="flex items-start gap-3 py-3 pl-4 pr-2 sm:pl-5">
        <div className="min-w-0 flex-1">
          {tampilkanJalur && (
            <p className="legenda mb-1 truncate">
              {teks(hasil.layanan.title, bahasa)}
              {hasil.kelompok && (
                <>
                  <span className="mx-1.5 text-tinta-300">/</span>
                  {teks(hasil.kelompok, bahasa)}
                </>
              )}
            </p>
          )}

          <a
            href={hasil.url}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'text-[0.9375rem] font-medium leading-snug text-tinta-900',
              'after:absolute after:inset-0 after:content-[""]',
              'group-hover:text-primary-700'
            )}
          >
            <Sorot sumber={label} kueri={kueri} />
          </a>

          {/* Hampir semua tautan bermuara ke Google Form; mencetaknya di tiap
              baris jadi derau. Yang perlu diberitahukan justru pengecualiannya —
              dokumen, lembar kerja, folder Drive, atau sistem ITK. */}
          {hasil.tujuan !== 'form' && (
            <p className="legenda mt-1.5 normal-case tracking-normal text-tinta-500">
              {bahasa === 'en' ? 'Opens' : 'Membuka'} {tujuan}
            </p>
          )}
        </div>

        <div className="relative z-10 flex shrink-0 items-center gap-0.5 pt-0.5">
          {/* Tombol salin selalu ada agar bisa disentuh, tetapi tenang: kata
              "Tautan" tercetak 57 kali akan jadi derau, bukan bantuan. */}
          <button
            type="button"
            onClick={salinAlamat}
            aria-label={
              bahasa === 'en' ? 'Copy link to this service' : 'Salin tautan ke layanan ini'
            }
            title={bahasa === 'en' ? 'Copy link to this service' : 'Salin tautan ke layanan ini'}
            className={cn(
              'flex h-8 w-8 items-center justify-center rounded transition-colors',
              tersalin
                ? 'text-arah-600'
                : 'text-tinta-300 hover:bg-tinta-50 hover:text-primary-700 group-hover:text-tinta-500'
            )}
          >
            {tersalin ? <Check className="h-4 w-4" /> : <Link2 className="h-4 w-4" />}
          </button>
          <ArrowUpRight
            aria-hidden
            className={cn(
              'mr-1 h-4 w-4 shrink-0 text-arah-500 transition-all duration-200 ease-rambu',
              '-translate-x-1 opacity-0',
              'group-hover:translate-x-0 group-hover:opacity-100',
              'group-focus-within:translate-x-0 group-focus-within:opacity-100'
            )}
          />
        </div>
      </div>

      <span aria-live="polite" className="sr-only">
        {tersalin ? (bahasa === 'en' ? 'Link copied' : 'Tautan tersalin') : ''}
      </span>
    </li>
  );
}
