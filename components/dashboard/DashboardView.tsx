"use client";

import { useState } from 'react';
import { CalendarClock, AlertTriangle, Hourglass } from 'lucide-react';
import type { Rekap, StatusKey } from '@/lib/rekap';
import { kepuasan } from '@/data/dashboard';
import { kontak, waLink } from '@/data/situs';

const angka = (n: number) => n.toLocaleString('id-ID');
const persen = (n: number, dari: number) => (dari ? Math.round((n / dari) * 100) : 0);
const namaBulan = (b: string) => new Date(`${b}-01T00:00:00`).toLocaleDateString('id-ID', { month: 'short' });

const STATUS: { k: StatusKey; nama: string; warna: string }[] = [
  { k: 'done', nama: 'Selesai', warna: 'bg-primary-600' },
  { k: 'progress', nama: 'Diproses', warna: 'bg-primary-300' },
  { k: 'waiting', nama: 'Menunggu verifikasi', warna: 'bg-sorot-400' },
  { k: 'rejected', nama: 'Ditolak / perlu perbaikan', warna: 'bg-rose-400' },
  { k: 'duplicate', nama: 'Pengajuan ganda', warna: 'bg-ink-3' },
  { k: 'none', nama: 'Tanpa kolom status', warna: 'bg-garis' },
];

const WARNA_JENIS = { mahasiswa: 'bg-primary-600', dosen: 'bg-sorot-400' };

const Panel = ({ judul, ket, children }: { judul: string; ket?: React.ReactNode; children: React.ReactNode }) => (
  <section className="kartu p-5 sm:p-6">
    <div className="mb-5 flex flex-wrap items-baseline justify-between gap-2">
      <h2 className="text-base font-bold">{judul}</h2>
      {ket && <span className="text-xs text-ink-3">{ket}</span>}
    </div>
    {children}
  </section>
);

const LegendaJenis = () => (
  <span className="flex items-center gap-3">
    {(['mahasiswa', 'dosen'] as const).map((j) => (
      <span key={j} className="flex items-center gap-1.5 capitalize">
        <span className={`h-2.5 w-2.5 rounded-sm ${WARNA_JENIS[j]}`} />
        {j}
      </span>
    ))}
  </span>
);

