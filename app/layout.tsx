import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import './animation.css'; // Tambahkan import animasi CSS

const inter = Inter({ subsets: ['latin'] });

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'Layanan Administrasi FSTI ITK',
  description: 'Portal Layanan Administrasi Fakultas Sains dan Teknologi Informasi Institut Teknologi Kalimantan',
  keywords: ['FSTI', 'ITK', 'Layanan Administrasi', 'Fakultas Sains dan Teknologi Informasi', 'Institut Teknologi Kalimantan'],
  authors: [{ name: 'FSTI ITK' }],
  robots: 'index,follow',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}