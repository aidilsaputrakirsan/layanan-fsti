import type { Metadata } from 'next';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/ui/PageHeader';
import Faq from '@/components/ui/Faq';
import TrackingView from '@/components/tracking/TrackingView';
import { faqUmum } from '@/data/panduan';

export const metadata: Metadata = {
  title: 'Cek Status Permohonan',
  description: 'Lacak status permohonan layanan FSTI ITK dengan NIM/NIP.',
};

export default function Tracking() {
  return (
    <MainLayout>
      <PageHeader
        label="Cek status"
        judul="Lacak permohonan Anda"
        deskripsi="Masukkan NIM atau NIP yang Anda isi di formulir untuk melihat status permohonan, catatan admin, dan dokumen hasil."
        jejak={[{ label: 'Cek Status' }]}
      />
      <TrackingView />
      <section className="wadah mt-16 max-w-3xl">
        <h2 className="mb-5 text-2xl font-extrabold">Pertanyaan umum</h2>
        <Faq item={faqUmum.slice(1)} />
      </section>
    </MainLayout>
  );
}
