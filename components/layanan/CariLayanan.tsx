"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useId, useRef, useState } from 'react';
import { Search, ArrowUpRight, CornerDownLeft } from 'lucide-react';
import { cariLayanan } from '@/data/layanan';
import { aksiTipe } from './LayananItem';

const saran = ['aktif studi', 'legalisasi', 'sidang TA', 'kerja praktik', 'UKT', 'surat tugas'];

/** Kotak pencarian layanan dengan hasil instan. */
const CariLayanan = ({ gelap = false }: { gelap?: boolean }) => {
  const [q, setQ] = useState('');
  const [fokus, setFokus] = useState(false);
  const [pilih, setPilih] = useState(0);
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);
  const idList = useId();
  const hasil = cariLayanan(q, 7);
  const tampil = fokus && q.trim().length > 0;

  useEffect(() => setPilih(0), [q]);

  useEffect(() => {
    const klik = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setFokus(false);
    };
    document.addEventListener('mousedown', klik);
    return () => document.removeEventListener('mousedown', klik);
  }, []);

  const onKey = (e: React.KeyboardEvent) => {
    if (!hasil.length) return;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setPilih((p) => (p + 1) % hasil.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setPilih((p) => (p - 1 + hasil.length) % hasil.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      router.push(`/katalog/${hasil[pilih].l.id}`);
    } else if (e.key === 'Escape') {
      setFokus(false);
    }
  };

  return (
    <div ref={ref} className="relative">
      <label htmlFor={`${idList}-q`} className="sr-only">
        Cari layanan
      </label>
      <div className="relative">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-3" />
        <input
          id={`${idList}-q`}
          type="search"
          autoComplete="off"
          placeholder="Cari layanan, mis. “surat aktif studi”"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onFocus={() => setFokus(true)}
          onKeyDown={onKey}
          role="combobox"
          aria-expanded={tampil}
          aria-controls={`${idList}-list`}
          className="h-14 w-full rounded-2xl border border-transparent bg-white pl-12 pr-4 text-base text-ink shadow-angkat placeholder:text-ink-3 focus:border-primary-300 focus:outline-none focus:ring-4 focus:ring-primary-300/40"
        />

      {tampil && (
        <div
          id={`${idList}-list`}
          role="listbox"
          className="absolute inset-x-0 top-full z-30 mt-2 animate-muncul overflow-hidden rounded-2xl border border-garis bg-white text-left shadow-angkat"
        >
          {hasil.length ? (
            <ul className="max-h-[60vh] overflow-y-auto py-1.5">
              {hasil.map(({ l, lok }, i) => (
                <li key={l.id} role="option" aria-selected={i === pilih}>
                  <div
                    onMouseEnter={() => setPilih(i)}
                    className={`flex items-center gap-3 px-4 py-2.5 ${i === pilih ? 'bg-primary-50' : ''}`}
                  >
                    <Link href={`/katalog/${l.id}`} className="min-w-0 flex-1">
                      <span className="block truncate font-semibold text-ink">{l.nama}</span>
                      <span className="block truncate text-xs text-ink-3">
                        {[...new Set(lok.map((x) => `${x.pintu.nama} · ${x.kelompok.nama}`))].join('  /  ')}
                      </span>
                    </Link>
                    {i === pilih && <CornerDownLeft className="hidden h-4 w-4 text-ink-3 sm:block" aria-hidden />}
                    <a
                      href={l.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="tombol-garis shrink-0 px-3 py-1.5 text-xs"
                    >
                      {aksiTipe[l.tipe]}
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-4 py-5 text-sm text-ink-2">
              Tidak ada layanan yang cocok dengan “{q}”. Coba kata lain atau lihat{' '}
              <Link href="/katalog" className="font-semibold text-primary-700 underline">
                Katalog Layanan
              </Link>
              .
            </div>
          )}
        </div>
      )}
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
        <span className={gelap ? 'text-primary-100' : 'text-ink-3'}>Sering dicari:</span>
        {saran.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => {
              setQ(s);
              setFokus(true);
            }}
            className={`rounded-full px-3 py-1 transition-colors ${
              gelap ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-white text-ink-2 ring-1 ring-garis hover:text-primary-700'
            }`}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CariLayanan;
