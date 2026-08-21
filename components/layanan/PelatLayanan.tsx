'use client';

import { cn } from '@/lib/utils';
import { IKON_LAYANAN } from './ikon';
import BarisTautan from './BarisTautan';
import { ratakan, teks, type Bahasa } from '@/lib/layanan-search';
import type { Layanan } from '@/lib/data/layanan';

interface Props {
  layanan: Layanan;
  /** Kode pelat pada papan, mis. "MHS-02". */
  kode: string;
  bahasa: Bahasa;
  /** Slug yang sedang dituju tautan bagikan, bila ada. */
  slugDisorot?: string | null;
}

/**
 * Satu pelat direktori.
 *
 * Papan direktori memperlihatkan seluruh isinya sekaligus — tidak ada akordeon
 * yang harus dibuka satu per satu. Itu keluhan utama pengguna terhadap versi
 * sebelumnya, dan menyembunyikan baris adalah penyebabnya.
 */
export default function PelatLayanan({ layanan, kode, bahasa, slugDisorot }: Props) {
  const Ikon = IKON_LAYANAN[layanan.ikon];
  const tautan = ratakan([layanan]);
  const punyaKelompok = Boolean(layanan.kelompok?.length);

  return (
    <article
      id={layanan.id}
      className="scroll-mt-28 overflow-hidden rounded-md border border-tinta-200 bg-white shadow-pelat"
    >
      {/* ── Kepala pelat ─────────────────────────────────────────────── */}
      <header className="border-b border-tinta-200 bg-primary-950 px-4 py-4 text-white sm:px-5">
        <div className="flex items-start gap-3.5">
          <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-sm bg-white/10 text-arah-400">
            <Ikon className="h-[18px] w-[18px]" strokeWidth={1.75} />
          </span>

          <div className="min-w-0 flex-1">
            <p className="legenda angka-pelat mb-1 text-arah-400">
              {kode}
              <span className="mx-2 text-white/25">/</span>
              <span className="text-white/60">{teks(layanan.unit, bahasa)}</span>
            </p>
            <h3 className="font-display text-[1.0625rem] font-bold leading-tight tracking-tight text-white sm:text-lg">
              {teks(layanan.title, bahasa)}
            </h3>
            <p className="mt-1.5 max-w-[62ch] text-sm leading-relaxed text-primary-200">
              {teks(layanan.description, bahasa)}
            </p>
          </div>

          <p className="legenda angka-pelat hidden shrink-0 pt-0.5 text-right text-white/50 sm:block">
            {tautan.length}
            <br />
            {bahasa === 'en' ? 'links' : 'tautan'}
          </p>
        </div>
      </header>

      {/* ── Isi pelat ────────────────────────────────────────────────── */}
      {punyaKelompok ? (
        layanan.kelompok!.map((kelompok, i) => {
          const namaSamaDenganInduk =
            kelompok.label.id.toLowerCase() === layanan.title.id.toLowerCase();
          return (
            <section key={kelompok.label.id} className={cn(i > 0 && 'border-t border-tinta-200')}>
              {!namaSamaDenganInduk && (
                <h4 className="legenda border-b border-tinta-100 bg-tinta-50 px-4 py-2 sm:px-5">
                  {teks(kelompok.label, bahasa)}
                </h4>
              )}
              <ul>
                {kelompok.items.map((item) => {
                  const hasil = tautan.find((t) => t.slug === item.slug)!;
                  return (
                    <BarisTautan
                      key={item.slug}
                      hasil={hasil}
                      bahasa={bahasa}
                      disorot={slugDisorot === item.slug}
                    />
                  );
                })}
              </ul>
            </section>
          );
        })
      ) : (
        <ul>
          {tautan.map((hasil) => (
            <BarisTautan
              key={hasil.slug}
              hasil={hasil}
              bahasa={bahasa}
              disorot={slugDisorot === hasil.slug}
            />
          ))}
        </ul>
      )}
    </article>
  );
}
