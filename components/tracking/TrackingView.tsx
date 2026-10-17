"use client";

import Link from 'next/link';
import { FormEvent, useEffect, useState } from 'react';
import { Check, Loader2, Search, Mail, AlertCircle, ArrowUpRight, Ticket, RotateCcw, MessageSquareHeart, Info, MapPin } from 'lucide-react';
import { kontak, waLink } from '@/data/situs';
import { RUANG_PENGAMBILAN } from '@/data/standar';

type Jenis = 'mahasiswa' | 'dosen';
type Status = 'waiting' | 'progress' | 'done' | 'rejected' | 'duplicate';

interface Permohonan {
  kode: string;
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

  // ?jenis=dosen dibaca di klien agar form tetap dirender di server (tanpa menunggu JavaScript)
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get('jenis') === 'dosen') setJenis('dosen');
  }, []);
  const [mode, setMode] = useState<'cari' | 'lupa'>('cari');
  const [id, setId] = useState('');
  const [kode, setKode] = useState('');
  const [muat, setMuat] = useState(false);
  const [hasil, setHasil] = useState<Permohonan | null>(null);
  const [galat, setGalat] = useState<{ pesan: string; kode?: string } | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  const labelId = jenis === 'mahasiswa' ? 'NIM' : 'NIP';

  const kirim = async (e: FormEvent) => {
    e.preventDefault();
    setMuat(true);
    setGalat(null);
    setInfo(null);
    if (mode === 'cari') setHasil(null);
    try {
      const res = await fetch('/api/tracking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ aksi: mode === 'cari' ? 'cari' : 'kirim-kode', jenis, id, kode }),
      });
      const data = await res.json();
      if (!data.ok) setGalat({ pesan: data.pesan || 'Terjadi kesalahan.', kode: data.kode });
      else if (mode === 'cari') setHasil(data.data);
      else setInfo(data.pesan || 'Jika data ditemukan, kode tiket dikirim ke email yang Anda isi saat mengajukan.');
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
    setInfo(null);
  };

  return (
    <section className="wadah relative z-10 -mt-7 grid grid-cols-[minmax(0,1fr)] items-start gap-6 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)]">
      {/* Form */}
      <div className="kartu p-5 shadow-kartu sm:p-6">
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
              placeholder={jenis === 'mahasiswa' ? 'mis. 11221001' : 'NIP / NIPH Anda'}
              className="input"
            />
          </div>

          {mode === 'cari' && (
            <div>
              <label htmlFor="kode-tiket" className="mb-1.5 block text-sm font-semibold">
                Kode tiket
              </label>
              <input
                id="kode-tiket"
                autoComplete="off"
                required
                value={kode}
                onChange={(e) => setKode(e.target.value.toUpperCase())}
                placeholder={jenis === 'mahasiswa' ? 'M-XXXXXX' : 'D-XXXXXX'}
                className="input font-mono uppercase tracking-wider"
                maxLength={8}
              />
            </div>
          )}

          <button type="submit" disabled={muat} className="tombol-utama w-full py-3">
            {muat ? <Loader2 className="h-4 w-4 animate-spin" /> : mode === 'cari' ? <Search className="h-4 w-4" /> : <Mail className="h-4 w-4" />}
            {mode === 'cari' ? 'Cek status' : 'Kirim ulang kode ke email'}
          </button>
        </form>

        <button
          type="button"
          onClick={() => {
            setMode(mode === 'cari' ? 'lupa' : 'cari');
            setGalat(null);
            setInfo(null);
          }}
          className="mt-4 text-sm font-semibold text-primary-700 hover:underline"
        >
          {mode === 'cari' ? 'Lupa kode tiket?' : '← Kembali ke cek status'}
        </button>
        {mode === 'lupa' && (
          <p className="mt-2 text-sm text-ink-2">
            Kode tiket semua permohonan Anda akan dikirim ke email yang diisi saat mengajukan formulir.
          </p>
        )}
      </div>

      {/* Hasil */}
      <div aria-live="polite">
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
                <p className="mt-1">Periksa kembali {labelId} dan kode tiket. Permohonan yang baru dikirim bisa butuh beberapa menit sebelum muncul.</p>
              ) : null}
            </div>
          </div>
        )}

        {info && (
          <div className="kartu flex gap-3 border-primary-200 bg-primary-50 p-5 text-primary-900">
            <Mail className="mt-0.5 h-5 w-5 shrink-0" />
            <p className="text-sm font-semibold">{info}</p>
          </div>
        )}

        {hasil && <HasilTiket p={hasil} />}

        {!hasil && !galat && !info && (
          <div className="kartu p-6 shadow-kartu sm:p-8">
            <Ticket className="h-8 w-8 text-primary-300" />
            <h2 className="mt-4 text-xl font-extrabold">Di mana kode tiket saya?</h2>
            <ul className="mt-3 space-y-2 text-sm text-ink-2">
              <li className="flex gap-2">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary-600" />
                <span>
                  Kode tiket dikirim ke email Anda sesaat setelah formulir layanan terkirim, berformat{' '}
                  <code className="whitespace-nowrap rounded bg-latar px-1.5 font-mono text-ink">{jenis === 'mahasiswa' ? 'M-' : 'D-'}XXXXXX</code>.
                </span>
              </li>
              <li className="flex gap-2">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary-600" />
                Tidak menemukan emailnya? Cek folder spam, atau gunakan “Lupa kode tiket?”.
              </li>
              <li className="flex gap-2">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary-600" />
                Status tidak berubah lebih dari 3 hari kerja? Hubungi admin dengan menyebutkan kode tiket.
              </li>
            </ul>
          </div>
        )}
      </div>
    </section>
  );
};

