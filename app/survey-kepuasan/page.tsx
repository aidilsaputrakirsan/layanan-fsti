import type { Metadata } from 'next';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/ui/PageHeader';
import SurveiView from '@/components/survei/SurveiView';

export const metadata: Metadata = {
  title: 'Survei Kepuasan Layanan',
  description: 'Berikan penilaian atas layanan administrasi FSTI ITK.',
};

export default function SurveiKepuasan() {
  return (
    <MainLayout>
      <PageHeader
        label="Survei"
        judul="Survei kepuasan layanan"
        deskripsi="Satu menit dari Anda membantu kami memperbaiki layanan. Hasil survei direkap sebagai Indeks Kepuasan di Dashboard Layanan."
        jejak={[{ label: 'Survei Kepuasan' }]}
      />
      <SurveiView />
    </MainLayout>
  );
}
