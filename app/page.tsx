import Link from 'next/link';
import {
  ArrowRight,
  Ticket,
  PlayCircle,
  ClipboardList,
  LibraryBig,
  BarChart3,
  MessageSquareHeart,
  Mail,
  Clock,
  MessageCircle,
  HelpCircle,
} from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import CariLayanan from '@/components/layanan/CariLayanan';
import PintuKartu from '@/components/layanan/PintuKartu';
import TiketContoh from '@/components/layanan/TiketContoh';
import ZiBanner from '@/components/ui/ZiBanner';
import { pintu, layanan, ESTIMASI_UMUM } from '@/data/layanan';
import { kepuasan } from '@/data/dashboard';
import { ambilRekap, semesterSekarang } from '@/lib/rekap';
import { kontak, waLink } from '@/data/situs';

const langkah = [
  { judul: 'Pilih layanan', isi: 'Masuk lewat pintu S1, S2, atau Dosen — atau cari langsung.' },
  { judul: 'Isi formulir', isi: 'Lengkapi formulir online sesuai layanan yang dipilih, lalu kirim.' },
  { judul: 'Diverifikasi & diproses', isi: `Admin memeriksa dan memproses berkas, umumnya ${ESTIMASI_UMUM}.` },
  { judul: 'Ambil hasil & isi survei', isi: 'Unduh dokumen atau ambil di ruang B110 setelah status Selesai, lalu isi survei kepuasan.' },
];

const aksesCepat = [
  { href: '/panduan', judul: 'Panduan & Video', isi: 'Tutorial memakai layanan dan website.', ikon: PlayCircle },
  { href: '/standar-pelayanan', judul: 'SOP & Standar Pelayanan', isi: 'Alur, SOP, dan standar setiap layanan.', ikon: ClipboardList },
  { href: '/katalog', judul: 'Katalog Layanan', isi: `${layanan.length} layanan lengkap dengan persyaratannya.`, ikon: LibraryBig },
  { href: '/dashboard', judul: 'Dashboard Layanan', isi: 'Rekap jumlah dan kecepatan layanan.', ikon: BarChart3 },
  { href: '/survey-kepuasan', judul: 'Survei Kepuasan', isi: 'Bantu kami memperbaiki layanan.', ikon: MessageSquareHeart },
  { href: '/panduan#faq', judul: 'Tanya Jawab', isi: 'Jawaban atas pertanyaan yang sering diajukan.', ikon: HelpCircle },
];

// Ringkasan dashboard dibaca ulang paling sering sekali per jam
export const revalidate = 3600;

