"use client";

import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';
import AnimatedSection from '@/components/ui/AnimatedSection';
import Button from '@/components/ui/Button';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { 
  GraduationCap, 
  Users, 
  TrendingUp, 
  Building, 
  ChevronLeft,
  ExternalLink,
  FileText,
  CheckCircle
} from 'lucide-react';

const TracerStudyPage = () => {
  const { t, language } = useLanguage();

  return (
    <MainLayout>
      {/* PITA ZONA */}
      <section className="pita-zona pb-9 pt-10 sm:pb-11 sm:pt-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Link
            href="/tentang-fsti"
            className="legenda inline-flex items-center gap-1.5 text-arah-400 transition-colors hover:text-arah-300"
          >
            <ChevronLeft aria-hidden className="h-3.5 w-3.5" />
            {language === 'en' ? 'Back to About FSTI' : 'Kembali ke Tentang FSTI'}
          </Link>

          <h1 className="mt-4 max-w-[20ch] font-display text-[2rem] font-extrabold leading-[1.05] tracking-tight text-white sm:text-[2.5rem] lg:text-[3rem]">
            {t('tracerStudy.title')}
          </h1>
          <p className="mt-4 max-w-[68ch] text-base leading-relaxed text-primary-200">
            {t('tracerStudy.subtitle')}
          </p>
        </div>
      </section>

      {/* Mengapa Tracer Study Penting */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="slideUp">
            <h2 className="mb-8 font-display text-2xl font-extrabold tracking-tight text-tinta-900">
              {t('tracerStudy.whyImportant.title')}
            </h2>
          </AnimatedSection>

          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimatedSection animation="slideUp" delay={0.1}>
              <div className="border border-tinta-200 bg-white rounded-md p-6 text-center">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-sm bg-primary-950">
                  <TrendingUp className="h-5 w-5 text-arah-400" strokeWidth={1.75} />
                </div>
                <h3 className="font-bold text-tinta-900 mb-2">{t('tracerStudy.whyImportant.quality.title')}</h3>
                <p className="text-tinta-500 text-sm">{t('tracerStudy.whyImportant.quality.desc')}</p>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="slideUp" delay={0.2}>
              <div className="border border-tinta-200 bg-white rounded-md p-6 text-center">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-sm bg-primary-950">
                  <Building className="h-5 w-5 text-arah-400" strokeWidth={1.75} />
                </div>
                <h3 className="font-bold text-tinta-900 mb-2">{t('tracerStudy.whyImportant.relevance.title')}</h3>
                <p className="text-tinta-500 text-sm">{t('tracerStudy.whyImportant.relevance.desc')}</p>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="slideUp" delay={0.3}>
              <div className="border border-tinta-200 bg-white rounded-md p-6 text-center">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-sm bg-primary-950">
                  <Users className="h-5 w-5 text-arah-400" strokeWidth={1.75} />
                </div>
                <h3 className="font-bold text-tinta-900 mb-2">{t('tracerStudy.whyImportant.network.title')}</h3>
                <p className="text-tinta-500 text-sm">{t('tracerStudy.whyImportant.network.desc')}</p>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="slideUp" delay={0.4}>
              <div className="border border-tinta-200 bg-white rounded-md p-6 text-center">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-sm bg-primary-950">
                  <GraduationCap className="h-5 w-5 text-arah-400" strokeWidth={1.75} />
                </div>
                <h3 className="font-bold text-tinta-900 mb-2">{t('tracerStudy.whyImportant.accreditation.title')}</h3>
                <p className="text-tinta-500 text-sm">{t('tracerStudy.whyImportant.accreditation.desc')}</p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Google Form Embed Section */}
      <section className="py-16 bg-papan">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="slideUp">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-md shadow-angkat overflow-hidden">
                {/* Header */}
                <div className="bg-primary-950 text-white p-8 text-center">
                  <FileText className="w-16 h-16 mx-auto mb-4" />
                  <h2 className="text-2xl md:text-3xl font-bold mb-2">
                    {t('tracerStudy.form.title')}
                  </h2>
                  <p className="text-primary-100">
                    {t('tracerStudy.form.description')}
                  </p>
                </div>

                {/* Iframe Container */}
                <div className="p-4 md:p-8">
                  <div className="bg-tinta-50 rounded-md overflow-hidden" style={{height: '520px'}}>
                    <iframe 
                      src="https://docs.google.com/forms/d/e/1FAIpQLSe09s1JB6Sm4005NakxU9uNVnLyGBEiIEv8oSO2EdLG81LIeA/viewform?embedded=true" 
                      width="100%" 
                      height="520"
                      style={{border: 'none'}}
                      title="Tracer Study Form"
                    >
                      Loading…
                    </iframe>
                  </div>

                  {/* Alternative Link */}
                  <div className="mt-6 text-center">
                    <p className="text-tinta-500 mb-4">
                      {language === 'en' 
                        ? 'Having trouble viewing the form? Open it in a new tab' 
                        : 'Kesulitan melihat form? Buka di tab baru'}
                    </p>
                    <a
                      href="https://docs.google.com/forms/d/e/1FAIpQLSe09s1JB6Sm4005NakxU9uNVnLyGBEiIEv8oSO2EdLG81LIeA/viewform"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-300 font-medium"
                    >
                      {language === 'en' ? 'Open Form in New Tab' : 'Buka Form di Tab Baru'}
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Manfaat Mengisi Tracer Study */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <AnimatedSection animation="slideUp">
            <h2 className="mb-8 font-display text-2xl font-extrabold tracking-tight text-tinta-900">
              {t('tracerStudy.benefits.title')}
            </h2>
          </AnimatedSection>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatedSection animation="slideUp" delay={0.1}>
              <div className="flex items-start bg-green-50 rounded-md p-6">
                <div className="flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <h3 className="font-bold text-tinta-900 mb-2">{t('tracerStudy.benefits.benefit1.title')}</h3>
                  <p className="text-tinta-500 text-sm">{t('tracerStudy.benefits.benefit1.desc')}</p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="slideUp" delay={0.2}>
              <div className="flex items-start bg-blue-50 rounded-md p-6">
                <div className="flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h3 className="font-bold text-tinta-900 mb-2">{t('tracerStudy.benefits.benefit2.title')}</h3>
                  <p className="text-tinta-500 text-sm">{t('tracerStudy.benefits.benefit2.desc')}</p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="slideUp" delay={0.3}>
              <div className="flex items-start bg-purple-50 rounded-md p-6">
                <div className="flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <h3 className="font-bold text-tinta-900 mb-2">{t('tracerStudy.benefits.benefit3.title')}</h3>
                  <p className="text-tinta-500 text-sm">{t('tracerStudy.benefits.benefit3.desc')}</p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="slideUp" delay={0.4}>
              <div className="flex items-start bg-orange-50 rounded-md p-6">
                <div className="flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-orange-600" />
                </div>
                <div className="ml-4">
                  <h3 className="font-bold text-tinta-900 mb-2">{t('tracerStudy.benefits.benefit4.title')}</h3>
                  <p className="text-tinta-500 text-sm">{t('tracerStudy.benefits.benefit4.desc')}</p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-b from-light-bg to-white">
        <div className="container mx-auto px-4 text-center">
          <AnimatedSection animation="slideUp">
            <h2 className="text-2xl font-display font-bold mb-6 text-tinta-900">
              {t('tracerStudy.cta.title')}
            </h2>
            <p className="text-tinta-500 mb-8 max-w-2xl mx-auto">
              {t('tracerStudy.cta.description')}
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
                {t('common.email')}
              </Button>
              <Button 
                href="/tentang-fsti" 
                variant="outline"
                icon={<ChevronLeft className="w-4 h-4" />}
                animate
              >
                {language === 'en' ? 'Back to About FSTI' : 'Kembali ke Tentang FSTI'}
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </MainLayout>
  );
};

export default TracerStudyPage;