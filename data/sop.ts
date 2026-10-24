/**
 * Dokumen SOP (Prosedur Operasional Standar) FSTI, per jenis.
 * File PDF ada di /public/file/sop/<jenis>/. Menambah SOP: taruh PDF di folder jenisnya
 * dengan nama "<nomor>-<judul>.pdf", lalu tambahkan barisnya di bawah (urut nomor).
 * Judul ditulis sesuai header dokumen; nomor = nomor POS (xxx/IT10.1/OT.07/2026).
 */
export type JenisSop = 'akademik' | 'kepegawaian' | 'keuangan';

export interface Sop {
  nomor: string;
  judul: string;
  file: string;
  halaman: number;
}

export const jenisSop: { id: JenisSop; label: string; ket: string }[] = [
  { id: 'akademik', label: 'Akademik', ket: 'Perkuliahan, KP, magang, TA, kemahasiswaan, kerja sama' },
  { id: 'kepegawaian', label: 'Kepegawaian', ket: 'Cuti, kenaikan pangkat/jabatan, tugas belajar dosen' },
  { id: 'keuangan', label: 'Keuangan', ket: 'UKT, keuangan kegiatan, honorarium, anggaran' },
];

export const sopUrl = (jenis: JenisSop, s: Sop) => `/file/sop/${jenis}/${s.file}`;

