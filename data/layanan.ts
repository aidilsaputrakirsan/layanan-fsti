/**
 * Sumber data tunggal seluruh layanan FSTI.
 *
 * - `layanan`  : daftar layanan (satu entri per layanan, dipakai ulang di banyak tempat).
 * - `pintu`    : struktur menu Layanan S1 / S2 / Dosen yang merujuk ke id layanan.
 *
 * Halaman Layanan, Katalog, dan pencarian di beranda semuanya membaca file ini,
 * jadi menambah/mengubah layanan cukup dilakukan di sini.
 *
 * Kolom katalog (persyaratan, waktu, hasil, sop) boleh dikosongkan; halaman katalog
 * akan menampilkan "sedang disusun" sampai diisi.
 */

export type TipeLayanan = 'formulir' | 'template' | 'tautan' | 'folder';

export interface Layanan {
  id: string;
  nama: string;
  ringkas: string;
  url: string;
  tipe: TipeLayanan;
  persyaratan?: string[];
  /** Kosong = memakai estimasi umum (ESTIMASI_UMUM) */
  waktu?: string;
  hasil?: string;
  /** Path file SOP di /public, mis. '/file/sop/legalisasi.pdf' */
  sop?: string;
}

export interface Bagian {
  nama: string;
  layanan: string[];
}

export interface Kelompok {
  id: string;
  nama: string;
  ringkas: string;
  bagian: Bagian[];
}

export type PintuId = 's1' | 's2' | 'dosen';

export interface Pintu {
  id: PintuId;
  nomor: string;
  nama: string;
  untuk: string;
  ringkas: string;
  kelompok: Kelompok[];
}

export const ESTIMASI_UMUM = '1–2 hari kerja';

export const TIPE_LABEL: Record<TipeLayanan, string> = {
  formulir: 'Formulir online',
  template: 'Unduh template',
  tautan: 'Buka sistem',
  folder: 'Buka folder',
};

const L = (l: Layanan) => l;

