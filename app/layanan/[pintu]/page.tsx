import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/ui/PageHeader';
import PintuView from '@/components/layanan/PintuView';
import { pintu, getPintu, jumlahLayanan } from '@/data/layanan';

export function generateStaticParams() {
  return pintu.map((p) => ({ pintu: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ pintu: string }> }): Promise<Metadata> {
  const p = getPintu((await params).pintu);
  return p ? { title: p.nama, description: `${p.nama} FSTI ITK untuk ${p.untuk}: ${p.ringkas}` } : {};
}

export default async function HalamanPintu({ params }: { params: Promise<{ pintu: string }> }) {
  const p = getPintu((await params).pintu);
  if (!p) notFound();

  return (
    <MainLayout>
      <PageHeader
        label={`Pintu ${p.nomor} · ${p.untuk}`}
        judul={p.nama}
        deskripsi={`${p.ringkas} ${jumlahLayanan(p)} layanan dalam ${p.kelompok.length} kelompok.`}
        jejak={[{ label: 'Layanan', href: '/layanan' }, { label: p.nama }]}
      >
        <div className="mt-8 flex flex-wrap gap-2">
          {pintu.map((x) => (
            <Link
              key={x.id}
              href={`/layanan/${x.id}`}
              aria-current={x.id === p.id ? 'page' : undefined}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                x.id === p.id ? 'bg-white text-primary-800' : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              {x.nama}
            </Link>
          ))}
        </div>
      </PageHeader>
      <PintuView pintuId={p.id} />
    </MainLayout>
  );
}
