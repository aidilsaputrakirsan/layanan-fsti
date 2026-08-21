'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { ExternalLink, Mail, MessageCircle, Search, X } from 'lucide-react';

import MainLayout from '@/components/layout/MainLayout';
import WorkflowDiagram from '@/components/ui/WorkflowDiagram';
import BarisTautan from '@/components/layanan/BarisTautan';
import PelatLayanan from '@/components/layanan/PelatLayanan';
import RailPapan from '@/components/layanan/RailPapan';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { cn } from '@/lib/utils';
import { LAYANAN, RUJUKAN, type Peran } from '@/lib/data/layanan';
import { cari, ratakan, teks, type Bahasa } from '@/lib/layanan-search';

type Saringan = Peran | 'semua';

const SARINGAN: { nilai: Saringan; label: { id: string; en: string } }[] = [
  { nilai: 'semua', label: { id: 'Semua', en: 'All' } },
  { nilai: 'mahasiswa', label: { id: 'Mahasiswa', en: 'Students' } },
  { nilai: 'dosen', label: { id: 'Dosen & Tendik', en: 'Lecturers & Staff' } },
];

/** Kode pelat papan: MHS-01, DSN-04, dan seterusnya. */
function kodePelat(peran: Peran, urutan: number): string {
  return `${peran === 'mahasiswa' ? 'MHS' : 'DSN'}-${String(urutan).padStart(2, '0')}`;
}

const ZONA_INTEGRITAS = [
  {
    src: '/images/zi.png',
    alt: {
      id: 'Anda memasuki Zona Integritas — mahasiswa dilarang memberi hadiah/bingkisan kepada Dosen, Tendik, Pembimbing, Penguji, dan Manajemen Program Studi',
      en: 'You are entering an Integrity Zone — students are prohibited from giving gifts to lecturers, staff, supervisors, examiners, or study program management',
    },
  },
  {
    src: '/images/zi2.png',
    alt: {
      id: 'Semua layanan kami gratis — laporkan ke fsti@itk.ac.id jika ada pungutan',
      en: 'All our services are free — report to fsti@itk.ac.id if there is any charge',
    },
  },
];

