import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowUpRight, Ticket, FileText, Clock, Wallet, PackageCheck, ListChecks, MessageCircle, Workflow } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/ui/PageHeader';
import { aksiTipe } from '@/components/layanan/LayananItem';
import { layanan, getLayanan, lokasiLayanan, TIPE_LABEL, ESTIMASI_UMUM } from '@/data/layanan';
import { alurUmum, cabangPerbaikan } from '@/data/standar';
import { kontak, waLink } from '@/data/situs';

export function generateStaticParams() {
  return layanan.map((l) => ({ id: l.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const l = getLayanan((await params).id);
  return l ? { title: l.nama, description: l.ringkas } : {};
}

const Disusun = () => <p className="text-sm italic text-ink-3">Sedang disusun oleh admin FSTI.</p>;

export default async function DetailLayanan({ params }: { params: Promise<{ id: string }> }) {
  const l = getLayanan((await params).id);
  if (!l) notFound();
  const lok = lokasiLayanan(l.id);
  const utama = lok[0];
  const berformulir = l.tipe === 'formulir';

  const blok = [
    {
      ikon: ListChecks,
      judul: 'Persyaratan',
      isi: l.persyaratan?.length ? (
        <ul className="list-disc space-y-1 pl-5 text-sm text-ink-2">
          {l.persyaratan.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      ) : (
        <Disusun />
      ),
    },
    {
      ikon: Clock,
      judul: 'Jangka waktu',
      isi: (
        <p className="text-sm text-ink-2">
          <strong className="text-lg text-ink">{l.waktu ?? ESTIMASI_UMUM}</strong>
          {!l.waktu && <span className="block text-xs text-ink-3">Estimasi umum layanan FSTI</span>}
        </p>
      ),
    },
    {
      ikon: Wallet,
      judul: 'Biaya',
      isi: (
        <p className="text-sm text-ink-2">
          <strong className="text-lg text-emerald-700">Gratis</strong>
          <span className="block text-xs text-ink-3">Laporkan jika ada pungutan</span>
        </p>
      ),
    },
    {
      ikon: PackageCheck,
      judul: 'Produk layanan',
      isi: l.hasil ? <p className="text-sm text-ink-2">{l.hasil}</p> : <Disusun />,
    },
    {
      ikon: FileText,
      judul: 'SOP',
      isi: l.sop ? (
        <a href={l.sop} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-primary-700 underline">
          Unduh dokumen SOP
        </a>
      ) : (
        <p className="text-sm text-ink-3">Segera tersedia</p>
      ),
    },
    {
      ikon: MessageCircle,
      judul: 'Pengaduan & pertanyaan',
      isi: (
        <p className="text-sm text-ink-2">
          {kontak.whatsapp.map((w, i) => (
            <span key={w.nomor}>
              {i > 0 && ' · '}
              <a href={waLink(w)} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary-700 hover:underline">
                WA {w.label}
              </a>
            </span>
          ))}
          {' · '}
          <a href={`mailto:${kontak.email}`} className="font-semibold text-primary-700 hover:underline">
            Email
          </a>
        </p>
      ),
    },
  ];

  return (
    <MainLayout>
      <PageHeader
        label={`${TIPE_LABEL[l.tipe]} · ${utama.pintu.nama}`}
        judul={l.nama}
        deskripsi={l.ringkas}
        jejak={[{ label: 'Katalog', href: '/katalog' }, { label: l.nama }]}
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <a href={l.url} target="_blank" rel="noopener noreferrer" className="tombol-sorot px-5 py-3 text-base">
            {aksiTipe[l.tipe]} {berformulir ? 'sekarang' : ''}
            <ArrowUpRight className="h-5 w-5" />
          </a>
          {berformulir && (
            <Link href="/tracking" className="tombol rounded-xl bg-white/10 px-5 py-3 text-base text-white hover:bg-white/20">
              <Ticket className="h-5 w-5" /> Cek status
            </Link>
          )}
        </div>
      </PageHeader>

      <div className="wadah mt-12 grid items-start gap-8 lg:grid-cols-[1fr_320px]">
        <div>
          <h2 className="text-2xl font-extrabold">Standar pelayanan</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {blok.map(({ ikon: Ikon, judul, isi }) => (
              <div key={judul} className="kartu p-5">
                <p className="mb-3 flex items-center gap-2 text-sm font-bold text-ink">
                  <Ikon className="h-4 w-4 text-primary-600" /> {judul}
                </p>
                {isi}
              </div>
            ))}
          </div>

          {berformulir && (
            <div className="mt-10">
              <h2 className="flex items-center gap-2 text-2xl font-extrabold">
                <Workflow className="h-6 w-6 text-primary-600" /> Prosedur
              </h2>
              <ol className="mt-5 space-y-0">
                {alurUmum.map((a, i) => (
                  <li key={a.judul} className="relative flex gap-4 pb-6 last:pb-0">
                    {i < alurUmum.length - 1 && <span className="absolute left-[17px] top-9 h-[calc(100%-36px)] w-0.5 bg-primary-100" />}
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-50 font-bold text-primary-700 ring-4 ring-white">
                      {i + 1}
                    </span>
                    <div className="pt-1.5">
                      <p className="font-bold">
                        {a.judul} <span className="ml-1 text-xs font-semibold text-ink-3">· {a.oleh}</span>
                      </p>
                      <p className="mt-0.5 text-sm text-ink-2">{a.isi}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <p className="mt-5 rounded-xl border border-dashed border-rose-300 bg-rose-50/60 px-4 py-3 text-sm text-ink-2">
                <strong className="text-rose-700">{cabangPerbaikan.label} saat verifikasi?</strong> {cabangPerbaikan.isi}{' '}
                <Link href="/standar-pelayanan" className="font-semibold text-primary-700 underline">
                  Lihat diagram alur
                </Link>
              </p>
            </div>
          )}
        </div>

        <aside className="space-y-4 lg:sticky lg:top-24">
          <div className="kartu p-5">
            <p className="label-kecil text-ink-3">Tersedia di</p>
            <ul className="mt-3 space-y-2">
              {lok.map((x) => (
                <li key={`${x.pintu.id}-${x.kelompok.id}-${x.bagian.nama}`}>
                  <Link href={`/layanan/${x.pintu.id}#${x.kelompok.id}`} className="block rounded-xl bg-latar px-3 py-2.5 text-sm hover:bg-primary-50">
                    <span className="block font-semibold text-ink">
                      {x.pintu.nama} · {x.kelompok.nama}
                    </span>
                    <span className="block text-xs text-ink-3">{x.bagian.nama}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {berformulir && (
            <div className="rounded-2xl bg-primary-950 p-5 text-primary-100">
              <Ticket className="h-6 w-6 text-sorot-400" />
              <p className="mt-3 font-bold text-white">Pantau status permohonan</p>
              <p className="mt-1 text-sm">
                Setelah formulir terkirim, cek status kapan saja di menu Cek Status cukup dengan NIM/NIP yang Anda isi di formulir.
              </p>
            </div>
          )}
        </aside>
      </div>
    </MainLayout>
  );
}
