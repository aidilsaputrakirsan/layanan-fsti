'use client';

import Link from 'next/link';
import { ArrowRight, GraduationCap, Users } from 'lucide-react';

import MainLayout from '@/components/layout/MainLayout';
import { useLanguage } from '@/lib/i18n/LanguageContext';

const JALUR = [
  {
    href: '/tracking/mahasiswa',
    kode: 'MHS',
    judul: 'tracking.students',
    keterangan: 'tracking.studentDesc',
    Ikon: GraduationCap,
  },
  {
    href: '/tracking/dosen',
    kode: 'DSN',
    judul: 'tracking.lecturerStaff',
    keterangan: 'tracking.lecturerDesc',
    Ikon: Users,
  },
];

const TANYA = [
  'tracking.faq.whatIs',
  'tracking.faq.howToUse',
  'tracking.faq.processingTime',
  'tracking.faq.statusNotChanging',
];

export default function TrackingSelectionPage() {
  const { t, language } = useLanguage();
  const bahasa = language === 'en' ? 'en' : 'id';

  return (
    <MainLayout>
      {/* ══ PITA ZONA ══════════════════════════════════════════════════════ */}
      <section className="pita-zona pb-9 pt-10 sm:pb-11 sm:pt-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <p className="legenda text-arah-400">
            {bahasa === 'en'
              ? 'Faculty of Science and Information Technology · ITK'
              : 'Fakultas Sains dan Teknologi Informasi · ITK'}
          </p>
          <h1 className="mt-3 max-w-[20ch] font-display text-[2rem] font-extrabold leading-[1.05] tracking-tight text-white sm:text-[2.5rem] lg:text-[3rem]">
            {t('tracking.title')}
          </h1>
          <p className="mt-4 max-w-[68ch] text-base leading-relaxed text-primary-200">
            {t('tracking.description')}
          </p>
        </div>
      </section>

      {/* ══ PILIH JALUR ════════════════════════════════════════════════════ */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
        <h2 className="legenda mb-3">
          {bahasa === 'en' ? 'Choose your lane' : 'Pilih jalur Anda'}
        </h2>

        <ul className="max-w-4xl overflow-hidden rounded-md border border-tinta-200 bg-white shadow-pelat">
          {JALUR.map(({ href, kode, judul, keterangan, Ikon }) => (
            <li key={href} className="group relative border-t border-tinta-100 first:border-t-0">
              <span
                aria-hidden
                className="absolute bottom-0 left-0 top-0 w-[3px] origin-top scale-y-0 bg-arah-400 transition-transform duration-200 ease-rambu group-hover:scale-y-100 group-focus-within:scale-y-100"
              />
              <Link
                href={href}
                className="flex items-center gap-4 py-5 pl-5 pr-4 transition-colors hover:bg-tinta-50"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm bg-primary-950 text-arah-400">
                  <Ikon aria-hidden className="h-5 w-5" strokeWidth={1.75} />
                </span>

                <span className="min-w-0 flex-1">
                  <span className="legenda angka-pelat block text-tinta-300">{kode}</span>
                  <span className="mt-0.5 block font-display text-base font-bold leading-snug text-tinta-900 group-hover:text-primary-700">
                    {t(judul)}
                  </span>
                  <span className="mt-1 block max-w-[68ch] text-sm leading-relaxed text-tinta-500">
                    {t(keterangan)}
                  </span>
                </span>

                <ArrowRight
                  aria-hidden
                  className="h-4 w-4 shrink-0 text-tinta-300 transition-all duration-200 ease-rambu group-hover:translate-x-1 group-hover:text-arah-500"
                />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* ══ TANYA JAWAB ════════════════════════════════════════════════════ */}
      <section className="border-t border-tinta-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
          <h2 className="font-display text-2xl font-extrabold tracking-tight text-tinta-900">
            {t('tracking.faq.title')}
          </h2>

          <dl className="mt-7 max-w-3xl divide-y divide-tinta-100 border-y border-tinta-200">
            {TANYA.map((kunci) => (
              <div key={kunci} className="py-5">
                <dt className="font-display text-[0.9375rem] font-bold leading-snug text-tinta-900">
                  {t(`${kunci}.question`)}
                </dt>
                <dd className="mt-2 max-w-[72ch] text-sm leading-relaxed text-tinta-500">
                  {t(`${kunci}.answer`)}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </MainLayout>
  );
}
