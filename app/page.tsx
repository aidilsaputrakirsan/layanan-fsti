"use client";

import { useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import ServiceCard from '@/components/ui/ServiceCard';
import AnimatedSection from '@/components/ui/AnimatedSection';
import { motion } from 'framer-motion';

// Icons
import { 
  FileText, 
  Briefcase, 
  CheckCircle, 
  RefreshCcw, 
  Award, 
  Users,
  ArrowRight,
  GraduationCap,
  Database,
  LineChart,
  Code,
  Zap,
  Server,
  ChevronRight
} from 'lucide-react';

export default function Home() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 hero-gradient"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            <AnimatedSection 
              className="md:w-1/2 mb-10 md:mb-0"
              animation="slideInRight"
            >
              <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 leading-tight">
                Fakultas Sains dan <span className="text-gradient">Teknologi Informasi</span>
              </h1>
              <h2 className="text-xl md:text-2xl mb-6 text-gray-300">
                Institut Teknologi Kalimantan
              </h2>
              <p className="text-gray-300 mb-8 text-lg max-w-lg">
                Melayani kebutuhan administrasi civitas akademika dengan cepat, 
                efisien, dan transparan untuk mendukung keunggulan akademik.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  href="/layanan-administrasi" 
                  variant="primary"
                  size="lg"
                  icon={<FileText className="w-5 h-5" />}
                  animate
                >
                  Lihat Layanan
                </Button>
                <Button 
                  href="/tracking" 
                  variant="outline"
                  size="lg"
                  icon={<RefreshCcw className="w-5 h-5" />}
                  animate
                >
                  Tracking Dokumen
                </Button>
              </div>
            </AnimatedSection>
            <AnimatedSection 
              className="md:w-1/2 flex justify-center"
              animation="fadeIn"
              delay={0.2}
            >
              <motion.div 
                className="rounded-2xl p-2 bg-gradient-to-tr from-fsti-dark via-fsti-primary to-fsti-light shadow-glow"
                animate={{ 
                  boxShadow: ['0 0 15px rgba(47, 77, 211, 0.3)', '0 0 25px rgba(47, 77, 211, 0.5)', '0 0 15px rgba(47, 77, 211, 0.3)'],
                }}
                transition={{ 
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                <div className="w-full h-80 md:h-96 bg-dark-bg rounded-xl overflow-hidden relative flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-b from-dark-bg/0 to-dark-bg"></div>
                  <div className="relative z-10 text-center p-8">
                    <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-glow">
                      <span className="text-fsti-primary font-bold text-xl">FSTI</span>
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-white">Pusat Keunggulan Akademik</h3>
                    <p className="text-gray-300 mb-4">
                      Menghasilkan lulusan yang kompeten, adaptif, dan berdaya saing global
                    </p>
                    <div className="flex items-center justify-center space-x-2">
                      <span className="w-3 h-3 rounded-full bg-red-500"></span>
                      <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                      <span className="w-3 h-3 rounded-full bg-green-500"></span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Layanan Populer Section */}
      <section className="py-20 bg-dark-bg">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="slideUp">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 inline-block text-gradient">
                Layanan Populer
              </h2>
              <p className="text-gray-400 max-w-xl mx-auto">
                Akses layanan administrasi paling sering digunakan oleh mahasiswa dan dosen FSTI ITK
              </p>
            </div>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Layanan 1 */}
            <AnimatedSection animation="slideUp" delay={0.1}>
              <ServiceCard 
                id="surat-umum"
                title="Surat Pengantar & Dokumen Umum"
                description="Permintaan surat pengantar dan dokumen administratif umum untuk keperluan mahasiswa"
                icon={<FileText />}
                url="https://forms.gle/TfydWAeGoFFQYdmR6"
                compact
              />
            </AnimatedSection>

            {/* Layanan 2 */}
            <AnimatedSection animation="slideUp" delay={0.2}>
              <ServiceCard 
                id="kp-ta"
                title="KP & Tugas Akhir"
                description="Layanan dokumen terkait Kerja Praktek, Magang dan Tugas Akhir mahasiswa"
                icon={<Briefcase />}
                url="/layanan-administrasi#kp-ta"
                compact
              />
            </AnimatedSection>

            {/* Layanan 3 */}
            <AnimatedSection animation="slideUp" delay={0.3}>
              <ServiceCard 
                id="legalisasi"
                title="Legalisasi Dokumen"
                description="Layanan legalisasi dokumen akademik resmi fakultas seperti transkrip dan ijazah"
                icon={<CheckCircle />}
                url="https://forms.gle/Z7FiBx4B2zMRuUGQ7"
                compact
              />
            </AnimatedSection>
          </div>

          <AnimatedSection className="text-center mt-12" animation="fadeIn" delay={0.4}>
            <Button 
              href="/layanan-administrasi" 
              variant="outline"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Lihat Semua Layanan
            </Button>
          </AnimatedSection>
        </div>
      </section>

       {/* Program Studi Section */}
      <section className="py-20 bg-gradient-to-b from-dark-bg to-dark-bg/90">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="fadeIn">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 inline-block text-gradient relative">
                Program Studi FSTI
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-fsti-light mt-2"></div>
              </h2>
              <p className="text-gray-300 max-w-2xl mx-auto text-lg mt-6">
                Fakultas Sains dan Teknologi Informasi memiliki 8 Program Studi yang dibagi ke dalam 2 Jurusan
              </p>
            </div>
          </AnimatedSection>
          
          {/* Jurusan Sains dan Analitika Data */}
          <div className="mb-20">
            <AnimatedSection animation="slideUp" delay={0.1}>
              <div className="text-center mb-14">
                <div className="inline-block bg-dark-card/80 px-8 py-3 rounded-full shadow-lg">
                  <h3 className="text-2xl font-display font-semibold text-fsti-light">
                    Jurusan Sains dan Analitika Data
                  </h3>
                </div>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Prodi 1 - Fisika */}
              <AnimatedSection animation="slideUp" delay={0.2}>
                <div className="bg-dark-card rounded-xl overflow-hidden shadow-xl hover:shadow-fsti-light/20 transition-all duration-300 transform hover:-translate-y-2 group">
                  <div className="relative h-40 w-full bg-gradient-to-r from-indigo-900 to-blue-900 flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
                    <div className="relative w-24 h-24 p-2 bg-white rounded-full">
                      <Image 
                        src="/images/program-studi/fisika-logo.png" 
                        alt="Fisika"
                        width={100}
                        height={100}
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-semibold mb-3 text-white group-hover:text-fsti-light transition-colors">Fisika</h4>
                    <ul className="text-gray-400 space-y-3">
                      <li className="flex items-start">
                        <ChevronRight className="w-4 h-4 mr-1 mt-1 text-fsti-light flex-shrink-0" />
                        <span>Penelitian fenomena fisika dan aplikasinya</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="w-4 h-4 mr-1 mt-1 text-fsti-light flex-shrink-0" />
                        <span>Pengembangan teknologi berbasis ilmu fisika</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="w-4 h-4 mr-1 mt-1 text-fsti-light flex-shrink-0" />
                        <span>Analisis dan pemodelan sistem fisis</span>
                      </li>
                    </ul>
                    <div className="mt-6 pt-4 border-t border-gray-700">
                      <a href="#" className="text-fsti-light hover:text-white inline-flex items-center text-sm font-medium">
                        Pelajari Lebih Lanjut
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </a>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
              
              {/* Prodi 2 - Matematika */}
              <AnimatedSection animation="slideUp" delay={0.3}>
                <div className="bg-dark-card rounded-xl overflow-hidden shadow-xl hover:shadow-fsti-light/20 transition-all duration-300 transform hover:-translate-y-2 group">
                  <div className="relative h-40 w-full bg-gradient-to-r from-blue-900 to-blue-700 flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
                    <div className="relative w-24 h-24 p-2 bg-white rounded-full">
                      <Image 
                        src="/images/program-studi/matematika-logo.png" 
                        alt="Matematika"
                        width={100}
                        height={100}
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-semibold mb-3 text-white group-hover:text-fsti-light transition-colors">Matematika</h4>
                    <ul className="text-gray-400 space-y-3">
                      <li className="flex items-start">
                        <ChevronRight className="w-4 h-4 mr-1 mt-1 text-fsti-light flex-shrink-0" />
                        <span>Penelitian dan pengembangan matematika murni</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="w-4 h-4 mr-1 mt-1 text-fsti-light flex-shrink-0" />
                        <span>Aplikasi matematika dalam berbagai bidang</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="w-4 h-4 mr-1 mt-1 text-fsti-light flex-shrink-0" />
                        <span>Pemodelan matematika</span>
                      </li>
                    </ul>
                    <div className="mt-6 pt-4 border-t border-gray-700">
                      <a href="#" className="text-fsti-light hover:text-white inline-flex items-center text-sm font-medium">
                        Pelajari Lebih Lanjut
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </a>
                    </div>
                  </div>
                </div>
              </AnimatedSection>

