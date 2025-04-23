"use client";

import { useState, useEffect, ReactNode } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import Link from 'next/link';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import ServiceCard from '@/components/ui/ServiceCard';
import SafeAnimatedSection from '@/components/ui/SafeAnimatedSection';
import { motion } from 'framer-motion';
import ClientOnly from '@/components/utils/ClientOnly';
import dynamic from 'next/dynamic';
import { useLanguage } from '@/lib/i18n/LanguageContext';

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

  const { t } = useLanguage();

  return (
    <div className="w-full h-80 md:h-96 bg-light-bg rounded-xl overflow-hidden relative">
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
      <div className="absolute inset-0 bg-gradient-to-b from-light-bg/30 to-light-bg/70"></div>
      <div className="relative z-10 text-center p-8 flex flex-col h-full justify-center">
        
        <h3 className="text-xl font-bold mb-3 text-primary-800">{t('home.academicCenter.title')}</h3>
        <p className="text-gray-700 mb-4">
          {t('home.academicCenter.description')}
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
  const { t } = useLanguage();
  
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
              <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 leading-tight text-gray-900">
                {t('home.hero.title')} <span className="text-gradient">{t('common.university')}</span>
              </h1>
              <h2 className="text-xl md:text-2xl mb-6 text-gray-700">
                {t('common.university')}
              </h2>
              <p className="text-gray-700 mb-8 text-lg max-w-lg">
                {t('home.hero.description')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  href="/layanan-administrasi" 
                  variant="primary"
                  size="lg"
                  icon={<FileText className="w-5 h-5" />}
                  animate
                >
                  {t('home.hero.viewServices')}
                </Button>
                <Button 
                  href="/tracking" 
                  variant="outline"
                  size="lg"
                  icon={<RefreshCcw className="w-5 h-5" />}
                  animate
                >
                  {t('home.hero.trackDocuments')}
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
                  className="rounded-2xl p-2 bg-gradient-to-tr from-primary-800 via-primary-600 to-primary-400 shadow-glow"
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

      {/* Popular Services Section */}
      <section className="py-20 bg-light-bg">
        <div className="container mx-auto px-4">
          <SafeAnimatedSection animation="slideUp">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 inline-block text-gradient">
                {t('home.popularServices.title')}
              </h2>
              <p className="text-gray-600 max-w-xl mx-auto">
                {t('home.popularServices.description')}
              </p>
            </div>
          </SafeAnimatedSection>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Service 1 */}
            <SafeAnimatedSection animation="slideUp" delay={0.1}>
              <ServiceCard 
                id="surat-umum"
                title={t('home.popularServices.coverLetterTitle')}
                description={t('home.popularServices.coverLetterDesc')}
                icon={<FileText />}
                url="https://forms.gle/TfydWAeGoFFQYdmR6"
                compact
              />
            </SafeAnimatedSection>

            {/* Service 2 */}
            <SafeAnimatedSection animation="slideUp" delay={0.2}>
              <ServiceCard 
                id="kp-ta"
                title={t('home.popularServices.internshipTitle')}
                description={t('home.popularServices.internshipDesc')}
                icon={<Briefcase />}
                url="/layanan-administrasi#kp-ta"
                compact
              />
            </SafeAnimatedSection>

            {/* Service 3 */}
            <SafeAnimatedSection animation="slideUp" delay={0.3}>
              <ServiceCard 
                id="legalisasi"
                title={t('home.popularServices.legalizationTitle')}
                description={t('home.popularServices.legalizationDesc')}
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
              {t('common.viewAll')}
            </Button>
          </SafeAnimatedSection>
        </div>
      </section>

      {/* 
        Program Studi Section & Organization Structure COMMENTED OUT
        per requirement to focus on administrative services 
      */}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-light-bg to-white">
        <div className="container mx-auto px-4 text-center">
          <SafeAnimatedSection animation="slideUp">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-primary-800">{t('common.needHelp')}</h2>
            <p className="text-gray-700 mb-10 max-w-2xl mx-auto text-lg">
              {t('services.needHelp.description')}
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
                {t('common.email')}
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
                {t('common.contact')}
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