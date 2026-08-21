'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ArrowRight, ArrowUpRight, Mail, MessageCircle, Search } from 'lucide-react';

import MainLayout from '@/components/layout/MainLayout';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { cn } from '@/lib/utils';
import { LAYANAN } from '@/lib/data/layanan';
import { jumlahTautan, ratakan, teks, type Bahasa } from '@/lib/layanan-search';

const FOTO_KAMPUS = [
  '/images/beranda/b1.jpg',
  '/images/beranda/b2.jpg',
  '/images/beranda/b3.JPG',
  '/images/beranda/b4.JPG',
  '/images/beranda/b5.jpg',
  '/images/beranda/b6.jpg',
  '/images/beranda/b7.jpg',
  '/images/beranda/b8.jpg',
  '/images/beranda/b9.jpg',
  '/images/beranda/b10.jpg',
];

/**
 * Layanan yang paling sering dicari, dirujuk lewat slug ke katalog.
 *
 * Merujuk slug, bukan menyalin judul dan URL, berarti daftar ini tidak bisa
 * basi diam-diam: kalau slug-nya hilang dari katalog, barisnya ikut hilang
 * alih-alih menunjuk ke tautan mati.
 */
const SERING_DICARI = [
  'surat-pengantar',
  'surat-aktif-studi',
  'legalisasi',
  'ta-seminar-hasil',
  'keringanan-ukt',
  'mbkm-pendaftaran',
];

function LatarKampus() {
  const [aktif, setAktif] = useState(0);

  useEffect(() => {
    const jeda = setInterval(() => setAktif((n) => (n + 1) % FOTO_KAMPUS.length), 6000);
    return () => clearInterval(jeda);
  }, []);

  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      {FOTO_KAMPUS.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt=""
          fill
          priority={i === 0}
          sizes="100vw"
          className={cn(
            'object-cover transition-opacity duration-[1200ms] ease-rambu',
            i === aktif ? 'opacity-100' : 'opacity-0'
          )}
        />
      ))}
      {/* Selubung tipis dan merata saja. Teks tidak bersandar pada gelapnya
          foto — teks berdiri di atas pelat padat — jadi fotonya tidak perlu
          dikubur, cukup diredam agar satu nada dengan pelat. */}
      <div className="absolute inset-0 bg-primary-950/35" />
    </div>
  );
}