{/* Prodi 4 - Ilmu Aktuaria */}
<AnimatedSection animation="slideUp" delay={0.5}>
                <div className="bg-dark-card rounded-xl overflow-hidden shadow-xl hover:shadow-fsti-light/20 transition-all duration-300 transform hover:-translate-y-2 group">
                  <div className="relative h-40 w-full bg-gradient-to-r from-blue-700 to-cyan-700 flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
                    <div className="relative w-24 h-24 p-2 bg-white rounded-full">
                      <Image 
                        src="/images/program-studi/ilmu-aktuaria-logo.png" 
                        alt="Ilmu Aktuaria"
                        width={100}
                        height={100}
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-semibold mb-3 text-white group-hover:text-fsti-light transition-colors">Ilmu Aktuaria</h4>
                    <ul className="text-gray-400 space-y-3">
                      <li className="flex items-start">
                        <ChevronRight className="w-4 h-4 mr-1 mt-1 text-fsti-light flex-shrink-0" />
                        <span>Analisis risiko keuangan dan asuransi</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="w-4 h-4 mr-1 mt-1 text-fsti-light flex-shrink-0" />
                        <span>Pemodelan matematis untuk perencanaan keuangan</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="w-4 h-4 mr-1 mt-1 text-fsti-light flex-shrink-0" />
                        <span>Perhitungan dan manajemen dana pensiun</span>
                      </li>
                    </ul>
                    <div className="mt-6 pt-4 border-t border-gray-700">
                      <a href="#" className="text-fsti-light hover:text-white inline-flex items-center text-sm font-medium">
                        Pelajari Lebih Lanjut
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </a>
                    </div>
                  </div>
                </div>
              </AnimatedSection>

              
              {/* Prodi 3 - Statistika */}
              <AnimatedSection animation="slideUp" delay={0.4}>
              <div className="bg-dark-card rounded-xl overflow-hidden shadow-xl hover:shadow-fsti-light/20 transition-all duration-300 transform hover:-translate-y-2 group">
                  <div className="relative h-40 w-full bg-gradient-to-r from-cyan-700 to-teal-700 flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
                    <div className="relative w-24 h-24 p-2 bg-white rounded-full">
                      <Image 
                        src="/images/program-studi/statistika-logo.png" 
                        alt="Statistika"
                        width={100}
                        height={100}
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-semibold mb-3 text-white group-hover:text-fsti-light transition-colors">Statistika</h4>
                    <ul className="text-gray-400 space-y-3">
                      <li className="flex items-start">
                        <ChevronRight className="w-4 h-4 mr-1 mt-1 text-fsti-light flex-shrink-0" />
                        <span>Analisis data dan metode statistika</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="w-4 h-4 mr-1 mt-1 text-fsti-light flex-shrink-0" />
                        <span>Pengolahan big data</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="w-4 h-4 mr-1 mt-1 text-fsti-light flex-shrink-0" />
                        <span>Pemodelan statistika untuk pengambilan keputusan</span>
                      </li>
                    </ul>
                    <div className="mt-6 pt-4 border-t border-gray-700">
                      <a href="#" className="text-fsti-light hover:text-white inline-flex items-center text-sm font-medium">
                        Pelajari Lebih Lanjut
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </a>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
          
          {/* Jurusan TEIB */}
          <div>
            <AnimatedSection animation="slideUp" delay={0.1}>
              <div className="text-center mb-14">
                <div className="inline-block bg-dark-card/80 px-8 py-3 rounded-full shadow-lg">
                  <h3 className="text-2xl font-display font-semibold text-fsti-light">
                    Jurusan Teknik Elektro, Informatika dan Bisnis
                  </h3>
                </div>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Prodi 1 - Teknik Elektro */}
              <AnimatedSection animation="slideUp" delay={0.2}>
                <div className="bg-dark-card rounded-xl overflow-hidden shadow-xl hover:shadow-fsti-light/20 transition-all duration-300 transform hover:-translate-y-2 group">
                  <div className="relative h-40 w-full bg-gradient-to-r from-red-900 to-red-700 flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
                    <div className="relative w-24 h-24 p-2 bg-white rounded-full">
                      <Image 
                        src="/images/program-studi/teknik-elektro-logo.png" 
                        alt="Teknik Elektro"
                        width={100}
                        height={100}
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-semibold mb-3 text-white group-hover:text-fsti-light transition-colors">Teknik Elektro</h4>
                    <ul className="text-gray-400 space-y-3">
                      <li className="flex items-start">
                        <ChevronRight className="w-4 h-4 mr-1 mt-1 text-fsti-light flex-shrink-0" />
                        <span>Teknologi kelistrikan dan elektronika</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="w-4 h-4 mr-1 mt-1 text-fsti-light flex-shrink-0" />
                        <span>Sistem kontrol dan otomasi</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="w-4 h-4 mr-1 mt-1 text-fsti-light flex-shrink-0" />
                        <span>Teknik tenaga listrik</span>
                      </li>
                    </ul>
                    <div className="mt-6 pt-4 border-t border-gray-700">
                      <a href="#" className="text-fsti-light hover:text-white inline-flex items-center text-sm font-medium">
                        Pelajari Lebih Lanjut
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </a>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
              
              {/* Prodi 2 - Sistem Informasi */}
              <AnimatedSection animation="slideUp" delay={0.3}>
                <div className="bg-dark-card rounded-xl overflow-hidden shadow-xl hover:shadow-fsti-light/20 transition-all duration-300 transform hover:-translate-y-2 group">
                  <div className="relative h-40 w-full bg-gradient-to-r from-orange-800 to-orange-600 flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
                    <div className="relative w-24 h-24 p-2 bg-white rounded-full">
                      <Image 
                        src="/images/program-studi/sistem-informasi-logo.png" 
                        alt="Sistem Informasi"
                        width={100}
                        height={100}
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-semibold mb-3 text-white group-hover:text-fsti-light transition-colors">Sistem Informasi</h4>
                    <ul className="text-gray-400 space-y-3">
                      <li className="flex items-start">
                        <ChevronRight className="w-4 h-4 mr-1 mt-1 text-fsti-light flex-shrink-0" />
                        <span>Analisis dan desain sistem informasi</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="w-4 h-4 mr-1 mt-1 text-fsti-light flex-shrink-0" />
                        <span>Manajemen basis data</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="w-4 h-4 mr-1 mt-1 text-fsti-light flex-shrink-0" />
                        <span>Integrasi sistem dan teknologi informasi</span>
                      </li>
                    </ul>
                    <div className="mt-6 pt-4 border-t border-gray-700">
                      <a href="#" className="text-fsti-light hover:text-white inline-flex items-center text-sm font-medium">
                        Pelajari Lebih Lanjut
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </a>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
              
              {/* Prodi 3 - Informatika */}
              <AnimatedSection animation="slideUp" delay={0.4}>
                <div className="bg-dark-card rounded-xl overflow-hidden shadow-xl hover:shadow-fsti-light/20 transition-all duration-300 transform hover:-translate-y-2 group">
                  <div className="relative h-40 w-full bg-gradient-to-r from-yellow-700 to-amber-500 flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
                    <div className="relative w-24 h-24 p-2 bg-white rounded-full">
                      <Image 
                        src="/images/program-studi/informatika-logo.png" 
                        alt="Informatika"
                        width={100}
                        height={100}
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-semibold mb-3 text-white group-hover:text-fsti-light transition-colors">Informatika</h4>
                    <ul className="text-gray-400 space-y-3">
                      <li className="flex items-start">
                        <ChevronRight className="w-4 h-4 mr-1 mt-1 text-fsti-light flex-shrink-0" />
                        <span>Pengembangan perangkat lunak</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="w-4 h-4 mr-1 mt-1 text-fsti-light flex-shrink-0" />
                        <span>Kecerdasan buatan dan machine learning</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="w-4 h-4 mr-1 mt-1 text-fsti-light flex-shrink-0" />
                        <span>Komputasi dan algoritma</span>
                      </li>
                    </ul>
                    <div className="mt-6 pt-4 border-t border-gray-700">
                      <a href="#" className="text-fsti-light hover:text-white inline-flex items-center text-sm font-medium">
                        Pelajari Lebih Lanjut
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </a>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
              
              {/* Prodi 4 - Bisnis Digital */}
              <AnimatedSection animation="slideUp" delay={0.5}>
                <div className="bg-dark-card rounded-xl overflow-hidden shadow-xl hover:shadow-fsti-light/20 transition-all duration-300 transform hover:-translate-y-2 group">
                  <div className="relative h-40 w-full bg-gradient-to-r from-purple-800 to-indigo-800 flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
                    <div className="relative w-24 h-24 p-2 bg-white rounded-full">
                      <Image 
                        src="/images/program-studi/bisnis-digital-logo.png" 
                        alt="Bisnis Digital"
                        width={100}
                        height={100}
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <div className="p-6">
                    <h4 className="text-xl font-semibold mb-3 text-white group-hover:text-fsti-light transition-colors">Bisnis Digital</h4>
                    <ul className="text-gray-400 space-y-3">
                      <li className="flex items-start">
                        <ChevronRight className="w-4 h-4 mr-1 mt-1 text-fsti-light flex-shrink-0" />
                        <span>Transformasi digital bisnis</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="w-4 h-4 mr-1 mt-1 text-fsti-light flex-shrink-0" />
                        <span>E-commerce dan digital marketing</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="w-4 h-4 mr-1 mt-1 text-fsti-light flex-shrink-0" />
                        <span>Analisis data bisnis</span>
                      </li>
                    </ul>
                    <div className="mt-6 pt-4 border-t border-gray-700">
                      <a href="#" className="text-fsti-light hover:text-white inline-flex items-center text-sm font-medium">
                        Pelajari Lebih Lanjut
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </a>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
    

      {/* Visi & Misi Section */}
      <section className="py-20 bg-dark-bg">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection animation="slideUp">
              <div className="bg-dark-card rounded-xl shadow-lg p-10 mb-12 border border-dark-border">
                <h3 className="text-2xl font-display font-bold mb-6 text-center text-gradient">Visi FSTI</h3>
                <blockquote className="text-gray-300 text-center italic text-lg">
                  "Pada tahun 2029, FSTI ITK akan menjadi pusat keunggulan akademik dan inovasi, menghasilkan lulusan yang kompeten, adaptif, berdaya saing global, dan karya-karya dalam bidang sains dan teknologi informasi yang berdampak bagi kemajuan Kalimantan dan Indonesia."
                </blockquote>
              </div>
            </AnimatedSection>
            
            <AnimatedSection animation="slideUp" delay={0.2}>
              <div className="bg-gradient-to-r from-fsti-dark to-fsti-primary rounded-xl shadow-lg p-10">
                <h3 className="text-2xl font-display font-bold mb-6 text-center text-white">Misi FSTI (PRESTASI)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="flex">
                      <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mr-4 flex-shrink-0">
                        <span className="text-xl font-bold text-white">P-R</span>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-1">Pendidikan Berkualitas dan Riset Inovatif</h4>
                        <p className="text-blue-200 text-sm">Mengembangkan pendidikan dan penelitian yang berkualitas dan inovatif</p>
                      </div>
                    </div>
                    <div className="flex">
                      <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mr-4 flex-shrink-0">
                        <span className="text-xl font-bold text-white">E-S</span>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-1">Ekosistem Kolaborasi dan Sinergi</h4>
                        <p className="text-blue-200 text-sm">Membangun kolaborasi dan sinergi dengan berbagai pemangku kepentingan</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="flex">
                      <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mr-4 flex-shrink-0">
                        <span className="text-xl font-bold text-white">T-S</span>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-1">Tata Kelola Optimal dan Sistem Layanan Prima</h4>
                        <p className="text-blue-200 text-sm">Mengembangkan tata kelola yang optimal dan layanan yang prima</p>
                      </div>
                    </div>
                    <div className="flex">
                      <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mr-4 flex-shrink-0">
                        <span className="text-xl font-bold text-white">A-I</span>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-1">Aktivasi Potensi dan Internasionalisasi</h4>
                        <p className="text-blue-200 text-sm">Mengaktivasi potensi civitas akademika dan memperluas jejaring internasional</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Struktur Organisasi Section - TAMBAHKAN SETELAH SECTION VISI & MISI */}
      <section className="py-20 bg-dark-bg">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="slideUp">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 inline-block text-gradient">
                Struktur Organisasi
              </h2>
              <p className="text-gray-400 max-w-xl mx-auto">
                Jajaran pimpinan fakultas dan jurusan yang bertanggung jawab dalam pengelolaan FSTI ITK
              </p>
            </div>
          </AnimatedSection>
          
          <div className="max-w-6xl mx-auto">
            {/* Dekan */}
            <AnimatedSection animation="fadeIn" delay={0.1}>
              <div className="flex flex-col items-center mb-12">
                <div className="relative rounded-xl overflow-hidden border-4 border-fsti-primary mb-4 hover-card transition-all duration-300 shadow-lg">
                  <div className="w-48 h-48 sm:w-64 sm:h-64">
                    <Image 
                      src="/images/pimpinan/dekan.png" 
                      alt="Dekan FSTI" 
                      width={256} 
                      height={256} 
                      className="object-cover"
                    />
                  </div>
                </div>
                <h3 className="text-white font-bold text-xl">Adi Mahmud Jaya Marindra, S.T., M.Eng., Ph.D.</h3>
                <p className="text-fsti-light">Dekan Fakultas Sains dan Teknologi Informasi</p>
              </div>
            </AnimatedSection>
            
            {/* Wakil Dekan */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <AnimatedSection animation="slideUp" delay={0.2}>
                <div className="flex flex-col items-center">
                  <div className="relative rounded-xl overflow-hidden border-4 border-fsti-light/70 mb-4 hover-card transition-all duration-300 shadow-lg">
                    <div className="w-40 h-40 sm:w-48 sm:h-48">
                      <Image 
                        src="/images/pimpinan/wakil-dekan-1.png" 
                        alt="Wakil Dekan Akademik" 
                        width={192} 
                        height={192} 
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <h3 className="text-white font-bold text-lg">Irma Fitria, S.Si., M.Si.</h3>
                  <p className="text-fsti-light text-sm text-center">Wakil Dekan Bidang Akademik dan Kemahasiswaan</p>
                </div>
              </AnimatedSection>
              
              <AnimatedSection animation="slideUp" delay={0.3}>
                <div className="flex flex-col items-center">
                  <div className="relative rounded-xl overflow-hidden border-4 border-fsti-light/70 mb-4 hover-card transition-all duration-300 shadow-lg">
                    <div className="w-40 h-40 sm:w-48 sm:h-48">
                      <Image 
                        src="/images/pimpinan/wakil-dekan-2.png" 
                        alt="Wakil Dekan Keuangan" 
                        width={192} 
                        height={192} 
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <h3 className="text-white font-bold text-lg">Yun Tonce Kusuma Priyanto, S.T., M.T.</h3>
                  <p className="text-fsti-light text-sm text-center">Wakil Dekan Bidang Keuangan dan Umum</p>
                </div>
              </AnimatedSection>
            </div>
            
            {/* Ketua Jurusan */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <AnimatedSection animation="slideUp" delay={0.4}>
                <div className="flex flex-col items-center">
                  <div className="relative rounded-xl overflow-hidden border-4 border-fsti-accent/70 mb-4 hover-card transition-all duration-300 shadow-lg">
                    <div className="w-40 h-40 sm:w-48 sm:h-48">
                      <Image 
                        src="/images/pimpinan/ka-jurusan-1.png" 
                        alt="Ketua Jurusan Sains dan Analitika Data" 
                        width={192} 
                        height={192} 
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <h3 className="text-white font-bold text-lg">Dr. Swastya Rahastama, S.Si., M.Si.</h3>
                  <p className="text-fsti-light text-sm text-center">Ketua Jurusan Sains dan Analitika Data</p>
                </div>
              </AnimatedSection>
              
              <AnimatedSection animation="slideUp" delay={0.5}>
                <div className="flex flex-col items-center">
                  <div className="relative rounded-xl overflow-hidden border-4 border-fsti-accent/70 mb-4 hover-card transition-all duration-300 shadow-lg">
                    <div className="w-40 h-40 sm:w-48 sm:h-48">
                      <Image 
                        src="/images/pimpinan/ka-jurusan-2.png" 
                        alt="Ketua Jurusan TEIB" 
                        width={192} 
                        height={192} 
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <h3 className="text-white font-bold text-lg">M. Ihsan Alfani Putera, S.Tr.Kom, M.Kom</h3>
                  <p className="text-fsti-light text-sm text-center">Ketua Jurusan Teknik Elektro, Informatika, dan Bisnis</p>
                </div>
              </AnimatedSection>
            </div>

            {/* Ka SubBagian Umum */}
            <AnimatedSection animation="slideUp" delay={0.5}>
              <div className="flex flex-col items-center mb-12">
                <div className="relative rounded-xl overflow-hidden border-4 border-fsti-primary mb-4 hover-card transition-all duration-300 shadow-lg">
                  <div className="w-40 h-40 sm:w-48 sm:h-48">
                    <Image 
                      src="/images/pimpinan/subbagian-umum.png" 
                      alt="Subbagian Umum FSTI" 
                      width={192} 
                      height={192} 
                      className="object-cover"
                    />
                  </div>
                </div>
                <h3 className="text-white font-bold text-xl">Desy Ridho Rahayu, S.SI</h3>
                <p className="text-fsti-light">Kepala Subbagian Umum FSTI</p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Alur Kerja Section */}
      <section className="py-20 bg-dark-bg">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="slideUp">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 inline-block text-gradient">
                Alur Kerja Administrasi
              </h2>
              <p className="text-gray-400 max-w-xl mx-auto">
                Proses pengajuan layanan administrasi di FSTI ITK dilakukan dengan 6 tahapan berikut
              </p>
            </div>
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
      <section className="py-20 bg-gradient-to-b from-dark-bg to-fsti-dark">
        <div className="container mx-auto px-4 text-center">
          <AnimatedSection animation="slideUp">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-white">Butuh Bantuan?</h2>
            <p className="text-gray-300 mb-10 max-w-2xl mx-auto text-lg">
              Jika Anda memiliki pertanyaan atau membutuhkan bantuan terkait layanan administrasi FSTI, 
              jangan ragu untuk menghubungi kami.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                href="mailto:fsti@itk.ac.id" 
                variant="primary"
                size="lg"
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
                size="lg"
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
}