export const layanan: Layanan[] = [
  // ───────────── S1 · Akademik · Surat & dokumen akademik
  L({ id: 'surat-pengantar', nama: 'Surat Pengantar', ringkas: 'Surat pengantar untuk keperluan administrasi mahasiswa.', url: 'https://forms.gle/TfydWAeGoFFQYdmR6', tipe: 'formulir' }),
  L({ id: 'surat-aktif-studi', nama: 'Surat Keterangan Aktif Studi', ringkas: 'Keterangan bahwa mahasiswa masih aktif kuliah pada semester berjalan.', url: 'https://forms.gle/XG1TVHAG7cNkpKEG7', tipe: 'formulir' }),
  L({ id: 'skl', nama: 'Surat Keterangan Lulus (SKL)', ringkas: 'Keterangan lulus sementara sebelum ijazah terbit.', url: 'https://forms.gle/njqaU8cs81KwVHiJ9', tipe: 'formulir' }),
  L({ id: 'dokumen-akademik', nama: 'Dokumen Akademik (Transkrip, KHS, FRS)', ringkas: 'Permohonan transkrip mata kuliah, KHS, dan FRS.', url: 'https://forms.gle/YbWMvtHvbgKAQPkS7', tipe: 'formulir' }),
  L({ id: 'dispensasi', nama: 'Dispensasi Perkuliahan', ringkas: 'Izin tidak mengikuti perkuliahan karena kegiatan atau alasan tertentu.', url: 'https://docs.google.com/forms/d/1KgPpebd-SnQsAbTCvkn27H4JNBXS_05Amfd2kUw6YUA/viewform', tipe: 'formulir' }),
  L({ id: 'pengunduran-diri', nama: 'Pengunduran Diri', ringkas: 'Permohonan mengundurkan diri sebagai mahasiswa.', url: 'https://docs.google.com/forms/d/e/1FAIpQLSdgfezuRykiiFUqAqTE7ZnvtYFX-UhFuYfeD0WtULXBRPme6w/viewform', tipe: 'formulir' }),
  L({ id: 'legalisasi', nama: 'Legalisasi Dokumen', ringkas: 'Legalisasi KHS, transkrip sementara, SKL, KTM, FRS, surat aktif studi, dan sertifikat akreditasi.', url: 'https://forms.gle/Z7FiBx4B2zMRuUGQ7', tipe: 'formulir' }),
  L({ id: 'template-formulir-akademik', nama: 'Template Formulir Akademik Mahasiswa', ringkas: 'Kumpulan format surat dan formulir akademik.', url: 'https://s.itk.ac.id/templateformulir', tipe: 'template' }),

  // ───────────── S1 · Akademik · Perubahan mata kuliah & FRS
  L({ id: 'form-perubahan-matkul', nama: 'Formulir Perubahan Mata Kuliah', ringkas: 'Template permohonan perubahan mata kuliah.', url: 'https://docs.google.com/document/d/1CSE6CAujsTgXA9GUMVi-Axq9aBxThnuC/edit', tipe: 'template' }),
  L({ id: 'form-permohonan-matkul', nama: 'Formulir Permohonan Mata Kuliah', ringkas: 'Template permohonan penambahan mata kuliah.', url: 'https://docs.google.com/document/d/1HqhobeyBaDlOkuSqmltCETpP3vW1jJLO/edit', tipe: 'template' }),
  L({ id: 'form-terlambat-frs', nama: 'Formulir Terlambat Perwalian/FRS', ringkas: 'Template permohonan karena terlambat perwalian atau pengisian FRS.', url: 'https://docs.google.com/document/d/1Iwjr2MURBQJd1LHZCXFMkzhDoDzOlidn/edit', tipe: 'template' }),
  L({ id: 'form-hapus-frs', nama: 'Formulir Penghapusan FRS', ringkas: 'Template permohonan penghapusan mata kuliah di FRS.', url: 'https://docs.google.com/document/d/1mDCfOePs_XZdmhSp3aMhfo_o7Q-3R4Ix/edit', tipe: 'template' }),
  L({ id: 'kumpul-perubahan-frs', nama: 'Pengumpulan Formulir Perubahan FRS', ringkas: 'Unggah formulir perubahan FRS yang sudah diisi dan ditandatangani.', url: 'https://forms.gle/EH7tDdrxKaPVAnzN9', tipe: 'formulir' }),

  // ───────────── S1 · Akademik · Kerja Praktik
  L({ id: 'kp-daftar', nama: 'Pendaftaran Kerja Praktik', ringkas: 'Pendaftaran awal kerja praktik.', url: 'https://docs.google.com/forms/d/e/1FAIpQLSdq1GExnTNwAodG_NbZTskZE0SUZDycsArf7_2ybU2Qa61R4w/viewform', tipe: 'formulir' }),
  L({ id: 'kp-sebelum', nama: 'Pendaftaran Sebelum Diterima KP', ringkas: 'Pengajuan surat sebelum mendapat penerimaan dari instansi KP.', url: 'https://forms.gle/XLPQbtTQatE4dgYN7', tipe: 'formulir' }),
  L({ id: 'kp-sesudah', nama: 'Pendaftaran Setelah Diterima KP', ringkas: 'Pelaporan setelah diterima di instansi KP.', url: 'https://forms.gle/nQ85jfeA9L39NstL8', tipe: 'formulir' }),
  L({ id: 'kp-seminar', nama: 'Pendaftaran Seminar Kerja Praktik', ringkas: 'Pendaftaran jadwal seminar KP.', url: 'https://forms.gle/KWrKUTqQG5uWbPQW6', tipe: 'formulir' }),
  L({ id: 'upload-hasil', nama: 'Upload Formulir Hasil Mahasiswa', ringkas: 'Unggah formulir hasil seminar/sidang (KP, magang, dan TA).', url: 'https://docs.google.com/forms/d/e/1FAIpQLSfdRvocwHRo7F1EPPNjZVMYEK8oQzRlLB4WPx5Cx-8kCjphpw/viewform', tipe: 'formulir' }),

  // ───────────── S1 · Akademik · Magang
  L({ id: 'magang-pengantar', nama: 'Pendaftaran Pengantar Magang', ringkas: 'Pengajuan surat pengantar magang.', url: 'https://docs.google.com/forms/d/e/1FAIpQLSevJWaWZJ7sBEqRtr2DQpPvQ2U8h7-Bo3LzZKB40Lt5-WZ6og/viewform', tipe: 'formulir' }),
  L({ id: 'magang-seminar', nama: 'Pendaftaran Seminar Hasil Magang', ringkas: 'Pendaftaran seminar hasil magang.', url: 'https://forms.gle/gWQLGqz3GXpYXJrXA', tipe: 'formulir' }),

  // ───────────── S1 · Akademik · Tugas Akhir
  L({ id: 'ta-sempro', nama: 'Pendaftaran Seminar Proposal TA', ringkas: 'Pendaftaran seminar proposal tugas akhir.', url: 'https://forms.gle/Kprni4wLMBeEvhEx5', tipe: 'formulir' }),
  L({ id: 'ta-semhas', nama: 'Pendaftaran Seminar Hasil TA', ringkas: 'Pendaftaran seminar hasil tugas akhir.', url: 'https://s.itk.ac.id/seminarhasilta', tipe: 'formulir' }),
  L({ id: 'ta-sidang', nama: 'Pendaftaran Sidang TA', ringkas: 'Pendaftaran sidang tugas akhir.', url: 'https://forms.gle/XtPfYYyuCJgPkgW68', tipe: 'formulir' }),
  L({ id: 'ta-suket-sidang', nama: 'Surat Keterangan Sidang TA', ringkas: 'Permohonan surat keterangan telah sidang tugas akhir.', url: 'https://docs.google.com/forms/d/e/1FAIpQLSfGMptnRk3vrXLxLAEZGbqrCp5WvwF7POlhAT5rMALPew30Nw/viewform', tipe: 'formulir' }),
  L({ id: 'ta-tanda-terima', nama: 'Pengumpulan Tanda Terima Berkas TA', ringkas: 'Unggah bukti tanda terima berkas tugas akhir.', url: 'https://docs.google.com/forms/d/e/1FAIpQLSe5apOobV_VL4CJKSG0HtMLFsclxktmt7sNl0hyRllxq-xfKw/viewform', tipe: 'formulir' }),

  // ───────────── S1 · Akademik · MBKM
  L({ id: 'mbkm-daftar', nama: 'Pendaftaran MBKM FSTI', ringkas: 'Pendaftaran program Merdeka Belajar Kampus Merdeka di FSTI.', url: 'https://s.itk.ac.id/mbkmfsti', tipe: 'formulir' }),
  L({ id: 'mbkm-seminar', nama: 'Seminar Hasil / Laporan Akhir MBKM', ringkas: 'Pendaftaran seminar hasil atau pengumpulan laporan akhir MBKM.', url: 'https://forms.gle/ogruDmFg6yiQtFLC6', tipe: 'formulir' }),

  // ───────────── S1 · Keuangan
  L({ id: 'keringanan-ukt', nama: 'Keringanan UKT', ringkas: 'Permohonan keringanan Uang Kuliah Tunggal.', url: 'https://s.itk.ac.id/ukttafsti', tipe: 'formulir' }),
  L({ id: 'uang-muka-kegiatan', nama: 'Pengajuan Uang Muka Kegiatan', ringkas: 'Pengajuan uang muka untuk pelaksanaan kegiatan.', url: 'https://docs.google.com/forms/d/e/1FAIpQLSfpuV0Yb-fOfhfl5hhhVbsUfFW2pUb6LONB4TPGPCKh6ZpchQ/viewform', tipe: 'formulir' }),

  // ───────────── S1 · Kemahasiswaan
  L({ id: 'surat-rekomendasi', nama: 'Surat Rekomendasi Kegiatan/Beasiswa', ringkas: 'Rekomendasi fakultas untuk kegiatan, beasiswa, atau keperluan lain.', url: 'https://docs.google.com/forms/d/1nTZZM4hKMTcFOenFbIOUBrnCyaRLqzlifiDx6QAZEO0/viewform', tipe: 'formulir' }),
  L({ id: 'nomor-sertifikat', nama: 'Nomor Sertifikat Kegiatan Mahasiswa', ringkas: 'Permohonan nomor resmi untuk sertifikat kegiatan.', url: 'https://docs.google.com/forms/d/1youLu99r0g6uLTEAgX8rNJF5t3b8id-MKk6KsPi_nko/viewform', tipe: 'formulir' }),
  L({ id: 'ttd-proposal', nama: 'Tanda Tangan Kegiatan/Proposal', ringkas: 'Permohonan tanda tangan pimpinan untuk proposal atau dokumen kegiatan.', url: 'https://forms.gle/aiYkVXLen6jThVJf8', tipe: 'formulir' }),
  L({ id: 'surat-tugas-mahasiswa', nama: 'Surat Tugas Mahasiswa', ringkas: 'Surat tugas untuk mahasiswa yang mewakili fakultas/kampus.', url: 'https://forms.gle/7pDSng1cQVmvyWEP9', tipe: 'formulir' }),

  // ───────────── S1 · Humas
  L({ id: 'humas-instagram', nama: 'Upload Feed Instagram FSTI', ringkas: 'Pengajuan publikasi prestasi/kegiatan di Instagram resmi FSTI.', url: 'https://s.itk.ac.id/fstiprestasi', tipe: 'formulir' }),
  L({ id: 'humas-tiktok', nama: 'Upload Konten TikTok FSTI', ringkas: 'Pengajuan konten untuk TikTok resmi FSTI.', url: 'https://docs.google.com/forms/d/e/1FAIpQLSf9wlLtNU6pHNfpO20SdFOxUmCpDVBo9CtdVrWwJ1QZX03-Vg/viewform', tipe: 'formulir' }),
  L({ id: 'humas-website', nama: 'Upload Konten Website Profil FSTI', ringkas: 'Pengajuan berita/konten untuk website profil FSTI ITK.', url: 'https://docs.google.com/forms/d/e/1FAIpQLScljlNNYgOFA3pAeGocG1cXtZ1O9N9zrQ8_RKi5-QsNEtRZNA/viewform', tipe: 'formulir' }),

  // ───────────── S2 · Akademik
  L({ id: 's2-permohonan-surat', nama: 'Permohonan Surat Pascasarjana (MMT)', ringkas: 'Permohonan surat untuk mahasiswa Magister Manajemen Teknologi.', url: 'https://s.itk.ac.id/permohonansurats2', tipe: 'formulir' }),
  L({ id: 's2-aktif-studi', nama: 'Surat Keterangan Aktif Studi S2 (MMT)', ringkas: 'Keterangan aktif kuliah untuk mahasiswa pascasarjana.', url: 'https://s.itk.ac.id/surataktifstudis2', tipe: 'formulir' }),

  // ───────────── Dosen
  L({ id: 'dosen-surat-tugas', nama: 'Pengajuan Surat Tugas', ringkas: 'Surat tugas dosen untuk kegiatan di dalam maupun luar kampus.', url: 'https://forms.gle/Cqmep7rLAinZcgjx5', tipe: 'formulir' }),
  L({ id: 'dosen-pengesahan-dekan', nama: 'Pengesahan Dekan', ringkas: 'Pengesahan/tanda tangan Dekan untuk dokumen akademik.', url: 'https://forms.gle/P4S93zfuZLjdZkaa9', tipe: 'formulir' }),
  L({ id: 'dosen-sk-rektor', nama: 'Pengajuan SK Rektor', ringkas: 'Pengajuan Surat Keputusan Rektor untuk kegiatan akademik.', url: 'https://docs.google.com/forms/d/e/1FAIpQLSe9fYni6UDE8ipSnycheBaqaLyJyAoizqmUmBWuzwifx4auJQ/viewform', tipe: 'formulir' }),
  L({ id: 'dosen-suket-kerja', nama: 'Surat Keterangan Kerja', ringkas: 'Surat keterangan kerja untuk keperluan administrasi dosen.', url: 'https://forms.gle/HUhx1fmpUSJwvziRA', tipe: 'formulir' }),
  L({ id: 'dosen-cek-plagiasi', nama: 'Surat Keterangan Cek Plagiasi', ringkas: 'Surat keterangan hasil cek plagiasi dokumen dosen.', url: 'https://docs.google.com/forms/d/e/1FAIpQLSersKFA0Nkw_AwSLN1H00MpAkg_2JI1XgX3l39WRcDAPupNHg/viewform', tipe: 'formulir' }),
  L({ id: 'dosen-sarpras', nama: 'Peminjaman Sarana & Prasarana ITK', ringkas: 'Peminjaman ruang dan fasilitas ITK.', url: 'https://forms.gle/9E3ddzEHB35xSgjc9', tipe: 'formulir' }),
  L({ id: 'dosen-kerjasama', nama: 'Inisiasi Kerja Sama', ringkas: 'Pengajuan inisiasi kerja sama dengan institusi eksternal.', url: 'https://drive.google.com/drive/folders/1vMFpudK1LX3g1ywcOECLE_5S7HgA3vse?usp=sharing', tipe: 'folder' }),
  L({ id: 'dosen-kumpulan-sk', nama: 'Kumpulan SK Akademik & Non-Akademik', ringkas: 'Arsip dokumen SK akademik dan non-akademik.', url: 'https://drive.google.com/drive/folders/1vMFpudK1LX3g1ywcOECLE_5S7HgA3vse?usp=sharing', tipe: 'folder' }),
  L({ id: 'dosen-template-cuti', nama: 'Template Formulir Cuti', ringkas: 'Template formulir pengajuan cuti dosen.', url: 'https://docs.google.com/spreadsheets/d/1dIxHGXbtxJNw13_GY0NFxq580x2OOPMH/edit?usp=sharing&ouid=106706954680118435553&rtpof=true&sd=true', tipe: 'template' }),
  L({ id: 'dosen-template-kp4', nama: 'Template Formulir KP4', ringkas: 'Template formulir KP4.', url: 'https://docs.google.com/document/d/1kkdVJyegHSSDVpgR2bfqlHBxRfQyIT1p/edit?usp=sharing&ouid=106706954680118435553&rtpof=true&sd=true', tipe: 'template' }),
  L({ id: 'si-siakad', nama: 'SIAKAD', ringkas: 'Sistem informasi akademik ITK.', url: 'http://gerbang.itk.ac.id/', tipe: 'tautan' }),
  L({ id: 'si-simpas', nama: 'SIMPAS', ringkas: 'Sistem informasi ITK.', url: 'http://simpas.itk.ac.id/', tipe: 'tautan' }),
  L({ id: 'si-sipeka', nama: 'SIPEKA', ringkas: 'Sistem informasi ITK.', url: 'http://sipeka.itk.ac.id/', tipe: 'tautan' }),
  L({ id: 'si-kuliah', nama: 'KULIAH', ringkas: 'Platform pembelajaran daring ITK.', url: 'http://kuliah.itk.ac.id/', tipe: 'tautan' }),
  L({ id: 'si-simhki', nama: 'SIMHKI', ringkas: 'Sistem informasi Hak Kekayaan Intelektual ITK.', url: 'http://hki.itk.ac.id/', tipe: 'tautan' }),
  L({ id: 'si-sister', nama: 'SISTER', ringkas: 'Sistem Informasi Sumberdaya Terintegrasi.', url: 'http://sister.itk.ac.id/', tipe: 'tautan' }),
  L({ id: 'si-open-data', nama: 'Open Data FSTI', ringkas: 'Data terbuka FSTI untuk dosen.', url: 'https://docs.google.com/spreadsheets/d/1Djh8lifyazItpv8tuC2XWYF32kBkueCQaM43x6yEDiU/edit?gid=1389139501#gid=1389139501', tipe: 'tautan' }),
];

