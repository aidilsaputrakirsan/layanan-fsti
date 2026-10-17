import { cache } from 'react';

/**
 * Rekap otomatis untuk Dashboard — mengambil aksi "rekap" (baca-saja, hanya angka total)
 * dari Apps Script mahasiswa & dosen, lalu menggabungkannya per semester.
 * Dipanggil dari halaman ber-ISR (revalidate 1 jam), jadi spreadsheet paling sering dibaca sekali per jam.
 */

export type StatusKey = 'done' | 'progress' | 'waiting' | 'rejected' | 'duplicate' | 'none';
type Jenis = 'mahasiswa' | 'dosen';

interface RekapSemesterGAS {
  total: number;
  status: Record<StatusKey, number>;
  bulan: Record<string, number>;
  prodi: Record<string, number>;
}

export interface RekapSemester {
  id: string; // mis. "2025-ganjil"
  label: string; // mis. "Semester Ganjil 2025/2026"
  total: number;
  perJenis: Record<Jenis, number>;
  status: Record<StatusKey, number>;
  /** urut kronologis: { bulan: "2025-08", mahasiswa, dosen } */
  bulan: { bulan: string; mahasiswa: number; dosen: number }[];
  /** urut terbanyak */
  prodi: { nama: string; mahasiswa: number; dosen: number }[];
}

export interface Rekap {
  semester: RekapSemester[]; // terbaru di depan
  dibuat: number;
  sumber: Jenis[]; // spreadsheet yang berhasil dibaca
}

const STATUS_KOSONG = (): Record<StatusKey, number> => ({ done: 0, progress: 0, waiting: 0, rejected: 0, duplicate: 0, none: 0 });

export const labelSemester = (id: string) => {
  const [th, jenis] = id.split('-');
  const y = Number(th);
  return `Semester ${jenis === 'ganjil' ? 'Ganjil' : 'Genap'} ${y}/${y + 1}`;
};

/** Kunci semester untuk tanggal sekarang (Ganjil: Agu–Jan, Genap: Feb–Jul) */
export function semesterSekarang(d = new Date()) {
  const y = d.getFullYear();
  const m = d.getMonth() + 1;
  return m >= 8 ? `${y}-ganjil` : m === 1 ? `${y - 1}-ganjil` : `${y - 1}-genap`;
}

async function ambilSatu(jenis: Jenis): Promise<{ semester: Record<string, RekapSemesterGAS>; dibuat: number } | null> {
  const url = jenis === 'dosen' ? process.env.TRACKING_GAS_URL_DOSEN : process.env.TRACKING_GAS_URL_MAHASISWA;
  const secret = process.env.TRACKING_API_SECRET;
  if (!url || !secret) return null;
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret, aksi: 'rekap' }),
      redirect: 'follow',
      signal: AbortSignal.timeout(45000),
    });
    const data = await res.json();
    return data.ok && data.semester ? { semester: data.semester, dibuat: data.dibuat } : null;
  } catch {
    return null;
  }
}

export const ambilRekap = cache(async (): Promise<Rekap | null> => {
  const [mhs, dsn] = await Promise.all([ambilSatu('mahasiswa'), ambilSatu('dosen')]);
  const sumber = ([['mahasiswa', mhs], ['dosen', dsn]] as const).filter(([, d]) => d).map(([j]) => j as Jenis);
  if (!sumber.length) return null;

  const gabung = new Map<string, RekapSemester & { _bulan: Map<string, { mahasiswa: number; dosen: number }>; _prodi: Map<string, { mahasiswa: number; dosen: number }> }>();

  for (const [jenis, data] of [['mahasiswa', mhs], ['dosen', dsn]] as const) {
    if (!data) continue;
    for (const [id, s] of Object.entries(data.semester)) {
      let g = gabung.get(id);
      if (!g) {
        g = { id, label: labelSemester(id), total: 0, perJenis: { mahasiswa: 0, dosen: 0 }, status: STATUS_KOSONG(), bulan: [], prodi: [], _bulan: new Map(), _prodi: new Map() };
        gabung.set(id, g);
      }
      g.total += s.total;
      g.perJenis[jenis] += s.total;
      (Object.keys(g.status) as StatusKey[]).forEach((k) => (g!.status[k] += s.status?.[k] || 0));
      for (const [b, n] of Object.entries(s.bulan || {})) {
        const x = g._bulan.get(b) || { mahasiswa: 0, dosen: 0 };
        x[jenis] += n;
        g._bulan.set(b, x);
      }
      for (const [p, n] of Object.entries(s.prodi || {})) {
        const x = g._prodi.get(p) || { mahasiswa: 0, dosen: 0 };
        x[jenis] += n;
        g._prodi.set(p, x);
      }
    }
  }

  const semester = [...gabung.values()]
    .map(({ _bulan, _prodi, ...g }) => ({
      ...g,
      bulan: [..._bulan.entries()].sort(([a], [b]) => a.localeCompare(b)).map(([bulan, v]) => ({ bulan, ...v })),
      prodi: [..._prodi.entries()]
        .map(([nama, v]) => ({ nama, ...v }))
        .sort((a, b) => b.mahasiswa + b.dosen - (a.mahasiswa + a.dosen)),
    }))
    .sort((a, b) => b.id.localeCompare(a.id));

  return { semester, dibuat: Math.min(...[mhs, dsn].filter(Boolean).map((d) => d!.dibuat)), sumber };
});
