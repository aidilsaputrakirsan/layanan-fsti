import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { ReactNode } from 'react';

interface PageHeaderProps {
  judul: string;
  deskripsi?: ReactNode;
  label?: string;
  jejak?: { label: string; href?: string }[];
  children?: ReactNode;
}

/** Pita judul halaman dalam (bidang biru FSTI). */
const PageHeader = ({ judul, deskripsi, label, jejak, children }: PageHeaderProps) => (
  <section className="relative bg-primary-700 text-white">
    {/* Ornamen dipotong di lapisannya sendiri agar dropdown pencarian tidak ikut terpotong */}
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="pola-titik absolute inset-0" />
      <span className="absolute right-2 top-1/2 hidden -translate-y-1/2 rotate-180 select-none whitespace-nowrap font-extrabold leading-none tracking-tighter text-white/[0.08] [font-size:min(3.75rem,calc((100vw-69rem)*0.45))] [writing-mode:vertical-rl] min-[1340px]:block">
        FSTI
      </span>
    </div>
    <div className="wadah relative pb-14 pt-8 sm:pb-16 sm:pt-10">
      {jejak && (
        <nav aria-label="Jejak halaman" className="mb-6 flex flex-wrap items-center gap-1 text-sm text-primary-100">
          <Link href="/" className="hover:text-white">
            Beranda
          </Link>
          {jejak.map((j) => (
            <span key={j.label} className="flex items-center gap-1">
              <ChevronRight className="h-3.5 w-3.5 opacity-60" />
              {j.href ? (
                <Link href={j.href} className="hover:text-white">
                  {j.label}
                </Link>
              ) : (
                <span className="text-white">{j.label}</span>
              )}
            </span>
          ))}
        </nav>
      )}
      {label && <p className="label-kecil mb-3 text-sorot-300">{label}</p>}
      <h1 className="max-w-3xl text-3xl font-extrabold text-white sm:text-[2.6rem] sm:leading-[1.1]">{judul}</h1>
      {deskripsi && <p className="mt-4 max-w-2xl text-base text-primary-100 sm:text-lg">{deskripsi}</p>}
      {children}
    </div>
  </section>
);

export default PageHeader;
