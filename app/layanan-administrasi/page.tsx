"use client";

import { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import ServiceCard from '@/components/ui/ServiceCard';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Button from '@/components/ui/Button';
import { motion } from 'framer-motion';
import Link from 'next/link';

// Import icons
import { 
  FileText, 
  Briefcase, 
  CheckCircle, 
  RefreshCcw, 
  Award, 
  Users,
  GraduationCap,
  ArrowRight,
  BookOpen,
  Folder,
  Edit,
  Search,
  FileSignature,
  Laptop,
  Database,
  PieChart,
  Heart,
  Globe,
  DollarSign,
  Bookmark,
  Calendar,
  FilePlus
} from 'lucide-react';

const LayananAdministrasiPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  // Data layanan mahasiswa
  const mahasiswaLayananList = [
    {
      id: "surat-umum",
      title: "Surat Pengantar / Dokumen Umum",
      description: "Layanan pembuatan surat pengantar dan dokumen administratif umum untuk keperluan mahasiswa.",
      icon: <FileText className="h-6 w-6" />,
      steps: [
        "Isi formulir pengajuan surat pengantar",
        "Unggah dokumen pendukung yang diperlukan",
        "Tunggu proses verifikasi oleh admin",
        "Surat akan diproses dan dapat diambil atau dikirim sesuai ketentuan"
      ],
      requirements: [
        "KTM aktif",
        "Dokumen pendukung sesuai keperluan",
        "Telah melunasi pembayaran UKT semester berjalan"
      ],
      estimatedTime: "2-3 hari kerja",
      url: "https://forms.gle/TfydWAeGoFFQYdmR6",
      category: "mahasiswa"
    },
    {
      id: "kp-ta",
      title: "Kerja Praktek / Magang dan Tugas Akhir",
      description: "Layanan administrasi terkait pengajuan dan pelaksanaan Kerja Praktek, Magang, dan Tugas Akhir.",
      icon: <Briefcase className="h-6 w-6" />,
      subLayanan: [
        {
          title: "Kerja Praktik",
          items: [
            { text: "Pendaftaran Sebelum diterima Kerja Praktik", url: "https://forms.gle/XLPQbtTQatE4dgYN7" },
            { text: "Pendaftaran Setelah diterima Kerja Praktik", url: "https://forms.gle/nQ85jfeA9L39NstL8" },
            { text: "Pendaftaran Seminar Kerja Praktik", url: "https://forms.gle/KWrKUTqQG5uWbPQW6" },
            { text: "Upload Formulir Hasil Mahasiswa", url: "https://docs.google.com/forms/d/e/1FAIpQLSfdRvocwHRo7F1EPPNjZVMYEK8oQzRlLB4WPx5Cx-8kCjphpw/viewform?usp=preview" }
          ]
        },
        {
          title: "Magang",
          items: [
            { text: "Pendaftaran Pengantar Magang", url: "https://docs.google.com/forms/d/e/1FAIpQLSevJWaWZJ7sBEqRtr2DQpPvQ2U8h7-Bo3LzZKB40Lt5-WZ6og/viewform" },
            { text: "Pendaftaran Seminar Hasil Magang", url: "https://forms.gle/gWQLGqz3GXpYXJrXA" },
            { text: "Upload Formulir Hasil Mahasiswa", url: "https://docs.google.com/forms/d/e/1FAIpQLSfdRvocwHRo7F1EPPNjZVMYEK8oQzRlLB4WPx5Cx-8kCjphpw/viewform?usp=preview" }
          ]
        },
        {
          title: "Tugas Akhir",
          items: [
            { text: "Pendaftaran Seminar Proposal Tugas Akhir (TA)", url: "https://forms.gle/Kprni4wLMBeEvhEx5" },
            { text: "Upload Formulir Hasil Mahasiswa", url: "https://docs.google.com/forms/d/e/1FAIpQLSfdRvocwHRo7F1EPPNjZVMYEK8oQzRlLB4WPx5Cx-8kCjphpw/viewform?usp=preview" },
            { text: "Pendaftaran Sidang Tugas Akhir (TA)", url: "https://forms.gle/XtPfYYyuCJgPkgW68" },
            { text: "Pengumpulan Bukti Tanda Terima Berkas Tugas Akhir", url: "https://docs.google.com/forms/d/e/1FAIpQLSe5apOobV_VL4CJKSG0HtMLFsclxktmt7sNl0hyRllxq-xfKw/viewform?usp=preview" }
          ]
        }
      ],
      steps: [
        "Pilih jenis layanan yang dibutuhkan (KP/Magang/TA)",
        "Isi data yang diminta pada formulir",
        "Unggah dokumen pendukung sesuai persyaratan",
        "Tunggu proses verifikasi dan persetujuan",
        "Dapatkan dokumen/surat sesuai prosedur"
      ],
      requirements: [
        "Telah menempuh minimal 100 SKS (untuk KP/Magang)",
        "Telah menempuh minimal 120 SKS (untuk TA)",
        "KTM aktif",
        "Transkrip nilai terbaru",
        "Telah melunasi pembayaran UKT semester berjalan"
      ],
      estimatedTime: "3-5 hari kerja",
      category: "mahasiswa"
    },
    {
      id: "legalisasi",
      title: "Legalisasi Dokumen",
      description: "Layanan legalisasi untuk dokumen akademik resmi fakultas seperti transkrip, ijazah, dan sertifikat.",
      icon: <CheckCircle className="h-6 w-6" />,
      steps: [
        "Isi formulir pengajuan legalisasi",
        "Unggah dokumen yang akan dilegalisir",
        "Bayar biaya legalisasi sesuai ketentuan",
        "Tunggu proses legalisasi",
        "Ambil dokumen yang telah dilegalisir"
      ],
      requirements: [
        "KTP/KTM",
        "Dokumen asli yang akan dilegalisir",
        "Fotokopi dokumen yang akan dilegalisir",
        "Bukti pembayaran biaya legalisasi"
      ],
      estimatedTime: "1-2 hari kerja",
      url: "https://forms.gle/Z7FiBx4B2zMRuUGQ7",
      category: "mahasiswa"
    },
    {
      id: "perubahan-mk",
      title: "Perubahan Mata Kuliah",
      description: "Layanan untuk perubahan, penambahan, atau penghapusan mata kuliah dalam rencana studi.",
      icon: <Edit className="h-6 w-6" />,
      subLayanan: [
        {
          title: "Formulir Perubahan Mata Kuliah",
          items: [
            { text: "Formulir Permohonan Perubahan Mata Kuliah", url: "https://docs.google.com/document/d/1CSE6CAujsTgXA9GUMVi-Axq9aBxThnuC/edit" },
            { text: "Formulir Permohonan Mata Kuliah", url: "https://docs.google.com/document/d/1HqhobeyBaDlOkuSqmltCETpP3vW1jJLO/edit" },
            { text: "Formulir Permohonan Terlambat Perwalian/FRS", url: "https://docs.google.com/document/d/1Iwjr2MURBQJd1LHZCXFMkzhDoDzOlidn/edit" },
            { text: "Formulir Permohonan Penghapusan FRS", url: "https://docs.google.com/document/d/1mDCfOePs_XZdmhSp3aMhfo_o7Q-3R4Ix/edit?tab=t.0" },
            { text: "Pengumpulan Formulir Perubahan FRS", url: "https://forms.gle/EH7tDdrxKaPVAnzN9" }
          ]
        }
      ],
      steps: [
        "Unduh formulir yang sesuai dengan keperluan",
        "Konsultasi dengan dosen wali",
        "Isi formulir dengan lengkap dan benar",
        "Dapatkan persetujuan dari dosen wali",
        "Kumpulkan formulir melalui link pengumpulan"
      ],
      requirements: [
        "KTM aktif",
        "Bukti KRS semester berjalan",
        "Surat persetujuan dosen wali",
        "Masih dalam periode perubahan mata kuliah"
      ],
      estimatedTime: "1-3 hari kerja",
      url: "https://forms.gle/EH7tDdrxKaPVAnzN9",
      category: "mahasiswa"
    },
    {
      id: "beasiswa",
      title: "Surat Rekomendasi / Beasiswa",
      description: "Layanan pembuatan surat rekomendasi untuk keperluan aplikasi beasiswa dan kegiatan akademik lainnya.",
      icon: <Award className="h-6 w-6" />,
      steps: [
        "Isi formulir pengajuan surat rekomendasi",
        "Unggah dokumen pendukung sesuai ketentuan",
        "Tunggu proses persetujuan dari pejabat berwenang",
        "Ambil surat rekomendasi di kantor administrasi FSTI"
      ],
      requirements: [
        "KTM aktif",
        "Transkrip nilai terbaru",
        "CV atau portofolio",
        "Dokumen pendukung lainnya sesuai ketentuan beasiswa"
      ],
      estimatedTime: "3-5 hari kerja",
      url: "https://docs.google.com/forms/d/1nTZZM4hKMTcFOenFbIOUBrnCyaRLqzlifiDx6QAZEO0/viewform?edit_requested=true",
      category: "mahasiswa"
    },
    {
      id: "layanan-kemahasiswaan",
      title: "Layanan Kemahasiswaan",
      description: "Layanan terkait kegiatan kemahasiswaan seperti UKM, kepanitiaan, dan kompetisi.",
      icon: <Users className="h-6 w-6" />,
      subLayanan: [
        {
          title: "Formulir Layanan Kemahasiswaan",
          items: [
            { text: "Permohonan Pengajuan/Perpanjangan Legalitas Ormawa", url: "https://forms.gle/CsR7EXzvQX84yi9K8" },
            { text: "Permohonan Nomor Sertifikat Kegiatan Mahasiswa", url: "https://docs.google.com/forms/d/1youLu99r0g6uLTEAgX8rNJF5t3b8id-MKk6KsPi_nko/viewform?edit_requested=true" }
          ]
        }
      ],
      steps: [
        "Pilih jenis layanan kemahasiswaan",
        "Isi formulir pengajuan sesuai kebutuhan",
        "Unggah dokumen pendukung",
        "Tunggu proses persetujuan",
        "Terima notifikasi hasil pengajuan"
      ],
      requirements: [
        "KTM aktif",
        "Proposal kegiatan (untuk kepanitiaan/kompetisi)",
        "Surat pengantar dari organisasi terkait",
        "Dokumen pendukung lainnya sesuai keperluan"
      ],
      estimatedTime: "3-7 hari kerja",
      url: "https://forms.gle/CsR7EXzvQX84yi9K8",
      category: "mahasiswa"
    },
    {
      id: "dispensasi-perkuliahan",
      title: "Dispensasi Perkuliahan",
      description: "Layanan pengajuan dispensasi untuk ketidakhadiran dalam perkuliahan atau kegiatan akademik.",
      icon: <BookOpen className="h-6 w-6" />,
      subLayanan: [
        {
          title: "Formulir Dispensasi",
          items: [
            { text: "Permohonan Dispensasi Perkuliahan", url: "https://docs.google.com/forms/u/0/d/1KgPpebd-SnQsAbTCvkn27H4JNBXS_05Amfd2kUw6YUA/viewform?edit_requested=true" },
            { text: "Permohonan Surat Tugas Mahasiswa", url: "https://forms.gle/7pDSng1cQVmvyWEP9" }
          ]
        }
      ],
      steps: [
        "Isi formulir pengajuan dispensasi",
        "Lampirkan surat keterangan atau bukti pendukung",
        "Tunggu persetujuan dari Kepala Program Studi",
        "Serahkan surat dispensasi ke dosen pengampu"
      ],
      requirements: [
        "KTM aktif",
        "Surat keterangan/bukti pendukung",
        "Jadwal perkuliahan yang dimintakan dispensasi"
      ],
      estimatedTime: "1-2 hari kerja",
      url: "https://docs.google.com/forms/u/0/d/1KgPpebd-SnQsAbTCvkn27H4JNBXS_05Amfd2kUw6YUA/viewform?edit_requested=true",
      category: "mahasiswa"
    },
    {
      id: "layanan-dekanat",
      title: "Layanan DEKANAT Mahasiswa",
      description: "Layanan untuk kebutuhan administrasi yang berhubungan dengan Dekanat FSTI.",
      icon: <FilePlus className="h-6 w-6" />,
      steps: [
        "Isi formulir sesuai keperluan",
        "Lampirkan dokumen pendukung yang diperlukan",
        "Tunggu proses verifikasi dan persetujuan",
        "Dapatkan dokumen/surat sesuai prosedur"
      ],
      requirements: [
        "KTM aktif",
        "Dokumen pendukung sesuai keperluan"
      ],
      estimatedTime: "3-7 hari kerja",
      url: "https://forms.gle/aiYkVXLen6jThVJf8",
      category: "mahasiswa"
    },
    {
      id: "layanan-keringanan-ukt",
      title: "Layanan Keringanan UKT",
      description: "Layanan pengajuan keringanan UKT bagi mahasiswa yang memenuhi persyaratan.",
      icon: <DollarSign className="h-6 w-6" />,
      steps: [
        "Isi formulir pengajuan keringanan UKT",
        "Unggah dokumen pendukung",
        "Tunggu proses verifikasi dan persetujuan",
        "Terima notifikasi hasil pengajuan"
      ],
      requirements: [
        "KTM aktif",
        "Bukti kondisi ekonomi",
        "Surat pernyataan dari orang tua/wali",
        "Dokumen pendukung lainnya"
      ],
      estimatedTime: "7-14 hari kerja",
      url: "http://s.itk.ac.id/ukttafsti",
      category: "mahasiswa"
    },
    {
      id: "layanan-humas",
      title: "Layanan Humas",
      description: "Layanan untuk kebutuhan publikasi, media, dan hubungan masyarakat FSTI.",
      icon: <Globe className="h-6 w-6" />,
      steps: [
        "Isi formulir sesuai keperluan",
        "Unggah dokumen atau materi publikasi",
        "Tunggu proses verifikasi dan persetujuan",
        "Terima notifikasi hasil pengajuan"
      ],
      requirements: [
        "KTM aktif",
        "Materi publikasi dalam format yang ditentukan",
        "Dokumen pendukung lainnya"
      ],
      estimatedTime: "2-5 hari kerja",
      url: "http://s.itk.ac.id/fstiprestasi",
      category: "mahasiswa"
    }
  ];

  // Data layanan dosen
  const dosenLayananList = [
    {
      id: "siakad",
      title: "SIAKAD (Sistem Informasi Akademik)",
      description: "Sistem informasi untuk pengelolaan data akademik, nilai mahasiswa, dan aktivitas akademik lainnya.",
      icon: <Database className="h-6 w-6" />,
      steps: [
        "Akses portal SIAKAD",
        "Login menggunakan kredensial dosen",
        "Navigasi ke menu yang diperlukan",
        "Lakukan pengolahan data akademik"
      ],
      requirements: [
        "Akun dosen aktif",
        "Terhubung ke jaringan internet",
        "Browser versi terbaru"
      ],
      estimatedTime: "Akses langsung",
      url: "http://gerbang.itk.ac.id/",
      category: "dosen"
    },
    {
      id: "simpas",
      title: "SIMPAS (Sistem Manajemen Pengajaran)",
      description: "Sistem informasi untuk manajemen pengajaran dan materi perkuliahan.",
      icon: <BookOpen className="h-6 w-6" />,
      steps: [
        "Akses portal SIMPAS",
        "Login menggunakan kredensial dosen",
        "Kelola materi dan kegiatan pembelajaran",
        "Unggah atau perbarui konten pembelajaran"
      ],
      requirements: [
        "Akun dosen aktif",
        "Terhubung ke jaringan internet",
        "Browser versi terbaru"
      ],
      estimatedTime: "Akses langsung",
      url: "http://sipeka.itk.ac.id/",
      category: "dosen"
    },
    {
      id: "sipeka",
      title: "SIPEKA (Sistem Penelitian dan Kinerja)",
      description: "Sistem informasi untuk pengelolaan penelitian dan evaluasi kinerja dosen.",
      icon: <PieChart className="h-6 w-6" />,
      steps: [
        "Akses portal SIPEKA",
        "Login menggunakan kredensial dosen",
        "Unggah atau perbarui data penelitian",
        "Kelola dan pantau catatan kinerja"
      ],
      requirements: [
        "Akun dosen aktif",
        "Terhubung ke jaringan internet",
        "Dokumen penelitian atau kinerja dalam format digital"
      ],
      estimatedTime: "Akses langsung",
      url: "http://sipeka.itk.ac.id/",
      category: "dosen"
    },
    {
      id: "kuliah",
      title: "KULIAH (Platform Kuliah Daring)",
      description: "Platform untuk melaksanakan perkuliahan daring dan interaksi dengan mahasiswa secara digital.",
      icon: <Laptop className="h-6 w-6" />,
      steps: [
        "Akses platform kuliah daring",
        "Login menggunakan kredensial dosen",
        "Buat atau kelola kelas dan materi",
        "Interaksi dengan mahasiswa secara daring"
      ],
      requirements: [
        "Akun dosen aktif",
        "Terhubung ke jaringan internet",
        "Browser versi terbaru",
        "Kamera dan mikrofon (untuk kelas sinkronus)"
      ],
      estimatedTime: "Akses langsung",
      url: "http://kuliah.itk.ac.id/",
      category: "dosen"
    },
    {
      id: "simhki",
      title: "SIMHKI (Sistem Manajemen HKI)",
      description: "Sistem informasi untuk manajemen dan pendaftaran Hak Kekayaan Intelektual.",
      icon: <Bookmark className="h-6 w-6" />,
      steps: [
        "Akses portal SIMHKI",
        "Login menggunakan kredensial dosen",
        "Unggah dokumen HKI atau paten",
        "Isi formulir pendaftaran dan tunggu proses verifikasi"
      ],
      requirements: [
        "Akun dosen aktif",
        "Terhubung ke jaringan internet",
        "Dokumen HKI dalam format yang ditentukan"
      ],
      estimatedTime: "Akses langsung untuk sistem, proses HKI sesuai ketentuan",
      url: "http://hki.itk.ac.id/",
      category: "dosen"
    },
    {
      id: "sister",
      title: "SISTER (Sistem Terintegrasi)",
      description: "Sistem informasi terintegrasi untuk manajemen data dan aktivitas dosen.",
      icon: <Database className="h-6 w-6" />,
      steps: [
        "Akses portal SISTER",
        "Login menggunakan kredensial dosen",
        "Navigasi ke menu yang diperlukan",
        "Kelola data dosen terintegrasi"
      ],
      requirements: [
        "Akun dosen aktif",
        "Terhubung ke jaringan internet",
        "Browser versi terbaru"
      ],
      estimatedTime: "Akses langsung",
      url: "http://sister.itk.ac.id/",
      category: "dosen"
    },
    {
      id: "cek-plagiasi",
      title: "Cek Plagiasi",
      description: "Layanan untuk memverifikasi orisinalitas dokumen akademik dan penelitian.",
      icon: <FileSignature className="h-6 w-6" />,
      subLayanan: [
        {
          title: "Layanan Cek Plagiasi",
          items: [
            { text: "FORM Pengajuan Cek Plagiasi", url: "https://docs.google.com/forms/d/e/1FAIpQLSersKFA0Nkw_AwSLN1H00MpAkg_2JI1XgX3l39WRcDAPupNHg/viewform" },
            { text: "Monitoring Cek Plagiasi", url: "https://docs.google.com/spreadsheets/d/1grEtM6EGU5PSCeRw50KzgfEBnf2CEbGGANEwMtMzhFs/" }
          ]
        }
      ],
      steps: [
        "Isi formulir pengajuan cek plagiasi",
        "Unggah dokumen yang akan diperiksa",
        "Tunggu proses pemeriksaan",
        "Dapatkan laporan hasil pemeriksaan"
      ],
      requirements: [
        "Akun dosen aktif",
        "Dokumen dalam format Word atau PDF",
        "Ukuran file sesuai ketentuan"
      ],
      estimatedTime: "2-3 hari kerja",
      url: "https://docs.google.com/forms/d/e/1FAIpQLSersKFA0Nkw_AwSLN1H00MpAkg_2JI1XgX3l39WRcDAPupNHg/viewform",
      category: "dosen"
    },
    {
      id: "surat-tugas-dosen",
      title: "Layanan Pengajuan Surat Tugas",
      description: "Layanan pengajuan surat tugas untuk dosen dalam kegiatan akademik, penelitian, dan pengabdian.",
      icon: <Folder className="h-6 w-6" />,
      steps: [
        "Isi formulir pengajuan surat tugas",
        "Lampirkan undangan atau dokumen pendukung",
        "Tunggu proses persetujuan dari pejabat berwenang",
        "Terima notifikasi setelah surat tugas diterbitkan"
      ],
      requirements: [
        "Identitas dosen lengkap",
        "Undangan atau dokumen pendukung kegiatan",
        "Rincian kegiatan yang akan dilaksanakan"
      ],
      estimatedTime: "2-3 hari kerja",
      url: "https://forms.gle/Cqmep7rLAinZcgjx5",
      category: "dosen"
    },
    {
      id: "peminjaman-sarana",
      title: "Layanan Peminjaman Sarana dan Prasarana ITK",
      description: "Layanan untuk peminjaman fasilitas, ruangan, atau peralatan kampus untuk kegiatan akademik.",
      icon: <Calendar className="h-6 w-6" />,
      steps: [
        "Isi formulir peminjaman sarana/prasarana",
        "Tentukan waktu dan durasi peminjaman",
        "Tunggu persetujuan peminjaman",
        "Ambil dan kembalikan fasilitas sesuai ketentuan"
      ],
      requirements: [
        "Akun dosen aktif",
        "Detail kegiatan yang memerlukan fasilitas",
        "Surat pengantar (jika diperlukan)"
      ],
      estimatedTime: "1-2 hari kerja",
      url: "https://forms.gle/9E3ddzEHB35xSgjc9",
      category: "dosen"
    },
    {
      id: "pengesahan-dekan",
      title: "Layanan Pengesahan Dekan",
      description: "Layanan pengesahan dokumen oleh Dekan FSTI untuk keperluan resmi fakultas.",
      icon: <GraduationCap className="h-6 w-6" />,
      steps: [
        "Isi formulir pengajuan pengesahan",
        "Unggah dokumen yang perlu disahkan",
        "Tunggu proses review dokumen",
        "Terima notifikasi setelah dokumen disahkan"
      ],
      requirements: [
        "Dokumen lengkap yang akan disahkan",
        "Kelengkapan administratif sesuai jenis dokumen"
      ],
      estimatedTime: "3-5 hari kerja",
      url: "https://forms.gle/P4S93zfuZLjdZkaa9",
      category: "dosen"
    },
    {
      id: "inisiasi-kerjasama",
      title: "Layanan Pengajuan Inisiasi Kerjasama",
      description: "Layanan untuk memulai kerjasama antara FSTI dengan institusi lain.",
      icon: <Heart className="h-6 w-6" />,
      steps: [
        "Isi formulir pengajuan inisiasi kerjasama",
        "Lampirkan dokumen atau proposal kerjasama",
        "Tunggu proses review dan persetujuan",
        "Terima notifikasi hasil pengajuan"
      ],
      requirements: [
        "Akun dosen aktif",
        "Proposal atau dokumen kerjasama",
        "Informasi lengkap tentang institusi mitra"
      ],
      estimatedTime: "7-14 hari kerja",
      url: "https://forms.gle/qSbBRamXzDpn6SRN7",
      category: "dosen"
    }
  ];

  // Gabungkan semua layanan
  const layananList = [...mahasiswaLayananList, ...dosenLayananList];

  // Filter layanan berdasarkan pencarian
  const filteredServices = layananList.filter(layanan => {
    const matchesSearch = layanan.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          layanan.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === 'all') return matchesSearch;
    return matchesSearch && layanan.category === filter;
  });

  return (
    <MainLayout>
      {/* Header Section with Animated Gradient Background */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 hero-gradient"></div>
        <div className="container mx-auto px-4 relative z-10">
          <AnimatedSection animation="slideUp">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-display font-bold mb-6 text-gradient">Layanan Administrasi FSTI</h1>
              <p className="text-gray-300 text-lg mb-10">
                Berikut adalah daftar layanan administrasi yang tersedia di Fakultas Sains dan Teknologi Informasi.
                Silakan pilih layanan yang Anda butuhkan.
              </p>
              
              {/* Search and Filter */}
              <div className="bg-dark-card p-6 rounded-xl shadow-lg mb-12">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      type="text"
                      placeholder="Cari layanan..."
                      className="w-full bg-dark-bg text-white py-3 pl-10 pr-4 rounded-lg border border-dark-border focus:outline-none focus:ring-2 focus:ring-fsti-primary"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="flex space-x-2">
                    <button
                      className={`px-4 py-3 rounded-lg transition-colors ${
                        filter === 'all' 
                          ? 'bg-fsti-primary text-white' 
                          : 'bg-dark-bg text-gray-400 hover:bg-dark-cardHover'
                      }`}
                      onClick={() => setFilter('all')}
                    >
                      Semua
                    </button>
                    <button
                      className={`px-4 py-3 rounded-lg transition-colors ${
                        filter === 'mahasiswa' 
                          ? 'bg-fsti-primary text-white' 
                          : 'bg-dark-bg text-gray-400 hover:bg-dark-cardHover'
                      }`}
                      onClick={() => setFilter('mahasiswa')}
                    >
                      Mahasiswa
                    </button>
                    <button
                      className={`px-4 py-3 rounded-lg transition-colors ${
                        filter === 'dosen' 
                          ? 'bg-fsti-accent text-white' 
                          : 'bg-dark-bg text-gray-400 hover:bg-dark-cardHover'
                      }`}
                      onClick={() => setFilter('dosen')}
                    >
                      Dosen
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Daftar Layanan Section */}
      <section className="py-16 bg-dark-bg">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="slideUp">
            <h2 className="text-3xl font-display font-bold text-center mb-12 text-gradient">
              Daftar Layanan
              {filter !== 'all' && ` untuk ${filter === 'mahasiswa' ? 'Mahasiswa' : 'Dosen'}`}
              {searchTerm && ` - Hasil pencarian untuk "${searchTerm}"`}
            </h2>
          </AnimatedSection>
          
          <div className="max-w-4xl mx-auto">
            {filteredServices.length > 0 ? (
              filteredServices.map((layanan, index) => (
                <AnimatedSection 
                  key={layanan.id} 
                  animation="slideUp" 
                  delay={index * 0.1}
                >
                  <div id={layanan.id} className={`bg-dark-card rounded-xl shadow-lg overflow-hidden hover-card mb-10 ${
                    layanan.category === 'mahasiswa' ? 'border-l-4 border-fsti-primary' : 'border-l-4 border-fsti-accent'
                  }`}>
                    <div className={`p-5 flex items-center ${
                      layanan.category === 'mahasiswa' ? 'bg-gradient-to-r from-fsti-primary/20 to-dark-card' : 'bg-gradient-to-r from-fsti-accent/20 to-dark-card'
                    }`}>
                      <div className={`mr-4 service-icon text-2xl ${
                        layanan.category === 'mahasiswa' ? 'text-fsti-primary' : 'text-fsti-accent'
                      }`}>
                        {layanan.icon}
                      </div>
                      <div>
                        <div className="flex items-center">
                          <h3 className="text-xl font-semibold text-white">{layanan.title}</h3>
                          <span className={`ml-3 text-xs px-2 py-1 rounded-full ${
                            layanan.category === 'mahasiswa' 
                              ? 'bg-fsti-primary/20 text-fsti-primary' 
                              : 'bg-fsti-accent/20 text-fsti-accent'
                          }`}>
                            {layanan.category === 'mahasiswa' ? 'Mahasiswa' : 'Dosen'}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-gray-300 mb-6">{layanan.description}</p>
                      
                      {/* Sub-layanan jika ada */}
                      {layanan.subLayanan && (
                        <div className="mb-6">
                          <h4 className="text-lg font-semibold mb-3 text-white">Link Terkait</h4>
                          <div className="space-y-4">
                            {layanan.subLayanan.map((sub, idx) => (
                              <div key={idx} className="bg-dark-bg p-4 rounded-lg">
                                <h5 className={`font-medium mb-2 ${
                                  layanan.category === 'mahasiswa' ? 'text-fsti-primary' : 'text-fsti-accent'
                                }`}>
                                  {sub.title}
                                </h5>
                                <ul className="space-y-2">
                                  {sub.items.map((item, itemIdx) => (
                                    <li key={itemIdx} className="flex items-center">
                                      <ArrowRight className="h-4 w-4 mr-2 flex-shrink-0 text-gray-400" />
                                      <a 
                                        href={item.url} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="text-gray-300 hover:underline truncate"
                                      >
                                        {item.text}
                                      </a>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        {layanan.requirements && (
                          <div>
                            <h4 className="text-lg font-semibold mb-3 text-white">Persyaratan</h4>
                            <ul className="list-disc list-inside text-gray-300 space-y-2">
                              {layanan.requirements.map((req, index) => (
                                <li key={index} className="pl-2">
                                  <span className={`${
                                    layanan.category === 'mahasiswa' ? 'text-fsti-primary' : 'text-fsti-accent'
                                  }`}>•</span> 
                                  <span className="ml-2">{req}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        {layanan.steps && (
                          <div>
                            <h4 className="text-lg font-semibold mb-3 text-white">Langkah-langkah</h4>
                            <ol className="text-gray-300 space-y-2">
                              {layanan.steps.map((step, index) => (
                                <li key={index} className="flex">
                                  <span className={`font-bold mr-2 ${
                                    layanan.category === 'mahasiswa' ? 'text-fsti-primary' : 'text-fsti-accent'
                                  }`}>{index + 1}.</span>
                                  <span>{step}</span>
                                </li>
                              ))}
                            </ol>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-dark-bg p-5 rounded-xl">
                        <div className="mb-4 sm:mb-0">
                          <span className="block text-sm text-gray-400">Estimasi Waktu Proses:</span>
                          <span className="font-medium text-white">{layanan.estimatedTime}</span>
                        </div>
                        {layanan.url && (
                          <a 
                            href={layanan.url} 
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 text-white text-center flex items-center justify-center group ${
                              layanan.category === 'mahasiswa' 
                                ? 'bg-fsti-primary hover:bg-fsti-secondary' 
                                : 'bg-fsti-accent hover:bg-fsti-accent/80'
                            }`}
                          >
                            <span>Akses Layanan</span>
                            <svg 
                              xmlns="http://www.w3.org/2000/svg" 
                              className="h-5 w-5 ml-2 transform transition-transform duration-300 group-hover:translate-x-1" 
                              fill="none" 
                              viewBox="0 0 24 24" 
                              stroke="currentColor"
                            >
                              <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M14 5l7 7m0 0l-7 7m7-7H3" 
                              />
                            </svg>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              ))
            ) : (
              <AnimatedSection animation="fadeIn">
                <div className="text-center py-12">
                  <div className="mb-6 text-gray-400">
                    <Search className="h-16 w-16 mx-auto opacity-30 mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Tidak Ditemukan</h3>
                    <p>Tidak ada layanan yang sesuai dengan pencarian Anda.</p>
                  </div>
                  <Button 
                    onClick={() => {
                      setSearchTerm('');
                      setFilter('all');
                    }}
                    variant="outline"
                  >
                    Reset Pencarian
                  </Button>
                </div>
              </AnimatedSection>
            )}
          </div>
        </div>
      </section>

      {/* Alur Kerja Section */}
      <section className="py-16 bg-dark-bg">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="slideUp">
            <h2 className="text-3xl font-display font-bold text-center mb-10 text-gradient">Alur Kerja Administrasi</h2>
          </AnimatedSection>
          
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-wrap justify-center">
              {/* Step 1 */}
              <AnimatedSection 
                className="w-full md:w-1/3 lg:w-1/6 px-4 mb-6 md:mb-0" 
                animation="slideUp" 
                delay={0.1}
              >
                <div className="bg-dark-card rounded-xl shadow-md p-6 text-center h-full flex flex-col items-center hover-card">
                  <div className="w-16 h-16 bg-fsti-primary rounded-full flex items-center justify-center text-white font-bold text-2xl mb-4 shadow-glow">1</div>
                  <h3 className="font-semibold mb-2 text-white text-lg">Pengajuan</h3>
                  <p className="text-gray-400 text-sm">Isi formulir dan unggah berkas yang diperlukan</p>
                </div>
              </AnimatedSection>
              
              {/* Step 2 */}
              <AnimatedSection 
                className="w-full md:w-1/3 lg:w-1/6 px-4 mb-6 md:mb-0" 
                animation="slideUp" 
                delay={0.2}
              >
                <div className="bg-dark-card rounded-xl shadow-md p-6 text-center h-full flex flex-col items-center hover-card">
                  <div className="w-16 h-16 bg-fsti-primary rounded-full flex items-center justify-center text-white font-bold text-2xl mb-4 shadow-glow">2</div>
                  <h3 className="font-semibold mb-2 text-white text-lg">Verifikasi</h3>
                  <p className="text-gray-400 text-sm">Pemeriksaan kelengkapan dokumen oleh admin</p>
                </div>
              </AnimatedSection>
              
              {/* Step 3 */}
              <AnimatedSection 
                className="w-full md:w-1/3 lg:w-1/6 px-4 mb-6 md:mb-0" 
                animation="slideUp" 
                delay={0.3}
              >
                <div className="bg-dark-card rounded-xl shadow-md p-6 text-center h-full flex flex-col items-center hover-card">
                  <div className="w-16 h-16 bg-fsti-primary rounded-full flex items-center justify-center text-white font-bold text-2xl mb-4 shadow-glow">3</div>
                  <h3 className="font-semibold mb-2 text-white text-lg">Proses</h3>
                  <p className="text-gray-400 text-sm">Pengerjaan oleh admin fakultas</p>
                </div>
              </AnimatedSection>
              
              {/* Step 4 */}
              <AnimatedSection 
                className="w-full md:w-1/3 lg:w-1/6 px-4 mb-6 md:mb-0" 
                animation="slideUp" 
                delay={0.4}
              >
                <div className="bg-dark-card rounded-xl shadow-md p-6 text-center h-full flex flex-col items-center hover-card">
                  <div className="w-16 h-16 bg-fsti-primary rounded-full flex items-center justify-center text-white font-bold text-2xl mb-4 shadow-glow">4</div>
                  <h3 className="font-semibold mb-2 text-white text-lg">Pengesahan</h3>
                  <p className="text-gray-400 text-sm">Tanda tangan dan stempel resmi</p>
                </div>
              </AnimatedSection>
              
              {/* Step 5 */}
              <AnimatedSection 
                className="w-full md:w-1/3 lg:w-1/6 px-4 mb-6 md:mb-0" 
                animation="slideUp" 
                delay={0.5}
              >
                <div className="bg-dark-card rounded-xl shadow-md p-6 text-center h-full flex flex-col items-center hover-card">
                  <div className="w-16 h-16 bg-fsti-primary rounded-full flex items-center justify-center text-white font-bold text-2xl mb-4 shadow-glow">5</div>
                  <h3 className="font-semibold mb-2 text-white text-lg">Distribusi</h3>
                  <p className="text-gray-400 text-sm">Pengambilan atau pengiriman dokumen</p>
                </div>
              </AnimatedSection>
              
              {/* Step 6 */}
              <AnimatedSection 
                className="w-full md:w-1/3 lg:w-1/6 px-4" 
                animation="slideUp" 
                delay={0.6}
              >
                <div className="bg-dark-card rounded-xl shadow-md p-6 text-center h-full flex flex-col items-center hover-card">
                  <div className="w-16 h-16 bg-fsti-primary rounded-full flex items-center justify-center text-white font-bold text-2xl mb-4 shadow-glow">6</div>
                  <h3 className="font-semibold mb-2 text-white text-lg">Arsip</h3>
                  <p className="text-gray-400 text-sm">Penyimpanan salinan dokumen</p>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-b from-dark-bg to-fsti-dark">
        <div className="container mx-auto px-4 text-center">
          <AnimatedSection animation="slideUp">
            <h2 className="text-2xl font-display font-bold mb-6 text-white">Butuh Bantuan?</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Jika Anda memiliki pertanyaan atau membutuhkan bantuan dalam proses administrasi, 
              jangan ragu untuk menghubungi kami.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                href="mailto:fsti@itk.ac.id" 
                variant="primary"
                icon={<svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" 
                  />
                </svg>}
                animate
              >
                Email Kami
              </Button>
              <Button 
                href="#kontak" 
                variant="outline"
                icon={<svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" 
                  />
                </svg>}
                animate
              >
                Kontak Kami
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </MainLayout>
  );
};

export default LayananAdministrasiPage;