import type { Metadata } from 'next';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/ui/PageHeader';
import PintuKartu from '@/components/layanan/PintuKartu';
import CariLayanan from '@/components/layanan/CariLayanan';
import { pintu } from '@/data/layanan';

export const metadata: Metadata = { title: 'Layanan' };

export default function LayananIndeks() {
  return (
    <MainLayout>
      <PageHeader
        label="Layanan"
        judul="Pilih pintu layanan Anda"
        deskripsi="Layanan dikelompokkan berdasarkan siapa yang mengajukan. Pilih pintu yang sesuai, atau cari langsung nama layanannya."
        jejak={[{ label: 'Layanan' }]}
      >
        <div className="mt-8 max-w-xl">
          <CariLayanan gelap />
        </div>
      </PageHeader>
      <section className="wadah mt-12 grid gap-5 md:grid-cols-3">
        {pintu.map((p) => (
          <PintuKartu key={p.id} p={p} />
        ))}
      </section>
    </MainLayout>
  );
}
