'use client';

import { useEffect, useState } from 'react';
import { Users } from 'lucide-react';

type Kunjungan = { total: number; bulanIni: number; hariIni: number };
type Status = 'memuat' | 'siap' | 'gagal';

const KUNCI_SESI = 'fsti-kunjungan-tercatat';
const angka = new Intl.NumberFormat('id-ID');
const namaBulan = new Intl.DateTimeFormat('id-ID', { month: 'long', timeZone: 'Asia/Makassar' }).format(new Date());

/** Statistik pengunjung di footer; satu kunjungan dihitung sekali per sesi browser. Tersembunyi bila gagal. */
export default function PenghitungKunjungan() {
  const [data, setData] = useState<Kunjungan | null>(null);
  const [status, setStatus] = useState<Status>('memuat');

  useEffect(() => {
    let sudahTercatat = false;
    try {
      sudahTercatat = sessionStorage.getItem(KUNCI_SESI) === '1';
    } catch {}

    fetch('/api/kunjungan', { method: sudahTercatat ? 'GET' : 'POST' })
      .then((res) => res.json())
      .then((json) => {
        if (!json.ok) return setStatus('gagal');
        setData({ total: json.total, bulanIni: json.bulanIni, hariIni: json.hariIni });
        setStatus('siap');
        try {
          sessionStorage.setItem(KUNCI_SESI, '1');
        } catch {}
      })
      .catch(() => setStatus('gagal'));
  }, []);

  if (status === 'gagal') return null;

  const kolom = [
    { label: 'Hari ini', nilai: data?.hariIni },
    { label: namaBulan, nilai: data?.bulanIni },
    { label: 'Total', nilai: data?.total },
  ];

  return (
    <div className="mt-6 max-w-sm rounded-xl border border-white/10 bg-white/5 p-4">
      <p className="label-kecil flex items-center gap-2 text-primary-300">
        <Users className="h-3.5 w-3.5" />
        Pengunjung situs
        <span className="relative ml-auto flex h-2 w-2" aria-hidden>
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
        </span>
      </p>
      <dl className="mt-3 grid grid-cols-3 divide-x divide-white/10">
        {kolom.map((k) => (
          <div key={k.label} className="px-3 first:pl-0 last:pr-0">
            <dt className="text-xs capitalize text-primary-300">{k.label}</dt>
            <dd className="mt-0.5 text-lg font-bold tabular-nums text-white">
              {k.nilai === undefined ? (
                <span className="inline-block h-5 w-12 animate-pulse rounded bg-white/10 align-middle" />
              ) : (
                angka.format(k.nilai)
              )}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
