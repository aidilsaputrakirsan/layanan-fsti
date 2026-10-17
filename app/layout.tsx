import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#2f4dd3',
};

export const metadata: Metadata = {
  title: {
    default: 'Layanan FSTI — Fakultas Sains dan Teknologi Informasi ITK',
    template: '%s · Layanan FSTI ITK',
  },
  description:
    'Portal layanan administrasi Fakultas Sains dan Teknologi Informasi, Institut Teknologi Kalimantan: layanan mahasiswa S1, S2, dan dosen, cek status permohonan, SOP, dan survei kepuasan.',
  keywords: ['FSTI', 'ITK', 'layanan administrasi', 'Institut Teknologi Kalimantan', 'surat aktif studi', 'legalisasi'],
  authors: [{ name: 'FSTI ITK' }],
  robots: 'index,follow',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className={jakarta.variable}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
