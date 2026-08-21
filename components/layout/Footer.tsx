'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Clock, ExternalLink, Instagram, Mail, MapPin, MessageCircle, Music2 } from 'lucide-react';

import { useLanguage } from '@/lib/i18n/LanguageContext';

/**
 * Pelat kaki: papan keterangan resmi fakultas.
 *
 * Ikon di sini berasal dari satu pustaka dengan ketebalan garis yang sama —
 * bukan emoji. Emoji dirender berbeda di tiap sistem operasi dan tidak punya
 * bobot visual yang bisa dikendalikan.
 */

const SOSIAL = [
  { href: 'https://www.instagram.com/fsti.itk', label: 'Instagram @fsti.itk', Ikon: Instagram },
  { href: 'https://www.tiktok.com/@fsti.itk', label: 'TikTok @fsti.itk', Ikon: Music2 },
];

const PEJABAT: { kunci: string; nama: string }[] = [
  { kunci: 'footer.dean', nama: 'Adi Mahmud Jaya Marindra, S.T., M.Eng., Ph.D.' },
  { kunci: 'footer.vdAcademic', nama: 'Irma Fitria, S.Si., M.Si.' },
  { kunci: 'footer.vdFinance', nama: 'Yun Tonce Kusuma Priyanto, S.T., M.T.' },
  { kunci: 'footer.headScienceData', nama: 'Dr. Swastya Rahastama, S.Si., M.Si.' },
  { kunci: 'footer.headTEIB', nama: 'M. Ihsan Alfani Putera, S.Tr.Kom, M.Kom' },
];

const PINTASAN = [
  { href: '/', kunci: 'footer.home', luar: false },
  { href: '/layanan-administrasi', kunci: 'footer.services', luar: false },
  { href: '/tracking', kunci: 'footer.tracking', luar: false },
  { href: 'https://itk.ac.id', kunci: 'footer.itkWebsite', luar: true },
];

/** Membuang titik dua di ujung label terjemahan agar legenda tetap bersih. */
function tanpaTitikDua(s: string): string {
  return s.replace(/\s*:\s*$/, '');
}

function Legenda({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="legenda border-b border-white/15 pb-2.5 text-arah-400">{children}</h2>
  );
}