export default function HomePage() {
  const { t, language } = useLanguage();
  const bahasa = (language === 'en' ? 'en' : 'id') as Bahasa;
  const router = useRouter();
  const [kueri, setKueri] = useState('');

  const semuaTautan = useMemo(() => ratakan(), []);
  const seringDicari = useMemo(
    () =>
      SERING_DICARI.map((slug) => semuaTautan.find((h) => h.slug === slug)).filter(
        (h): h is NonNullable<typeof h> => Boolean(h)
      ),
    [semuaTautan]
  );

  const kirimPencarian = (e: React.FormEvent) => {
    e.preventDefault();
    const q = kueri.trim();
    router.push(q ? `/layanan-administrasi?q=${encodeURIComponent(q)}` : '/layanan-administrasi');
  };

  return (
    <MainLayout>
      {/* ══ PELAT PEMBUKA ══════════════════════════════════════════════════ */}
      <section className="relative isolate overflow-hidden text-white">
        <LatarKampus />

        <div className="relative mx-auto max-w-7xl px-0 py-0 sm:px-6 sm:py-12 lg:py-16">
          {/* Pelat papan nama: bidang navy padat bertepi tegas, dipasang di
              atas pemandangan — bukan gradasi yang melumurinya. */}
          <div className="relative max-w-3xl bg-primary-950 px-4 py-12 sm:rounded-md sm:px-10 sm:py-12">
            <span
              aria-hidden
              className="absolute inset-y-0 right-0 w-[3px] bg-arah-400 sm:rounded-r-md"
            />
            <p className="legenda text-arah-400">{t('common.university')}</p>

            <h1 className="mt-4 max-w-[18ch] font-display text-[2.25rem] font-extrabold leading-[1.05] tracking-tight sm:text-5xl">
            {t('home.hero.title')}
          </h1>

          <p className="mt-5 max-w-[62ch] text-base leading-relaxed text-primary-200 sm:text-lg">
            {t('home.hero.description')}
          </p>

          {/* ── Pintu masuk sesungguhnya: cari dari halaman depan ─────────── */}
          <form onSubmit={kirimPencarian} className="mt-8 max-w-2xl" role="search">
            <label htmlFor="cari-beranda" className="sr-only">
              {bahasa === 'en' ? 'Search services' : 'Cari layanan'}
            </label>
            <div className="relative">
              <Search
                aria-hidden
                className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-tinta-500"
              />
              <input
                id="cari-beranda"
                type="search"
                value={kueri}
                onChange={(e) => setKueri(e.target.value)}
                placeholder={
                  bahasa === 'en'
                    ? 'Search a service — e.g. results seminar, UKT'
                    : 'Cari layanan — misal: seminar hasil, UKT'
                }
                className={cn(
                  'h-14 w-full rounded-md border-2 border-transparent bg-white pl-12 pr-32',
                  'font-display text-base font-medium text-tinta-900',
                  'placeholder:font-sans placeholder:font-normal placeholder:text-tinta-500',
                  'shadow-angkat outline-none transition-colors focus:border-arah-400',
                  '[&::-webkit-search-cancel-button]:hidden'
                )}
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 flex h-10 -translate-y-1/2 items-center gap-1.5 rounded-sm bg-primary-600 px-4 text-sm font-medium text-white transition-colors hover:bg-primary-700"
              >
                {bahasa === 'en' ? 'Search' : 'Cari'}
                <ArrowRight aria-hidden className="h-4 w-4" />
              </button>
            </div>
            <p className="legenda angka-pelat mt-3 text-white/50">
              {jumlahTautan('semua')} {bahasa === 'en' ? 'links' : 'tautan'}
              <span className="mx-2 text-white/25">/</span>
              {LAYANAN.length} {bahasa === 'en' ? 'services' : 'layanan'}
            </p>
          </form>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/layanan-administrasi"
                className="inline-flex items-center gap-2 rounded-sm bg-arah-400 px-5 py-3 text-sm font-semibold text-primary-950 transition-colors hover:bg-arah-300"
              >
                {t('home.hero.viewServices')}
                <ArrowRight aria-hidden className="h-4 w-4" />
              </Link>
              <Link
                href="/tracking"
                className="inline-flex items-center gap-2 rounded-sm border border-white/25 px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-white/50 hover:bg-white/10"
              >
                {t('home.hero.trackDocuments')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══ SERING DICARI ══════════════════════════════════════════════════ */}
      <section className="border-b border-tinta-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="font-display text-2xl font-extrabold tracking-tight text-tinta-900">
                {t('home.popularServices.title')}
              </h2>
              <p className="mt-2 max-w-[62ch] text-sm leading-relaxed text-tinta-500">
                {t('home.popularServices.description')}
              </p>
            </div>
            <Link
              href="/layanan-administrasi"
              className="group inline-flex items-center gap-1.5 text-sm font-medium text-primary-700 transition-colors hover:text-primary-800"
            >
              {t('common.viewAll')}
              <ArrowRight
                aria-hidden
                className="h-4 w-4 transition-transform duration-200 ease-rambu group-hover:translate-x-1"
              />
            </Link>
          </div>

          {/* Baris, bukan kisi kartu — bahasa yang sama dengan papan direktori,
              sehingga berpindah halaman tidak terasa berpindah situs. */}
          <ul className="mt-7 overflow-hidden rounded-md border border-tinta-200 shadow-pelat">
            {seringDicari.map((h) => (
              <li key={h.slug} className="group relative border-t border-tinta-100 first:border-t-0">
                <span
                  aria-hidden
                  className="absolute bottom-0 left-0 top-0 w-[3px] origin-top scale-y-0 bg-arah-400 transition-transform duration-200 ease-rambu group-hover:scale-y-100 group-focus-within:scale-y-100"
                />
                <a
                  href={h.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 py-4 pl-5 pr-4 transition-colors hover:bg-tinta-50"
                >
                  <span className="min-w-0 flex-1">
                    <span className="legenda block truncate">
                      {teks(h.layanan.title, bahasa)}
                      {h.kelompok && (
                        <>
                          <span className="mx-1.5 text-tinta-300">/</span>
                          {teks(h.kelompok, bahasa)}
                        </>
                      )}
                    </span>
                    <span className="mt-1 block text-[0.9375rem] font-medium leading-snug text-tinta-900 group-hover:text-primary-700">
                      {teks(h.label, bahasa)}
                    </span>
                  </span>
                  <ArrowUpRight
                    aria-hidden
                    className="h-4 w-4 shrink-0 -translate-x-1 text-arah-500 opacity-0 transition-all duration-200 ease-rambu group-hover:translate-x-0 group-hover:opacity-100 group-focus-within:translate-x-0 group-focus-within:opacity-100"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ══ BANTUAN ════════════════════════════════════════════════════════ */}
      <section>
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16">
          <div className="max-w-2xl">
            <h2 className="font-display text-2xl font-extrabold tracking-tight text-tinta-900">
              {t('common.needHelp')}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-tinta-500">
              {t('services.needHelp.description')}
            </p>
          </div>

          <ul className="mt-6 grid gap-px overflow-hidden rounded-md border border-tinta-200 bg-tinta-200 sm:grid-cols-3">
            {[
              {
                label: { id: 'Surel fakultas', en: 'Faculty email' },
                nilai: 'fsti@itk.ac.id',
                href: 'mailto:fsti@itk.ac.id',
                Ikon: Mail,
              },
              {
                label: { id: 'WhatsApp akademik', en: 'WhatsApp academic' },
                nilai: '0851-7230-2157',
                href: 'https://wa.me/6285172302157?text=Halo%20FSTI%20ITK,%20saya%20ingin%20bertanya%20tentang%20akademik%20',
                Ikon: MessageCircle,
              },
              {
                label: { id: 'WhatsApp keuangan', en: 'WhatsApp finance' },
                nilai: '0851-7231-2157',
                href: 'https://wa.me/6285172312157?text=Halo%20FSTI%20ITK,%20saya%20ingin%20bertanya%20tentang%20keuangan%20',
                Ikon: MessageCircle,
              },
            ].map(({ label, nilai, href, Ikon }) => (
              <li key={nilai}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full items-start gap-3 bg-white px-4 py-4 transition-colors hover:bg-tinta-50"
                >
                  <Ikon
                    aria-hidden
                    className="mt-0.5 h-4 w-4 shrink-0 text-tinta-300 transition-colors group-hover:text-arah-500"
                    strokeWidth={1.75}
                  />
                  <span className="min-w-0">
                    <span className="legenda block">{label[bahasa]}</span>
                    <span className="angka-pelat mt-1 block text-sm font-medium text-tinta-900">
                      {nilai}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </MainLayout>
  );
}
