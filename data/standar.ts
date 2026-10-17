/**
 * Dokumen SOP & standar pelayanan.
 * Letakkan file PDF di /public/file/standar/ lalu isi `file` dengan path-nya,
 * mis. '/file/standar/sop-legalisasi.pdf'. Selama `file` kosong, dokumen tampil "Segera tersedia".
 */
export interface DokumenStandar {
  judul: string;
  ringkas: string;
  kategori: 'Standar Pelayanan' | 'SOP' | 'Alur';
  file?: string;
  diperbarui?: string;
}

export const dokumenStandar: DokumenStandar[] = [
  { judul: 'Standar Pelayanan FSTI', ringkas: 'Komponen standar pelayanan seluruh layanan administrasi FSTI.', kategori: 'Standar Pelayanan' },
  { judul: 'SOP Layanan Akademik', ringkas: 'Surat & dokumen akademik, legalisasi, perubahan FRS.', kategori: 'SOP' },
  { judul: 'SOP Kerja Praktik, Magang & Tugas Akhir', ringkas: 'Pendaftaran sampai pengumpulan berkas akhir.', kategori: 'SOP' },
  { judul: 'SOP Layanan Keuangan', ringkas: 'Keringanan UKT dan uang muka kegiatan.', kategori: 'SOP' },
  { judul: 'SOP Layanan Kemahasiswaan', ringkas: 'Rekomendasi, nomor sertifikat, tanda tangan proposal, surat tugas.', kategori: 'SOP' },
  { judul: 'SOP Layanan Humas', ringkas: 'Pengajuan publikasi di kanal resmi FSTI.', kategori: 'SOP' },
  { judul: 'SOP Layanan Dosen', ringkas: 'Surat tugas, pengesahan Dekan, SK Rektor, sarana prasarana.', kategori: 'SOP' },
  { judul: 'Alur Layanan Umum', ringkas: 'Diagram alur permohonan dari pengajuan sampai selesai.', kategori: 'Alur' },
];

/** Alur layanan umum (berlaku untuk semua layanan berbasis formulir). */
/** Tempat pengambilan dokumen hasil secara langsung (offline). */
export const RUANG_PENGAMBILAN = 'ruang B110';

export interface LangkahAlur {
  judul: string;
  isi: string;
  oleh: 'Pemohon' | 'Admin FSTI';
  tautan?: { label: string; href: string };
}

export const alurUmum: LangkahAlur[] = [
  { judul: 'Siapkan persyaratan', isi: 'Cek persyaratan layanan di Katalog, siapkan berkas dan tanda tangan yang dibutuhkan.', oleh: 'Pemohon' },
  { judul: 'Isi & kirim formulir', isi: 'Pilih layanan di portal, isi formulir online dengan lengkap, lalu kirim. Kode tiket dikirim ke email.', oleh: 'Pemohon' },
  { judul: 'Verifikasi berkas', isi: 'Admin memeriksa kelengkapan dan keabsahan data permohonan.', oleh: 'Admin FSTI' },
  { judul: 'Diproses & disahkan', isi: 'Berkas yang sesuai diproses dan ditandatangani pimpinan.', oleh: 'Admin FSTI' },
  {
    judul: 'Ambil hasil',
    isi: `Setelah status Selesai, unduh dokumen lewat tautan di Cek Status atau ambil langsung di ${RUANG_PENGAMBILAN}.`,
    oleh: 'Pemohon',
    tautan: { label: 'Cek status', href: '/tracking' },
  },
  {
    judul: 'Isi survei kepuasan',
    isi: 'Jangan lupa isi survei kepuasan. Penilaian Anda membantu perbaikan pelayanan kami.',
    oleh: 'Pemohon',
    tautan: { label: 'Isi survei', href: '/survey-kepuasan' },
  },
];

/** Cabang saat verifikasi (langkah 3) menemukan berkas tidak sesuai. */
export const cabangPerbaikan = {
  dari: 2, // indeks langkah "Verifikasi berkas"
  ke: 1, // indeks langkah "Isi & kirim formulir"
  label: 'Tidak sesuai',
  isi: 'Berkas yang tidak sesuai dikembalikan dengan catatan perbaikan. Pemohon memperbaiki lalu mengajukan ulang lewat formulir yang sama.',
};

/** Komponen standar pelayanan yang ditampilkan per layanan di Katalog. */
export const komponenStandar = [
  { judul: 'Persyaratan', isi: 'Dokumen dan data yang harus disiapkan pemohon.' },
  { judul: 'Prosedur', isi: 'Tahapan layanan dari pengajuan sampai selesai.' },
  { judul: 'Jangka waktu', isi: 'Estimasi lama penyelesaian layanan.' },
  { judul: 'Biaya', isi: 'Seluruh layanan administrasi FSTI gratis.' },
  { judul: 'Produk layanan', isi: 'Dokumen atau hasil yang diterima pemohon.' },
  { judul: 'Pengaduan', isi: 'Saluran saran dan pengaduan: email, WhatsApp layanan, dan survei kepuasan.' },
];
