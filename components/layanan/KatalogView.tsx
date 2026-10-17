"use client";

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { Search, ChevronRight } from 'lucide-react';
import { layanan, lokasiLayanan, pintu, PintuId, TIPE_LABEL, TipeLayanan, ESTIMASI_UMUM, normal, cocokKata } from '@/data/layanan';
import { ikonTipe } from './LayananItem';

const semua = layanan.map((l) => ({ l, lok: lokasiLayanan(l.id) }));

const Chip = ({ on, onClick, children }: { on: boolean; onClick: () => void; children: React.ReactNode }) => (
  <button
    type="button"
    aria-pressed={on}
    onClick={onClick}
    className={`rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors ${
      on ? 'bg-primary-600 text-white' : 'bg-white text-ink-2 ring-1 ring-garis hover:text-primary-700'
    }`}
  >
    {children}
  </button>
);

/** Daftar seluruh layanan dengan filter pintu & tipe. */
const KatalogView = () => {
  const [q, setQ] = useState('');
  const [fPintu, setFPintu] = useState<PintuId | 'semua'>('semua');
  const [fTipe, setFTipe] = useState<TipeLayanan | 'semua'>('semua');

  const hasil = useMemo(() => {
    const kata = normal(q).split(/\s+/).filter(Boolean);
    return semua.filter(({ l, lok }) => {
      if (fPintu !== 'semua' && !lok.some((x) => x.pintu.id === fPintu)) return false;
      if (fTipe !== 'semua' && l.tipe !== fTipe) return false;
      const teks = normal(`${l.nama} ${l.ringkas} ${lok.map((x) => `${x.kelompok.nama} ${x.bagian.nama}`).join(' ')}`);
      return kata.every((k) => cocokKata(teks, k));
    });
  }, [q, fPintu, fTipe]);

  return (
    <section className="wadah relative z-10 -mt-7">
      <div className="kartu p-4 shadow-kartu sm:p-5">
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-3" />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Cari nama layanan…"
            aria-label="Cari layanan"
            className="input h-12 pl-12"
          />
        </div>
        <div className="mt-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            <Chip on={fPintu === 'semua'} onClick={() => setFPintu('semua')}>
              Semua pintu
            </Chip>
            {pintu.map((p) => (
              <Chip key={p.id} on={fPintu === p.id} onClick={() => setFPintu(p.id)}>
                {p.nama}
              </Chip>
            ))}
          </div>
          <label className="flex items-center gap-2 text-sm text-ink-2">
            Tipe
            <select
              value={fTipe}
              onChange={(e) => setFTipe(e.target.value as TipeLayanan | 'semua')}
              className="rounded-lg border border-garis bg-white px-3 py-2 text-sm font-semibold text-ink"
            >
              <option value="semua">Semua tipe</option>
              {(Object.keys(TIPE_LABEL) as TipeLayanan[]).map((t) => (
                <option key={t} value={t}>
                  {TIPE_LABEL[t]}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <p className="mt-6 text-sm text-ink-3">
        Menampilkan <strong className="text-ink">{hasil.length}</strong> dari {semua.length} layanan
      </p>

      <div className="kartu mt-3 overflow-hidden">
        <div className="hidden grid-cols-[1fr_220px_150px_130px_24px] gap-4 border-b border-garis bg-latar/60 px-5 py-3 text-xs font-bold uppercase tracking-wider text-ink-3 md:grid">
          <span>Layanan</span>
          <span>Pintu · kelompok</span>
          <span>Estimasi</span>
          <span>Kelengkapan</span>
          <span />
        </div>
        {hasil.length ? (
          <ul className="divide-y divide-garis">
            {hasil.map(({ l, lok }) => {
              const Ikon = ikonTipe[l.tipe];
              const lengkap = !!(l.persyaratan?.length && l.hasil);
              return (
                <li key={l.id}>
                  <Link
                    href={`/katalog/${l.id}`}
                    className="group grid items-center gap-x-4 gap-y-2 px-5 py-4 transition-colors hover:bg-primary-50/50 md:grid-cols-[1fr_220px_150px_130px_24px]"
                  >
                    <span className="flex min-w-0 items-start gap-3">
                      <Ikon className="mt-0.5 h-5 w-5 shrink-0 text-primary-600" />
                      <span className="min-w-0">
                        <span className="block font-semibold text-ink group-hover:text-primary-700">{l.nama}</span>
                        <span className="block text-xs text-ink-3">{TIPE_LABEL[l.tipe]}</span>
                      </span>
                    </span>
                    <span className="flex flex-wrap gap-1 pl-8 md:pl-0">
                      {[...new Set(lok.map((x) => `${x.pintu.nama.replace('Layanan ', '')} · ${x.kelompok.nama}`))].map((t) => (
                        <span key={t} className="rounded-md bg-latar px-2 py-0.5 text-xs font-semibold text-ink-2">
                          {t}
                        </span>
                      ))}
                    </span>
                    <span className="pl-8 text-sm text-ink-2 md:pl-0">{l.waktu ?? ESTIMASI_UMUM}</span>
                    <span className="pl-8 md:pl-0">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${
                          lengkap ? 'bg-emerald-50 text-emerald-700' : 'bg-sorot-100 text-sorot-700'
                        }`}
                      >
                        {lengkap ? 'Lengkap' : 'Sedang disusun'}
                      </span>
                    </span>
                    <ChevronRight className="hidden h-5 w-5 text-ink-3 group-hover:text-primary-600 md:block" />
                  </Link>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="p-8 text-center text-ink-2">Tidak ada layanan yang cocok dengan filter ini.</p>
        )}
      </div>
    </section>
  );
};

export default KatalogView;