const DashboardView = ({ rekap, semesterKini }: { rekap: Rekap | null; semesterKini: string }) => {
  const [id, setId] = useState(rekap?.semester[0]?.id ?? '');

  if (!rekap || !rekap.semester.length) {
    return (
      <div className="wadah relative z-10 -mt-7">
        <div className="kartu flex gap-3 p-6 shadow-kartu">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-sorot-500" />
          <p className="text-sm text-ink-2">
            Data rekap sedang tidak dapat dimuat. Silakan coba beberapa saat lagi, atau hubungi admin melalui{' '}
            <a href={waLink(kontak.whatsapp[0])} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary-700 underline">
              WhatsApp {kontak.whatsapp[0].label}
            </a>
            .
          </p>
        </div>
      </div>
    );
  }

  const s = rekap.semester.find((x) => x.id === id) ?? rekap.semester[0];
  const ikm = kepuasan[s.id];
  const berjalan = s.status.waiting + s.status.progress;
  const kini = s.id === semesterKini;
  const maksBulan = Math.max(1, ...s.bulan.map((b) => b.mahasiswa + b.dosen));
  const maksProdi = Math.max(1, ...s.prodi.map((p) => p.mahasiswa + p.dosen));
  const diperbarui = new Date(rekap.dibuat).toLocaleString('id-ID', {
    day: 'numeric',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Asia/Makassar',
  });

  return (
    <div className="wadah relative z-10 -mt-7 space-y-5">
      {/* Periode */}
      <div className="kartu flex flex-col gap-3 p-4 shadow-kartu sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <label className="flex flex-wrap items-center gap-3 text-sm font-semibold">
          Periode
          <select
            value={s.id}
            onChange={(e) => setId(e.target.value)}
            className="rounded-lg border border-garis bg-white px-3 py-2 text-sm font-semibold text-ink"
          >
            {rekap.semester.map((x) => (
              <option key={x.id} value={x.id}>
                {x.label}
                {x.id === semesterKini ? ' (berjalan)' : ''}
              </option>
            ))}
          </select>
        </label>
        <p className="flex items-center gap-2 text-sm text-ink-3">
          <CalendarClock className="h-4 w-4" /> Diperbarui otomatis · {diperbarui} WITA
        </p>
      </div>

      {rekap.sumber.length < 2 && (
        <p className="flex items-start gap-3 rounded-2xl border border-sorot-300 bg-sorot-100 px-5 py-3.5 text-sm text-sorot-700">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          Saat ini hanya data {rekap.sumber[0]} yang berhasil dimuat; angka belum mencakup semua layanan.
        </p>
      )}

      {/* KPI */}
      <dl className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <div className="kartu p-5">
          <dt className="text-sm text-ink-3">Total permohonan</dt>
          <dd className="mt-2 text-3xl font-extrabold tabular-nums sm:text-[2.1rem]">{angka(s.total)}</dd>
          <dd className="mt-1 text-xs text-ink-3">
            {angka(s.perJenis.mahasiswa)} mahasiswa · {angka(s.perJenis.dosen)} dosen
          </dd>
        </div>
        <div className="kartu p-5">
          <dt className="text-sm text-ink-3">Selesai</dt>
          <dd className="mt-2 text-3xl font-extrabold tabular-nums sm:text-[2.1rem]">{persen(s.status.done, s.total - s.status.none)}%</dd>
          <dd className="mt-1 text-xs text-ink-3">{angka(s.status.done)} permohonan berstatus selesai</dd>
        </div>
        <div className="kartu p-5">
          <dt className="text-sm text-ink-3">{kini ? 'Antrean saat ini' : 'Belum selesai'}</dt>
          <dd className="mt-2 text-3xl font-extrabold tabular-nums sm:text-[2.1rem]">{angka(berjalan)}</dd>
          <dd className="mt-1 text-xs text-ink-3">
            {angka(s.status.waiting)} menunggu · {angka(s.status.progress)} diproses
          </dd>
        </div>
        <div className="kartu p-5">
          <dt className="text-sm text-ink-3">Indeks kepuasan</dt>
          {ikm ? (
            <>
              <dd className="mt-2 text-3xl font-extrabold tabular-nums sm:text-[2.1rem]">{ikm.ikm.toLocaleString('id-ID')}</dd>
              <dd className="mt-1 text-xs text-ink-3">skala 100 · {angka(ikm.responden)} responden</dd>
            </>
          ) : (
            <>
              <dd className="mt-3 text-lg font-bold text-ink-3">Belum tersedia</dd>
              <dd className="mt-1 text-xs text-ink-3">dari survei kepuasan, diisi admin per semester</dd>
            </>
          )}
        </div>
      </dl>

      {/* Antrean */}
      {kini && berjalan > 0 && (
        <div className="flex items-start gap-3 rounded-2xl bg-primary-950 px-5 py-4 text-sm text-primary-100">
          <Hourglass className="mt-0.5 h-4 w-4 shrink-0 text-sorot-400" />
          <p>
            Ada <strong className="text-white">{angka(s.status.waiting)}</strong> permohonan menunggu verifikasi dan{' '}
            <strong className="text-white">{angka(s.status.progress)}</strong> sedang diproses di semester ini. Cek status
            permohonan Anda di menu Cek Status.
          </p>
        </div>
      )}

      {/* Status */}
      <Panel judul="Status permohonan" ket={`${angka(s.total)} permohonan`}>
        <div className="flex h-4 overflow-hidden rounded-full bg-latar" role="img" aria-label="Komposisi status permohonan">
          {STATUS.map((x) =>
            s.status[x.k] ? <span key={x.k} className={`${x.warna} h-full`} style={{ width: `${(s.status[x.k] / s.total) * 100}%` }} /> : null,
          )}
        </div>
        <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {STATUS.filter((x) => s.status[x.k]).map((x) => (
            <li key={x.k} className="flex items-center gap-2">
              <span className={`h-2.5 w-2.5 rounded-full ${x.warna}`} />
              {x.nama}
              <strong className="tabular-nums">{angka(s.status[x.k])}</strong>
              <span className="text-ink-3">({persen(s.status[x.k], s.total)}%)</span>
            </li>
          ))}
        </ul>
      </Panel>

      <div className="grid gap-5 lg:grid-cols-2">
        {/* Tren per bulan */}
        <Panel judul="Permohonan per bulan" ket={<LegendaJenis />}>
          <div className="flex h-56 items-end gap-2 border-b border-garis sm:gap-4">
            {s.bulan.map((b) => {
              const n = b.mahasiswa + b.dosen;
              return (
                <div key={b.bulan} className="flex h-full flex-1 flex-col items-center justify-end gap-1.5">
                  <span className="text-xs font-bold tabular-nums text-ink-2">{angka(n)}</span>
                  <span
                    className="flex w-full max-w-[52px] flex-col-reverse overflow-hidden rounded-t-lg"
                    style={{ height: `${(n / maksBulan) * 82}%` }}
                    title={`${angka(b.mahasiswa)} mahasiswa · ${angka(b.dosen)} dosen`}
                  >
                    <span className={WARNA_JENIS.mahasiswa} style={{ height: `${(b.mahasiswa / (n || 1)) * 100}%` }} />
                    <span className={WARNA_JENIS.dosen} style={{ height: `${(b.dosen / (n || 1)) * 100}%` }} />
                  </span>
                </div>
              );
            })}
          </div>
          <div className="mt-2 flex gap-2 sm:gap-4">
            {s.bulan.map((b) => (
              <span key={b.bulan} className="flex-1 text-center text-xs font-semibold capitalize text-ink-3">
                {namaBulan(b.bulan)}
              </span>
            ))}
          </div>
        </Panel>

        {/* Per prodi */}
        <Panel judul="Permohonan per program studi" ket={<LegendaJenis />}>
          <ul className="max-h-[300px] space-y-3.5 overflow-y-auto pr-1">
            {s.prodi.map((p) => {
              const n = p.mahasiswa + p.dosen;
              return (
                <li key={p.nama}>
                  <div className="mb-1 flex justify-between gap-3 text-sm">
                    <span className="truncate font-semibold">{p.nama}</span>
                    <span className="tabular-nums text-ink-2">{angka(n)}</span>
                  </div>
                  <div className="flex h-2.5 overflow-hidden rounded-full bg-latar" style={{ width: `${Math.max(4, (n / maksProdi) * 100)}%` }}>
                    <span className={WARNA_JENIS.mahasiswa} style={{ width: `${(p.mahasiswa / (n || 1)) * 100}%` }} />
                    <span className={WARNA_JENIS.dosen} style={{ width: `${(p.dosen / (n || 1)) * 100}%` }} />
                  </div>
                </li>
              );
            })}
          </ul>
        </Panel>
      </div>

      <p className="text-xs text-ink-3">
        Semester Ganjil: Agustus–Januari · Genap: Februari–Juli. Dihitung dari tanggal pengajuan formulir. “Tanpa kolom status”
        = layanan yang tidak mencatat status di spreadsheet.
      </p>
    </div>
  );
};

export default DashboardView;
