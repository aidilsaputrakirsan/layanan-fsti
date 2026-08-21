/**
 * Katalog layanan administrasi FSTI ITK.
 *
 * Ini satu-satunya sumber kebenaran katalog. Menambah satu Google Form cukup
 * dengan menambahkan satu entri `LayananItem` di tempat yang tepat — tidak
 * perlu menyentuh kode tampilan sama sekali.
 *
 * `tujuan` tidak ditulis tangan: `resolveTujuan()` menurunkannya dari URL,
 * sehingga label tujuan ("Google Form", "Google Drive", ...) tidak pernah
 * berbohong tentang ke mana sebuah tautan benar-benar membawa pengguna.
 */

export type Peran = 'mahasiswa' | 'dosen';

/** Ke mana sebuah tautan sebenarnya bermuara. */
export type Tujuan = 'form' | 'dokumen' | 'lembar' | 'folder' | 'sistem';

/** Teks dwibahasa. `en` boleh dikosongkan bila istilahnya sama di kedua bahasa. */
export interface Teks {
  id: string;
  en?: string;
}

export interface LayananItem {
  /** Slug unik. Dipakai sebagai jangkar URL yang bisa disalin dan dibagikan. */
  slug: string;
  label: Teks;
  url: string;
  /** Kata kunci tambahan agar pencarian menemukan istilah yang tak ada di judul. */
  alias?: string[];
}

export interface Kelompok {
  label: Teks;
  items: LayananItem[];
}

export type IkonNama =
  | 'surat'
  | 'kerja'
  | 'akademik'
  | 'verifikasi'
  | 'ubah'
  | 'kemahasiswaan'
  | 'keuangan'
  | 'humas'
  | 'sistem'
  | 'tandatangan'
  | 'folder'
  | 'penghargaan';

export interface Layanan {
  id: string;
  title: Teks;
  description: Teks;
  peran: Peran;
  /** Unit pelaksana. Tampil sebagai pita zona pada pelat direktori. */
  unit: Teks;
  ikon: IkonNama;
  kelompok?: Kelompok[];
  /** Dipakai bila layanan ini langsung satu tautan tanpa kelompok. */
  url?: string;
}

const POLA_TUJUAN: [RegExp, Tujuan][] = [
  [/forms\.gle|google\.com\/forms/i, 'form'],
  [/docs\.google\.com\/document/i, 'dokumen'],
  [/docs\.google\.com\/spreadsheets/i, 'lembar'],
  [/drive\.google\.com\/drive\/folders/i, 'folder'],
];

/** Menurunkan jenis tujuan dari URL. Tautan pendek s.itk.ac.id dianggap form. */
export function resolveTujuan(url: string): Tujuan {
  for (const [pola, tujuan] of POLA_TUJUAN) {
    if (pola.test(url)) return tujuan;
  }
  if (/s\.itk\.ac\.id/i.test(url)) return 'form';
  return 'sistem';
}

