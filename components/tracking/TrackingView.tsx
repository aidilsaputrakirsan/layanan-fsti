"use client";

import Link from 'next/link';
import { FormEvent, useEffect, useState } from 'react';
import { Check, Loader2, Search, AlertCircle, ArrowUpRight, RotateCcw, MessageSquareHeart, Info, MapPin } from 'lucide-react';
import { kontak, waLink } from '@/data/situs';
import { RUANG_PENGAMBILAN } from '@/data/standar';

type Jenis = 'mahasiswa' | 'dosen';
type Status = 'waiting' | 'progress' | 'done' | 'rejected' | 'duplicate';

interface Permohonan {
  layanan: string;
  jenis?: string;
  tanggal?: string;
  status: Status;
  statusAsli?: string;
  keterangan?: string;
  tautan?: string[];
}

const LABEL_STATUS: Record<Status, { teks: string; kelas: string }> = {
  waiting: { teks: 'Menunggu verifikasi', kelas: 'bg-sorot-100 text-sorot-700' },
  progress: { teks: 'Diproses', kelas: 'bg-primary-50 text-primary-700' },
  done: { teks: 'Selesai', kelas: 'bg-emerald-50 text-emerald-700' },
  rejected: { teks: 'Ditolak / perlu perbaikan', kelas: 'bg-rose-50 text-rose-700' },
  duplicate: { teks: 'Pengajuan ganda', kelas: 'bg-latar text-ink-2' },
};

const TAHAP = ['Diterima', 'Diverifikasi', 'Diproses', 'Selesai'];
const posisi: Record<Status, number> = { waiting: 1, progress: 2, done: 4, rejected: 1, duplicate: 1 };

const tgl = (iso?: string) =>
  iso ? new Date(iso).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '—';

