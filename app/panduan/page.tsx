import type { Metadata } from 'next';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/ui/PageHeader';
import VideoKartu from '@/components/ui/VideoKartu';
import Faq from '@/components/ui/Faq';
import { videoTutorial, langkahWebsite, faqUmum } from '@/data/panduan';

export const metadata: Metadata = {
  title: 'Panduan & Video Tutorial',
  description: 'Video tutorial layanan dan panduan penggunaan portal layanan FSTI ITK.',
};

export default function Panduan() {
  return (
    <MainLayout>
      <PageHeader
        label="Panduan"
        judul="Panduan & video tutorial"
        deskripsi="Pelajari cara mengajukan layanan dan mengecek status permohonan."
        jejak={[{ label: 'Panduan & Video' }]}
      >
        <nav className="mt-8 flex flex-wrap gap-2 text-sm font-semibold">
          {[
            ['#video', 'Video tutorial'],
            ['#website', 'Panduan website'],
            ['#faq', 'Tanya jawab'],
          ].map(([href, label]) => (
            <a key={href} href={href} className="rounded-full bg-white/10 px-4 py-2 text-white hover:bg-white/20">
              {label}
            </a>
          ))}
        </nav>
      </PageHeader>

      <section id="video" className="wadah mt-14 scroll-mt-24">
        <p className="label-kecil text-primary-600">Video tutorial</p>
        <h2 className="mt-2 text-3xl font-extrabold">Tonton, lalu ajukan.</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {videoTutorial.map((v, i) => (
            <VideoKartu key={v.judul} v={v} no={i + 1} />
          ))}
        </div>
      </section>

      <section id="website" className="wadah mt-20 grid scroll-mt-24 gap-10 lg:grid-cols-[1fr_1.4fr]">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <p className="label-kecil text-primary-600">Panduan website</p>
          <h2 className="mt-2 text-3xl font-extrabold">Cara memakai portal ini.</h2>
          <p className="mt-3 text-ink-2">
            {langkahWebsite.length} langkah dari mencari layanan sampai mengisi survei. Berlaku untuk mahasiswa S1, S2, dan dosen.
          </p>
        </div>
        <ol className="space-y-4">
          {langkahWebsite.map((l, i) => (
            <li key={l.judul} className="kartu flex gap-5 p-5 sm:p-6">
              <span className="text-3xl font-extrabold tabular-nums text-primary-200">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h3 className="text-lg font-bold">{l.judul}</h3>
                <p className="mt-1 text-sm leading-relaxed text-ink-2">{l.isi}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section id="faq" className="wadah mt-20 max-w-3xl scroll-mt-24">
        <p className="label-kecil text-primary-600">Tanya jawab</p>
        <h2 className="mb-6 mt-2 text-3xl font-extrabold">Pertanyaan yang sering diajukan.</h2>
        <Faq item={faqUmum} />
      </section>
    </MainLayout>
  );
}
