import Link from 'next/link';
import { Home, LibraryBig } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import CariLayanan from '@/components/layanan/CariLayanan';

export default function NotFound() {
  return (
    <MainLayout>
      <section className="wadah flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <p className="font-mono text-sm font-bold tracking-widest text-primary-600">404</p>
        <h1 className="mt-3 text-4xl font-extrabold">Halaman tidak ditemukan</h1>
        <p className="mt-3 max-w-md text-ink-2">
          Alamat yang Anda buka mungkin sudah dipindahkan. Coba cari layanan yang Anda butuhkan di bawah ini.
        </p>
        <div className="mt-8 w-full max-w-xl text-left">
          <CariLayanan />
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="tombol-utama">
            <Home className="h-4 w-4" /> Ke beranda
          </Link>
          <Link href="/katalog" className="tombol-garis">
            <LibraryBig className="h-4 w-4" /> Katalog layanan
          </Link>
        </div>
      </section>
    </MainLayout>
  );
}
