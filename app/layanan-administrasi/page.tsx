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
  Search 
} from 'lucide-react';

const LayananAdministrasiPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  // Data layanan
  const layananList = [
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
      steps: [
        "Pilih jenis surat yang dibutuhkan (KP/Magang/TA)",
        "Isi data institusi tujuan (untuk KP/Magang)",
        "Unggah dokumen pendukung",
        "Tunggu proses persetujuan",
        "Ambil surat di kantor administrasi FSTI"
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
      steps: [
        "Konsultasi dengan dosen wali",
        "Isi formulir perubahan mata kuliah",
        "Dapatkan persetujuan dari dosen wali",
        "Serahkan formulir ke admin fakultas",
        "Tunggu proses perubahan di SIAKAD"
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
      id: "surat-tugas-dosen",
      title: "Pengajuan Surat Tugas",
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
      id: "pengesahan-dekan",
      title: "Pengesahan Dekan",
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
    }
  ];

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
                          ? 'bg-fsti-primary text-white' 
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
                  <ServiceCard 
                    id={layanan.id}
                    title={layanan.title}
                    description={layanan.description}
                    icon={layanan.icon}
                    steps={layanan.steps}
                    requirements={layanan.requirements}
                    estimatedTime={layanan.estimatedTime}
                    url={layanan.url}
                  />
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