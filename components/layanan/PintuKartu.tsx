import Link from 'next/link';
import { ArrowRight, GraduationCap, BookOpenCheck, Presentation } from 'lucide-react';
import { Pintu, PintuId, jumlahLayanan } from '@/data/layanan';

const gaya: Record<PintuId, { bidang: string; ikon: typeof GraduationCap }> = {
  s1: { bidang: 'bg-primary-600', ikon: GraduationCap },
  s2: { bidang: 'bg-primary-800', ikon: BookOpenCheck },
  dosen: { bidang: 'bg-primary-950', ikon: Presentation },
};

/** Kartu "pintu" layanan — bagian atas melengkung seperti ambang pintu. */
const PintuKartu = ({ p }: { p: Pintu }) => {
  const { bidang, ikon: Ikon } = gaya[p.id];
  return (
    <Link
      href={`/layanan/${p.id}`}
      className="group relative flex flex-col overflow-hidden rounded-b-2xl rounded-t-[2.5rem] border border-garis bg-white shadow-kartu transition duration-200 hover:-translate-y-1 hover:shadow-angkat focus-visible:-translate-y-1"
    >
      <div className={`relative h-32 overflow-hidden ${bidang}`}>
        <div className="pola-titik absolute inset-0" aria-hidden />
        <span
          className="absolute -bottom-6 right-4 select-none text-[6.5rem] font-extrabold leading-none text-white/10 transition-transform duration-300 group-hover:-translate-y-1"
          aria-hidden
        >
          {p.nomor}
        </span>
        <span className="absolute left-6 top-7 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-white ring-1 ring-white/25">
          <Ikon className="h-6 w-6" />
        </span>
        <span className="absolute bottom-4 left-6 rounded-full bg-sorot-400 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-ink">
          Pintu {p.nomor}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="text-sm font-medium text-ink-3">{p.untuk}</p>
        <h3 className="mt-0.5 text-2xl font-extrabold text-ink">{p.nama}</h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-2">{p.ringkas}</p>

        <ul className="mt-4 flex flex-wrap gap-1.5">
          {p.kelompok.map((k) => (
            <li key={k.id} className="rounded-lg bg-latar px-2.5 py-1 text-xs font-semibold text-ink-2">
              {k.nama}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex items-center justify-between pt-6">
          <span className="text-sm text-ink-3">
            <strong className="text-ink">{jumlahLayanan(p)}</strong> layanan
          </span>
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-50 text-primary-700 transition-colors group-hover:bg-primary-600 group-hover:text-white">
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
};

export default PintuKartu;