export default function Footer() {
  const { t, language } = useLanguage();

  return (
    <footer id="kontak" className="pita-zona relative">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16">
        <div className="grid gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {/* ── Identitas & alamat ──────────────────────────────────────── */}
          <section>
            <Legenda>{t('footer.about')}</Legenda>

            <div className="mt-5 flex items-start gap-3.5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm bg-white p-1.5">
                <Image
                  src="/images/logofsti.png"
                  alt=""
                  width={32}
                  height={32}
                  className="h-full w-full object-contain"
                />
              </span>
              <div className="min-w-0">
                <p className="font-display text-sm font-bold leading-snug text-white">
                  {t('common.siteTitle')}
                </p>
                <p className="mt-0.5 text-sm text-primary-200">{t('common.university')}</p>
              </div>
            </div>

            <p className="mt-5 flex items-start gap-2.5 text-sm leading-relaxed text-primary-200">
              <MapPin aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-white/40" strokeWidth={1.75} />
              <span>
                Kampus ITK, Jl. Soekarno Hatta KM 15, Karang Joang,
                <br />
                Balikpapan Utara, Kalimantan Timur 76127
              </span>
            </p>

            <ul className="mt-6 flex gap-2">
              {SOSIAL.map(({ href, label, Ikon }) => (
                <li key={href}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    title={label}
                    className="flex h-10 w-10 items-center justify-center rounded-sm bg-white/10 text-white/80 transition-colors hover:bg-arah-400 hover:text-primary-950"
                  >
                    <Ikon aria-hidden className="h-[18px] w-[18px]" strokeWidth={1.75} />
                  </a>
                </li>
              ))}
            </ul>
          </section>

          {/* ── Kontak ──────────────────────────────────────────────────── */}
          <section>
            <Legenda>{t('footer.contact')}</Legenda>

            <dl className="mt-5 space-y-5">
              <div className="flex items-start gap-2.5">
                <Mail aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-white/40" strokeWidth={1.75} />
                <div className="min-w-0">
                  <dt className="legenda text-white/50">{tanpaTitikDua(t('footer.email'))}</dt>
                  <dd className="mt-1">
                    <a
                      href="mailto:fsti@itk.ac.id"
                      className="text-sm text-white underline decoration-white/25 underline-offset-4 transition-colors hover:decoration-arah-400"
                    >
                      fsti@itk.ac.id
                    </a>
                  </dd>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MessageCircle aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-white/40" strokeWidth={1.75} />
                <div className="min-w-0 flex-1">
                  <dt className="legenda text-white/50">WhatsApp</dt>
                  <dd className="mt-2 flex flex-wrap gap-2">
                    {[
                      {
                        nama: language === 'en' ? 'Academic' : 'Akademik',
                        nomor: '0851-7230-2157',
                        href: 'https://wa.me/6285172302157?text=Halo%20FSTI%20ITK,%20saya%20ingin%20bertanya%20tentang%20akademik%20',
                      },
                      {
                        nama: language === 'en' ? 'Finance' : 'Keuangan',
                        nomor: '0851-7231-2157',
                        href: 'https://wa.me/6285172312157?text=Halo%20FSTI%20ITK,%20saya%20ingin%20bertanya%20tentang%20keuangan%20',
                      },
                    ].map((w) => (
                      <a
                        key={w.nomor}
                        href={w.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group rounded-sm border border-white/15 px-3 py-2 transition-colors hover:border-arah-400/60 hover:bg-white/5"
                      >
                        <span className="legenda block text-white/50 transition-colors group-hover:text-arah-400">
                          {w.nama}
                        </span>
                        <span className="angka-pelat mt-0.5 block text-sm text-white">
                          {w.nomor}
                        </span>
                      </a>
                    ))}
                  </dd>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-white/40" strokeWidth={1.75} />
                <div className="min-w-0">
                  <dt className="legenda text-white/50">{tanpaTitikDua(t('footer.operationalHours'))}</dt>
                  <dd className="mt-1 space-y-0.5 text-sm text-primary-200">
                    <p>{t('footer.operationalTime1')}</p>
                    <p>{t('footer.operationalTime2')}</p>
                  </dd>
                </div>
              </div>
            </dl>
          </section>

          {/* ── Struktur ────────────────────────────────────────────────── */}
          <section className="md:col-span-2 lg:col-span-1">
            <Legenda>{t('footer.organization')}</Legenda>

            <dl className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {PEJABAT.map(({ kunci, nama }) => (
                <div key={kunci} className="border-l border-white/15 pl-3">
                  <dt className="legenda text-white/50">{tanpaTitikDua(t(kunci))}</dt>
                  <dd className="mt-1 text-sm leading-snug text-white">{nama}</dd>
                </div>
              ))}
            </dl>
          </section>
        </div>

        {/* ── Pintasan & hak cipta ──────────────────────────────────────── */}
        <div className="mt-14 border-t border-white/15 pt-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {PINTASAN.map(({ href, kunci, luar }) => {
                const kelas =
                  'inline-flex items-center gap-1.5 text-sm text-primary-200 transition-colors hover:text-arah-400';
                return (
                  <li key={href}>
                    {luar ? (
                      <a href={href} target="_blank" rel="noopener noreferrer" className={kelas}>
                        {tanpaTitikDua(t(kunci))}
                        <ExternalLink aria-hidden className="h-3.5 w-3.5" />
                      </a>
                    ) : (
                      <Link href={href} className={kelas}>
                        {tanpaTitikDua(t(kunci))}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>

            <p className="text-sm text-white/45">
              {t('common.copyright')} {t('common.developedBy')}{' '}
              <a
                href="https://aidilsaputrakirsan.github.io"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-200 underline underline-offset-4 transition-colors hover:text-arah-400"
              >
                ADL
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
