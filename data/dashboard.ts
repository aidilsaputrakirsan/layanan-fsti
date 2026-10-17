/**
 * Data dashboard hasil layanan — diisi MANUAL dan diperbarui berkala.
 *
 * Cara memperbarui:
 * 1. Salin satu blok periode, ubah `id`, `label`, `diperbarui`, lalu isi angkanya
 *    (bisa diambil dari menu Dashboard di spreadsheet tracking).
 * 2. Hapus `contoh: true` agar label "Data contoh" hilang.
 * 3. Periode paling atas tampil pertama.
 *
 * Hanya angka agregat — jangan masukkan nama/NIM/NIP.
 */

export interface PeriodeDashboard {
  id: string;
  label: string;
  /** Format YYYY-MM-DD */
  diperbarui: string;
  /** true = angka masih contoh, bukan data asli */
  contoh?: boolean;
  ringkasan: {
    total: number;
    selesai: number;
    diproses: number;
    ditolak: number;
    /** Rata-rata hari kerja dari pengajuan sampai selesai */
    rataHari: number;
    /** Persentase selesai ≤ 2 hari kerja */
    tepatWaktu: number;
    /** Indeks Kepuasan (skala 0–100) dari survei */
    ikm: number;
    responden: number;
  };
  perPintu: { nama: string; jumlah: number }[];
  perBulan: { bulan: string; jumlah: number }[];
  teratas: { nama: string; jumlah: number }[];
}

export const periodeDashboard: PeriodeDashboard[] = [
  {
    id: '2025-2026-ganjil',
    label: 'Semester Ganjil 2025/2026',
    diperbarui: '2026-10-15',
    contoh: true,
    ringkasan: { total: 1248, selesai: 1131, diproses: 64, ditolak: 53, rataHari: 1.6, tepatWaktu: 87, ikm: 86.4, responden: 412 },
    perPintu: [
      { nama: 'S1 · Akademik', jumlah: 842 },
      { nama: 'S1 · Kemahasiswaan', jumlah: 164 },
      { nama: 'S1 · Keuangan', jumlah: 71 },
      { nama: 'S1 · Humas', jumlah: 58 },
      { nama: 'S2 · Akademik', jumlah: 29 },
      { nama: 'Dosen', jumlah: 84 },
    ],
    perBulan: [
      { bulan: 'Agu', jumlah: 214 },
      { bulan: 'Sep', jumlah: 356 },
      { bulan: 'Okt', jumlah: 301 },
      { bulan: 'Nov', jumlah: 228 },
      { bulan: 'Des', jumlah: 149 },
    ],
    teratas: [
      { nama: 'Surat Keterangan Aktif Studi', jumlah: 297 },
      { nama: 'Legalisasi Dokumen', jumlah: 183 },
      { nama: 'Surat Pengantar', jumlah: 151 },
      { nama: 'Pendaftaran Seminar Kerja Praktik', jumlah: 96 },
      { nama: 'Surat Rekomendasi Kegiatan/Beasiswa', jumlah: 88 },
    ],
  },
  {
    id: '2024-2025-genap',
    label: 'Semester Genap 2024/2025',
    diperbarui: '2026-07-01',
    contoh: true,
    ringkasan: { total: 1096, selesai: 1002, diproses: 0, ditolak: 94, rataHari: 1.9, tepatWaktu: 81, ikm: 84.1, responden: 365 },
    perPintu: [
      { nama: 'S1 · Akademik', jumlah: 731 },
      { nama: 'S1 · Kemahasiswaan', jumlah: 152 },
      { nama: 'S1 · Keuangan', jumlah: 63 },
      { nama: 'S1 · Humas', jumlah: 47 },
      { nama: 'S2 · Akademik', jumlah: 24 },
      { nama: 'Dosen', jumlah: 79 },
    ],
    perBulan: [
      { bulan: 'Feb', jumlah: 198 },
      { bulan: 'Mar', jumlah: 241 },
      { bulan: 'Apr', jumlah: 233 },
      { bulan: 'Mei', jumlah: 247 },
      { bulan: 'Jun', jumlah: 177 },
    ],
    teratas: [
      { nama: 'Surat Keterangan Aktif Studi', jumlah: 254 },
      { nama: 'Pendaftaran Sidang TA', jumlah: 141 },
      { nama: 'Legalisasi Dokumen', jumlah: 139 },
      { nama: 'Surat Keterangan Lulus (SKL)', jumlah: 118 },
      { nama: 'Surat Pengantar', jumlah: 102 },
    ],
  },
];
