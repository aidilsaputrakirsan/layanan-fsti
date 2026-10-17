import type { Metadata } from 'next';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/ui/PageHeader';
import DashboardView from '@/components/dashboard/DashboardView';

export const metadata: Metadata = {
  title: 'Dashboard Layanan',
  description: 'Rekap berkala jumlah, kecepatan, dan kepuasan layanan administrasi FSTI ITK.',
};

export default function Dashboard() {
  return (
    <MainLayout>
      <PageHeader
        label="Transparansi"
        judul="Dashboard hasil layanan"
        deskripsi="Rekap jumlah permohonan, kecepatan penyelesaian, dan indeks kepuasan. Diperbarui berkala oleh admin FSTI — hanya angka agregat, tanpa data pribadi."
        jejak={[{ label: 'Dashboard Layanan' }]}
      />
      <DashboardView />
    </MainLayout>
  );
}
