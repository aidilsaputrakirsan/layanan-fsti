/**
 * Video tutorial. Isi `youtubeId` (bagian setelah "v=" di link YouTube)
 * ketika videonya sudah diunggah; selama kosong, kartu tampil sebagai "Segera hadir".
 */
export interface Video {
  judul: string;
  ringkas: string;
  youtubeId?: string;
  durasi?: string;
}

export const videoTutorial: Video[] = [
  { judul: 'Mengenal Portal Layanan FSTI', ringkas: 'Tur singkat: pintu layanan, pencarian, dan menu informasi.' },
  { judul: 'Cara Mengajukan Layanan', ringkas: 'Memilih layanan dan mengisi formulir dengan benar.' },
  { judul: 'Cara Cek Status Permohonan', ringkas: 'Melacak permohonan dengan NIM/NIP.' },
  { judul: 'Layanan Kerja Praktik & Tugas Akhir', ringkas: 'Urutan formulir KP dan TA dari pendaftaran sampai berkas akhir.' },
  { judul: 'Legalisasi Dokumen', ringkas: 'Dokumen yang bisa dilegalisasi dan cara mengajukannya.' },
  { judul: 'Layanan untuk Dosen', ringkas: 'Surat tugas, pengesahan Dekan, dan SK Rektor.' },
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
