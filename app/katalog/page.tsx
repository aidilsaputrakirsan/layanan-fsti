import type { Metadata } from 'next';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/ui/PageHeader';
import KatalogView from '@/components/layanan/KatalogView';
import { layanan } from '@/data/layanan';

export const metadata: Metadata = {
  title: 'Katalog Layanan',
  description: 'Daftar lengkap layanan administrasi FSTI ITK beserta persyaratan, estimasi waktu, biaya, dan SOP.',
};

export default function Katalog() {
  return (
    <MainLayout>
      <PageHeader
        label="Katalog"
        judul="Katalog Layanan FSTI"
        deskripsi={`${layanan.length} layanan dalam satu daftar. Buka detail untuk melihat persyaratan, estimasi waktu, biaya, hasil layanan, dan SOP-nya.`}
        jejak={[{ label: 'Katalog Layanan' }]}
      />
      <KatalogView />
    </MainLayout>
  );
}