const TrackingView = () => {
  const [jenis, setJenis] = useState<Jenis>('mahasiswa');
  const [id, setId] = useState('');
  const [muat, setMuat] = useState(false);
  const [hasil, setHasil] = useState<Permohonan[] | null>(null);
  const [galat, setGalat] = useState<{ pesan: string; kode?: string } | null>(null);

  // ?jenis=dosen dibaca di klien agar form tetap dirender di server (tanpa menunggu JavaScript)
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get('jenis') === 'dosen') setJenis('dosen');
  }, []);

  const labelId = jenis === 'mahasiswa' ? 'NIM' : 'NIP';

  const kirim = async (e: FormEvent) => {
    e.preventDefault();
    setMuat(true);
    setGalat(null);
    setHasil(null);
    try {
      const res = await fetch('/api/tracking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jenis, id }),
      });
      const data = await res.json();
      if (!data.ok) setGalat({ pesan: data.pesan || 'Terjadi kesalahan.', kode: data.kode });
      else setHasil(data.data);
    } catch {
      setGalat({ pesan: 'Tidak dapat terhubung. Periksa koneksi internet Anda.' });
    } finally {
      setMuat(false);
    }
  };

  const gantiJenis = (j: Jenis) => {
    setJenis(j);
    setHasil(null);
    setGalat(null);
  };

  return (
    <section className="wadah relative z-10 -mt-7 grid grid-cols-[minmax(0,1fr)] items-start gap-6 lg:grid-cols-[minmax(0,400px)_minmax(0,1fr)]">
      {/* Form */}
      <div className="kartu p-5 shadow-kartu sm:p-6 lg:sticky lg:top-24">
        <div role="tablist" aria-label="Jenis pemohon" className="grid grid-cols-2 gap-1 rounded-xl bg-latar p-1">
          {(['mahasiswa', 'dosen'] as Jenis[]).map((j) => (
            <button
              key={j}
              role="tab"
              type="button"
              aria-selected={jenis === j}
              onClick={() => gantiJenis(j)}
              className={`rounded-lg py-2 text-sm font-bold capitalize transition-colors ${
                jenis === j ? 'bg-white text-primary-700 shadow-kartu' : 'text-ink-2 hover:text-ink'
              }`}
            >
              {j}
            </button>
          ))}
        </div>

        <form onSubmit={kirim} className="mt-5 space-y-4">
          <div>
            <label htmlFor="id-pemohon" className="mb-1.5 block text-sm font-semibold">
              {labelId}
            </label>
            <input
              id="id-pemohon"
              inputMode={jenis === 'mahasiswa' ? 'numeric' : 'text'}
              autoComplete="off"
              required
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder={jenis === 'mahasiswa' ? 'NIM lengkap, mis. 11221001' : 'NIP lengkap'}
              className="input"
            />
            <p className="mt-1.5 text-xs text-ink-3">Gunakan {labelId} yang sama dengan yang Anda isi di formulir.</p>
          </div>
          <button type="submit" disabled={muat} className="tombol-utama w-full py-3">
            {muat ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
            {muat ? 'Mencari…' : 'Cek status'}
          </button>
        </form>
      </div>

      {/* Hasil */}
      <div aria-live="polite" className="min-w-0">
        {galat && (
          <div className="kartu flex gap-3 border-rose-200 bg-rose-50 p-5 text-rose-900">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
            <div className="text-sm">
              <p className="font-bold">{galat.pesan}</p>
              {galat.kode === 'belum-dikonfigurasi' ? (
                <p className="mt-1">
                  Sementara ini, tanyakan status permohonan melalui{' '}
                  {kontak.whatsapp.map((w, i) => (
                    <span key={w.nomor}>
                      {i > 0 && ' atau '}
                      <a href={waLink(w)} target="_blank" rel="noopener noreferrer" className="font-semibold underline">
                        WhatsApp {w.label}
                      </a>
                    </span>
                  ))}
                  .
                </p>
              ) : galat.kode === 'tidak-ditemukan' ? (
                <p className="mt-1">
                  Periksa kembali {labelId} Anda. Permohonan yang baru dikirim bisa butuh beberapa menit sebelum muncul. Jika
                  tetap tidak ada, hubungi admin melalui WhatsApp layanan.
                </p>
              ) : null}
            </div>
          </div>
        )}

        {hasil && (
          <div className="space-y-4">
            <p className="text-sm text-ink-3">
              <strong className="text-ink">{hasil.length}</strong> permohonan ditemukan · terbaru di atas
            </p>
            {hasil.map((p, i) => (
              <KartuPermohonan key={`${p.layanan}-${p.tanggal}-${i}`} p={p} />
            ))}
            {hasil.some((p) => p.status === 'done') && (
              <Link
                href="/survey-kepuasan"
                className="flex items-center gap-3 rounded-xl border border-sorot-300 bg-sorot-100 p-4 text-sm font-semibold text-ink hover:bg-sorot-100/70"
              >
                <MessageSquareHeart className="h-5 w-5 shrink-0 text-sorot-700" />
                Jangan lupa isi survei kepuasan. Penilaian Anda membantu perbaikan pelayanan kami.
              </Link>
            )}
          </div>
        )}

        {!hasil && !galat && (
          <div className="kartu p-6 shadow-kartu sm:p-8">
            <h2 className="text-xl font-extrabold">Yang akan Anda lihat</h2>
            <ul className="mt-3 space-y-2 text-sm text-ink-2">
              {[
                'Daftar permohonan Anda: nama layanan, tanggal pengajuan, dan status terkini.',
                'Catatan dari admin jika permohonan perlu diperbaiki.',
                `Tautan dokumen hasil bila sudah selesai — atau ambil langsung di ${RUANG_PENGAMBILAN}.`,
                'Status diperbarui oleh admin; perubahan tampil di sini dalam beberapa menit.',
              ].map((t) => (
                <li key={t} className="flex gap-2">
                  <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary-600" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
};

const KartuPermohonan = ({ p }: { p: Permohonan }) => {
  const st = LABEL_STATUS[p.status] ?? LABEL_STATUS.progress;
  const pos = posisi[p.status] ?? 2;
  const berhenti = p.status === 'rejected' || p.status === 'duplicate';

  return (
    <article className="kartu animate-muncul overflow-hidden shadow-kartu">
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-garis px-5 py-4">
        <div className="min-w-0">
          <h3 className="font-bold leading-snug text-ink">{p.layanan}</h3>
          {p.jenis && <p className="text-sm text-ink-2">{p.jenis}</p>}
          <p className="mt-0.5 text-xs text-ink-3">Diajukan {tgl(p.tanggal)}</p>
        </div>
        <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold ${st.kelas}`}>{st.teks}</span>
      </div>

      <div className="space-y-4 px-5 py-4">
        <ol className="grid grid-cols-4 gap-2" aria-label="Tahapan">
          {TAHAP.map((t, i) => {
            const lewat = i < pos;
            const sekarang = i === pos && !berhenti;
            return (
              <li key={t}>
                <span
                  className={`block h-1.5 rounded-full ${
                    berhenti && i === pos ? 'bg-rose-400' : lewat ? 'bg-primary-600' : sekarang ? 'bg-sorot-400' : 'bg-garis'
                  }`}
                />
                <span className={`mt-1.5 flex items-center gap-1 text-[11px] font-semibold ${lewat || sekarang ? 'text-ink' : 'text-ink-3'}`}>
                  {lewat && <Check className="h-3 w-3 text-primary-600" />}
                  {t}
                </span>
              </li>
            );
          })}
        </ol>

        {p.keterangan && (
          <div className="rounded-xl bg-latar p-3.5">
            <p className="text-xs font-bold uppercase tracking-wider text-ink-3">Catatan admin</p>
            <p className="mt-1 whitespace-pre-line text-sm text-ink">{p.keterangan}</p>
          </div>
        )}

        {p.tautan && p.tautan.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {p.tautan.map((t, i) => (
              <a key={t} href={t} target="_blank" rel="noopener noreferrer" className="tombol-utama py-2">
                Buka dokumen hasil{p.tautan!.length > 1 ? ` ${i + 1}` : ''} <ArrowUpRight className="h-4 w-4" />
              </a>
            ))}
          </div>
        )}

        {p.status === 'done' && (
          <p className="flex items-start gap-2 text-sm text-ink-2">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary-600" />
            <span>
              Dokumen dapat {p.tautan?.length ? 'diunduh lewat tautan di atas atau ' : ''}diambil langsung di{' '}
              <strong className="text-ink">{RUANG_PENGAMBILAN}</strong>.
            </span>
          </p>
        )}

        {p.status === 'rejected' && (
          <p className="flex items-start gap-2 text-sm text-ink-2">
            <RotateCcw className="mt-0.5 h-4 w-4 shrink-0 text-rose-600" />
            Perbaiki sesuai catatan admin, lalu ajukan kembali melalui formulir layanan yang sama.
          </p>
        )}
      </div>
    </article>
  );
};

export default TrackingView;
