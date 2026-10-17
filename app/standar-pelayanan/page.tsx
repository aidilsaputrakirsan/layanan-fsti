import type { Metadata } from 'next';
import Link from 'next/link';
import { FileText, Download, Clock3, ArrowRight } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/ui/PageHeader';
import AlurDiagram from '@/components/standar/AlurDiagram';
import { komponenStandar, dokumenStandar } from '@/data/standar';

export const metadata: Metadata = {
  title: 'SOP & Standar Pelayanan',
  description: 'Alur layanan umum, komponen standar pelayanan, dan dokumen SOP layanan administrasi FSTI ITK.',
};

export default function StandarPelayanan() {
  return (
    <MainLayout>
      <PageHeader
        label="Informasi"
        judul="SOP & standar pelayanan"
        deskripsi="Alur umum layanan, komponen standar pelayanan, dan dokumen SOP yang menjadi acuan admin FSTI."
        jejak={[{ label: 'SOP & Standar Pelayanan' }]}
      />

      {/* Alur umum */}
      <section className="wadah mt-14">
        <p className="label-kecil text-primary-600">Alur layanan umum</p>
        <h2 className="mt-2 text-3xl font-extrabold">Dari pengajuan sampai selesai.</h2>
        <p className="mt-3 max-w-2xl text-ink-2">Siapa mengerjakan apa: langkah di jalur atas dilakukan pemohon, jalur bawah oleh admin FSTI.</p>
        <div className="mt-8">
          <AlurDiagram />
        </div>
      </section>

      {/* Komponen standar pelayanan */}
      <section className="wadah mt-20">
        <p className="label-kecil text-primary-600">Standar pelayanan</p>
        <h2 className="mt-2 text-3xl font-extrabold">Yang dijamin di setiap layanan.</h2>
        <p className="mt-3 max-w-2xl text-ink-2">
          Rincian per layanan dapat dilihat di halaman detail{' '}
          <Link href="/katalog" className="font-semibold text-primary-700 underline">
            Katalog Layanan
          </Link>
          .
        </p>
        <dl className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-garis bg-garis sm:grid-cols-2 lg:grid-cols-3">
          {komponenStandar.map((k, i) => (
            <div key={k.judul} className="bg-white p-6">
              <dt className="flex items-baseline gap-3 font-bold">
                <span className="text-sm tabular-nums text-primary-300">{String(i + 1).padStart(2, '0')}</span>
                {k.judul}
              </dt>
              <dd className="mt-1.5 pl-8 text-sm text-ink-2">{k.isi}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Dokumen */}
      <section className="wadah mt-20">
        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end">
          <div>
            <p className="label-kecil text-primary-600">Dokumen</p>
            <h2 className="mt-2 text-3xl font-extrabold">SOP & dokumen acuan.</h2>
          </div>
          <p className="text-sm text-ink-3">Dokumen diunggah bertahap oleh admin FSTI.</p>
        </div>
        <ul className="mt-8 grid gap-3 md:grid-cols-2">
          {dokumenStandar.map((d) => (
            <li key={d.judul} className="kartu flex items-center gap-4 p-4 sm:p-5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                <FileText className="h-5 w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-ink-3">{d.kategori}</p>
                <p className="font-bold leading-snug">{d.judul}</p>
                <p className="text-sm text-ink-2">{d.ringkas}</p>
              </div>
              {d.file ? (
                <a href={d.file} target="_blank" rel="noopener noreferrer" className="tombol-garis shrink-0 px-3 py-2">
                  <Download className="h-4 w-4" /> <span className="hidden sm:inline">Unduh</span>
                </a>
              ) : (
                <span className="flex shrink-0 items-center gap-1 rounded-full bg-latar px-2.5 py-1 text-xs font-semibold text-ink-3">
                  <Clock3 className="h-3.5 w-3.5" /> Segera
                </span>
              )}
            </li>
          ))}
        </ul>
        <Link href="/panduan" className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-700 hover:underline">
          Butuh penjelasan langkah demi langkah? Lihat panduan & video <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </MainLayout>
  );
}
