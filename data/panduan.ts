/**
 * Video tutorial. Taruh MP4 di /public/video lalu isi `file` (dan `poster`, gambar sampul);
 * file diputar apa adanya tanpa kompresi ulang. Sebagai alternatif, isi `youtubeId`.
 * Selama keduanya kosong, kartu tampil sebagai "Segera hadir".
 *
 * Agar video langsung diputar tanpa menunggu unduhan selesai, MP4 harus "faststart"
 * (ffmpeg -movflags +faststart). Render dari pipeline video sudah demikian.
 */
export interface Video {
  judul: string;
  ringkas: string;
  file?: string;
  poster?: string;
  youtubeId?: string;
  durasi?: string;
}

export const videoTutorial: Video[] = [
  {
    judul: 'Cara Mengajukan Layanan',
    ringkas: 'Memilih pintu S1, S2, atau Dosen, membaca detail layanan, lalu mengisi formulir.',
    file: '/video/panduan_layanan_fsti_part1_final.mp4',
    poster: '/video/panduan_layanan_fsti_part1_poster.jpg',
    durasi: '2:39',
  },
  {
    judul: 'Cek Status, Ambil Hasil & Isi Survei',
    ringkas: 'Melacak permohonan dengan NIM/NIP, membaca catatan admin, dan mengambil dokumen hasil.',
    file: '/video/panduan_layanan_fsti_part2_final.mp4',
    poster: '/video/panduan_layanan_fsti_part2_poster.jpg',
    durasi: '2:10',
  },
  {
    judul: 'Layanan untuk Dosen',
    ringkas: 'Surat tugas, pengesahan Dekan, SK Rektor, template, dan sistem informasi.',
    file: '/video/panduan_layanan_fsti_part3_final.mp4',
    poster: '/video/panduan_layanan_fsti_part3_poster.jpg',
    durasi: '1:47',
  },
];

export const langkahWebsite = [
  {
    judul: 'Pilih pintu layanan',
    isi: 'Di beranda, pilih Layanan S1, Layanan S2, atau Layanan Dosen sesuai status Anda. Bisa juga langsung mengetik kebutuhan di kotak pencarian, misalnya "aktif studi" atau "sidang".',
  },
  {
    judul: 'Temukan layanan di kelompoknya',
    isi: 'Setiap pintu dibagi per kelompok (mis. Akademik, Keuangan). Klik "Detail" untuk melihat persyaratan, estimasi waktu, dan SOP sebelum mengajukan.',
  },
  {
    judul: 'Ajukan lewat formulir',
    isi: 'Klik "Ajukan" untuk membuka formulir online. Isi data dengan lengkap dan benar, lalu kirim. Untuk layanan bertipe template, unduh dan isi template terlebih dahulu.',
  },
  {
    judul: 'Cek status & ambil hasil',
    isi: 'Buka menu Cek Status, masukkan NIM/NIP yang Anda isi di formulir. Jika status sudah Selesai, unduh dokumen lewat tautan yang tampil atau ambil langsung di ruang B110.',
  },
  {
    judul: 'Isi survei kepuasan',
    isi: 'Jangan lupa isi survei kepuasan setelah layanan selesai. Penilaian Anda membantu perbaikan pelayanan kami.',
  },
];

export const faqUmum = [
  {
    t: 'Apakah layanan FSTI dipungut biaya?',
    j: 'Tidak. Semua layanan administrasi FSTI gratis. Laporkan ke fsti@itk.ac.id jika ada pihak yang meminta pungutan.',
  },
  {
    t: 'Berapa lama permohonan diproses?',
    j: 'Umumnya 1–2 hari kerja, tergantung jenis layanan. Estimasi per layanan dapat dilihat di Katalog Layanan.',
  },
  {
    t: 'Status permohonan saya tidak berubah, apa yang harus dilakukan?',
    j: 'Jika lebih dari 3 hari kerja status tidak berubah, hubungi admin melalui WhatsApp layanan atau email fsti@itk.ac.id dengan menyebutkan NIM/NIP dan nama layanan.',
  },
  {
    t: 'Permohonan saya tidak muncul di Cek Status.',
    j: 'Pastikan NIM/NIP sama persis dengan yang Anda isi di formulir. Permohonan yang baru dikirim bisa butuh beberapa menit sebelum muncul. Jika tetap tidak ada, hubungi admin melalui WhatsApp layanan.',
  },
  {
    t: 'Permohonan saya ditolak atau perlu perbaikan.',
    j: 'Baca catatan admin pada hasil Cek Status, perbaiki data atau berkas sesuai catatan, lalu ajukan kembali melalui formulir yang sama.',
  },
];
