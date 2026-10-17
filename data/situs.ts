/** Informasi umum situs: kontak, jam layanan, dan menu. */

export const kontak = {
  email: 'fsti@itk.ac.id',
  alamat: ['Kampus ITK, Jl. Soekarno Hatta KM 15, Karang Joang', 'Balikpapan Utara, Kalimantan Timur 76127'],
  whatsapp: [
    { label: 'Akademik', nomor: '6285172302157', pesan: 'Halo FSTI ITK, saya ingin bertanya tentang akademik' },
    { label: 'Keuangan', nomor: '6285172312157', pesan: 'Halo FSTI ITK, saya ingin bertanya tentang keuangan' },
  ],
  jam: ['Senin–Kamis, 08.00–16.00 WITA', 'Jumat, 08.00–16.30 WITA'],
  instagram: 'https://www.instagram.com/fsti.itk',
  tiktok: 'https://www.tiktok.com/@fsti.itk',
};

export const waLink = (w: (typeof kontak.whatsapp)[number]) =>
  `https://wa.me/${w.nomor}?text=${encodeURIComponent(w.pesan)}`;

export interface MenuItem {
  label: string;
  href: string;
  ket?: string;
}

/**
 * Menu utama. Halaman Tentang FSTI, Tracer Study, dan Peraturan & Kebijakan
 * sengaja tidak dicantumkan (masih bisa dibuka lewat URL langsung).
 */
export const menu: { label: string; href?: string; anak?: MenuItem[] }[] = [
  { label: 'Beranda', href: '/' },
  {
    label: 'Layanan',
    anak: [
      { label: 'Layanan S1', href: '/layanan/s1', ket: 'Mahasiswa Sarjana' },
      { label: 'Layanan S2', href: '/layanan/s2', ket: 'Mahasiswa Magister (MMT)' },
      { label: 'Layanan Dosen', href: '/layanan/dosen', ket: 'Dosen FSTI' },
      { label: 'Katalog Layanan', href: '/katalog', ket: 'Semua layanan & persyaratannya' },
    ],
  },
  {
    label: 'Informasi',
    anak: [
      { label: 'Panduan & Video Tutorial', href: '/panduan', ket: 'Cara memakai layanan dan website' },
      { label: 'SOP & Standar Pelayanan', href: '/standar-pelayanan', ket: 'Alur, SOP, dan standar layanan' },
      { label: 'Dashboard Layanan', href: '/dashboard', ket: 'Rekap hasil layanan berkala' },
    ],
  },
  { label: 'Survei', href: '/survey-kepuasan' },
];