export const daftarSop: Record<JenisSop, Sop[]> = {
  akademik: [
    { nomor: '031', judul: 'Yudisium', file: '031-yudisium.pdf', halaman: 4 },
    { nomor: '032', judul: 'Tracer Study', file: '032-tracer-study.pdf', halaman: 5 },
    { nomor: '033', judul: 'Seminar Hasil Magang', file: '033-seminar-hasil-magang.pdf', halaman: 5 },
    { nomor: '034', judul: 'Seminar Hasil Kerja Praktik', file: '034-seminar-hasil-kerja-praktik.pdf', halaman: 5 },
    { nomor: '035', judul: 'Sanggah Nilai oleh Mahasiswa', file: '035-sanggah-nilai-oleh-mahasiswa.pdf', halaman: 4 },
    { nomor: '036', judul: 'Perwalian Mahasiswa', file: '036-perwalian-mahasiswa.pdf', halaman: 5 },
    { nomor: '037', judul: 'Perubahan FRS', file: '037-perubahan-frs.pdf', halaman: 8 },
    { nomor: '038', judul: 'Perjanjian Kerja Sama', file: '038-perjanjian-kerja-sama.pdf', halaman: 4 },
    { nomor: '039', judul: 'Penyusunan Jadwal Praktikum', file: '039-penyusunan-jadwal-praktikum.pdf', halaman: 4 },
    { nomor: '040', judul: 'Penyusunan Jadwal Mata Kuliah Prodi', file: '040-penyusunan-jadwal-mata-kuliah-prodi.pdf', halaman: 4 },
    { nomor: '041', judul: 'Penjaringan dan Pembinaan Calon Pemimpin Ormawa', file: '041-penjaringan-dan-pembinaan-calon-pemimpin-ormawa.pdf', halaman: 4 },
    { nomor: '042', judul: 'Pengumpulan Formulir Hasil Akhir Mahasiswa', file: '042-pengumpulan-formulir-hasil-akhir-mahasiswa.pdf', halaman: 4 },
    { nomor: '043', judul: 'Pengumpulan dan Validasi IKU', file: '043-pengumpulan-dan-validasi-iku.pdf', halaman: 4 },
    { nomor: '044', judul: 'Pengelolaan Database Kemahasiswaan', file: '044-pengelolaan-database-kemahasiswaan.pdf', halaman: 4 },
    { nomor: '045', judul: 'Pengajuan Surat Pengantar Mahasiswa', file: '045-pengajuan-surat-pengantar-mahasiswa.pdf', halaman: 4 },
    { nomor: '046', judul: 'Pengajuan Surat Keterangan Aktif Mahasiswa', file: '046-pengajuan-surat-keterangan-aktif-mahasiswa.pdf', halaman: 4 },
    { nomor: '047', judul: 'Pengajuan SK Dosen Pembimbing KP', file: '047-pengajuan-sk-dosen-pembimbing-kp.pdf', halaman: 4 },
    { nomor: '048', judul: 'Pengajuan SK Dosen Pembimbing dan Penguji TA', file: '048-pengajuan-sk-dosen-pembimbing-dan-penguji-ta.pdf', halaman: 4 },
    { nomor: '049', judul: 'Pengajuan SK Beban Mengajar Dosen', file: '049-pengajuan-sk-beban-mengajar-dosen.pdf', halaman: 6 },
    { nomor: '050', judul: 'Pengajuan SK Akademik', file: '050-pengajuan-sk-akademik.pdf', halaman: 6 },
    { nomor: '051', judul: 'Pengajuan Rekomendasi Mahasiswa', file: '051-pengajuan-rekomendasi-mahasiswa.pdf', halaman: 4 },
    { nomor: '052', judul: 'Pengajuan Pengunduran Diri Mahasiswa', file: '052-pengajuan-pengunduran-diri-mahasiswa.pdf', halaman: 6 },
    { nomor: '053', judul: 'Pengajuan Nomor Sertifikat Kegiatan', file: '053-pengajuan-nomor-sertifikat-kegiatan.pdf', halaman: 4 },
    { nomor: '054', judul: 'Pengajuan MOU', file: '054-pengajuan-mou.pdf', halaman: 4 },
    { nomor: '055', judul: 'Pengajuan Legalisasi Dokumen Akademik', file: '055-pengajuan-legalisasi-dokumen-akademik.pdf', halaman: 4 },
    { nomor: '056', judul: 'Pengajuan KHS dan Transkrip Akademik', file: '056-pengajuan-khs-dan-transkrip-akademik.pdf', halaman: 4 },
    { nomor: '057', judul: 'Pengajuan Kegiatan Organisasi Mahasiswa', file: '057-pengajuan-kegiatan-organisasi-mahasiswa.pdf', halaman: 4 },
    { nomor: '058', judul: 'Pengajuan Halaman Pengesahan Proposal dan Laporan Pengmas', file: '058-pengajuan-halaman-pengesahan-proposal-dan-laporan-pengmas.pdf', halaman: 5 },
    { nomor: '059', judul: 'Pengajuan Halaman Pengesahan Proposal dan Laporan Penelitian', file: '059-pengajuan-halaman-pengesahan-proposal-dan-laporan-penelitian.pdf', halaman: 4 },
    { nomor: '060', judul: 'Pengajuan Dispensasi Akademik', file: '060-pengajuan-dispensasi-akademik.pdf', halaman: 4 },
    { nomor: '061', judul: 'Pengajuan Cuti Studi Mahasiswa', file: '061-pengajuan-cuti-studi-mahasiswa.pdf', halaman: 7 },
    { nomor: '062', judul: 'Pengajuan Aktif Kembali Mahasiswa', file: '062-pengajuan-aktif-kembali-mahasiswa.pdf', halaman: 6 },
    { nomor: '063', judul: 'Penetapan dan Pelaksanaan Beban Mengajar Dosen Praktisi dan Dosen Luar Biasa', file: '063-penetapan-dan-pelaksanaan-beban-mengajar-dosen-praktisi-dan-dosen-luar-biasa.pdf', halaman: 4 },
    { nomor: '064', judul: 'Penerbitan Surat Keterangan Lulus Mahasiswa', file: '064-penerbitan-surat-keterangan-lulus-mahasiswa.pdf', halaman: 4 },
    { nomor: '065', judul: 'Pendataan Prestasi Mahasiswa', file: '065-pendataan-prestasi-mahasiswa.pdf', halaman: 4 },
    { nomor: '066', judul: 'Pendaftaran Sidang Tugas Akhir', file: '066-pendaftaran-sidang-tugas-akhir.pdf', halaman: 5 },
    { nomor: '067', judul: 'Pendaftaran Seminar Proposal Tugas Akhir', file: '067-pendaftaran-seminar-proposal-tugas-akhir.pdf', halaman: 5 },
    { nomor: '068', judul: 'Pendaftaran Magang', file: '068-pendaftaran-magang.pdf', halaman: 4 },
    { nomor: '069', judul: 'Pendaftaran Kerja Praktik', file: '069-pendaftaran-kerja-praktik.pdf', halaman: 4 },
    { nomor: '070', judul: 'Pembinaan Kegiatan Ilmiah Mahasiswa', file: '070-pembinaan-kegiatan-ilmiah-mahasiswa.pdf', halaman: 4 },
    { nomor: '071', judul: 'Pelaporan Absensi Dosen dan Mahasiswa', file: '071-pelaporan-absensi-dosen-dan-mahasiswa.pdf', halaman: 4 },
    { nomor: '072', judul: 'Pelaksanaan Sidang Tugas Akhir', file: '072-pelaksanaan-sidang-tugas-akhir.pdf', halaman: 4 },
    { nomor: '073', judul: 'Pelaksanaan Seminar Proposal Tugas Akhir', file: '073-pelaksanaan-seminar-proposal-tugas-akhir.pdf', halaman: 4 },
    { nomor: '074', judul: 'Pelaksanaan Kerja Sama/IA', file: '074-pelaksanaan-kerja-sama-ia.pdf', halaman: 4 },
    { nomor: '075', judul: 'Pelaksanaan Kerja Praktik', file: '075-pelaksanaan-kerja-praktik.pdf', halaman: 4 },
    { nomor: '076', judul: 'Monitoring Kesesuaian Pengmas dengan Roadmap', file: '076-monitoring-kesesuaian-pengmas-dengan-roadmap.pdf', halaman: 4 },
    { nomor: '077', judul: 'Monitoring Kesesuaian Penelitian dengan Roadmap', file: '077-monitoring-kesesuaian-penelitian-dengan-roadmap.pdf', halaman: 4 },
    { nomor: '078', judul: 'Monitoring dan Evaluasi Kegiatan Mahasiswa', file: '078-monitoring-dan-evaluasi-kegiatan-mahasiswa.pdf', halaman: 4 },
    { nomor: '079', judul: 'Keterlambatan FRS Mahasiswa', file: '079-keterlambatan-frs-mahasiswa.pdf', halaman: 5 },
    { nomor: '080', judul: 'Input Nilai Mata Kuliah', file: '080-input-nilai-mata-kuliah.pdf', halaman: 4 },
    { nomor: '081', judul: 'Input FRS dan Validasi Dosen Wali', file: '081-input-frs-dan-validasi-dosen-wali.pdf', halaman: 4 },
  ],
  kepegawaian: [
    { nomor: '089', judul: 'Pengajuan Cuti', file: '089-pengajuan-cuti.pdf', halaman: 3 },
    { nomor: '090', judul: 'Pengajuan Dosen Praktisi dan Luar Biasa', file: '090-pengajuan-dosen-praktisi-dan-luar-biasa.pdf', halaman: 3 },
    { nomor: '091', judul: 'Pengajuan KP4', file: '091-pengajuan-kp4.pdf', halaman: 3 },
    { nomor: '092', judul: 'Pengajuan Surat Keterangan Cek Plagiasi Dosen', file: '092-pengajuan-surat-keterangan-cek-plagiasi-dosen.pdf', halaman: 3 },
    { nomor: '093', judul: 'Pengajuan Surat Tugas Dosen', file: '093-pengajuan-surat-tugas-dosen.pdf', halaman: 3 },
    { nomor: '094', judul: 'Pengajuan Tugas Belajar Dosen', file: '094-pengajuan-tugas-belajar-dosen.pdf', halaman: 3 },
    { nomor: '095', judul: 'Pengajuan Verifikasi Tunjangan Kinerja Dosen', file: '095-pengajuan-verifikasi-tunjangan-kinerja-dosen.pdf', halaman: 3 },
    { nomor: '096', judul: 'Pengusulan Dosen Aktif dari Tugas Belajar', file: '096-pengusulan-dosen-aktif-dari-tugas-belajar.pdf', halaman: 3 },
    { nomor: '097', judul: 'Pengusulan Kebutuhan Dosen', file: '097-pengusulan-kebutuhan-dosen.pdf', halaman: 4 },
    { nomor: '098', judul: 'Pengusulan Kenaikan Jabatan Akademik Dosen', file: '098-pengusulan-kenaikan-jabatan-akademik-dosen.pdf', halaman: 4 },
    { nomor: '099', judul: 'Pengusulan Kenaikan Pangkat', file: '099-pengusulan-kenaikan-pangkat.pdf', halaman: 3 },
    { nomor: '100', judul: 'Penyusunan Peta dan Proyeksi SDM Dosen', file: '100-penyusunan-peta-dan-proyeksi-sdm-dosen.pdf', halaman: 4 },
    { nomor: '101', judul: 'Penyusunan Rencana Kebutuhan Tugas Belajar (RKTB)', file: '101-penyusunan-rencana-kebutuhan-tugas-belajar-rktb.pdf', halaman: 4 },
    { nomor: '121', judul: 'Pengajuan Sasaran Kinerja Pegawai (SKP)', file: '121-pengajuan-sasaran-kinerja-pegawai-skp.pdf', halaman: 3 },
  ],
  keuangan: [
    { nomor: '085', judul: 'Pengajuan Administrasi Perjalanan Dinas', file: '085-pengajuan-administrasi-perjalanan-dinas.pdf', halaman: 4 },
    { nomor: '102', judul: 'Monitoring dan Evaluasi Pelaksanaan Anggaran', file: '102-monitoring-dan-evaluasi-pelaksanaan-anggaran.pdf', halaman: 4 },
    { nomor: '103', judul: 'Pencairan Honorarium Dosen Praktisi dan Dosen Luar Biasa', file: '103-pencairan-honorarium-dosen-praktisi-dan-dosen-luar-biasa.pdf', halaman: 3 },
    { nomor: '104', judul: 'Pengajuan Angsuran UKT Mahasiswa', file: '104-pengajuan-angsuran-ukt-mahasiswa.pdf', halaman: 4 },
    { nomor: '105', judul: 'Pengajuan Banding UKT Mahasiswa', file: '105-pengajuan-banding-ukt-mahasiswa.pdf', halaman: 4 },
    { nomor: '106', judul: 'Pengajuan Keuangan Kegiatan', file: '106-pengajuan-keuangan-kegiatan.pdf', halaman: 4 },
    { nomor: '107', judul: 'Pengajuan Surat Permohonan UP/TUP', file: '107-pengajuan-surat-permohonan-up-tup.pdf', halaman: 3 },
    { nomor: '108', judul: 'Pengajuan Surat Pertanggungjawaban Kegiatan Skema LS', file: '108-pengajuan-surat-pertanggungjawaban-kegiatan-skema-ls.pdf', halaman: 3 },
    { nomor: '109', judul: 'Pengajuan Surat Pertanggungjawaban Kegiatan Skema UP', file: '109-pengajuan-surat-pertanggungjawaban-kegiatan-skema-up.pdf', halaman: 3 },
    { nomor: '110', judul: 'Penyusunan Laporan Realisasi Anggaran', file: '110-penyusunan-laporan-realisasi-anggaran.pdf', halaman: 4 },
    { nomor: '111', judul: 'Penyusunan Rencana Kerja dan Anggaran', file: '111-penyusunan-rencana-kerja-dan-anggaran.pdf', halaman: 4 },
    { nomor: '112', judul: 'Permohonan UKT 50% Mahasiswa', file: '112-permohonan-ukt-50-persen-mahasiswa.pdf', halaman: 3 },
    { nomor: '113', judul: 'Persiapan Bahan Tindak Lanjut Hasil Audit', file: '113-persiapan-bahan-tindak-lanjut-hasil-audit.pdf', halaman: 3 },
    { nomor: '122', judul: 'Pengajuan Beban Mengajar Lebih', file: '122-pengajuan-beban-mengajar-lebih.pdf', halaman: 3 },
  ],
};
