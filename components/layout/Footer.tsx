"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n/LanguageContext';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();
  
  return (
    <footer className="bg-white shadow-md text-gray-800 z-10 relative" id="kontak">
      {/* Top wave design */}
      <svg className="w-full h-12 -mb-1 text-light-bg fill-current" viewBox="0 0 1440 60">
        <path d="M0,48 C480,0 960,0 1440,48 L1440,60 L0,60 Z"></path>
      </svg>
      
      <div className="container mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Column 1: About */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-display font-bold mb-6 text-gradient">{t('footer.about')}</h3>
            <div className="flex items-start mb-4">
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mr-4 shadow-md border border-gray-200 overflow-hidden">
              <img
                src="/images/logofsti.png"
                alt="FSTI Logo"
                className="w-10 h-10 object-contain"
              />
            </div>
            <div>
              <p className="text-gray-800 mb-1 font-medium">
                {t('common.siteTitle')}
              </p>
              <p className="text-gray-600 text-sm">
                {t('common.university')}
              </p>
            </div>
          </div>
            <p className="text-sm text-gray-600 mb-5">
              Kampus ITK, Jl. Soekarno Hatta KM 15, Karang Joang, 
              <br />
              Balikpapan Utara, Kalimantan Timur 76127
            </p>
            <div className="flex space-x-3">
               {/* Instagram */}
              <a 
                href="https://www.instagram.com/fsti.itk" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-gray-100 hover:bg-primary-600 transition-colors duration-300"
                aria-label="Instagram"
              >
                <svg width="20" height="20" fill="currentColor" className="text-primary-600 hover:text-white" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              {/* TikTok */}
              <a 
                href="https://www.tiktok.com/@fsti.itk" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-gray-100 hover:bg-primary-600 transition-colors duration-300"
                aria-label="TikTok"
              >
                <svg width="20" height="20" fill="currentColor" className="text-primary-600 hover:text-white" viewBox="0 0 24 24">
                  <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z"/>
                </svg>
              </a>
            </div>
          </motion.div>

          {/* Column 2: Kontak */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-display font-bold mb-6 text-gradient">{t('footer.contact')}</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 mr-3 mt-1 text-primary-600" 
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
                </svg>
                <div>
                  <p className="text-gray-800 font-medium mb-1">{t('footer.email')}</p>
                  <a href="mailto:fsti@itk.ac.id" className="text-gray-600 hover:text-primary-600 transition-colors">
                    fsti@itk.ac.id
                  </a>
                </div>
              </li>
              <li className="flex items-start">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 mr-3 mt-1 text-primary-600" 
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
                </svg>
                <div>
                  <p className="text-gray-800 font-medium mb-1">{t('footer.phone')}</p>
                  <p className="text-gray-600 mb-1">{t('footer.finance')}: 
                    <a href="tel:+6285172312157" className="ml-1 hover:text-primary-600 transition-colors">
                      +6285172312157
                    </a>
                  </p>
                  <p className="text-gray-600">{t('footer.academic')}: 
                    <a href="tel:+6285172302157" className="ml-1 hover:text-primary-600 transition-colors">
                      +6285172302157
                    </a>
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 mr-3 mt-1 text-primary-600" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
                  />
                </svg>
                <div>
                  <p className="text-gray-800 font-medium mb-1">{t('footer.operationalHours')}</p>
                  <p className="text-gray-600">{t('footer.operationalTime')}</p>
                </div>
              </li>
            </ul>
          </motion.div>

          {/* Column 3: Struktur Organisasi */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-display font-bold mb-6 text-gradient">{t('footer.organization')}</h3>
            <ul className="space-y-4">
              <li>
                <p className="text-gray-800 font-medium mb-1">{t('footer.dean')}</p>
                <p className="text-sm text-gray-600">Adi Mahmud Jaya Marindra, S.T., M.Eng., Ph.D.</p>
              </li>
              <li>
                <p className="text-gray-800 font-medium mb-1">{t('footer.vdAcademic')}</p>
                <p className="text-sm text-gray-600">Irma Fitria, S.Si., M.Si.</p>
              </li>
              <li>
                <p className="text-gray-800 font-medium mb-1">{t('footer.vdFinance')}</p>
                <p className="text-sm text-gray-600">Yun Tonce Kusuma Priyanto, S.T., M.T.</p>
              </li>
              <li>
                <p className="text-gray-800 font-medium mb-1">{t('footer.headScienceData')}</p>
                <p className="text-sm text-gray-600">Dr. Swastya Rahastama, S.Si., M.Si.</p>
              </li>
              <li>
                <p className="text-gray-800 font-medium mb-1">{t('footer.headTEIB')}</p>
                <p className="text-sm text-gray-600">M. Ihsan Alfani Putera, S.Tr.Kom, M.Kom</p>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Quick Links */}
        <div className="border-t border-gray-200 pt-8 pb-6">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-8">
            <Link href="/" className="text-sm text-gray-600 hover:text-primary-600 transition-colors">
              {t('footer.home')}
            </Link>
            <Link href="/layanan-administrasi" className="text-sm text-gray-600 hover:text-primary-600 transition-colors">
              {t('footer.services')}
            </Link>
            <Link href="/tracking" className="text-sm text-gray-600 hover:text-primary-600 transition-colors">
              {t('footer.tracking')}
            </Link>
            <a href="https://itk.ac.id" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-600 hover:text-primary-600 transition-colors">
              {t('footer.itkWebsite')}
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-sm text-gray-500">
        <p>
          {t('common.copyright')} {t('common.developedBy')}{" "}
          <a
            href="https://aidilsaputrakirsan.github.io"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-600 hover:text-primary-800 transition-colors"
          >
            ADL
          </a>
        </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;