export const pintu: Pintu[] = [
  {
    id: 's1',
    nomor: '01',
    nama: 'Layanan S1',
    untuk: 'Mahasiswa Sarjana',
    ringkas: 'Surat, KP, magang, tugas akhir, keuangan, kegiatan mahasiswa, dan publikasi.',
    kelompok: [
      {
        id: 'akademik',
        nama: 'Akademik',
        ringkas: 'Surat & dokumen akademik, legalisasi, FRS, KP, magang, TA, dan MBKM.',
        bagian: [
          { nama: 'Surat & Dokumen Akademik', layanan: ['surat-pengantar', 'surat-aktif-studi', 'skl', 'dokumen-akademik', 'dispensasi', 'pengunduran-diri', 'template-formulir-akademik'] },
          { nama: 'Legalisasi', layanan: ['legalisasi'] },
          { nama: 'Perubahan Mata Kuliah & FRS', layanan: ['form-perubahan-matkul', 'form-permohonan-matkul', 'form-terlambat-frs', 'form-hapus-frs', 'kumpul-perubahan-frs'] },
          { nama: 'Kerja Praktik', layanan: ['kp-daftar', 'kp-sebelum', 'kp-sesudah', 'kp-seminar', 'upload-hasil'] },
          { nama: 'Magang', layanan: ['magang-pengantar', 'magang-seminar', 'upload-hasil'] },
          { nama: 'Tugas Akhir', layanan: ['ta-sempro', 'upload-hasil', 'ta-semhas', 'ta-sidang', 'ta-suket-sidang', 'ta-tanda-terima'] },
          { nama: 'MBKM', layanan: ['mbkm-daftar', 'mbkm-seminar'] },
        ],
      },
      {
        id: 'keuangan',
        nama: 'Keuangan',
        ringkas: 'Keringanan UKT dan uang muka kegiatan.',
        bagian: [{ nama: 'Keuangan Mahasiswa', layanan: ['keringanan-ukt', 'uang-muka-kegiatan'] }],
      },
      {
        id: 'kemahasiswaan',
        nama: 'Kemahasiswaan',
        ringkas: 'Rekomendasi, sertifikat, tanda tangan proposal, dan surat tugas mahasiswa.',
        bagian: [{ nama: 'Kegiatan & Rekomendasi', layanan: ['surat-rekomendasi', 'nomor-sertifikat', 'ttd-proposal', 'surat-tugas-mahasiswa'] }],
      },
      {
        id: 'humas',
        nama: 'Humas',
        ringkas: 'Publikasi prestasi dan kegiatan di kanal resmi FSTI.',
        bagian: [{ nama: 'Publikasi', layanan: ['humas-instagram', 'humas-tiktok', 'humas-website'] }],
      },
    ],
  },
  {
    id: 's2',
    nomor: '02',
    nama: 'Layanan S2',
    untuk: 'Mahasiswa Magister (MMT)',
    ringkas: 'Layanan akademik untuk mahasiswa Magister Manajemen Teknologi.',
    kelompok: [
      {
        id: 'akademik',
        nama: 'Akademik',
        ringkas: 'Permohonan surat dan keterangan aktif studi pascasarjana.',
        bagian: [{ nama: 'Surat & Dokumen Akademik', layanan: ['s2-permohonan-surat', 's2-aktif-studi'] }],
      },
    ],
  },
  {
    id: 'dosen',
    nomor: '03',
    nama: 'Layanan Dosen',
    untuk: 'Dosen FSTI',
    ringkas: 'Surat tugas, pengesahan, SK, sarana, template, dan sistem informasi.',
    kelompok: [
      {
        id: 'persuratan',
        nama: 'Persuratan',
        ringkas: 'Surat tugas, pengesahan Dekan, SK Rektor, dan surat keterangan.',
        bagian: [{ nama: 'Surat & Pengesahan', layanan: ['dosen-surat-tugas', 'dosen-pengesahan-dekan', 'dosen-sk-rektor', 'dosen-suket-kerja', 'dosen-cek-plagiasi'] }],
      },
      {
        id: 'keuangan',
        nama: 'Keuangan',
        ringkas: 'Pengajuan uang muka kegiatan.',
        bagian: [{ nama: 'Keuangan', layanan: ['uang-muka-kegiatan'] }],
      },
      {
        id: 'sarana-kerjasama',
        nama: 'Sarana & Kerja Sama',
        ringkas: 'Peminjaman sarana prasarana dan inisiasi kerja sama.',
        bagian: [{ nama: 'Sarana & Kerja Sama', layanan: ['dosen-sarpras', 'dosen-kerjasama'] }],
      },
      {
        id: 'dokumen',
        nama: 'Dokumen & Template',
        ringkas: 'Template cuti, KP4, dan arsip SK.',
        bagian: [{ nama: 'Dokumen & Template', layanan: ['dosen-template-cuti', 'dosen-template-kp4', 'dosen-kumpulan-sk'] }],
      },
      {
        id: 'sistem-informasi',
        nama: 'Sistem Informasi',
        ringkas: 'Akses cepat ke sistem informasi ITK.',
        bagian: [{ nama: 'Sistem Informasi', layanan: ['si-siakad', 'si-simpas', 'si-sipeka', 'si-kuliah', 'si-simhki', 'si-sister', 'si-open-data'] }],
      },
    ],
  },
];