export const LAYANAN: Layanan[] = [
  // ─── MAHASISWA ──────────────────────────────────────────────────────────
  {
    id: 'surat',
    peran: 'mahasiswa',
    ikon: 'surat',
    unit: { id: 'Tata Usaha', en: 'Administration' },
    title: { id: 'Layanan Surat', en: 'Letter Services' },
    description: {
      id: 'Pembuatan surat pengantar dan dokumen administratif umum untuk keperluan mahasiswa.',
      en: 'Cover letters and general administrative documents for student needs.',
    },
    kelompok: [
      {
        label: { id: 'Surat Pengantar', en: 'Cover Letters' },
        items: [
          {
            slug: 'surat-pengantar',
            label: { id: 'Permohonan Surat Pengantar', en: 'Cover Letter Request' },
            url: 'https://forms.gle/TfydWAeGoFFQYdmR6',
          },
          {
            slug: 'surat-rekomendasi',
            label: {
              id: 'Permohonan Surat Rekomendasi Kegiatan/Beasiswa/Kegiatan lainnya',
              en: 'Recommendation Letter Request for Activities/Scholarships/Other',
            },
            url: 'https://docs.google.com/forms/d/1nTZZM4hKMTcFOenFbIOUBrnCyaRLqzlifiDx6QAZEO0/viewform?edit_requested=true',
            alias: ['beasiswa', 'rekomendasi', 'scholarship'],
          },
          {
            slug: 'surat-pascasarjana',
            label: {
              id: 'Permohonan Surat (Pascasarjana / MMT)',
              en: 'Letter Request (Postgraduate / MMT)',
            },
            url: 'https://s.itk.ac.id/permohonansurats2',
            alias: ['s2', 'magister', 'mmt', 'pascasarjana'],
          },
        ],
      },
    ],
  },
  {
    id: 'kp-ta',
    peran: 'mahasiswa',
    ikon: 'kerja',
    unit: { id: 'Akademik', en: 'Academic' },
    title: {
      id: 'Kerja Praktek / Magang dan Tugas Akhir',
      en: 'Internship / Apprenticeship and Final Projects',
    },
    description: {
      id: 'Pengajuan dan pelaksanaan Kerja Praktek, Magang, Tugas Akhir, dan MBKM.',
      en: 'Application and implementation of Internships, Apprenticeships, Final Projects, and MBKM.',
    },
    kelompok: [
      {
        label: { id: 'Kerja Praktik', en: 'Practical Work' },
        items: [
          {
            slug: 'kp-pendaftaran',
            label: { id: 'Pendaftaran Kerja Praktik', en: 'Practical Work Registration' },
            url: 'https://docs.google.com/forms/d/e/1FAIpQLSdq1GExnTNwAodG_NbZTskZE0SUZDycsArf7_2ybU2Qa61R4w/viewform?usp=dialog',
            alias: ['kp'],
          },
          {
            slug: 'kp-sebelum-diterima',
            label: {
              id: 'Pendaftaran Sebelum diterima Kerja Praktik',
              en: 'Registration Before Practical Work Acceptance',
            },
            url: 'https://forms.gle/XLPQbtTQatE4dgYN7',
            alias: ['kp'],
          },
          {
            slug: 'kp-setelah-diterima',
            label: {
              id: 'Pendaftaran Setelah diterima Kerja Praktik',
              en: 'Registration After Practical Work Acceptance',
            },
            url: 'https://forms.gle/nQ85jfeA9L39NstL8',
            alias: ['kp'],
          },
          {
            slug: 'kp-seminar',
            label: {
              id: 'Pendaftaran Seminar Kerja Praktik',
              en: 'Practical Work Seminar Registration',
            },
            url: 'https://forms.gle/KWrKUTqQG5uWbPQW6',
            alias: ['kp', 'seminar'],
          },
          {
            slug: 'kp-upload-hasil',
            label: { id: 'Upload Formulir Hasil Mahasiswa', en: 'Upload Student Results Form' },
            url: 'https://docs.google.com/forms/d/e/1FAIpQLSfdRvocwHRo7F1EPPNjZVMYEK8oQzRlLB4WPx5Cx-8kCjphpw/viewform?usp=preview',
            alias: ['kp'],
          },
        ],
      },
      {
        label: { id: 'Magang', en: 'Internship' },
        items: [
          {
            slug: 'magang-pengantar',
            label: {
              id: 'Pendaftaran Pengantar Magang',
              en: 'Internship Introduction Registration',
            },
            url: 'https://docs.google.com/forms/d/e/1FAIpQLSevJWaWZJ7sBEqRtr2DQpPvQ2U8h7-Bo3LzZKB40Lt5-WZ6og/viewform',
          },
          {
            slug: 'magang-seminar-hasil',
            label: {
              id: 'Pendaftaran Seminar Hasil Magang',
              en: 'Internship Results Seminar Registration',
            },
            url: 'https://forms.gle/gWQLGqz3GXpYXJrXA',
            alias: ['seminar hasil', 'semhas'],
          },
          {
            slug: 'magang-upload-hasil',
            label: { id: 'Upload Formulir Hasil Mahasiswa', en: 'Upload Student Results Form' },
            url: 'https://docs.google.com/forms/d/e/1FAIpQLSfdRvocwHRo7F1EPPNjZVMYEK8oQzRlLB4WPx5Cx-8kCjphpw/viewform?usp=preview',
          },
        ],
      },
      {
        label: { id: 'Tugas Akhir', en: 'Final Project' },
        items: [
          {
            slug: 'ta-seminar-proposal',
            label: {
              id: 'Pendaftaran Seminar Proposal Tugas Akhir (TA)',
              en: 'Final Project Proposal Seminar Registration',
            },
            url: 'https://forms.gle/Kprni4wLMBeEvhEx5',
            alias: ['ta', 'sempro'],
          },
          {
            slug: 'ta-upload-hasil',
            label: { id: 'Upload Formulir Hasil Mahasiswa', en: 'Upload Student Results Form' },
            url: 'https://docs.google.com/forms/d/e/1FAIpQLSfdRvocwHRo7F1EPPNjZVMYEK8oQzRlLB4WPx5Cx-8kCjphpw/viewform?usp=preview',
            alias: ['ta'],
          },
          {
            slug: 'ta-seminar-hasil',
            label: {
              id: 'Pendaftaran Seminar Hasil Tugas Akhir',
              en: 'Final Project Results Seminar Registration',
            },
            url: 'http://s.itk.ac.id/seminarhasilta',
            alias: ['ta', 'seminar hasil', 'semhas'],
          },
          {
            slug: 'ta-sidang',
            label: {
              id: 'Pendaftaran Sidang Tugas Akhir (TA)',
              en: 'Final Project Defense Registration',
            },
            url: 'https://forms.gle/XtPfYYyuCJgPkgW68',
            alias: ['ta', 'sidang'],
          },
          {
            slug: 'ta-surat-sidang',
            label: {
              id: 'Permohonan Surat Keterangan Sidang TA',
              en: 'Request for Final Project Defense Certificate',
            },
            url: 'https://docs.google.com/forms/d/e/1FAIpQLSfGMptnRk3vrXLxLAEZGbqrCp5WvwF7POlhAT5rMALPew30Nw/viewform',
            alias: ['ta', 'sidang'],
          },
          {
            slug: 'ta-tanda-terima',
            label: {
              id: 'Pengumpulan Bukti Tanda Terima Berkas Tugas Akhir',
              en: 'Collection of Final Project Document Receipt',
            },
            url: 'https://docs.google.com/forms/d/e/1FAIpQLSe5apOobV_VL4CJKSG0HtMLFsclxktmt7sNl0hyRllxq-xfKw/viewform?usp=preview',
            alias: ['ta'],
          },
        ],
      },
      {
        label: { id: 'MBKM' },
        items: [
          {
            slug: 'mbkm-pendaftaran',
            label: {
              id: 'Pendaftaran MBKM Fakultas Sains dan Teknologi Informasi',
              en: 'Faculty of Science and Information Technology MBKM Registration',
            },
            url: 'https://s.itk.ac.id/mbkmfsti',
            alias: ['mbkm', 'merdeka belajar'],
          },
          {
            slug: 'mbkm-seminar-hasil',
            label: {
              id: 'Pendaftaran Seminar Hasil / Laporan Akhir MBKM FSTI',
              en: 'FSTI MBKM Final Report / Results Seminar Registration',
            },
            url: 'https://forms.gle/ogruDmFg6yiQtFLC6',
            alias: ['mbkm', 'seminar hasil', 'laporan akhir'],
          },
        ],
      },
    ],
  },
  {
    id: 'akademik',
    peran: 'mahasiswa',
    ikon: 'akademik',
    unit: { id: 'Akademik', en: 'Academic' },
    title: { id: 'Layanan Akademik', en: 'Academic Services' },
    description: {
      id: 'Administrasi akademik mahasiswa: surat keterangan aktif, surat keterangan lulus, dan dokumen akademik lainnya.',
      en: 'Student academic administration: active student certificates, graduation letters, and other academic documents.',
    },
    kelompok: [
      {
        label: { id: 'Dokumen Akademik', en: 'Academic Documents' },
        items: [
          {
            slug: 'surat-aktif-studi',
            label: {
              id: 'Permohonan Surat Keterangan Aktif Studi',
              en: 'Active Student Certificate Request',
            },
            url: 'https://forms.gle/XG1TVHAG7cNkpKEG7',
            alias: ['aktif kuliah', 'skas'],
          },
          {
            slug: 'surat-aktif-studi-s2',
            label: {
              id: 'Permohonan Surat Keterangan Aktif Studi (Pascasarjana / MMT)',
              en: 'Active Student Certificate Request (Postgraduate / MMT)',
            },
            url: 'https://s.itk.ac.id/surataktifstudis2',
            alias: ['s2', 'magister', 'mmt'],
          },
          {
            slug: 'skl',
            label: {
              id: 'Permohonan Surat Keterangan Lulus (SKL)',
              en: 'Graduation Certificate Request',
            },
            url: 'https://forms.gle/njqaU8cs81KwVHiJ9',
            alias: ['skl', 'lulus', 'wisuda'],
          },
          {
            slug: 'dokumen-akademik',
            label: {
              id: 'Permohonan Layanan Dokumen Akademik (Transkip Mata Kuliah, KHS dan FRS)',
              en: 'Academic Document Service Request (Transcript, Grade Report, and FRS)',
            },
            url: 'https://forms.gle/YbWMvtHvbgKAQPkS7',
            alias: ['transkrip', 'khs', 'frs'],
          },
          {
            slug: 'dispensasi',
            label: {
              id: 'Permohonan Dispensasi Perkuliahan',
              en: 'Class Attendance Dispensation Request',
            },
            url: 'https://docs.google.com/forms/u/0/d/1KgPpebd-SnQsAbTCvkn27H4JNBXS_05Amfd2kUw6YUA/viewform?edit_requested=true',
            alias: ['izin', 'dispen'],
          },
          {
            slug: 'pengunduran-diri',
            label: { id: 'Permohonan Pengunduran Diri', en: 'Resignation Request' },
            url: 'https://docs.google.com/forms/d/e/1FAIpQLSdgfezuRykiiFUqAqTE7ZnvtYFX-UhFuYfeD0WtULXBRPme6w/viewform',
            alias: ['keluar', 'resign'],
          },
        ],
      },
    ],
  },
  {
    id: 'legalisasi',
    peran: 'mahasiswa',
    ikon: 'verifikasi',
    unit: { id: 'Tata Usaha', en: 'Administration' },
    title: { id: 'Legalisasi Dokumen', en: 'Document Legalization' },
    description: {
      id: 'Legalisasi dokumen akademik resmi fakultas seperti transkrip, ijazah, dan sertifikat.',
      en: 'Legalization of official faculty academic documents such as transcripts, diplomas, and certificates.',
    },
    kelompok: [
      {
        label: { id: 'Legalisasi Dokumen', en: 'Document Legalization' },
        items: [
          {
            slug: 'legalisasi',
            label: {
              id: 'Legalisasi Dokumen (KHS, Transkrip Sementara, SKL, KTM, FRS, Surat Keterangan Aktif Studi, Sertifikat Akreditasi)',
              en: 'Document Legalization (Grade Report, Temporary Transcript, Graduation Letter, Student ID, FRS, Active Student Certificate, Accreditation Certificate)',
            },
            url: 'https://forms.gle/Z7FiBx4B2zMRuUGQ7',
            alias: ['ijazah', 'cap', 'stempel', 'ktm', 'akreditasi'],
          },
        ],
      },
    ],
  },
  {
    id: 'perubahan-matkul',
    peran: 'mahasiswa',
    ikon: 'ubah',
    unit: { id: 'Akademik', en: 'Academic' },
    title: {
      id: 'Perubahan / Penambahan / Penghapusan Mata Kuliah',
      en: 'Course Changes / Additions / Removals',
    },
    description: {
      id: 'Perubahan, penambahan, atau penghapusan mata kuliah dalam rencana studi.',
      en: 'Changing, adding, or removing courses in the study plan.',
    },
    kelompok: [
      {
        label: { id: 'Formulir Perubahan Mata Kuliah', en: 'Course Modification Forms' },
        items: [
          {
            slug: 'form-perubahan-matkul',
            label: {
              id: 'Formulir Permohonan Perubahan Mata Kuliah',
              en: 'Course Change Request Form',
            },
            url: 'https://docs.google.com/document/d/1CSE6CAujsTgXA9GUMVi-Axq9aBxThnuC/edit',
            alias: ['frs', 'krs'],
          },
          {
            slug: 'form-permohonan-matkul',
            label: { id: 'Formulir Permohonan Mata Kuliah', en: 'Course Request Form' },
            url: 'https://docs.google.com/document/d/1HqhobeyBaDlOkuSqmltCETpP3vW1jJLO/edit',
            alias: ['frs', 'krs'],
          },
          {
            slug: 'form-terlambat-perwalian',
            label: {
              id: 'Formulir Permohonan Terlambat Perwalian/FRS',
              en: 'Late Registration / FRS Form',
            },
            url: 'https://docs.google.com/document/d/1Iwjr2MURBQJd1LHZCXFMkzhDoDzOlidn/edit',
            alias: ['frs', 'perwalian', 'telat'],
          },
          {
            slug: 'form-penghapusan-frs',
            label: { id: 'Formulir Permohonan Penghapusan FRS', en: 'FRS Deletion Request Form' },
            url: 'https://docs.google.com/document/d/1mDCfOePs_XZdmhSp3aMhfo_o7Q-3R4Ix/edit',
            alias: ['frs'],
          },
          {
            slug: 'pengumpulan-form-frs',
            label: { id: 'Pengumpulan Formulir Perubahan FRS', en: 'FRS Change Form Collection' },
            url: 'https://forms.gle/EH7tDdrxKaPVAnzN9',
            alias: ['frs'],
          },
        ],
      },
    ],
  },
  {
    id: 'kemahasiswaan',
    peran: 'mahasiswa',
    ikon: 'kemahasiswaan',
    unit: { id: 'Kemahasiswaan', en: 'Student Affairs' },
    title: { id: 'Layanan Kemahasiswaan', en: 'Student Affairs' },
    description: {
      id: 'Administrasi kegiatan mahasiswa, sertifikat, dan urusan kemahasiswaan lainnya.',
      en: 'Administration of student activities, certificates, and other student affairs.',
    },
    kelompok: [
      {
        label: { id: 'Layanan Kemahasiswaan', en: 'Student Affairs Services' },
        items: [
          {
            slug: 'nomor-sertifikat',
            label: {
              id: 'Permohonan Nomor Sertifikat Kegiatan Mahasiswa',
              en: 'Student Activity Certificate Number Request',
            },
            url: 'https://docs.google.com/forms/d/1youLu99r0g6uLTEAgX8rNJF5t3b8id-MKk6KsPi_nko/viewform?edit_requested=true',
            alias: ['sertifikat'],
          },
          {
            slug: 'tanda-tangan-proposal',
            label: {
              id: 'Permohonan Tanda Tangan Kegiatan/Proposal',
              en: 'Activity / Proposal Signature Request',
            },
            url: 'https://forms.gle/aiYkVXLen6jThVJf8',
            alias: ['ttd', 'proposal'],
          },
          {
            slug: 'surat-tugas-mahasiswa',
            label: {
              id: 'Permohonan Surat Tugas Mahasiswa',
              en: 'Student Assignment Letter Request',
            },
            url: 'https://forms.gle/7pDSng1cQVmvyWEP9',
          },
        ],
      },
    ],
  },
  {
    id: 'keuangan',
    peran: 'mahasiswa',
    ikon: 'keuangan',
    unit: { id: 'Keuangan', en: 'Finance' },
    title: { id: 'Layanan Keuangan', en: 'Financial Services' },
    description: {
      id: 'Administrasi keuangan mahasiswa, termasuk permohonan terkait UKT.',
      en: 'Student financial administration, including tuition fee related requests.',
    },
    kelompok: [
      {
        label: { id: 'Layanan Keuangan', en: 'Financial Services' },
        items: [
          {
            slug: 'keringanan-ukt',
            label: { id: 'Permohonan Keringanan UKT', en: 'Tuition Fee Relief Request' },
            url: 'http://s.itk.ac.id/ukttafsti',
            alias: ['ukt', 'spp', 'bayar', 'keringanan'],
          },
          {
            slug: 'uang-muka-kegiatan',
            label: { id: 'Pengajuan Uang Muka Kegiatan', en: 'Activity Advance Payment Service' },
            url: 'https://docs.google.com/forms/d/e/1FAIpQLSfpuV0Yb-fOfhfl5hhhVbsUfFW2pUb6LONB4TPGPCKh6ZpchQ/viewform?usp=header',
            alias: ['um', 'dana'],
          },
        ],
      },
    ],
  },
  {
    id: 'humas',
    peran: 'mahasiswa',
    ikon: 'humas',
    unit: { id: 'Humas', en: 'Public Relations' },
    title: { id: 'Layanan Humas', en: 'Public Relations' },
    description: {
      id: 'Hubungan masyarakat FSTI dan konten media sosial resmi fakultas.',
      en: 'FSTI public relations and official faculty social media content.',
    },
    kelompok: [
      {
        label: { id: 'Layanan Humas', en: 'Public Relations Services' },
        items: [
          {
            slug: 'upload-instagram',
            label: {
              id: 'Permohonan Upload Feed Instagram Official FSTI',
              en: 'Official FSTI Instagram Feed Upload Request',
            },
            url: 'http://s.itk.ac.id/fstiprestasi',
            alias: ['ig', 'instagram', 'prestasi'],
          },
          {
            slug: 'upload-tiktok',
            label: {
              id: 'Permohonan Upload Konten Tiktok Official FSTI',
              en: 'Official FSTI TikTok Content Upload Request',
            },
            url: 'https://docs.google.com/forms/d/e/1FAIpQLSf9wlLtNU6pHNfpO20SdFOxUmCpDVBo9CtdVrWwJ1QZX03-Vg/viewform',
            alias: ['tiktok'],
          },
          {
            slug: 'upload-website',
            label: {
              id: 'Permohonan Upload Konten Website Profil FSTI ITK',
              en: 'FSTI ITK Profile Website Content Upload Request',
            },
            url: 'https://docs.google.com/forms/d/e/1FAIpQLScljlNNYgOFA3pAeGocG1cXtZ1O9N9zrQ8_RKi5-QsNEtRZNA/viewform',
            alias: ['web', 'berita'],
          },
        ],
      },
    ],
  },

  // ─── DOSEN & TENAGA KEPENDIDIKAN ────────────────────────────────────────
  {
    id: 'keuangan-dosen',
    peran: 'dosen',
    ikon: 'keuangan',
    unit: { id: 'Keuangan', en: 'Finance' },
    title: { id: 'Layanan Keuangan', en: 'Financial Services' },
    description: {
      id: 'Administrasi keuangan untuk dosen dan tenaga kependidikan.',
      en: 'Financial administration for lecturers and staff.',
    },
    kelompok: [
      {
        label: { id: 'Layanan Keuangan', en: 'Financial Services' },
        items: [
          {
            slug: 'uang-muka-kegiatan-dosen',
            label: { id: 'Pengajuan Uang Muka Kegiatan', en: 'Activity Advance Payment Service' },
            url: 'https://docs.google.com/forms/d/e/1FAIpQLSfpuV0Yb-fOfhfl5hhhVbsUfFW2pUb6LONB4TPGPCKh6ZpchQ/viewform?usp=header',
            alias: ['um', 'dana'],
          },
        ],
      },
    ],
  },
  {
    id: 'sistem-informasi-dosen',
    peran: 'dosen',
    ikon: 'sistem',
    unit: { id: 'Sistem Informasi', en: 'Information Systems' },
    title: { id: 'Sistem Informasi Dosen', en: 'Lecturer Information Systems' },
    description: {
      id: 'Pintasan ke sistem informasi akademik dan administrasi ITK.',
      en: 'Shortcuts to ITK academic and administrative information systems.',
    },
    kelompok: [
      {
        label: { id: 'Sistem Informasi', en: 'Information Systems' },
        items: [
          {
            slug: 'siakad',
            label: { id: 'SIAKAD' },
            url: 'http://gerbang.itk.ac.id/',
            alias: ['gerbang', 'nilai'],
          },
          { slug: 'simpas', label: { id: 'SIMPAS' }, url: 'http://simpas.itk.ac.id/' },
          {
            slug: 'sipeka',
            label: { id: 'SIPEKA' },
            url: 'http://sipeka.itk.ac.id/',
            alias: ['kepegawaian'],
          },
          {
            slug: 'kuliah',
            label: { id: 'KULIAH' },
            url: 'http://kuliah.itk.ac.id/',
            alias: ['lms', 'moodle'],
          },
          {
            slug: 'simhki',
            label: { id: 'SIMHKI' },
            url: 'http://hki.itk.ac.id/',
            alias: ['hki', 'paten', 'hak cipta'],
          },
          {
            slug: 'sister',
            label: { id: 'SISTER' },
            url: 'http://sister.itk.ac.id/',
            alias: ['bkd', 'serdos'],
          },
          {
            slug: 'open-data-fsti',
            label: { id: 'Open Data FSTI' },
            url: 'https://docs.google.com/spreadsheets/d/1Djh8lifyazItpv8tuC2XWYF32kBkueCQaM43x6yEDiU/edit?gid=1389139501#gid=1389139501',
            alias: ['data'],
          },
        ],
      },
    ],
  },
  {
    id: 'surat-keterangan-kerja',
    peran: 'dosen',
    ikon: 'surat',
    unit: { id: 'Kepegawaian', en: 'Human Resources' },
    title: { id: 'Pengajuan Surat Keterangan Kerja', en: 'Employment Certificate Letter' },
    description: {
      id: 'Pengajuan surat keterangan kerja untuk keperluan administrasi.',
      en: 'Requesting employment certificate letters for administrative purposes.',
    },
    url: 'https://forms.gle/HUhx1fmpUSJwvziRA',
  },
  {
    id: 'surat-cek-plagiat',
    peran: 'dosen',
    ikon: 'verifikasi',
    unit: { id: 'Akademik', en: 'Academic' },
    title: { id: 'Pengajuan Surat Ket. Cek Plagiasi Dosen', en: 'Plagiarism Check Letter' },
    description: {
      id: 'Pengajuan surat keterangan cek plagiarisme untuk dokumen dosen.',
      en: 'Requesting plagiarism check certificates for lecturer documents.',
    },
    url: 'https://docs.google.com/forms/d/e/1FAIpQLSersKFA0Nkw_AwSLN1H00MpAkg_2JI1XgX3l39WRcDAPupNHg/viewform',
  },
  {
    id: 'template-form-cuti',
    peran: 'dosen',
    ikon: 'tandatangan',
    unit: { id: 'Kepegawaian', en: 'Human Resources' },
    title: { id: 'Template Form Cuti', en: 'Leave Form Template' },
    description: {
      id: 'Template formulir untuk pengajuan cuti dosen dan tenaga kependidikan.',
      en: 'Template forms for lecturer and staff leave requests.',
    },
    url: 'https://docs.google.com/spreadsheets/d/1dIxHGXbtxJNw13_GY0NFxq580x2OOPMH/edit?usp=sharing&ouid=106706954680118435553&rtpof=true&sd=true',
  },
  {
    id: 'layanan-surat-tugas',
    peran: 'dosen',
    ikon: 'surat',
    unit: { id: 'Tata Usaha', en: 'Administration' },
    title: { id: 'Layanan Pengajuan Surat Tugas', en: 'Assignment Letter Service' },
    description: {
      id: 'Pengajuan surat tugas untuk dosen dan tenaga kependidikan.',
      en: 'Requesting assignment letters for lecturers and staff.',
    },
    url: 'https://forms.gle/Cqmep7rLAinZcgjx5',
  },
  {
    id: 'peminjaman-sarana',
    peran: 'dosen',
    ikon: 'kerja',
    unit: { id: 'Sarana & Prasarana', en: 'Facilities' },
    title: {
      id: 'Layanan Peminjaman Sarana dan Prasarana ITK',
      en: 'ITK Facilities and Infrastructure Borrowing',
    },
    description: {
      id: 'Peminjaman ruang, kendaraan, dan peralatan milik ITK.',
      en: 'Borrowing ITK rooms, vehicles, and equipment.',
    },
    url: 'https://forms.gle/9E3ddzEHB35xSgjc9',
  },
  {
    id: 'pengesahan-dekan',
    peran: 'dosen',
    ikon: 'verifikasi',
    unit: { id: 'Dekanat', en: "Dean's Office" },
    title: { id: 'Layanan Pengesahan Dekan', en: "Dean's Approval" },
    description: {
      id: 'Pengajuan pengesahan dekan untuk dokumen akademik.',
      en: "Requesting the dean's approval for academic documents.",
    },
    url: 'https://forms.gle/P4S93zfuZLjdZkaa9',
  },
  {
    id: 'inisiasi-kerjasama',
    peran: 'dosen',
    ikon: 'kerja',
    unit: { id: 'Kerja Sama', en: 'Partnerships' },
    title: { id: 'Layanan Pengajuan Inisiasi Kerjasama', en: 'Cooperation Initiation' },
    description: {
      id: 'Pengajuan inisiasi kerja sama dengan institusi eksternal.',
      en: 'Initiating cooperation with external institutions.',
    },
    url: 'https://drive.google.com/drive/folders/1vMFpudK1LX3g1ywcOECLE_5S7HgA3vse?usp=sharing',
  },
  {
    id: 'kumpulan-sk',
    peran: 'dosen',
    ikon: 'folder',
    unit: { id: 'Tata Usaha', en: 'Administration' },
    title: {
      id: 'Kumpulan SK Akademik & Non-Akademik',
      en: 'Academic & Non-Academic Decrees Collection',
    },
    description: {
      id: 'Arsip dokumen SK akademik dan non-akademik fakultas.',
      en: 'Archive of faculty academic and non-academic decree documents.',
    },
    url: 'https://drive.google.com/drive/folders/1vMFpudK1LX3g1ywcOECLE_5S7HgA3vse?usp=sharing',
  },
  {
    id: 'template-kp4',
    peran: 'dosen',
    ikon: 'tandatangan',
    unit: { id: 'Kepegawaian', en: 'Human Resources' },
    title: { id: 'Template Form KP4', en: 'KP4 Form Template' },
    description: {
      id: 'Template formulir untuk dokumentasi KP4.',
      en: 'Template forms for KP4 documentation.',
    },
    url: 'https://docs.google.com/document/d/1kkdVJyegHSSDVpgR2bfqlHBxRfQyIT1p/edit?usp=sharing&ouid=106706954680118435553&rtpof=true&sd=true',
  },
  {
    id: 'pengajuan-sk-rektor',
    peran: 'dosen',
    ikon: 'penghargaan',
    unit: { id: 'Dekanat', en: "Dean's Office" },
    title: { id: 'Layanan Pengajuan SK Rektor', en: "Rector's Decree Request" },
    description: {
      id: 'Pengajuan SK Rektor untuk kegiatan akademik.',
      en: "Requesting the rector's decree for academic activities.",
    },
    url: 'https://docs.google.com/forms/d/e/1FAIpQLSe9fYni6UDE8ipSnycheBaqaLyJyAoizqmUmBWuzwifx4auJQ/viewform?usp=sharing',
  },
];

/**
 * Rujukan tingkat halaman — bukan bagian dari katalog layanan, tetapi selalu
 * relevan apa pun yang sedang dicari pengguna.
 */
export const RUJUKAN = {
  templateFormulir: {
    label: {
      id: 'Template Formulir Akademik Mahasiswa',
      en: 'Student Academic Form Template',
    } satisfies Teks,
    url: 'https://s.itk.ac.id/templateformulir',
  },
};