export default async function Beranda() {
  const rekap = await ambilRekap();
  const d = rekap?.semester.find((x) => x.id === semesterSekarang()) ?? rekap?.semester[0];

  return (
    <MainLayout>
      {/* Hero */}
      {/* Catatan: section sengaja tanpa overflow-hidden agar dropdown pencarian bisa tampil di atas kartu pintu.
          Ornamen latar dipotong di lapisannya sendiri. */}
      <section className="relative bg-primary-700 text-white">
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
          <div className="pola-titik absolute inset-0" />
          {/* Watermark vertikal di ruang kosong sebelah kanan konten (hanya layar lebar) */}
          <span className="absolute right-2 top-1/2 hidden -translate-y-1/2 rotate-180 select-none whitespace-nowrap font-extrabold leading-none tracking-tighter text-white/[0.08] [font-size:min(5.5rem,calc((100vw-69rem)*0.45))] [writing-mode:vertical-rl] min-[1340px]:block">
            Layanan FSTI
          </span>
        </div>
        <div className="wadah relative grid items-center gap-12 pb-44 pt-12 sm:pt-16 lg:grid-cols-[1.25fr_1fr] lg:pb-48 lg:pt-20">
          <div>
            <p className="label-kecil text-sorot-300">Portal Layanan Administrasi · FSTI ITK</p>
            <h1 className="mt-4 animate-muncul text-[2.35rem] font-extrabold leading-[1.08] text-white sm:text-5xl lg:text-[3.6rem]">
              Semua urusan administrasi FSTI, lewat satu pintu.
            </h1>
            <p className="mt-5 max-w-xl animate-muncul text-base text-primary-100 sm:text-lg">
              Ajukan surat, daftar seminar, legalisasi dokumen, sampai cek status permohonan — untuk mahasiswa S1, S2,
              dan dosen.
            </p>
            <div className="mt-8 max-w-xl">
              <CariLayanan gelap />
            </div>
          </div>
          <div className="hidden lg:block">
            <TiketContoh />
          </div>
        </div>
      </section>

      {/* Pintu layanan */}
      <section className="wadah relative z-10 -mt-32" aria-labelledby="judul-pintu">
        <h2 id="judul-pintu" className="sr-only">
          Pilih pintu layanan
        </h2>
        <div className="grid gap-5 md:grid-cols-3">
          {pintu.map((p) => (
            <PintuKartu key={p.id} p={p} />
          ))}
        </div>
      </section>

      {/* Cara kerja */}
      <section className="wadah mt-24">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="label-kecil text-primary-600">Alur layanan</p>
            <h2 className="mt-2 text-3xl font-extrabold">Empat langkah, dari formulir sampai dokumen.</h2>
          </div>
          <Link href="/standar-pelayanan" className="flex items-center gap-1.5 text-sm font-semibold text-primary-700 hover:underline">
            Lihat alur & SOP lengkap <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <ol className="mt-10 grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
          {langkah.map((l, i) => (
            <li key={l.judul} className="relative">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-600 text-lg font-extrabold text-white">
                  {i + 1}
                </span>
                {i < langkah.length - 1 && <span className="hidden h-px flex-1 border-t-2 border-dashed border-primary-200 lg:block" />}
              </div>
              <h3 className="mt-4 text-lg font-bold">{l.judul}</h3>
              <p className="mt-1 text-sm leading-relaxed text-ink-2">{l.isi}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Akses cepat */}
      <section className="wadah mt-24">
        <p className="label-kecil text-primary-600">Akses cepat</p>
        <h2 className="mt-2 text-3xl font-extrabold">Informasi yang sering dibutuhkan.</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3 lg:grid-cols-4">
          <Link
            href="/tracking"
            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-primary-950 p-6 text-white md:row-span-2"
          >
            <div className="pola-titik absolute inset-0 opacity-60" aria-hidden />
            <div className="relative">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sorot-400 text-ink">
                <Ticket className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-2xl font-extrabold text-white">Cek status permohonan</h3>
              <p className="mt-2 text-sm text-primary-100">
                Masukkan NIM/NIP untuk melihat status, catatan admin, dan dokumen hasil permohonan Anda.
              </p>
            </div>
            <span className="relative mt-8 inline-flex items-center gap-2 text-sm font-bold text-sorot-300">
              Lacak sekarang <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
          {aksesCepat.map(({ href, judul, isi, ikon: Ikon }) => (
            <Link key={href} href={href} className="kartu group flex items-start gap-4 p-5 transition hover:border-primary-300 hover:shadow-kartu">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                <Ikon className="h-5 w-5" />
              </span>
              <span>
                <span className="block font-bold text-ink group-hover:text-primary-700">{judul}</span>
                <span className="mt-0.5 block text-sm text-ink-2">{isi}</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Ringkasan dashboard (otomatis dari rekap spreadsheet) */}
      {d && (
        <section className="wadah mt-24">
          <div className="kartu overflow-hidden">
            <div className="flex flex-col justify-between gap-3 border-b border-garis px-6 py-5 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-xl font-extrabold">Kinerja layanan · {d.label}</h2>
                <p className="text-sm text-ink-3">Diperbarui otomatis dari data layanan</p>
              </div>
              <Link href="/dashboard" className="tombol-garis self-start sm:self-auto">
                Buka dashboard <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <dl className="grid grid-cols-2 divide-garis lg:grid-cols-4 lg:divide-x">
              {[
                { k: 'Permohonan', v: d.total.toLocaleString('id-ID') },
                { k: 'Selesai', v: `${d.total - d.status.none ? Math.round((d.status.done / (d.total - d.status.none)) * 100) : 0}%` },
                { k: 'Antrean saat ini', v: (d.status.waiting + d.status.progress).toLocaleString('id-ID') },
                { k: 'Indeks kepuasan', v: kepuasan[d.id] ? kepuasan[d.id].ikm.toLocaleString('id-ID') : '—' },
              ].map((s) => (
                <div key={s.k} className="px-6 py-6">
                  <dt className="text-sm text-ink-3">{s.k}</dt>
                  <dd className="mt-1 text-3xl font-extrabold tabular-nums text-ink">{s.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      )}

      {/* Zona Integritas & bantuan */}
      <section className="wadah mt-24 grid items-start gap-8 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <p className="label-kecil text-primary-600">Zona Integritas</p>
          <h2 className="mb-6 mt-2 text-3xl font-extrabold">Layanan gratis, tanpa gratifikasi.</h2>
          <ZiBanner />
        </div>
        <div className="kartu p-6 sm:p-7 lg:mt-[92px]">
          <h2 className="text-xl font-extrabold">Butuh bantuan?</h2>
          <p className="mt-1 text-sm text-ink-2">
            Hubungi admin layanan. Sebutkan NIM/NIP dan nama layanan jika menanyakan permohonan yang sudah diajukan.
          </p>
          <div className="mt-5 grid gap-2.5">
            {kontak.whatsapp.map((w) => (
              <a key={w.nomor} href={waLink(w)} target="_blank" rel="noopener noreferrer" className="tombol-garis justify-start py-3">
                <MessageCircle className="h-4 w-4 text-primary-600" />
                WhatsApp {w.label}
              </a>
            ))}
            <a href={`mailto:${kontak.email}`} className="tombol-garis justify-start py-3">
              <Mail className="h-4 w-4 text-primary-600" />
              {kontak.email}
            </a>
          </div>
          <p className="mt-5 flex gap-2 text-sm text-ink-3">
            <Clock className="mt-0.5 h-4 w-4 shrink-0" />
            <span>
              {kontak.jam.map((j) => (
                <span key={j} className="block">
                  {j}
                </span>
              ))}
            </span>
          </p>
        </div>
      </section>
    </MainLayout>
  );
}