// ───────────── Helper

const indeks = new Map(layanan.map((l) => [l.id, l]));

export function getLayanan(id: string): Layanan | undefined {
  return indeks.get(id);
}

export function getPintu(id: string): Pintu | undefined {
  return pintu.find((p) => p.id === id);
}

export interface Lokasi {
  pintu: Pintu;
  kelompok: Kelompok;
  bagian: Bagian;
}

/** Semua tempat sebuah layanan muncul (satu layanan bisa ada di beberapa pintu/bagian). */
export function lokasiLayanan(id: string): Lokasi[] {
  const hasil: Lokasi[] = [];
  for (const p of pintu)
    for (const k of p.kelompok)
      for (const b of k.bagian)
        if (b.layanan.includes(id)) hasil.push({ pintu: p, kelompok: k, bagian: b });
  return hasil;
}

export function jumlahLayanan(p: Pintu | Kelompok): number {
  const kelompok = 'kelompok' in p ? p.kelompok : [p];
  return new Set(kelompok.flatMap((k) => k.bagian.flatMap((b) => b.layanan))).size;
}

export const normal = (s: string) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

const escRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const awalKata = (teks: string, k: string) => new RegExp(`(^|[^a-z0-9])${escRe(k)}`).test(teks);

/** Kata kunci ≤ 2 huruf (mis. "ta", "kp") hanya dicocokkan di awal kata. */
export function cocokKata(teks: string, k: string) {
  return k.length <= 2 ? awalKata(teks, k) : teks.includes(k);
}

/** Pencarian sederhana: semua kata kunci harus muncul di nama/ringkasan/lokasi. */
export function cariLayanan(q: string, batas = 8) {
  const kata = normal(q).split(/\s+/).filter(Boolean);
  if (!kata.length) return [];
  return layanan
    .map((l) => {
      const lok = lokasiLayanan(l.id);
      const nama = normal(l.nama);
      const teks = normal([l.nama, l.ringkas, ...lok.map((x) => `${x.pintu.nama} ${x.kelompok.nama} ${x.bagian.nama}`)].join(" "));
      const cocok = kata.every((k) => cocokKata(teks, k));
      const skor = kata.reduce((n, k) => n + (awalKata(nama, k) ? 3 : nama.includes(k) ? 1 : 0), 0);
      return { l, lok, cocok, skor };
    })
    .filter((x) => x.cocok)
    .sort((a, b) => b.skor - a.skor)
    .slice(0, batas);
}
