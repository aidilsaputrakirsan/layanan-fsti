"use client";

import { useState, useEffect, ReactNode } from 'react';
import dynamic from 'next/dynamic';
import MainLayout from '@/components/layout/MainLayout';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import ServiceCard from '@/components/ui/ServiceCard';
import SafeAnimatedSection from '@/components/ui/SafeAnimatedSection';
import { motion } from 'framer-motion';
import ClientOnly from '@/components/utils/ClientOnly';


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

// Wrap motion.div with ClientOnly component for safe client-side rendering
// Fixed typing for props
interface SafeMotionProps {
  children: ReactNode;
  [key: string]: any;
}

const SafeMotion = ({ children, ...props }: SafeMotionProps) => (
  <ClientOnly>
    <motion.div {...props}>
      {children}
    </motion.div>
  </ClientOnly>
);

function HomePage() {
  return (
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
              
              {/* Prodi 2 - Matematika */}
              <SafeAnimatedSection animation="slideUp" delay={0.3}>
                <div className="bg-dark-card rounded-xl overflow-hidden shadow-xl hover:shadow-fsti-light/20 transition-all duration-500 transform hover:-translate-y-2 group h-full">
                  <div className="relative h-40 w-full bg-gradient-to-r from-blue-900 to-blue-700 flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
                    {/* Math symbols background */}
                    <div className="absolute inset-0 opacity-10 group-hover:opacity-30 transition-all duration-500">
                      <div className="absolute top-1/4 left-1/4 text-3xl text-white">&sum;</div>
                      <div className="absolute top-2/3 left-1/3 text-2xl text-white">&radic;</div>
                      <div className="absolute top-1/3 left-2/3 text-3xl text-white">&pi;</div>
                      <div className="absolute top-2/3 left-3/4 text-2xl text-white">&int;</div>
                    </div>
                    <div className="relative w-24 h-24 p-2 bg-white rounded-full transform group-hover:scale-110 transition-all duration-300">
                      <Image 
                        src="/images/program-studi/matematika-logo.png" 
                        alt="Matematika"
                        width={100}
                        height={100}
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <div className="p-6 flex flex-col h-full">
                    <h4 className="text-xl font-semibold mb-3 text-white group-hover:text-fsti-light transition-colors">Matematika</h4>
                    <ul className="text-gray-400 space-y-3 mb-6">
                      <li className="flex items-start">
                        <ChevronRight className="w-4 h-4 mr-1 mt-1 text-fsti-light flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                        <span>Penelitian dan pengembangan matematika murni</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="w-4 h-4 mr-1 mt-1 text-fsti-light flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                        <span>Aplikasi matematika dalam berbagai bidang</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="w-4 h-4 mr-1 mt-1 text-fsti-light flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                        <span>Pemodelan matematika</span>
                      </li>
                    </ul>
                    <div className="mt-auto pt-4 border-t border-gray-700">
                      <a 
                        href="https://math.itk.ac.id/" 
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

              {/* Prodi 4 - Ilmu Aktuaria */}
              <SafeAnimatedSection animation="slideUp" delay={0.5}>
                <div className="bg-dark-card rounded-xl overflow-hidden shadow-xl hover:shadow-fsti-light/20 transition-all duration-500 transform hover:-translate-y-2 group h-full">
                  <div className="relative h-40 w-full bg-gradient-to-r from-blue-700 to-cyan-700 flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
                    {/* Finance graph background */}
                    <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-all duration-500">
                      <svg viewBox="0 0 100 30" className="h-full w-full opacity-20">
                        <path d="M0,30 L10,20 L20,25 L30,15 L40,18 L50,10 L60,15 L70,5 L80,12 L90,8 L100,15" 
                              fill="none" 
                              stroke="white" 
                              strokeWidth="0.5" />
                      </svg>
                    </div>
                    <div className="relative w-24 h-24 p-2 bg-white rounded-full transform group-hover:scale-110 transition-all duration-300">
                      <Image 
                        src="/images/program-studi/ilmu-aktuaria-logo.png" 
                        alt="Ilmu Aktuaria"
                        width={100}
                        height={100}
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <div className="p-6 flex flex-col h-full">
                    <h4 className="text-xl font-semibold mb-3 text-white group-hover:text-fsti-light transition-colors">Ilmu Aktuaria</h4>
                    <ul className="text-gray-400 space-y-3 mb-6">
                      <li className="flex items-start">
                        <ChevronRight className="w-4 h-4 mr-1 mt-1 text-fsti-light flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                        <span>Analisis risiko keuangan dan asuransi</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="w-4 h-4 mr-1 mt-1 text-fsti-light flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                        <span>Pemodelan matematis untuk perencanaan keuangan</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="w-4 h-4 mr-1 mt-1 text-fsti-light flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                        <span>Perhitungan dan manajemen dana pensiun</span>
                      </li>
                    </ul>
                    <div className="mt-auto pt-4 border-t border-gray-700">
                      <a 
                        href="https://actsci.itk.ac.id/" 
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
              
              {/* Prodi 3 - Statistika */}
              <SafeAnimatedSection animation="slideUp" delay={0.4}>
                <div className="bg-dark-card rounded-xl overflow-hidden shadow-xl hover:shadow-fsti-light/20 transition-all duration-500 transform hover:-translate-y-2 group h-full">
                  <div className="relative h-40 w-full bg-gradient-to-r from-cyan-700 to-teal-700 flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
                    {/* Data visualization dots/graph background */}
                    <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-all duration-500">
                      <svg viewBox="0 0 100 50" className="h-full w-full opacity-20">
                        <circle cx="20" cy="30" r="1" fill="white" />
                        <circle cx="25" cy="10" r="1" fill="white" />
                        <circle cx="30" cy="40" r="1" fill="white" />
                        <circle cx="35" cy="25" r="1" fill="white" />
                        <circle cx="40" cy="15" r="1" fill="white" />
                        <circle cx="45" cy="30" r="1" fill="white" />
                        <circle cx="50" cy="20" r="1" fill="white" />
                        <circle cx="55" cy="35" r="1" fill="white" />
                        <circle cx="60" cy="10" r="1" fill="white" />
                        <circle cx="65" cy="25" r="1" fill="white" />
                        <circle cx="70" cy="30" r="1" fill="white" />
                        <circle cx="75" cy="20" r="1" fill="white" />
                        <circle cx="80" cy="15" r="1" fill="white" />
                      </svg>
                    </div>
                    <div className="relative w-24 h-24 p-2 bg-white rounded-full transform group-hover:scale-110 transition-all duration-300">
                      <Image 
                        src="/images/program-studi/statistika-logo.png" 
                        alt="Statistika"
                        width={100}
                        height={100}
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <div className="p-6 flex flex-col h-full">
                    <h4 className="text-xl font-semibold mb-3 text-white group-hover:text-fsti-light transition-colors">Statistika</h4>
                    <ul className="text-gray-400 space-y-3 mb-6">
                      <li className="flex items-start">
                        <ChevronRight className="w-4 h-4 mr-1 mt-1 text-fsti-light flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                        <span>Analisis data dan metode statistika</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="w-4 h-4 mr-1 mt-1 text-fsti-light flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                        <span>Pengolahan big data</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="w-4 h-4 mr-1 mt-1 text-fsti-light flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                        <span>Pemodelan statistika untuk pengambilan keputusan</span>
                      </li>
                    </ul>
                    <div className="mt-auto pt-4 border-t border-gray-700">
                      <a 
                        href="https://stat.itk.ac.id/" 
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
            </div>
          </div>
          
          {/* Jurusan TEIB */}
          <div className="mb-20">
            <SafeAnimatedSection animation="slideUp" delay={0.1}>
              <div className="text-center mb-14">
                <div className="inline-block bg-gradient-to-r from-orange-900/80 via-amber-800/80 to-orange-900/80 px-8 py-3 rounded-full shadow-lg border border-orange-900/30">
                  <h3 className="text-2xl font-display font-semibold text-white">
                    Jurusan Teknik Elektro, Informatika dan Bisnis
                  </h3>
                </div>
              </div>
            </SafeAnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Prodi 1 - Teknik Elektro */}
              <SafeAnimatedSection animation="slideUp" delay={0.2}>
                <div className="bg-dark-card rounded-xl overflow-hidden shadow-xl hover:shadow-fsti-light/20 transition-all duration-500 transform hover:-translate-y-2 group h-full">
                  <div className="relative h-40 w-full bg-gradient-to-r from-red-900 to-red-700 flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
                    {/* Circuit pattern background */}
                    <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-all duration-500">
                      <svg viewBox="0 0 100 50" className="h-full w-full opacity-20">
                        <path d="M10,10 L30,10 L30,20 L50,20 L50,30 L70,30 L70,10 L90,10" 
                              fill="none" 
                              stroke="white" 
                              strokeWidth="0.5" />
                        <path d="M10,40 L30,40 L30,30 L50,30 L50,40 L70,40" 
                              fill="none" 
                              stroke="white" 
                              strokeWidth="0.5" />
                        <circle cx="30" cy="10" r="1" fill="white" />
                        <circle cx="50" cy="20" r="1" fill="white" />
                        <circle cx="50" cy="30" r="1" fill="white" />
                        <circle cx="70" cy="30" r="1" fill="white" />
                        <circle cx="70" cy="10" r="1" fill="white" />
                        <circle cx="30" cy="40" r="1" fill="white" />
                        <circle cx="30" cy="30" r="1" fill="white" />
                        <circle cx="50" cy="40" r="1" fill="white" />
                      </svg>
                    </div>
                    <div className="relative w-24 h-24 p-2 bg-white rounded-full transform group-hover:scale-110 transition-all duration-300">
                      <Image 
                        src="/images/program-studi/teknik-elektro-logo.png" 
                        alt="Teknik Elektro"
                        width={100}
                        height={100}
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <div className="p-6 flex flex-col h-full">
                    <h4 className="text-xl font-semibold mb-3 text-white group-hover:text-fsti-light transition-colors">Teknik Elektro</h4>
                    <ul className="text-gray-400 space-y-3 mb-6">
                      <li className="flex items-start">
                        <ChevronRight className="w-4 h-4 mr-1 mt-1 text-fsti-light flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                        <span>Teknologi kelistrikan dan elektronika</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="w-4 h-4 mr-1 mt-1 text-fsti-light flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                        <span>Sistem kontrol dan otomasi</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="w-4 h-4 mr-1 mt-1 text-fsti-light flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                        <span>Teknik tenaga listrik</span>
                      </li>
                    </ul>
                    <div className="mt-auto pt-4 border-t border-gray-700">
                      <a 
                        href="https://ee.itk.ac.id/" 
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
              
              {/* Prodi 2 - Sistem Informasi */}
              <SafeAnimatedSection animation="slideUp" delay={0.3}>
                <div className="bg-dark-card rounded-xl overflow-hidden shadow-xl hover:shadow-fsti-light/20 transition-all duration-500 transform hover:-translate-y-2 group h-full">
                  <div className="relative h-40 w-full bg-gradient-to-r from-orange-800 to-orange-600 flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
                    {/* Database/information flow background */}
                    <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-all duration-500">
                      <svg viewBox="0 0 100 50" className="h-full w-full opacity-20">
                        <rect x="20" y="10" width="20" height="10" rx="1" stroke="white" strokeWidth="0.5" fill="none" />
                        <rect x="60" y="10" width="20" height="10" rx="1" stroke="white" strokeWidth="0.5" fill="none" />
                        <rect x="20" y="30" width="20" height="10" rx="1" stroke="white" strokeWidth="0.5" fill="none" />
                        <rect x="60" y="30" width="20" height="10" rx="1" stroke="white" strokeWidth="0.5" fill="none" />
                        <path d="M40,15 L60,15" stroke="white" strokeWidth="0.5" fill="none" />
                        <path d="M40,35 L60,35" stroke="white" strokeWidth="0.5" fill="none" />
                        <path d="M30,20 L30,30" stroke="white" strokeWidth="0.5" fill="none" />
                        <path d="M70,20 L70,30" stroke="white" strokeWidth="0.5" fill="none" />
                      </svg>
                    </div>
                    <div className="relative w-24 h-24 p-2 bg-white rounded-full transform group-hover:scale-110 transition-all duration-300">
                      <Image 
                        src="/images/program-studi/sistem-informasi-logo.png" 
                        alt="Sistem Informasi"
                        width={100}
                        height={100}
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <div className="p-6 flex flex-col h-full">
                    <h4 className="text-xl font-semibold mb-3 text-white group-hover:text-fsti-light transition-colors">Sistem Informasi</h4>
                    <ul className="text-gray-400 space-y-3 mb-6">
                      <li className="flex items-start">
                        <ChevronRight className="w-4 h-4 mr-1 mt-1 text-fsti-light flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                        <span>Analisis dan desain sistem informasi</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="w-4 h-4 mr-1 mt-1 text-fsti-light flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                        <span>Manajemen basis data</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="w-4 h-4 mr-1 mt-1 text-fsti-light flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                        <span>Integrasi sistem dan teknologi informasi</span>
                      </li>
                    </ul>
                    <div className="mt-auto pt-4 border-t border-gray-700">
                      <a 
                        href="https://is.itk.ac.id/" 
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
              
              {/* Prodi 3 - Informatika */}
              <SafeAnimatedSection animation="slideUp" delay={0.4}>
                <div className="bg-dark-card rounded-xl overflow-hidden shadow-xl hover:shadow-fsti-light/20 transition-all duration-500 transform hover:-translate-y-2 group h-full">
                  <div className="relative h-40 w-full bg-gradient-to-r from-yellow-700 to-amber-500 flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
                    {/* Code pattern background */}
                    <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-all duration-500">
                      <div className="absolute top-2 left-4 text-xs text-white font-mono opacity-50">&lt;html&gt;</div>
                      <div className="absolute top-6 left-6 text-xs text-white font-mono opacity-50">&lt;body&gt;</div>
                      <div className="absolute top-10 left-8 text-xs text-white font-mono opacity-50">if (code) {</div>
                      <div className="absolute top-14 left-10 text-xs text-white font-mono opacity-50">return solution;</div>
                      <div className="absolute top-18 left-8 text-xs text-white font-mono opacity-50">}</div>
                      <div className="absolute top-22 left-6 text-xs text-white font-mono opacity-50">&lt;/body&gt;</div>
                      <div className="absolute top-26 left-4 text-xs text-white font-mono opacity-50">&lt;/html&gt;</div>
                    </div>
                    <div className="relative w-24 h-24 p-2 bg-white rounded-full transform group-hover:scale-110 transition-all duration-300">
                      <Image 
                        src="/images/program-studi/informatika-logo.png" 
                        alt="Informatika"
                        width={100}
                        height={100}
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <div className="p-6 flex flex-col h-full">
                    <h4 className="text-xl font-semibold mb-3 text-white group-hover:text-fsti-light transition-colors">Informatika</h4>
                    <ul className="text-gray-400 space-y-3 mb-6">
                      <li className="flex items-start">
                        <ChevronRight className="w-4 h-4 mr-1 mt-1 text-fsti-light flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                        <span>Pengembangan perangkat lunak</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="w-4 h-4 mr-1 mt-1 text-fsti-light flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                        <span>Kecerdasan buatan dan machine learning</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="w-4 h-4 mr-1 mt-1 text-fsti-light flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                        <span>Komputasi dan algoritma</span>
                      </li>
                    </ul>
                    <div className="mt-auto pt-4 border-t border-gray-700">
                      <a 
                        href="https://if.itk.ac.id/" 
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
              
              {/* Prodi 4 - Bisnis Digital */}
              <SafeAnimatedSection animation="slideUp" delay={0.5}>
                <div className="bg-dark-card rounded-xl overflow-hidden shadow-xl hover:shadow-fsti-light/20 transition-all duration-500 transform hover:-translate-y-2 group h-full">
                  <div className="relative h-40 w-full bg-gradient-to-r from-amber-500 to-lime-600 flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
                    {/* Digital business icons background */}
                    <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-all duration-500">
                      <div className="absolute top-1/4 left-1/4 text-2xl text-white opacity-50">$</div>
                      <div className="absolute top-2/3 left-1/3 text-2xl text-white opacity-50">@</div>
                      <div className="absolute top-1/3 left-2/3 text-2xl text-white opacity-50">#</div>
                      <div className="absolute top-2/3 left-3/4 text-2xl text-white opacity-50">€</div>
                    </div>
                    <div className="relative w-24 h-24 p-2 bg-white rounded-full transform group-hover:scale-110 transition-all duration-300">
                      <Image 
                        src="/images/program-studi/bisnis-digital-logo.png" 
                        alt="Bisnis Digital"
                        width={100}
                        height={100}
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <div className="p-6 flex flex-col h-full">
                    <h4 className="text-xl font-semibold mb-3 text-white group-hover:text-fsti-light transition-colors">Bisnis Digital</h4>
                    <ul className="text-gray-400 space-y-3 mb-6">
                      <li className="flex items-start">
                        <ChevronRight className="w-4 h-4 mr-1 mt-1 text-fsti-light flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                        <span>Transformasi digital bisnis</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="w-4 h-4 mr-1 mt-1 text-fsti-light flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                        <span>E-commerce dan digital marketing</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="w-4 h-4 mr-1 mt-1 text-fsti-light flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                        <span>Analisis data bisnis</span>
                      </li>
                    </ul>
                    <div className="mt-auto pt-4 border-t border-gray-700">
                      <a 
                        href="https://bisnisdigital.itk.ac.id/" 
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
            </div>
          </div>
          
          {/* Akreditasi Section */}
          <SafeAnimatedSection animation="fadeIn" delay={0.3}>
            <div className="text-center bg-gradient-to-r from-dark-card/60 via-dark-card to-dark-card/60 p-8 rounded-2xl border border-fsti-light/20 shadow-lg relative overflow-hidden">
              {/* Background decoration */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-fsti-primary/10 rounded-full filter blur-3xl"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-fsti-primary/10 rounded-full filter blur-3xl"></div>
              
              <h3 className="text-2xl font-display font-bold mb-4 text-gradient">Akreditasi Program Studi</h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Seluruh Program Studi di FSTI Institut Teknologi Kalimantan telah mendapatkan akreditasi resmi. 
                Kunjungi laman akreditasi untuk melihat sertifikat dan informasi akreditasi terbaru.
              </p>
              <a 
                href="https://ult.itk.ac.id/sertifikat-akreditasi/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 rounded-lg bg-fsti-primary hover:bg-fsti-secondary text-white font-medium transition-all duration-300 group"
              >
                <span>Lihat Akreditasi</span>
                <ArrowRight className="ml-2 w-5 h-5 transform transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </SafeAnimatedSection>
        </div>
      </section>

      {/* Visi & Misi Section */}
      <section className="py-20 bg-dark-bg">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <SafeAnimatedSection animation="slideUp">
              <div className="bg-dark-card rounded-xl shadow-lg p-10 mb-12 border border-dark-border">
                <h3 className="text-2xl font-display font-bold mb-6 text-center text-gradient">Visi FSTI</h3>
                <blockquote className="text-gray-300 text-center italic text-lg">
                  &quot;Pada tahun 2029, FSTI ITK akan menjadi pusat keunggulan akademik dan inovasi, menghasilkan lulusan yang kompeten, adaptif, berdaya saing global, dan karya-karya dalam bidang sains dan teknologi informasi yang berdampak bagi kemajuan Kalimantan dan Indonesia.&quot;
                </blockquote>
              </div>
            </SafeAnimatedSection>
            
            <SafeAnimatedSection animation="slideUp" delay={0.2}>
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
            </SafeAnimatedSection>
          </div>
        </div>
      </section>

      {/* Struktur Organisasi Section */}
      <section className="py-20 bg-dark-bg">
        <div className="container mx-auto px-4">
          <SafeAnimatedSection animation="slideUp">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 inline-block text-gradient">
                Struktur Organisasi
              </h2>
              <p className="text-gray-400 max-w-xl mx-auto">
                Jajaran pimpinan fakultas dan jurusan yang bertanggung jawab dalam pengelolaan FSTI ITK
              </p>
            </div>
          </SafeAnimatedSection>
          
          <div className="max-w-6xl mx-auto">
            {/* Dekan */}
            <SafeAnimatedSection animation="fadeIn" delay={0.1}>
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
            </SafeAnimatedSection>
            
            {/* Wakil Dekan */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <SafeAnimatedSection animation="slideUp" delay={0.2}>
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
              </SafeAnimatedSection>
              
              <SafeAnimatedSection animation="slideUp" delay={0.3}>
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
              </SafeAnimatedSection>
            </div>
            
            {/* Ketua Jurusan */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <SafeAnimatedSection animation="slideUp" delay={0.4}>
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
              </SafeAnimatedSection>
              
              <SafeAnimatedSection animation="slideUp" delay={0.5}>
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
              </SafeAnimatedSection>
            </div>

            {/* Ka SubBagian Umum */}
            <SafeAnimatedSection animation="slideUp" delay={0.5}>
              <div className="flex flex-col items-center mb-12 mt-8">
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
            </SafeAnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-dark-bg to-fsti-dark">
        <div className="container mx-auto px-4 text-center">
          <SafeAnimatedSection animation="slideUp">
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
          </SafeAnimatedSection>
        </div>
      </section>
    </MainLayout>
  );
}

// Export with SSR disabled to avoid hydration issues
export default dynamic(() => Promise.resolve(HomePage), { ssr: false });