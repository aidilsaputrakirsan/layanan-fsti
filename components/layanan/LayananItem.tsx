import Link from 'next/link';
import { ArrowUpRight, FileText, Download, Monitor, FolderOpen } from 'lucide-react';
import { Layanan, TIPE_LABEL, TipeLayanan } from '@/data/layanan';

export const ikonTipe: Record<TipeLayanan, typeof FileText> = {
  formulir: FileText,
  template: Download,
  tautan: Monitor,
  folder: FolderOpen,
};

export const aksiTipe: Record<TipeLayanan, string> = {
  formulir: 'Ajukan',
  template: 'Unduh',
  tautan: 'Buka',
  folder: 'Buka',
};

/** Satu baris layanan: nama, ringkasan, tipe, tombol Detail & Ajukan. */
const LayananItem = ({ l, konteks }: { l: Layanan; konteks?: string }) => {
  const Ikon = ikonTipe[l.tipe];
  return (
    <li className="group flex flex-col gap-3 px-4 py-4 transition-colors hover:bg-primary-50/50 sm:flex-row sm:items-center sm:gap-5 sm:px-5">
      <div className="flex min-w-0 flex-1 items-start gap-3.5">
        <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600 transition-colors group-hover:bg-primary-600 group-hover:text-white">
          <Ikon className="h-[18px] w-[18px]" />
        </span>
        <div className="min-w-0">
          <p className="font-semibold leading-snug text-ink">{l.nama}</p>
          <p className="mt-0.5 text-sm text-ink-2">{l.ringkas}</p>
          <p className="mt-1.5 text-xs text-ink-3">
            {konteks ? `${konteks} · ` : ''}
            {TIPE_LABEL[l.tipe]}
          </p>
        </div>
      </div>
      <div className="flex shrink-0 gap-2 pl-[50px] sm:pl-0">
        <Link href={`/katalog/${l.id}`} className="tombol-garis px-3.5 py-2">
          Detail
        </Link>
        <a href={l.url} target="_blank" rel="noopener noreferrer" className="tombol-utama px-3.5 py-2">
          {aksiTipe[l.tipe]}
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
    </li>
  );
};

export default LayananItem;
