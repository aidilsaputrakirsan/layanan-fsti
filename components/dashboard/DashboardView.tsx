"use client";

import { useState } from 'react';
import { AlertTriangle, CalendarClock } from 'lucide-react';
import { periodeDashboard } from '@/data/dashboard';

const angka = (n: number) => n.toLocaleString('id-ID');

const tglPanjang = (iso: string) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });

const Panel = ({ judul, ket, children }: { judul: string; ket?: string; children: React.ReactNode }) => (
  <section className="kartu p-5 sm:p-6">
    <div className="mb-5 flex items-baseline justify-between gap-3">
      <h2 className="text-base font-bold">{judul}</h2>
      {ket && <span className="text-xs text-ink-3">{ket}</span>}
    </div>
    {children}
  </section>
);

const DashboardView = () => {
  const [id, setId] = useState(periodeDashboard[0].id);
  const d = periodeDashboard.find((p) => p.id === id)!;
  const r = d.ringkasan;
  const maksBulan = Math.max(...d.perBulan.map((b) => b.jumlah));
  const maksPintu = Math.max(...d.perPintu.map((b) => b.jumlah));
  const status = [
    { nama: 'Selesai', n: r.selesai, warna: 'bg-primary-600' },
    { nama: 'Diproses', n: r.diproses, warna: 'bg-sorot-400' },
    { nama: 'Ditolak / perlu perbaikan', n: r.ditolak, warna: 'bg-rose-400' },
  ];

  return (
    <div className="wadah relative z-10 -mt-7 space-y-5">
      {/* Pilih periode */}
      <div className="kartu flex flex-col gap-3 p-4 shadow-kartu sm:flex-row sm:items-center sm:justify-between sm:p-5">
        <label className="flex flex-wrap items-center gap-3 text-sm font-semibold">
          Periode
          <select
            value={id}
            onChange={(e) => setId(e.target.value)}
            className="rounded-lg border border-garis bg-white px-3 py-2 text-sm font-semibold text-ink"
          >
            {periodeDashboard.map((p) => (
              <option key={p.id} value={p.id}>
                {p.label}
              </option>
            ))}
          </select>
        </label>
        <p className="flex items-center gap-2 text-sm text-ink-3">
          <CalendarClock className="h-4 w-4" /> Diperbarui {tglPanjang(d.diperbarui)}
        </p>
      </div>

      {d.contoh && (
        <p className="flex items-start gap-3 rounded-2xl border border-sorot-300 bg-sorot-100 px-5 py-4 text-sm text-sorot-700">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>
            <strong>Data contoh.</strong> Angka pada periode ini masih ilustrasi tampilan dan akan diganti dengan data resmi
            oleh admin FSTI.
          </span>
        </p>
      )}

      {/* KPI */}
      <dl className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { k: 'Total permohonan', v: angka(r.total), s: `${angka(r.selesai)} selesai` },
          { k: 'Rata-rata penyelesaian', v: `${angka(r.rataHari)} hari`, s: 'hari kerja, sejak diajukan' },
          { k: 'Selesai ≤ 2 hari kerja', v: `${r.tepatWaktu}%`, s: 'dari permohonan selesai' },
          { k: 'Indeks kepuasan', v: angka(r.ikm), s: `skala 100 · ${angka(r.responden)} responden` },
        ].map((x) => (
          <div key={x.k} className="kartu p-5">
            <dt className="text-sm text-ink-3">{x.k}</dt>
            <dd className="mt-2 text-3xl font-extrabold tabular-nums sm:text-[2.1rem]">{x.v}</dd>
            <dd className="mt-1 text-xs text-ink-3">{x.s}</dd>
          </div>
        ))}
      </dl>

      {/* Status */}
      <Panel judul="Status permohonan" ket={`${angka(r.total)} permohonan`}>
        <div className="flex h-4 overflow-hidden rounded-full bg-latar" role="img" aria-label="Komposisi status permohonan">
          {status.map((s) => (
            <span key={s.nama} className={`${s.warna} h-full`} style={{ width: `${(s.n / r.total) * 100}%` }} />
          ))}
        </div>
        <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {status.map((s) => (
            <li key={s.nama} className="flex items-center gap-2">
              <span className={`h-2.5 w-2.5 rounded-full ${s.warna}`} />
              {s.nama}
              <strong className="tabular-nums">{angka(s.n)}</strong>
              <span className="text-ink-3">({Math.round((s.n / r.total) * 100)}%)</span>
            </li>
          ))}
        </ul>
      </Panel>

      <div className="grid gap-5 lg:grid-cols-2">
        <Panel judul="Permohonan per bulan">
          <div className="flex h-56 items-end gap-3 border-b border-garis pb-0 sm:gap-5">
            {d.perBulan.map((b) => (
              <div key={b.bulan} className="flex h-full flex-1 flex-col items-center justify-end gap-1.5">
                <span className="text-xs font-bold tabular-nums text-ink-2">{angka(b.jumlah)}</span>
                <span
                  className="w-full max-w-[56px] rounded-t-lg bg-primary-600 transition-[height] duration-500"
                  style={{ height: `${(b.jumlah / maksBulan) * 82}%` }}
                />
              </div>
            ))}
          </div>
          <div className="mt-2 flex gap-3 sm:gap-5">
            {d.perBulan.map((b) => (
              <span key={b.bulan} className="flex-1 text-center text-xs font-semibold text-ink-3">
                {b.bulan}
              </span>
            ))}
          </div>
        </Panel>

        <Panel judul="Permohonan per pintu & kelompok">
          <ul className="space-y-3.5">
            {d.perPintu.map((b) => (
              <li key={b.nama}>
                <div className="mb-1 flex justify-between text-sm">
                  <span className="font-semibold">{b.nama}</span>
                  <span className="tabular-nums text-ink-2">{angka(b.jumlah)}</span>
                </div>
                <div className="h-2.5 rounded-full bg-latar">
                  <div className="h-full rounded-full bg-primary-600" style={{ width: `${(b.jumlah / maksPintu) * 100}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <Panel judul="Lima layanan paling banyak diajukan">
        <ol className="divide-y divide-garis">
          {d.teratas.map((t, i) => (
            <li key={t.nama} className="flex items-center gap-4 py-3">
              <span className="w-6 text-lg font-extrabold tabular-nums text-primary-300">{i + 1}</span>
              <span className="flex-1 font-semibold">{t.nama}</span>
              <span className="tabular-nums text-ink-2">{angka(t.jumlah)}</span>
            </li>
          ))}
        </ol>
      </Panel>
    </div>
  );
};

export default DashboardView;
