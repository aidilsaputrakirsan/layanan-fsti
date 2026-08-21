'use client';

import { useState } from 'react';
import { Building2, ExternalLink, GraduationCap, Handshake, Users } from 'lucide-react';

import MainLayout from '@/components/layout/MainLayout';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { cn } from '@/lib/utils';

const SURVEY_LINKS = {
  dosenTendik: {
    embedUrl:
      'https://docs.google.com/forms/d/e/1FAIpQLSeFR7tN9RoOWGqz-E--tMcZKMv_iREVkzC9VINta2kkpaZS0Q/viewform?embedded=true',
    directUrl:
      'https://docs.google.com/forms/d/e/1FAIpQLSeFR7tN9RoOWGqz-E--tMcZKMv_iREVkzC9VINta2kkpaZS0Q/viewform?usp=header',
    label: { id: 'Dosen / Tendik', en: 'Lecturer / Staff' },
    icon: Users,
  },
  mahasiswa: {
    embedUrl:
      'https://docs.google.com/forms/d/e/1FAIpQLSeTQFzGhGqFMDlKHL8qKzDuIrl04HTZWduzK60clBEK9y7Q7g/viewform?embedded=true',
    directUrl:
      'https://docs.google.com/forms/d/e/1FAIpQLSeTQFzGhGqFMDlKHL8qKzDuIrl04HTZWduzK60clBEK9y7Q7g/viewform?usp=header',
    label: { id: 'Mahasiswa', en: 'Student' },
    icon: GraduationCap,
  },
  mitraKinerja: {
    embedUrl:
      'https://docs.google.com/forms/d/e/1FAIpQLSeNngVVYpeDWgEarAmpB1qVf8-kfD-BLyS4k01WBh2TJeUCkg/viewform?embedded=true',
    directUrl:
      'https://docs.google.com/forms/d/e/1FAIpQLSeNngVVYpeDWgEarAmpB1qVf8-kfD-BLyS4k01WBh2TJeUCkg/viewform',
    label: { id: 'Mitra – Kinerja Mahasiswa KP', en: 'Partner – Student Internship' },
    icon: Handshake,
  },
  mitraPengguna: {
    embedUrl:
      'https://docs.google.com/forms/d/e/1FAIpQLScjIZsD5xG_-v9iinQY8vKVuCYFBencPTKftccY9Traqfm-iA/viewform?embedded=true',
    directUrl:
      'https://docs.google.com/forms/d/e/1FAIpQLScjIZsD5xG_-v9iinQY8vKVuCYFBencPTKftccY9Traqfm-iA/viewform',
    label: { id: 'Mitra – Pengguna FSTI ITK', en: 'Partner – FSTI ITK Users' },
    icon: Building2,
  },
};

type KunciTab = keyof typeof SURVEY_LINKS;

export default function SurveyKepuasanPage() {
  const { language } = useLanguage();
  const bahasa = language === 'en' ? 'en' : 'id';
  const [tabAktif, setTabAktif] = useState<KunciTab>('mahasiswa');

  const tabs = Object.entries(SURVEY_LINKS) as [KunciTab, (typeof SURVEY_LINKS)[KunciTab]][];
  const aktif = SURVEY_LINKS[tabAktif];

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
            {bahasa === 'en' ? 'Service Satisfaction Survey' : 'Survei Kepuasan Layanan'}
          </h1>
          <p className="mt-4 max-w-[68ch] text-base leading-relaxed text-primary-200">
            {bahasa === 'en'
              ? 'Help us improve this service by sharing your experience. Each group has its own form — choose the one that fits you.'
              : 'Bantu kami memperbaiki layanan ini dengan menceritakan pengalaman Anda. Tiap kelompok punya formulirnya sendiri — pilih yang sesuai.'}
          </p>
        </div>
      </section>

      {/* ══ PILIH FORMULIR ═════════════════════════════════════════════════ */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10">
        <h2 className="legenda mb-3">
          {bahasa === 'en' ? 'I am filling this in as' : 'Saya mengisi sebagai'}
        </h2>

        <div className="flex flex-wrap gap-2" role="group">
          {tabs.map(([kunci, isi]) => {
            const Ikon = isi.icon;
            const dipilih = tabAktif === kunci;
            return (
              <button
                key={kunci}
                type="button"
                aria-pressed={dipilih}
                onClick={() => setTabAktif(kunci)}
                className={cn(
                  'inline-flex items-center gap-2 rounded-sm border px-4 py-2.5 text-sm font-medium transition-colors',
                  dipilih
                    ? 'border-primary-950 bg-primary-950 text-white'
                    : 'border-tinta-200 bg-white text-tinta-700 hover:border-tinta-300 hover:bg-tinta-50'
                )}
              >
                <Ikon
                  aria-hidden
                  className={cn('h-4 w-4 shrink-0', dipilih ? 'text-arah-400' : 'text-tinta-300')}
                  strokeWidth={1.75}
                />
                {isi.label[bahasa]}
              </button>
            );
          })}
        </div>

        {/* ── Panel formulir ───────────────────────────────────────────── */}
        <div className="mt-6 overflow-hidden rounded-md border border-tinta-200 bg-white shadow-pelat">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-tinta-200 bg-tinta-50 px-4 py-3">
            <p className="legenda">
              {bahasa === 'en' ? 'Form' : 'Formulir'}
              <span className="mx-2 text-tinta-300">/</span>
              <span className="normal-case tracking-normal text-tinta-900">
                {aktif.label[bahasa]}
              </span>
            </p>
            <a
              href={aktif.directUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-700 transition-colors hover:text-primary-800"
            >
              {bahasa === 'en' ? 'Open in a new tab' : 'Buka di tab baru'}
              <ExternalLink aria-hidden className="h-3.5 w-3.5" />
            </a>
          </div>

          <iframe
            key={tabAktif}
            src={aktif.embedUrl}
            title={`${bahasa === 'en' ? 'Survey' : 'Survei'} — ${aktif.label[bahasa]}`}
            className="block h-[70vh] min-h-[560px] w-full border-0 bg-white"
            loading="lazy"
            style={{ colorScheme: 'light' }}
          />
        </div>

        <p className="mt-3 text-sm text-tinta-500">
          {bahasa === 'en'
            ? 'The form is hosted on Google Forms. If it does not load here, open it in a new tab.'
            : 'Formulir ini berada di Google Forms. Jika tidak termuat di sini, buka saja di tab baru.'}
        </p>
      </section>
    </MainLayout>
  );
}
