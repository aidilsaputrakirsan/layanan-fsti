/**
 * Data MANUAL untuk Dashboard: hasil survei kepuasan per semester.
 *
 * Angka permohonan (jumlah, status, tren bulanan, per prodi) diambil OTOMATIS dari
 * spreadsheet tracking — tidak perlu diisi di sini.
 *
 * Cara mengisi: tambahkan satu baris per semester. Kunci semester:
 *   "<tahun awal TA>-ganjil"  → Agustus–Januari   (mis. "2025-ganjil" = Ganjil 2025/2026)
 *   "<tahun awal TA>-genap"   → Februari–Juli     (mis. "2025-genap"  = Genap 2025/2026)
 * Semester yang belum diisi tampil "Belum tersedia".
 */

export interface KepuasanSemester {
  /** Indeks Kepuasan, skala 0–100 */
  ikm: number;
  /** Jumlah responden survei */
  responden: number;
}

export const kepuasan: Record<string, KepuasanSemester> = {
  // '2025-ganjil': { ikm: 86.4, responden: 412 },
};
