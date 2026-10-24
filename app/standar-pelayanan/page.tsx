import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/ui/PageHeader';
import AlurDiagram from '@/components/standar/AlurDiagram';
import SopDaftar from '@/components/standar/SopDaftar';
import { komponenStandar } from '@/data/standar';
import { daftarSop } from '@/data/sop';

const totalSop = Object.values(daftarSop).reduce((n, l) => n + l.length, 0);

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
        <p className="label-kecil text-primary-600">Dokumen</p>
        <h2 className="mt-2 text-3xl font-extrabold">SOP & dokumen acuan.</h2>
        <p className="mt-3 max-w-2xl text-ink-2">
          {totalSop} SOP FSTI yang disahkan Dekan. Pilih jenisnya atau cari langsung judul SOP.
        </p>
        <SopDaftar />
        <Link href="/panduan" className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-700 hover:underline">
          Butuh penjelasan langkah demi langkah? Lihat panduan & video <ArrowRight className="h-4 w-4" />
        </Link>
      </section>
    </MainLayout>
  );
}
