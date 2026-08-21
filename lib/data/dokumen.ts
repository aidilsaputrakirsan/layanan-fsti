/**
 * Katalog dokumen peraturan & kebijakan FSTI ITK.
 *
 * Ukuran berkas TIDAK ditulis tangan di sini. Versi sebelumnya mencantumkan
 * angka karangan — Peraturan Akademik tertulis 2.1 MB padahal berkasnya 37 MB —
 * dan itu menyesatkan orang yang mengunduh dengan kuota terbatas. Ukuran
 * sekarang dibaca dari berkas aslinya oleh scripts/ukuran-berkas.mjs.
 *
 * Jumlah unduhan dihapus seluruhnya: situs ini statis dan tidak punya alat
 * hitung, jadi angka apa pun di sana pasti karangan.
 */

export interface TeksDwibahasa {
  id: string;
  en: string;
}

export type KelompokDokumen = 'pokok' | 'tugas' | 'mbkm';

export interface Dokumen {
  id: string;
  title: TeksDwibahasa;
  description: TeksDwibahasa;
  /** Kelompok pada papan indeks dokumen. */
  kelompok: KelompokDokumen;
  fileUrl: string;
  /** Dokumen yang terdiri atas beberapa berkas terpisah. */
  files?: { label: TeksDwibahasa; fileUrl: string }[];
  /** Terbitan terbaru; ditandai pada papan. */
  baru?: boolean;
}

export const KELOMPOK_DOKUMEN: Record<KelompokDokumen, TeksDwibahasa> = {
  pokok: { id: 'Peraturan Pokok', en: 'Core Regulations' },
  tugas: {
    id: 'Tugas Akhir, Magang & Kerja Praktik',
    en: 'Final Project, Internship & Practical Work',
  },
  mbkm: {
    id: 'MBKM \u2014 Pembelajaran di Luar Program Studi',
    en: 'MBKM \u2014 Learning Outside the Study Program',
  },
};

