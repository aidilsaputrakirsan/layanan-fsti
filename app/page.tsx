"use client";

import { useState, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import ClientOnly from '@/components/utils/ClientOnly';

// Import komponen aman
import SafeButton from '@/components/ui/SafeButton';
import SafeServiceCard from '@/components/ui/SafeServiceCard';
import SafeAnimatedSection from '@/components/ui/SafeAnimatedSection';
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

// Image Carousel Component
const ImageCarousel = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [
    '/images/gambar1.jpeg',
    '/images/gambar2.jpeg',
    '/images/gambar3.jpeg',
    '/images/gambar4.jpeg',
    '/images/gambar5.jpeg',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="w-full h-80 md:h-96 bg-dark-bg rounded-xl overflow-hidden relative">
      {images.map((src, index) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentImage ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={src}
            alt={`Campus image ${index + 1}`}
            fill
            className="object-cover"
            priority={index === 0}
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-bg/50 to-dark-bg"></div>
      <div className="relative z-10 text-center p-8 flex flex-col h-full justify-center">
        
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
  );
};

function HomePage() {
  return (
    <FramerMotionProvider>
      <MainLayout>
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="absolute inset-0 hero-gradient"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col md:flex-row items-center">
              <SafeAnimatedSection 
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
              </SafeAnimatedSection>
              <SafeAnimatedSection 
                className="md:w-1/2 flex justify-center"
                animation="fadeIn"
                delay={0.2}
              >
                <ClientOnly>
                  <SafeMotion 
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
                    {/* Replace static background with image carousel */}
                    <ImageCarousel />
                  </SafeMotion>
                </ClientOnly>
              </SafeAnimatedSection>
            </div>
          </div>
        </section>

        {/* Layanan Populer Section */}
        <section className="py-20 bg-dark-bg">
          <div className="container mx-auto px-4">
            <SafeAnimatedSection animation="slideUp">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 inline-block text-gradient">
                  Layanan Populer
                </h2>
                <p className="text-gray-400 max-w-xl mx-auto">
                  Akses layanan administrasi paling sering digunakan oleh mahasiswa dan dosen FSTI ITK
                </p>
              </div>
            </SafeAnimatedSection>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Layanan 1 */}
              <SafeAnimatedSection animation="slideUp" delay={0.1}>
                <ServiceCard 
                  id="surat-umum"
                  title="Surat Pengantar & Dokumen Umum"
                  description="Permintaan surat pengantar dan dokumen administratif umum untuk keperluan mahasiswa"
                  icon={<FileText />}
                  url="https://forms.gle/TfydWAeGoFFQYdmR6"
                  compact
                />
              </SafeAnimatedSection>

              {/* Layanan 2 */}
              <SafeAnimatedSection animation="slideUp" delay={0.2}>
                <ServiceCard 
                  id="kp-ta"
                  title="KP & Tugas Akhir"
                  description="Layanan dokumen terkait Kerja Praktek, Magang dan Tugas Akhir mahasiswa"
                  icon={<Briefcase />}
                  url="/layanan-administrasi#kp-ta"
                  compact
                />
              </SafeAnimatedSection>

              {/* Layanan 3 */}
              <SafeAnimatedSection animation="slideUp" delay={0.3}>
                <ServiceCard 
                  id="legalisasi"
                  title="Legalisasi Dokumen"
                  description="Layanan legalisasi dokumen akademik resmi fakultas seperti transkrip dan ijazah"
                  icon={<CheckCircle />}
                  url="https://forms.gle/Z7FiBx4B2zMRuUGQ7"
                  compact
                />
              </SafeAnimatedSection>
            </div>

            <SafeAnimatedSection className="text-center mt-12" animation="fadeIn" delay={0.4}>
              <Button 
                href="/layanan-administrasi" 
                variant="outline"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Lihat Semua Layanan
              </Button>
            </SafeAnimatedSection>
          </div>
        </section>

        {/* Program Studi Section */}
        <section className="py-20 bg-gradient-to-b from-dark-bg to-dark-bg/90 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-fsti-primary/5 rounded-full filter blur-3xl opacity-30"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-fsti-primary/5 rounded-full filter blur-3xl opacity-30"></div>
          
          <div className="container mx-auto px-4">
            <SafeAnimatedSection animation="fadeIn">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 inline-block text-gradient relative">
                  Program Studi FSTI
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-fsti-light mt-2"></div>
                </h2>
                <p className="text-gray-300 max-w-3xl mx-auto text-lg mt-6">
                  Fakultas Sains dan Teknologi Informasi memiliki 8 Program Studi yang dibagi ke dalam 2 Jurusan dengan fokus pada pendidikan dan penelitian berkualitas tinggi untuk kebutuhan industri masa depan.
                </p>
              </div>
            </SafeAnimatedSection>
            
            {/* Jurusan Sains dan Analitika Data */}
            <div className="mb-20">
              <SafeAnimatedSection animation="slideUp" delay={0.1}>
                <div className="text-center mb-14">
                  <div className="inline-block bg-gradient-to-r from-indigo-900/80 via-blue-900/80 to-indigo-900/80 px-8 py-3 rounded-full shadow-lg border border-indigo-800/30">
                    <h3 className="text-2xl font-display font-semibold text-white">
                      Jurusan Sains dan Analitika Data
                    </h3>
                  </div>
                </div>
              </SafeAnimatedSection>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Prodi 1 - Fisika */}
                <SafeAnimatedSection animation="slideUp" delay={0.2}>
                  <div className="bg-dark-card rounded-xl overflow-hidden shadow-xl hover:shadow-fsti-light/20 transition-all duration-500 transform hover:-translate-y-2 group h-full">
                    <div className="relative h-40 w-full bg-gradient-to-r from-indigo-900 to-blue-900 flex items-center justify-center overflow-hidden">
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
                      {/* Particle effect background for science-related */}
                      <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-all duration-500">
                        <div className="absolute h-2 w-2 rounded-full bg-white top-1/4 left-1/4 animate-pulse"></div>
                        <div className="absolute h-1 w-1 rounded-full bg-white top-1/3 left-1/2 animate-pulse delay-100"></div>
                        <div className="absolute h-3 w-3 rounded-full bg-white top-2/3 left-1/3 animate-pulse delay-150"></div>
                        <div className="absolute h-2 w-2 rounded-full bg-white top-1/5 left-3/4 animate-pulse delay-75"></div>
                        <div className="absolute h-1 w-1 rounded-full bg-white top-2/3 left-3/4 animate-pulse delay-200"></div>
                      </div>
                      <div className="relative w-24 h-24 p-2 bg-white rounded-full transform group-hover:scale-110 transition-all duration-300">
                        <Image 
                          src="/images/program-studi/fisika-logo.png" 
                          alt="Fisika"
                          width={100}
                          height={100}
                          className="object-contain"
                        />
                      </div>
                    </div>
                    <div className="p-6 flex flex-col h-full">
                      <h4 className="text-xl font-semibold mb-3 text-white group-hover:text-fsti-light transition-colors">Fisika</h4>
                      <ul className="text-gray-400 space-y-3 mb-6">
                        <li className="flex items-start">
                          <ChevronRight className="w-4 h-4 mr-1 mt-1 text-fsti-light flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                          <span>Penelitian fenomena fisika dan aplikasinya</span>
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="w-4 h-4 mr-1 mt-1 text-fsti-light flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                          <span>Pengembangan teknologi berbasis ilmu fisika</span>
                        </li>
                        <li className="flex items-start">
                          <ChevronRight className="w-4 h-4 mr-1 mt-1 text-fsti-light flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                          <span>Analisis dan pemodelan sistem fisis</span>
                        </li>
                      </ul>
                      <div className="mt-auto pt-4 border-t border-gray-700">
                        <a 
                          href="https://phy.itk.ac.id/" 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-fsti-light hover:text-white inline-flex items-center text-sm font-medium group"
                        >
                          <span className="relative overflow-hidden">
                            <span className="relative inline-block transition-transform group-hover:translate-x-1">Pelajari Lebih Lanjut</span>
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-fsti-light group-hover:w-full transition-all duration-300"></span>
                          </span>
                          <ArrowRight className="w-4 h-4 ml-1 transform transition-transform duration-300 group-hover:translate-x-1" />
                        </a>
                      </div>
                    </div>
                  </div>
                </SafeAnimatedSection>
                
                {/* Prodi lainnya - dihapus untuk menyingkat kode */}
              </div>
            </div>
            
            {/* Jurusan TEIB dan bagian lainnya dihapus untuk menyingkat contoh */}
            
          </div>
        </section>

        {/* Bagian lain dihapus untuk menyingkat kode */}
        
      </MainLayout>
    </FramerMotionProvider>
  );
}

// Export halaman dalam bentuk dynamic component dengan opsi ssr: false
// Ini cara lain yang bisa membantu mengatasi masalah useLayoutEffect warning
export default dynamic(() => Promise.resolve(HomePage), { ssr: false });