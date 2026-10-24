"use client";

import { useId, useState } from 'react';
import { Search, Eye, Download, X } from 'lucide-react';
import { jenisSop, daftarSop, sopUrl, type JenisSop, type Sop } from '@/data/sop';
import { normal, cocokKata } from '@/data/layanan';

const labelJenis = Object.fromEntries(jenisSop.map((j) => [j.id, j.label])) as Record<JenisSop, string>;

/** Daftar SOP per jenis (tab) dengan pencarian lintas jenis. */
const SopDaftar = () => {
  const [aktif, setAktif] = useState<JenisSop>('akademik');
  const [q, setQ] = useState('');
  const idQ = useId();

  const kata = normal(q).split(/\s+/).filter(Boolean);
  const mencari = kata.length > 0;
  const hasil: { jenis: JenisSop; s: Sop }[] = mencari
    ? jenisSop.flatMap(({ id }) =>
        daftarSop[id]
          .filter((s) => kata.every((k) => cocokKata(normal(`${s.nomor} ${s.judul}`), k)))
          .map((s) => ({ jenis: id, s })),
      )
    : daftarSop[aktif].map((s) => ({ jenis: aktif, s }));

  return (
    <div className="mt-8">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div role="tablist" aria-label="Jenis SOP" className="flex gap-1 overflow-x-auto rounded-2xl border border-garis bg-white p-1">
          {jenisSop.map(({ id, label }) => {
            const on = !mencari && id === aktif;
            return (
              <button
                key={id}
                role="tab"
                aria-selected={on}
                onClick={() => {
                  setAktif(id);
                  setQ('');
                }}
                className={`flex shrink-0 items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-colors ${
                  on ? 'bg-primary-600 text-white' : 'text-ink-2 hover:bg-latar hover:text-ink'
                }`}
              >
                {label}
                <span className={`rounded-full px-1.5 text-xs tabular-nums ${on ? 'bg-white/20' : 'bg-latar text-ink-3'}`}>
                  {daftarSop[id].length}
                </span>
              </button>
            );
          })}
        </div>

        <div className="relative lg:w-80">
          <label htmlFor={idQ} className="sr-only">
            Cari SOP
          </label>
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-3" />
          <input
            id={idQ}
            type="search"
            autoComplete="off"
            placeholder="Cari SOP, mis. “cuti” atau “UKT”"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="input py-2.5 pl-10 pr-9 text-sm"
          />
          {mencari && (
            <button
              onClick={() => setQ('')}
              aria-label="Hapus pencarian"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-md p-1 text-ink-3 hover:text-ink"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      <p className="mt-4 text-sm text-ink-3" aria-live="polite">
        {mencari
          ? `${hasil.length} SOP cocok dengan “${q.trim()}” di semua jenis`
          : jenisSop.find((j) => j.id === aktif)?.ket}
      </p>

      {hasil.length ? (
        <ul role={mencari ? undefined : 'tabpanel'} className="kartu mt-3 divide-y divide-garis overflow-hidden">
          {hasil.map(({ jenis, s }) => {
            const url = sopUrl(jenis, s);
            return (
              <li key={`${jenis}-${s.nomor}`} className="flex items-center gap-3 px-4 py-3 sm:gap-4 sm:px-5">
                <span className="w-12 shrink-0 text-center text-xs font-bold tabular-nums text-primary-600">
                  <span className="block text-[10px] font-semibold text-ink-3">No.</span>
                  {s.nomor}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold leading-snug">{s.judul}</p>
                  <p className="text-xs text-ink-3">
                    {mencari && `${labelJenis[jenis]} · `}
                    {s.halaman} halaman · PDF
                  </p>
                </div>
                <a href={url} target="_blank" rel="noopener noreferrer" className="tombol-garis shrink-0 px-3 py-2" aria-label={`Lihat SOP ${s.judul}`}>
                  <Eye className="h-4 w-4" /> <span className="hidden sm:inline">Lihat</span>
                </a>
                <a href={url} download className="tombol-garis shrink-0 px-3 py-2" aria-label={`Unduh SOP ${s.judul}`}>
                  <Download className="h-4 w-4" /> <span className="hidden sm:inline">Unduh</span>
                </a>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="kartu mt-3 px-5 py-10 text-center text-sm text-ink-2">
          Tidak ada SOP yang cocok. Coba kata kunci lain, mis. “frs”, “sidang”, atau “dosen”.
        </p>
      )}
    </div>
  );
};

export default SopDaftar;