export const DOKUMEN: Dokumen[] = [
  {
    id: 'akademik',
    kelompok: 'pokok',
    title: { id: 'Akademik', en: 'Academic' },
    description: { id: 'Panduan dan peraturan akademik untuk mahasiswa FSTI ITK (Peraturan Nomor 4 Tahun 2025 dan Peraturan Nomor 9 Tahun 2024)', en: 'Academic guidelines and regulations for FSTI ITK students (Regulation Number 4 of 2025 and Regulation Number 9 of 2024)' },
    fileUrl: '/file/PERATURAN-AKADEMIK.pdf',
  },
  {
    id: 'kemahasiswaan',
    kelompok: 'pokok',
    title: { id: 'Kemahasiswaan', en: 'Student Affairs' },
    description: { id: 'Panduan kegiatan, organisasi, dan peraturan kemahasiswaan', en: 'Guidelines for activities, organizations, and student regulations' },
    fileUrl: '/file/KEMAHASISWAAN.pdf',
  },
  {
    id: 'biayaPendidikan',
    kelompok: 'pokok',
    title: { id: 'Biaya Pendidikan Mahasiswa', en: 'Student Tuition Fees' },
    description: { id: 'Informasi lengkap mengenai biaya pendidikan, UKT, dan komponen biaya lainnya untuk mahasiswa ITK', en: 'Complete information about tuition fees, UKT, and other fee components for ITK students' },
    fileUrl: '/file/BIAYA-PENDIDIKAN.pdf',
  },
  {
    id: 'tugasAkhir',
    kelompok: 'tugas',
    title: { id: 'Tugas Akhir', en: 'Final Project' },
    description: { id: 'Panduan pelaksanaan dan penulisan Tugas Akhir mahasiswa', en: 'Guidelines for implementation and writing of student Final Projects' },
    fileUrl: '/file/A-Panduan Tugas Akhir/[2025] A PEDOMAN PELAKSANAAN TUGAS AKHIR ITK.pdf',
    baru: true,
    files: [
      { label: { id: 'Pedoman Pelaksanaan', en: 'Implementation Guidelines' }, fileUrl: '/file/A-Panduan Tugas Akhir/[2025] A PEDOMAN PELAKSANAAN TUGAS AKHIR ITK.pdf' },
      { label: { id: 'Panduan Kepenulisan', en: 'Writing Guidelines' }, fileUrl: '/file/A-Panduan Tugas Akhir/[2025] B PANDUAN KEPENULISAN TUGAS AKHIR ITK.pdf' },
    ],
  },
  {
    id: 'magang',
    kelompok: 'tugas',
    title: { id: 'Magang', en: 'Internship' },
    description: { id: 'Panduan pelaksanaan dan pelaporan kegiatan Magang', en: 'Guidelines for implementation and reporting of Internship activities' },
    fileUrl: '/file/MAGANG.pdf',
  },
  {
    id: 'kerjaPraktik',
    kelompok: 'tugas',
    title: { id: 'Kerja Praktik', en: 'Practical Work' },
    description: { id: 'Panduan pelaksanaan dan pelaporan kegiatan Kerja Praktik', en: 'Guidelines for implementation and reporting of Practical Work activities' },
    fileUrl: '/file/B-Panduan Kerja Praktik/[2025] A PANDUAN KERJA PRAKTIK ITK.pdf',
    baru: true,
  },
  {
    id: 'mbkm',
    kelompok: 'mbkm',
    title: { id: 'MBKM', en: 'MBKM' },
    description: { id: 'Panduan Merdeka Belajar Kampus Merdeka (MBKM) FSTI ITK', en: 'Independent Learning Campus (MBKM) guidelines for FSTI ITK' },
    fileUrl: '/file/MBKM.pdf',
  },
  {
    id: 'tataKehidupan',
    kelompok: 'pokok',
    title: { id: 'Tata Kehidupan Kampus', en: 'Campus Life Code' },
    description: { id: 'Pedoman tata kehidupan dan etika di lingkungan kampus', en: 'Guidelines for campus life and ethics' },
    fileUrl: '/file/TATA-KEHIDUPAN.pdf',
  },
  {
    id: 'kalenderAkademik',
    kelompok: 'pokok',
    title: { id: 'Kalender Akademik', en: 'Academic Calendar' },
    description: { id: 'Jadwal kegiatan akademik selama tahun ajaran', en: 'Schedule of academic activities throughout the academic year' },
    fileUrl: '/file/KALENDER-AKADEMIK.pdf',
  },
  {
    id: 'pembelajaranDiluarProdi',
    kelompok: 'mbkm',
    title: { id: 'Pembelajaran di Luar Program Studi', en: 'Learning Outside Study Program' },
    description: { id: 'Panduan pembelajaran di luar program studi untuk memperluas wawasan dan kompetensi mahasiswa', en: 'Guidelines for learning outside the study program to broaden student insights and competencies' },
    fileUrl: '/file/C-Panduan Pembelajaran di Luar Program Studi/[2025] 1 BUKU PANDUAN PEMBELAJARAN DI LUAR PROGRAM STUDI INSTITUT TEKNOLOGI KALIMANTAN.pdf',
    baru: true,
  },
  {
    id: 'magangRiset',
    kelompok: 'mbkm',
    title: { id: 'Magang Riset', en: 'Research Internship' },
    description: { id: 'Panduan pelaksanaan magang riset untuk mahasiswa yang ingin mengembangkan kemampuan penelitian', en: 'Guidelines for research internships for students who want to develop research skills' },
    fileUrl: '/file/C-Panduan Pembelajaran di Luar Program Studi/[2025] 2 BUKU PANDUAN MAGANG RISET INSTITUT TEKNOLOGI KALIMANTAN.pdf',
    baru: true,
  },
  {
    id: 'kknTematik',
    kelompok: 'mbkm',
    title: { id: 'Kuliah Kerja Nyata Tematik', en: 'Thematic Community Service' },
    description: { id: 'Panduan pelaksanaan KKN Tematik sebagai bentuk pengabdian kepada masyarakat', en: 'Guidelines for implementing Thematic Community Service as a form of service to the community' },
    fileUrl: '/file/C-Panduan Pembelajaran di Luar Program Studi/[2025] 3 BUKU PANDUAN KULIAH KERJA NYATA TEMATIK INSTITUT TEKNOLOGI KALIMANTAN.pdf',
    baru: true,
  },
  {
    id: 'pertukaranMahasiswa',
    kelompok: 'mbkm',
    title: { id: 'Pertukaran Mahasiswa', en: 'Student Exchange' },
    description: { id: 'Panduan program pertukaran mahasiswa untuk pengalaman belajar di institusi lain', en: 'Guidelines for student exchange programs for learning experiences at other institutions' },
    fileUrl: '/file/C-Panduan Pembelajaran di Luar Program Studi/[2025] 4 BUKU PANDUAN PERTUKARAN MAHASISWA INSTITUT TEKNOLOGI KALIMANTAN.pdf',
    baru: true,
  },
  {
    id: 'kewirausahaan',
    kelompok: 'mbkm',
    title: { id: 'Kewirausahaan', en: 'Entrepreneurship' },
    description: { id: 'Panduan kegiatan kewirausahaan untuk mengembangkan jiwa entrepreneur mahasiswa', en: 'Entrepreneurship guidelines to develop student entrepreneurial spirit' },
    fileUrl: '/file/C-Panduan Pembelajaran di Luar Program Studi/[2025] 5 BUKU PANDUAN KEWIRAUSAHAAN INSTITUT TEKNOLOGI KALIMANTAN.pdf',
    baru: true,
  },
  {
    id: 'magangKeprofesian',
    kelompok: 'mbkm',
    title: { id: 'Magang Keprofesian', en: 'Professional Internship' },
    description: { id: 'Panduan magang keprofesian untuk pengalaman kerja di bidang profesi tertentu', en: 'Professional internship guidelines for work experience in specific professional fields' },
    fileUrl: '/file/C-Panduan Pembelajaran di Luar Program Studi/[2025] 6 BUKU PANDUAN MAGANG KEPROFESIAN INSTITUT TEKNOLOGI KALIMANTAN.pdf',
    baru: true,
  },
  {
    id: 'proyekKemanusiaan',
    kelompok: 'mbkm',
    title: { id: 'Proyek Kemanusiaan', en: 'Humanitarian Project' },
    description: { id: 'Panduan proyek kemanusiaan untuk berkontribusi dalam isu-isu sosial dan kemanusiaan', en: 'Humanitarian project guidelines to contribute to social and humanitarian issues' },
    fileUrl: '/file/C-Panduan Pembelajaran di Luar Program Studi/[2025] 7 BUKU PANDUAN PROYEK KEMANUSIAAN INSTITUT TEKNOLOGI KALIMANTAN.pdf',
    baru: true,
  },
  {
    id: 'studiProyekIndependen',
    kelompok: 'mbkm',
    title: { id: 'Studi Proyek Independen', en: 'Independent Project Study' },
    description: { id: 'Panduan studi proyek independen untuk mengembangkan proyek secara mandiri', en: 'Independent project study guidelines to develop projects independently' },
    fileUrl: '/file/C-Panduan Pembelajaran di Luar Program Studi/[2025] 8 BUKU PANDUAN STUDI PROYEK INDEPENDEN INSTITUT TEKNOLOGI KALIMANTAN.pdf',
    baru: true,
  },
  {
    id: 'inovasiSosial',
    kelompok: 'mbkm',
    title: { id: 'Inovasi Sosial', en: 'Social Innovation' },
    description: { id: 'Panduan inovasi sosial untuk mendorong kontribusi mahasiswa terhadap pemecahan masalah di masyarakat', en: 'Social innovation guidelines to encourage student contributions to solving problems in society' },
    fileUrl: '/file/D-Panduan Inovasi Sosial/[2026] PANDUAN INOVASI SOSIAL TAHUN 2026 INSTITUT TEKNOLOGI KAILIMANTAN.pdf',
    baru: true,
  },
];
