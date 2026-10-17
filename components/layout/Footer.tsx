import Link from 'next/link';
import { Mail, MapPin, Clock, ShieldCheck } from 'lucide-react';
import { kontak, waLink } from '@/data/situs';

const tautan = [
  {
    judul: 'Layanan',
    item: [
      { label: 'Layanan S1', href: '/layanan/s1' },
      { label: 'Layanan S2', href: '/layanan/s2' },
      { label: 'Layanan Dosen', href: '/layanan/dosen' },
      { label: 'Katalog Layanan', href: '/katalog' },
      { label: 'Cek Status', href: '/tracking' },
    ],
  },
  {
    judul: 'Informasi',
    item: [
      { label: 'Panduan & Video', href: '/panduan' },
      { label: 'SOP & Standar Pelayanan', href: '/standar-pelayanan' },
      { label: 'Dashboard Layanan', href: '/dashboard' },
      { label: 'Survei Kepuasan', href: '/survey-kepuasan' },
      { label: 'Website ITK', href: 'https://itk.ac.id' },
    ],
  },
];

const Footer = () => (
  <footer className="relative mt-24 bg-primary-950 text-primary-100">
    <div className="pola-titik absolute inset-0 opacity-40" aria-hidden />
    <div className="wadah relative">
      <div className="-translate-y-1/2 rounded-2xl bg-sorot-400 px-5 py-4 text-ink shadow-angkat sm:flex sm:items-center sm:justify-between sm:px-7">
        <p className="flex items-start gap-3 font-semibold sm:items-center">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 sm:mt-0" />
          Semua layanan FSTI gratis dan bebas gratifikasi.
        </p>
        <p className="mt-1 pl-8 text-sm sm:mt-0 sm:pl-0">
          Ada pungutan? Laporkan ke{' '}
          <a href={`mailto:${kontak.email}`} className="font-bold underline underline-offset-2">
            {kontak.email}
          </a>
        </p>
      </div>

      <div className="grid gap-10 pb-10 pt-2 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <p className="text-lg font-bold text-white">Layanan FSTI</p>
          <p className="text-sm text-primary-200">Fakultas Sains dan Teknologi Informasi · Institut Teknologi Kalimantan</p>
          <p className="mt-5 flex gap-3 text-sm text-primary-200">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
            <span>
              {kontak.alamat[0]}
              <br />
              {kontak.alamat[1]}
            </span>
          </p>
        </div>

        <div>
          <p className="label-kecil mb-4 text-primary-300">Hubungi kami</p>
          <ul className="space-y-3 text-sm">
            <li>
              <a href={`mailto:${kontak.email}`} className="flex items-center gap-2 hover:text-white">
                <Mail className="h-4 w-4" />
                {kontak.email}
              </a>
            </li>
            {kontak.whatsapp.map((w) => (
              <li key={w.nomor}>
                <a href={waLink(w)} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  WhatsApp {w.label}
                </a>
              </li>
            ))}
            <li className="flex gap-2 pt-1 text-primary-200">
              <Clock className="mt-0.5 h-4 w-4 shrink-0" />
              <span>
                {kontak.jam.map((j) => (
                  <span key={j} className="block">
                    {j}
                  </span>
                ))}
              </span>
            </li>
          </ul>
        </div>

        {tautan.map((t) => (
          <div key={t.judul}>
            <p className="label-kecil mb-4 text-primary-300">{t.judul}</p>
            <ul className="space-y-2.5 text-sm">
              {t.item.map((i) => (
                <li key={i.href}>
                  {i.href.startsWith('http') ? (
                    <a href={i.href} target="_blank" rel="noopener noreferrer" className="hover:text-white">
                      {i.label}
                    </a>
                  ) : (
                    <Link href={i.href} className="hover:text-white">
                      {i.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-2 border-t border-white/10 py-6 text-xs text-primary-300 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Fakultas Sains dan Teknologi Informasi — ITK</p>
        <div className="flex items-center gap-4">
          <a href={kontak.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-white">
            Instagram
          </a>
          <a href={kontak.tiktok} target="_blank" rel="noopener noreferrer" className="hover:text-white">
            TikTok
          </a>
          <span>
            Dikembangkan oleh{' '}
            <a href="https://aidilsaputrakirsan.github.io" target="_blank" rel="noopener noreferrer" className="text-white hover:underline">
              ADL
            </a>
          </span>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