const HasilTiket = ({ p }: { p: Permohonan }) => {
  const st = LABEL_STATUS[p.status] ?? LABEL_STATUS.progress;
  const pos = posisi[p.status] ?? 2;
  const berhenti = p.status === 'rejected' || p.status === 'duplicate';

  return (
    <article className="animate-muncul overflow-hidden rounded-3xl bg-white shadow-angkat ring-1 ring-garis">
      <div className="flex flex-wrap items-start justify-between gap-3 bg-primary-950 px-6 py-5 text-white">
        <div>
          <p className="label-kecil text-primary-300">Kode tiket</p>
          <p className="mt-1 font-mono text-2xl font-bold tracking-wider text-sorot-300">{p.kode}</p>
        </div>
        <span className={`rounded-full px-3 py-1 text-xs font-bold ${st.kelas}`}>{st.teks}</span>
      </div>

      <div className="space-y-6 p-6">
        <div>
          <p className="text-sm text-ink-3">Layanan</p>
          <p className="text-lg font-bold">{p.layanan}</p>
          {p.jenis && <p className="text-sm text-ink-2">{p.jenis}</p>}
          <p className="mt-1 text-sm text-ink-3">Diajukan {tgl(p.tanggal)}</p>
        </div>

        <ol className="grid grid-cols-4 gap-2" aria-label="Tahapan">
          {TAHAP.map((t, i) => {
            const lewat = i < pos;
            const sekarang = i === pos && !berhenti;
            return (
              <li key={t}>
                <span
                  className={`block h-2 rounded-full ${
                    berhenti && i === pos ? 'bg-rose-400' : lewat ? 'bg-primary-600' : sekarang ? 'bg-sorot-400' : 'bg-garis'
                  }`}
                />
                <span className={`mt-2 flex items-center gap-1 text-xs font-semibold ${lewat || sekarang ? 'text-ink' : 'text-ink-3'}`}>
                  {lewat && <Check className="h-3.5 w-3.5 text-primary-600" />}
                  {t}
                </span>
              </li>
            );
          })}
        </ol>

        {p.keterangan && (
          <div className="rounded-xl bg-latar p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-ink-3">Catatan admin</p>
            <p className="mt-1 whitespace-pre-line text-sm text-ink">{p.keterangan}</p>
          </div>
        )}

        {p.tautan && p.tautan.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {p.tautan.map((t, i) => (
              <a key={t} href={t} target="_blank" rel="noopener noreferrer" className="tombol-utama">
                Buka dokumen hasil{p.tautan!.length > 1 ? ` ${i + 1}` : ''} <ArrowUpRight className="h-4 w-4" />
              </a>
            ))}
          </div>
        )}

        {p.status === 'rejected' && (
          <p className="flex items-start gap-2 text-sm text-ink-2">
            <RotateCcw className="mt-0.5 h-4 w-4 shrink-0 text-rose-600" />
            Perbaiki sesuai catatan admin, lalu ajukan kembali melalui formulir layanan yang sama.
          </p>
        )}

        {p.status === 'done' && (
          <>
            <p className="flex items-start gap-2 text-sm text-ink-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary-600" />
              <span>
                Dokumen dapat diunduh lewat tautan{p.tautan?.length ? ' di atas' : ' dari admin'} atau diambil langsung di{' '}
                <strong className="text-ink">{RUANG_PENGAMBILAN}</strong>.
              </span>
            </p>
            <Link href="/survey-kepuasan" className="flex items-center gap-3 rounded-xl border border-sorot-300 bg-sorot-100 p-4 text-sm font-semibold text-ink hover:bg-sorot-100/70">
              <MessageSquareHeart className="h-5 w-5 shrink-0 text-sorot-700" />
              Jangan lupa isi survei kepuasan. Penilaian Anda membantu perbaikan pelayanan kami.
            </Link>
          </>
        )}
      </div>
    </article>
  );
};

export default TrackingView;