export default function LayananAdministrasiPage() {
  const { language } = useLanguage();
  const bahasa = (language === 'en' ? 'en' : 'id') as Bahasa;
  const [kueri, setKueri] = useState('');
  const [saringan, setSaringan] = useState<Saringan>('semua');
  const [slugDisorot, setSlugDisorot] = useState<string | null>(null);
  const [bannerAktif, setBannerAktif] = useState(0);
  const kolomCari = useRef<HTMLInputElement>(null);

  // ── Pelat yang tampil untuk saringan aktif, sudah bernomor ──────────────
  const pelat = useMemo(() => {
    const nomor: Record<Peran, number> = { mahasiswa: 0, dosen: 0 };
    return LAYANAN.filter((l) => saringan === 'semua' || l.peran === saringan).map((layanan) => {
      nomor[layanan.peran] += 1;
      return { layanan, kode: kodePelat(layanan.peran, nomor[layanan.peran]) };
    });
  }, [saringan]);

  const hasil = useMemo(() => cari({ kueri, peran: saringan }), [kueri, saringan]);
  const sedangMencari = kueri.trim().length > 0;
  const totalTautan = useMemo(
    () => ratakan(pelat.map((p) => p.layanan)).length,
    [pelat]
  );

  // ── Tautan yang dibagikan: buka tepat pada layanannya ───────────────────
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get('q');
    if (q) setKueri(q);
  }, []);

  useEffect(() => {
    const bukaDariHash = () => {
      const slug = window.location.hash.replace('#', '');
      if (!slug) return;
      setSlugDisorot(slug);
      // Menunggu satu frame agar pelat sudah terpasang sebelum digulir.
      requestAnimationFrame(() => {
        document.getElementById(slug)?.scrollIntoView({ block: 'center' });
      });
    };
    bukaDariHash();
    window.addEventListener('hashchange', bukaDariHash);
    return () => window.removeEventListener('hashchange', bukaDariHash);
  }, []);

  // ── Pintasan papan ketik: "/" memfokuskan pencarian ─────────────────────
  useEffect(() => {
    const tekan = (e: KeyboardEvent) => {
      const el = document.activeElement;
      const sedangMengetik =
        el instanceof HTMLInputElement ||
        el instanceof HTMLTextAreaElement ||
        (el as HTMLElement | null)?.isContentEditable;
      if (e.key === '/' && !sedangMengetik) {
        e.preventDefault();
        kolomCari.current?.focus();
      }
      if (e.key === 'Escape' && el === kolomCari.current) setKueri('');
    };
    window.addEventListener('keydown', tekan);
    return () => window.removeEventListener('keydown', tekan);
  }, []);

  useEffect(() => {
    const jeda = setInterval(
      () => setBannerAktif((n) => (n + 1) % ZONA_INTEGRITAS.length),
      6000
    );
    return () => clearInterval(jeda);
  }, []);

  const ubahSaringan = useCallback((nilai: Saringan) => {
    setSaringan(nilai);
    setSlugDisorot(null);
  }, []);

  return (
    <MainLayout>
      {/* ══ PITA ZONA ══════════════════════════════════════════════════════ */}
      <section className="pita-zona relative pb-9 pt-10 sm:pb-11 sm:pt-14">
        <div className="mx-auto grid max-w-7xl gap-x-12 gap-y-8 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_17rem]">
          <div className="min-w-0">
            <p className="legenda text-arah-400">
              {bahasa === 'en'
                ? 'Faculty of Science and Information Technology · ITK'
                : 'Fakultas Sains dan Teknologi Informasi · ITK'}
            </p>

            <h1 className="mt-3 max-w-[20ch] font-display text-[2rem] font-extrabold leading-[1.05] tracking-tight text-white sm:text-[2.5rem] lg:text-[3rem]">
              {bahasa === 'en'
                ? 'Administrative Service Directory'
                : 'Direktori Layanan Administrasi'}
            </h1>

            {/* ── Kolom pencarian, disetel pada skala judul ───────────────── */}
            <div className="mt-6">
            <label htmlFor="cari-layanan" className="sr-only">
              {bahasa === 'en' ? 'Search services' : 'Cari layanan'}
            </label>
            <div className="relative">
              <Search
                aria-hidden
                className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-tinta-500 sm:left-5"
              />
              <input
                id="cari-layanan"
                ref={kolomCari}
                type="search"
                value={kueri}
                onChange={(e) => setKueri(e.target.value)}
                placeholder={
                  bahasa === 'en'
                    ? 'Type what you need — e.g. results seminar, UKT, transcript'
                    : 'Ketik yang Anda urus — misal: seminar hasil, UKT, transkrip'
                }
                className={cn(
                  'h-14 w-full rounded-md border-2 border-transparent bg-white pl-12 pr-24 sm:pl-14',
                  'font-display text-base font-medium text-tinta-900 placeholder:font-sans placeholder:font-normal placeholder:text-tinta-500',
                  'shadow-angkat outline-none transition-colors sm:h-16 sm:text-lg',
                  '[&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden',
                  'focus:border-arah-400'
                )}
              />
              {kueri ? (
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
              ) : (
                <kbd className="legenda angka-pelat absolute right-4 top-1/2 hidden -translate-y-1/2 rounded border border-tinta-200 bg-tinta-50 px-2 py-1 text-tinta-500 sm:block">
                  /
                </kbd>
              )}
            </div>
          </div>

          {/* ── Saringan peran ───────────────────────────────────────────── */}
          <div className="mt-5 flex flex-wrap items-center gap-x-2 gap-y-3">
            <span className="legenda mr-1 text-white/50">
              {bahasa === 'en' ? 'Show' : 'Tampilkan'}
            </span>
            {SARINGAN.map((s) => {
              const aktif = saringan === s.nilai;
              return (
                <button
                  key={s.nilai}
                  type="button"
                  aria-pressed={aktif}
                  onClick={() => ubahSaringan(s.nilai)}
                  className={cn(
                    'rounded-sm px-3 py-1.5 text-sm font-medium transition-colors',
                    aktif
                      ? 'bg-arah-400 text-primary-950'
                      : 'bg-white/10 text-white/80 hover:bg-white/20 hover:text-white'
                  )}
                >
                  {s.label[bahasa]}
                </button>
              );
            })}
            </div>
          </div>

          {/* ── Keterangan papan: berlaku untuk seluruh isi papan ─────────── */}
          <dl className="self-end border-t border-white/15 pt-5 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
            <div className="grid grid-cols-2 gap-x-8 gap-y-5 lg:grid-cols-1">
              <div>
                <dt className="legenda text-white/50">
                  {bahasa === 'en' ? 'On this board' : 'Isi papan ini'}
                </dt>
                <dd className="angka-pelat mt-1.5 font-display text-sm font-semibold text-white">
                  {sedangMencari ? (
                    <>
                      {hasil.length} {bahasa === 'en' ? 'matches' : 'hasil'}
                    </>
                  ) : (
                    <>
                      {totalTautan} {bahasa === 'en' ? 'links' : 'tautan'}
                      <span className="mx-2 font-normal text-white/25">/</span>
                      {pelat.length} {bahasa === 'en' ? 'services' : 'layanan'}
                    </>
                  )}
                </dd>
              </div>

              <div>
                <dt className="legenda text-white/50">
                  {bahasa === 'en' ? 'Processing time' : 'Waktu proses'}
                </dt>
                <dd className="mt-1.5 text-sm text-white">
                  {bahasa === 'en' ? '1–2 working days' : '1–2 hari kerja'}
                </dd>
              </div>

              <div className="col-span-full">
                <dt className="legenda text-white/50">
                  {bahasa === 'en' ? 'Document templates' : 'Template dokumen'}
                </dt>
                <dd className="mt-1.5 text-sm">
                  <a
                    href={RUJUKAN.templateFormulir.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-start gap-1.5 text-arah-400 underline underline-offset-4 transition-colors hover:text-arah-300"
                  >
                    {teks(RUJUKAN.templateFormulir.label, bahasa)}
                    <ExternalLink aria-hidden className="mt-1 h-3.5 w-3.5 shrink-0" />
                  </a>
                </dd>
              </div>
            </div>
          </dl>
        </div>
      </section>

      {/* ══ ZONA INTEGRITAS ════════════════════════════════════════════════ */}
      {/* Disembunyikan saat mencari: poster setinggi layar tidak boleh berdiri
          di antara kolom pencarian dan hasilnya. */}
      <section hidden={sedangMencari} className="border-b border-tinta-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
          <div className="mx-auto max-w-3xl">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-md border border-tinta-200 bg-white">
              {ZONA_INTEGRITAS.map((b, i) => (
                <Image
                  key={b.src}
                  src={b.src}
                  alt={b.alt[bahasa]}
                  fill
                  priority={i === 0}
                  sizes="(max-width: 768px) 100vw, 768px"
                  className={cn(
                    'object-contain transition-opacity duration-700',
                    i === bannerAktif ? 'opacity-100' : 'opacity-0'
                  )}
                />
              ))}
            </div>
            <div className="mt-3 flex justify-center gap-2">
              {ZONA_INTEGRITAS.map((b, i) => (
                <button
                  key={b.src}
                  type="button"
                  onClick={() => setBannerAktif(i)}
                  aria-label={`${bahasa === 'en' ? 'Notice' : 'Maklumat'} ${i + 1}`}
                  aria-current={i === bannerAktif}
                  className={cn(
                    'h-1.5 rounded-full transition-all duration-300',
                    i === bannerAktif ? 'w-7 bg-primary-600' : 'w-4 bg-tinta-200 hover:bg-tinta-300'
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ PAPAN ══════════════════════════════════════════════════════════ */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
        {sedangMencari ? (
          /* ── Mode pencarian: rata, lintas kategori, membawa jalurnya ──── */
          <div className="max-w-3xl">
            <h2 className="legenda mb-3">
              {bahasa === 'en' ? 'Search results' : 'Hasil pencarian'}
              <span className="mx-2 text-tinta-300">/</span>
              <span className="angka-pelat text-tinta-900">{hasil.length}</span>
            </h2>

            {hasil.length > 0 ? (
              <ul className="overflow-hidden rounded-md border border-tinta-200 bg-white shadow-pelat">
                {hasil.map((h) => (
                  <BarisTautan
                    key={`${h.layanan.id}-${h.slug}`}
                    hasil={h}
                    bahasa={bahasa}
                    kueri={kueri}
                    tampilkanJalur
                  />
                ))}
              </ul>
            ) : (
              <div className="rounded-md border border-dashed border-tinta-300 bg-white px-6 py-12 text-center">
                <p className="font-display text-lg font-bold text-tinta-900">
                  {bahasa === 'en'
                    ? `No service matches “${kueri}”`
                    : `Tidak ada layanan yang cocok dengan “${kueri}”`}
                </p>
                <p className="mx-auto mt-2 max-w-[52ch] text-sm leading-relaxed text-tinta-500">
                  {bahasa === 'en'
                    ? 'Try a shorter keyword, or the term printed on the form itself. If the service you need is not on this board yet, ask the faculty administration directly.'
                    : 'Coba kata kunci yang lebih pendek, atau istilah yang tertulis pada formulirnya. Jika layanan yang Anda butuhkan memang belum ada di papan ini, tanyakan langsung ke tata usaha fakultas.'}
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setKueri('');
                      kolomCari.current?.focus();
                    }}
                    className="rounded-sm bg-primary-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-700"
                  >
                    {bahasa === 'en' ? 'Show the whole board' : 'Tampilkan seluruh papan'}
                  </button>
                  <a
                    href="https://wa.me/6285172302157"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-sm border border-tinta-200 px-4 py-2 text-sm font-medium text-tinta-700 transition-colors hover:border-tinta-300 hover:bg-tinta-50"
                  >
                    <MessageCircle aria-hidden className="h-4 w-4" />
                    {bahasa === 'en' ? 'Ask academic desk' : 'Tanya layanan akademik'}
                  </a>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* ── Mode papan: seluruh isi terlihat, tanpa akordeon ─────────── */
          <div className="lg:grid lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-10">
            <aside className="hidden lg:block">
              <RailPapan daftar={pelat} bahasa={bahasa} />
            </aside>

            <div className="space-y-5">
              {pelat.map(({ layanan, kode }) => (
                <PelatLayanan
                  key={layanan.id}
                  layanan={layanan}
                  kode={kode}
                  bahasa={bahasa}
                  slugDisorot={slugDisorot}
                />
              ))}
            </div>
          </div>
        )}
      </section>

      {/* ══ ALUR KERJA ═════════════════════════════════════════════════════ */}
      <section hidden={sedangMencari} className="border-t border-tinta-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
          <h2 className="font-display text-2xl font-extrabold tracking-tight text-tinta-900">
            {bahasa === 'en' ? 'How a request moves' : 'Alur perjalanan berkas'}
          </h2>
          <p className="mt-2 max-w-[68ch] text-sm leading-relaxed text-tinta-500">
            {bahasa === 'en'
              ? 'What happens after you submit a form, and which desk holds your request at each step.'
              : 'Apa yang terjadi setelah Anda mengirim formulir, dan di meja mana berkas Anda berada pada tiap tahapnya.'}
          </p>

          <div className="mt-8 overflow-hidden rounded-md border border-tinta-200">
            <WorkflowDiagram language={language} />
          </div>

          <div className="mt-5 overflow-hidden rounded-md border border-tinta-200 bg-white">
            <Image
              src="/images/alur-kerja-fsti.png"
              alt={
                bahasa === 'en'
                  ? 'FSTI administrative service workflow chart'
                  : 'Bagan alur kerja layanan administrasi FSTI'
              }
              width={1600}
              height={900}
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="h-auto w-full"
            />
          </div>
        </div>
      </section>

      {/* ══ BANTUAN ════════════════════════════════════════════════════════ */}
      <section className="border-t border-tinta-200">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
          <div className="max-w-2xl">
            <h2 className="font-display text-2xl font-extrabold tracking-tight text-tinta-900">
              {bahasa === 'en' ? 'Still cannot find it?' : 'Masih belum ketemu?'}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-tinta-500">
              {bahasa === 'en'
                ? 'Reach the faculty desk directly. Academic and financial matters are handled on separate lines.'
                : 'Hubungi langsung meja layanan fakultas. Urusan akademik dan keuangan dilayani pada nomor yang berbeda.'}
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
