import type { Metadata } from 'next';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/ui/PageHeader';
import DashboardView from '@/components/dashboard/DashboardView';
import { ambilRekap, semesterSekarang } from '@/lib/rekap';

export const metadata: Metadata = {
  title: 'Dashboard Layanan',
  description: 'Rekap jumlah, status, dan kepuasan layanan administrasi FSTI ITK per semester.',
};

// Rekap dibaca ulang dari spreadsheet paling sering sekali per jam
export const revalidate = 3600;

export default async function Dashboard() {
  const rekap = await ambilRekap();

  return (
    <MainLayout>
      <PageHeader
        label="Transparansi"
        judul="Dashboard hasil layanan"
        deskripsi="Rekap permohonan layanan mahasiswa dan dosen per semester, diperbarui otomatis dari data layanan. Hanya angka total — tanpa data pribadi."
        jejak={[{ label: 'Dashboard Layanan' }]}
      />
      <DashboardView rekap={rekap} semesterKini={semesterSekarang()} />
    </MainLayout>
  );
}
