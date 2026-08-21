'use client';

import { useMemo, useRef, useState } from 'react';
import { Download, FileText, Info, Search, X } from 'lucide-react';

import MainLayout from '@/components/layout/MainLayout';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { cn } from '@/lib/utils';
import {
  DOKUMEN,
  KELOMPOK_DOKUMEN,
  type Dokumen,
  type KelompokDokumen,
  type TeksDwibahasa,
} from '@/lib/data/dokumen';
import UKURAN from '@/lib/data/ukuran-berkas.json';

type Bahasa = 'id' | 'en';

const petaUkuran = UKURAN as Record<string, { bita: number; teks: string }>;

/** Nama berkas menyertakan spasi dan kurung siku; keduanya harus disandikan. */
function alamatBerkas(url: string): string {
  return encodeURI(url).replace(/\[/g, '%5B').replace(/\]/g, '%5D');
}

/** Ukuran nyata berkas, atau null bila berkasnya belum tercatat. */
function ukuran(url: string): string | null {
  return petaUkuran[url]?.teks ?? null;
}

function normalkan(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function tks(t: TeksDwibahasa, bahasa: Bahasa): string {
  return bahasa === 'en' ? t.en : t.id;
}

/** Total bita seluruh berkas milik satu dokumen. Dipakai untuk peringatan unduhan besar. */
function bitaDokumen(d: Dokumen): number {
  const daftar = d.files?.length ? d.files.map((f) => f.fileUrl) : [d.fileUrl];
  return daftar.reduce((n, url) => n + (petaUkuran[url]?.bita ?? 0), 0);
}

const AMBANG_BESAR = 20 * 1024 * 1024;

function BarisDokumen({ dokumen, bahasa }: { dokumen: Dokumen; bahasa: Bahasa }) {
  const besar = bitaDokumen(dokumen) > AMBANG_BESAR;
  const berkas = dokumen.files?.length
    ? dokumen.files
    : [{ label: null as TeksDwibahasa | null, fileUrl: dokumen.fileUrl }];

  return (
    <li id={dokumen.id} className="scroll-mt-28 border-t border-tinta-100 first:border-t-0">
      <div className="flex items-start gap-4 px-4 py-4 sm:px-5">
        <FileText
          aria-hidden
          className="mt-0.5 h-5 w-5 shrink-0 text-tinta-300"
          strokeWidth={1.75}
        />

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
            <h3 className="font-display text-[0.9375rem] font-bold leading-snug text-tinta-900">
              {tks(dokumen.title, bahasa)}
            </h3>
            {dokumen.baru && (
              <span className="legenda rounded-sm bg-arah-100 px-1.5 py-0.5 text-arah-700">
                {bahasa === 'en' ? 'New' : 'Baru'}
              </span>
            )}
          </div>

          <p className="mt-1 max-w-[72ch] text-sm leading-relaxed text-tinta-500">
            {tks(dokumen.description, bahasa)}
          </p>

          <ul className="mt-3 flex flex-wrap gap-2">
            {berkas.map((f) => {
              const besarnya = ukuran(f.fileUrl);
              return (
                <li key={f.fileUrl}>
                  <a
                    href={alamatBerkas(f.fileUrl)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 rounded-sm border border-tinta-200 px-3 py-2 transition-colors hover:border-primary-300 hover:bg-primary-50"
                  >
                    <Download
                      aria-hidden
                      className="h-3.5 w-3.5 shrink-0 text-tinta-300 transition-colors group-hover:text-primary-700"
                      strokeWidth={2}
                    />
                    <span className="text-sm font-medium text-tinta-900 group-hover:text-primary-800">
                      {f.label
                        ? tks(f.label, bahasa)
                        : bahasa === 'en'
                          ? 'Download PDF'
                          : 'Unduh PDF'}
                    </span>
                    {besarnya && (
                      <span className="legenda angka-pelat text-tinta-300">{besarnya}</span>
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          {besar && (
            <p className="legenda mt-2.5 normal-case tracking-normal text-arah-700">
              {bahasa === 'en'
                ? 'Large file — consider downloading on Wi-Fi.'
                : 'Berkas besar — sebaiknya diunduh saat terhubung Wi-Fi.'}
            </p>
          )}
        </div>
      </div>
    </li>
  );
}

export default function PeraturanKebijakanPage() {
  const { language } = useLanguage();
  const bahasa = (language === 'en' ? 'en' : 'id') as Bahasa;
  const [kueri, setKueri] = useState('');
  const kolomCari = useRef<HTMLInputElement>(null);

  const cocok = useMemo(() => {
    const kata = normalkan(kueri).split(' ').filter(Boolean);
    if (kata.length === 0) return DOKUMEN;
    return DOKUMEN.filter((d) => {
      const ladang = normalkan(
        [d.title.id, d.title.en, d.description.id, d.description.en, d.fileUrl].join(' ')
      );
      return kata.every((k) => ladang.includes(k));
    });
  }, [kueri]);

  const kelompokTampil = useMemo(() => {
    const urutan: KelompokDokumen[] = ['pokok', 'tugas', 'mbkm'];
    return urutan
      .map((k) => ({ kunci: k, isi: cocok.filter((d) => d.kelompok === k) }))
      .filter((g) => g.isi.length > 0);
  }, [cocok]);

  const totalBita = useMemo(() => DOKUMEN.reduce((n, d) => n + bitaDokumen(d), 0), []);

  return (
    <MainLayout>
      {/* ══ PITA ZONA ══════════════════════════════════════════════════════ */}
      <section className="pita-zona pb-9 pt-10 sm:pb-11 sm:pt-14">
        <div className="mx-auto grid max-w-7xl gap-x-12 gap-y-8 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_17rem]">
          <div className="min-w-0">
            <p className="legenda text-arah-400">
              {bahasa === 'en'
                ? 'Faculty of Science and Information Technology · ITK'
                : 'Fakultas Sains dan Teknologi Informasi · ITK'}
            </p>

            <h1 className="mt-3 max-w-[22ch] font-display text-[2rem] font-extrabold leading-[1.05] tracking-tight text-white sm:text-[2.5rem] lg:text-[3rem]">
              {bahasa === 'en'
                ? 'Regulations, Policies & Student Guidelines'
                : 'Peraturan, Kebijakan & Panduan Mahasiswa'}
            </h1>

            <div className="mt-6 max-w-2xl">
              <label htmlFor="cari-dokumen" className="sr-only">
                {bahasa === 'en' ? 'Search documents' : 'Cari dokumen'}
              </label>
              <div className="relative">
                <Search
                  aria-hidden
                  className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-tinta-500"
                />
                <input
                  id="cari-dokumen"
                  ref={kolomCari}
                  type="search"
                  value={kueri}
                  onChange={(e) => setKueri(e.target.value)}
                  placeholder={
                    bahasa === 'en'
                      ? 'Search a document — e.g. final project, MBKM, tuition'
                      : 'Cari dokumen — misal: tugas akhir, MBKM, biaya'
                  }
                  className={cn(
                    'h-14 w-full rounded-md border-2 border-transparent bg-white pl-12 pr-24',
                    'font-display text-base font-medium text-tinta-900',
                    'placeholder:font-sans placeholder:font-normal placeholder:text-tinta-500',
                    'shadow-angkat outline-none transition-colors focus:border-arah-400',
                    '[&::-webkit-search-cancel-button]:hidden'
                  )}
                />
                {kueri && (
                  <button
                    type="button"
                    onClick={() => {
                      setKueri('');
                      kolomCari.current?.focus();
                    }}
                    className="absolute right-3 top-1/2 flex h-9 -translate-y-1/2 items-center gap-1.5 rounded px-2.5 text-tinta-500 transition-colors hover:bg-tinta-50 hover:text-tinta-900"
                  >
                    <X className="h-4 w-4" />
                    <span className="legenda hidden sm:inline">
                      {bahasa === 'en' ? 'Clear' : 'Hapus'}
                    </span>
                  </button>
                )}
              </div>
            </div>
          </div>

          <dl className="self-end border-t border-white/15 pt-5 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
            <div className="grid grid-cols-2 gap-x-8 gap-y-5 lg:grid-cols-1">
              <div>
                <dt className="legenda text-white/50">
                  {bahasa === 'en' ? 'On this board' : 'Isi papan ini'}
                </dt>
                <dd className="angka-pelat mt-1.5 font-display text-sm font-semibold text-white">
                  {kueri
                    ? `${cocok.length} ${bahasa === 'en' ? 'matches' : 'hasil'}`
                    : `${DOKUMEN.length} ${bahasa === 'en' ? 'documents' : 'dokumen'}`}
                </dd>
              </div>
              <div>
                <dt className="legenda text-white/50">
                  {bahasa === 'en' ? 'Total size' : 'Total ukuran'}
                </dt>
                <dd className="angka-pelat mt-1.5 text-sm text-white">
                  {(totalBita / 1024 / 1024).toFixed(0)} MB
                </dd>
              </div>
              <div className="col-span-full">
                <dt className="legenda text-white/50">
                  {bahasa === 'en' ? 'Format' : 'Format'}
                </dt>
                <dd className="mt-1.5 text-sm text-primary-200">
                  {bahasa === 'en'
                    ? 'PDF · opens in a new tab'
                    : 'PDF · terbuka di tab baru'}
                </dd>
              </div>
            </div>
          </dl>
        </div>
      </section>

      {/* ══ INDEKS DOKUMEN ═════════════════════════════════════════════════ */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
        {kelompokTampil.length > 0 ? (
          <div className="max-w-4xl space-y-6">
            {kelompokTampil.map(({ kunci, isi }) => (
              <section key={kunci}>
                <h2 className="legenda mb-3">
                  {tks(KELOMPOK_DOKUMEN[kunci], bahasa)}
                  <span className="mx-2 text-tinta-300">/</span>
                  <span className="angka-pelat text-tinta-900">{isi.length}</span>
                </h2>
                <ul className="overflow-hidden rounded-md border border-tinta-200 bg-white shadow-pelat">
                  {isi.map((d) => (
                    <BarisDokumen key={d.id} dokumen={d} bahasa={bahasa} />
                  ))}
                </ul>
              </section>
            ))}
          </div>
        ) : (
          <div className="max-w-4xl rounded-md border border-dashed border-tinta-300 bg-white px-6 py-12 text-center">
            <p className="font-display text-lg font-bold text-tinta-900">
              {bahasa === 'en'
                ? `No document matches “${kueri}”`
                : `Tidak ada dokumen yang cocok dengan “${kueri}”`}
            </p>
            <p className="mx-auto mt-2 max-w-[52ch] text-sm leading-relaxed text-tinta-500">
              {bahasa === 'en'
                ? 'Try a shorter keyword, or the term used on the document cover.'
                : 'Coba kata kunci yang lebih pendek, atau istilah yang tertulis pada sampul dokumennya.'}
            </p>
            <button
              type="button"
              onClick={() => {
                setKueri('');
                kolomCari.current?.focus();
              }}
              className="mt-6 rounded-sm bg-primary-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-700"
            >
              {bahasa === 'en' ? 'Show all documents' : 'Tampilkan semua dokumen'}
            </button>
          </div>
        )}
      </section>

      {/* ══ KETERANGAN ═════════════════════════════════════════════════════ */}
      <section className="border-t border-tinta-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14">
          <div className="flex max-w-3xl items-start gap-3.5">
            <Info aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-arah-500" strokeWidth={1.75} />
            <div>
              <h2 className="font-display text-lg font-extrabold tracking-tight text-tinta-900">
                {bahasa === 'en' ? 'Important information' : 'Informasi penting'}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-tinta-700">
                {bahasa === 'en'
                  ? 'These documents are official guidelines established by Kalimantan Institute of Technology and the Faculty of Science and Information Technology. Students are expected to read and understand them for the smooth running of academic activities.'
                  : 'Dokumen-dokumen ini merupakan pedoman resmi yang ditetapkan oleh Institut Teknologi Kalimantan dan Fakultas Sains dan Teknologi Informasi. Mahasiswa diharapkan membaca dan memahaminya demi kelancaran kegiatan akademik.'}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-tinta-500">
                {bahasa === 'en'
                  ? 'All documents can be downloaded and kept for reference. If anything needs clarification, contact the FSTI administration.'
                  : 'Seluruh dokumen dapat diunduh dan disimpan sebagai rujukan. Jika ada yang perlu diklarifikasi, silakan hubungi tata usaha FSTI.'}
              </p>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
