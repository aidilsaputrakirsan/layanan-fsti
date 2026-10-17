"use client";

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { Search, X, Ticket, PlayCircle } from 'lucide-react';
import { getPintu, getLayanan, jumlahLayanan, PintuId, Layanan, normal, cocokKata } from '@/data/layanan';
import LayananItem from './LayananItem';


/** Isi halaman pintu: tab kelompok (disinkronkan ke #hash) + pencarian dalam pintu. */
const PintuView = ({ pintuId }: { pintuId: PintuId }) => {
  const p = getPintu(pintuId)!;
  const [aktif, setAktif] = useState(p.kelompok[0].id);
  const [q, setQ] = useState('');

  useEffect(() => {
    const baca = () => {
      const h = window.location.hash.slice(1);
      if (p.kelompok.some((k) => k.id === h)) setAktif(h);
    };
    baca();
    window.addEventListener('hashchange', baca);
    return () => window.removeEventListener('hashchange', baca);
  }, [p]);

  const pilih = (id: string) => {
    setAktif(id);
    setQ('');
    history.replaceState(null, '', `#${id}`);
  };

  const hasilCari = useMemo(() => {
    const kata = normal(q).split(/\s+/).filter(Boolean);
    if (!kata.length) return null;
    const out: { l: Layanan; konteks: string }[] = [];
    const sudah = new Set<string>();
    for (const k of p.kelompok)
      for (const b of k.bagian)
        for (const id of b.layanan) {
          const l = getLayanan(id)!;
          const teks = normal(`${l.nama} ${l.ringkas} ${k.nama} ${b.nama}`);
          if (!sudah.has(id) && kata.every((w) => cocokKata(teks, w))) {
            sudah.add(id);
            out.push({ l, konteks: `${k.nama} · ${b.nama}` });
          }
        }
    return out;
  }, [q, p]);

  const kelompok = p.kelompok.find((k) => k.id === aktif) ?? p.kelompok[0];

  return (
    <section className="wadah relative z-10 -mt-7 grid grid-cols-[minmax(0,1fr)] items-start gap-8 lg:grid-cols-[250px_minmax(0,1fr)]">
      {/* Navigasi kelompok */}
      <aside className="min-w-0 lg:sticky lg:top-24">
        <div className="-mx-4 overflow-x-auto px-4 [scrollbar-width:none] lg:mx-0 lg:overflow-visible lg:px-0 [&::-webkit-scrollbar]:hidden">
          <div role="tablist" aria-label="Kelompok layanan" className="flex gap-2 lg:kartu lg:flex-col lg:gap-0.5 lg:p-2">
            {p.kelompok.map((k) => {
              const on = k.id === kelompok.id && !hasilCari;
              return (
                <button
                  key={k.id}
                  role="tab"
                  aria-selected={on}
                  onClick={() => pilih(k.id)}
                  className={`flex shrink-0 items-center justify-between gap-3 rounded-xl px-4 py-2.5 text-left text-sm font-semibold shadow-kartu transition-colors lg:shadow-none ${
                    on ? 'bg-primary-600 text-white' : 'bg-white text-ink-2 hover:bg-primary-50 hover:text-ink'
                  }`}
                >
                  {k.nama}
                  <span className={`rounded-md px-1.5 text-xs tabular-nums ${on ? 'bg-white/20' : 'bg-latar text-ink-3'}`}>
                    {jumlahLayanan(k)}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-4 hidden space-y-2 lg:block">
          <Link href="/tracking" className="kartu flex items-center gap-3 p-4 text-sm font-semibold hover:border-primary-300">
            <Ticket className="h-5 w-5 text-primary-600" /> Cek status permohonan
          </Link>
          <Link href="/panduan" className="kartu flex items-center gap-3 p-4 text-sm font-semibold hover:border-primary-300">
            <PlayCircle className="h-5 w-5 text-primary-600" /> Panduan & video
          </Link>
        </div>
      </aside>

      <div className="min-w-0">
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-3" />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={`Cari di ${p.nama}…`}
            aria-label={`Cari di ${p.nama}`}
            className="input h-12 pl-12 shadow-kartu"
          />
          {q && (
            <button
              type="button"
              onClick={() => setQ('')}
              aria-label="Hapus pencarian"
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-ink-3 hover:bg-latar"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {hasilCari ? (
          <div className="mt-8">
            <h2 className="text-xl font-extrabold">
              {hasilCari.length} hasil untuk “{q}”
            </h2>
            {hasilCari.length ? (
              <ul className="kartu mt-4 divide-y divide-garis overflow-hidden">
                {hasilCari.map(({ l, konteks }) => (
                  <LayananItem key={l.id} l={l} konteks={konteks} />
                ))}
              </ul>
            ) : (
              <p className="kartu mt-4 p-6 text-ink-2">
                Tidak ditemukan di {p.nama}. Coba kata lain, atau cari di{' '}
                <Link href="/katalog" className="font-semibold text-primary-700 underline">
                  Katalog Layanan
                </Link>
                .
              </p>
            )}
          </div>
        ) : (
          <div className="mt-8" role="tabpanel" aria-label={kelompok.nama}>
            <h2 className="text-2xl font-extrabold">{kelompok.nama}</h2>
            <p className="mt-1 text-ink-2">{kelompok.ringkas}</p>
            <div className="mt-6 space-y-6">
              {kelompok.bagian.map((b) => (
                <div key={b.nama} className="kartu overflow-hidden">
                  <div className="flex items-center justify-between border-b border-garis bg-latar/60 px-5 py-3">
                    <h3 className="text-sm font-bold text-ink">{b.nama}</h3>
                    <span className="text-xs text-ink-3">{b.layanan.length} layanan</span>
                  </div>
                  <ul className="divide-y divide-garis">
                    {b.layanan.map((id) => (
                      <LayananItem key={id} l={getLayanan(id)!} />
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            {p.id === 's2' && (
              <p className="mt-6 rounded-xl bg-primary-50 px-5 py-4 text-sm text-primary-900">
                Layanan akademik S2 lainnya akan ditambahkan secara bertahap. Untuk kebutuhan yang belum tersedia, hubungi
                admin melalui WhatsApp Akademik.
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default PintuView;
