"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import { LazyMotion, domAnimation, m } from 'framer-motion';
import ClientOnly from '@/components/utils/ClientOnly';
import LanguageToggle from '@/components/ui/LanguageToggle';
import { useLanguage } from '@/lib/i18n/LanguageContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when pathname changes
    setIsOpen(false);
  }, [pathname]);

  // Animation variants for mobile menu
  const menuVariants = {
    closed: {
      opacity: 0,
      x: "-100%",
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  return (
    <LazyMotion features={domAnimation}>
      <nav 
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled ? 'navbar-blur py-2' : 'bg-transparent py-4'
        }`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo and Name */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="h-12 w-auto flex items-center justify-center transition-all duration-300">
            <img
              src="/images/logofsti.png"
              alt="FSTI Logo"
              className="h-full w-auto object-contain"
            />
          </div>
          <div className="hidden md:block">
            <div className="font-display font-bold text-lg text-gray-800 group-hover:text-gradient transition-all duration-300">FSTI ITK</div>
            <div className="text-xs text-gray-600 -mt-1 transform transition-all duration-300">{t('common.siteTitle')}</div>
          </div>
        </Link>

          {/* Menu Desktop */}
          <div className="hidden md:flex items-center space-x-6">
            <NavLink href="/" active={pathname === '/'}>
              {t('nav.home')}
            </NavLink>
            {/* Menambahkan NavLink baru untuk Peraturan & Kebijakan */}
            <NavLink href="/peraturan-kebijakan" active={pathname?.includes('/peraturan-kebijakan')}>
              {t('nav.regulations') || (t('nav.language') === 'English' ? 'Regulations' : 'Peraturan')}
            </NavLink>
            <NavLink href="/layanan-administrasi" active={pathname?.includes('/layanan-administrasi')}>
              {t('nav.adminServices')}
            </NavLink>
            <NavLink href="/tracking" active={pathname?.includes('/tracking')}>
              {t('nav.docTracking')}
            </NavLink>
            <NavLink href="/survey-kepuasan" active={pathname?.includes('/survey-kepuasan')}>
              {t('nav.survey')}
            </NavLink>
            <NavLink href="#kontak" active={false}>
              {t('nav.contact')}
            </NavLink>
            <LanguageToggle />
          </div>

          {/* Menu Mobile Toggle Button */}
          <div className="md:hidden flex items-center space-x-4">
            <LanguageToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-800 focus:outline-none z-50"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              <span className="sr-only">{isOpen ? "Close menu" : "Open menu"}</span>
              <div className="relative w-6 h-5">
                <span 
                  className={`absolute h-0.5 w-6 bg-gray-800 transform transition-all duration-300 ease-in-out ${
                    isOpen ? 'rotate-45 translate-y-2.5' : ''
                  }`} 
                  style={{top: '0'}}
                />
                <span 
                  className={`absolute h-0.5 bg-gray-800 transform transition-all duration-300 ease-in-out ${
                    isOpen ? 'w-0 opacity-0' : 'w-6 opacity-100'
                  }`} 
                  style={{top: '50%', transform: 'translateY(-50%)'}}
                />
                <span 
                  className={`absolute h-0.5 w-6 bg-gray-800 transform transition-all duration-300 ease-in-out ${
                    isOpen ? '-rotate-45 -translate-y-2.5' : ''
                  }`} 
                  style={{bottom: '0'}}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu with Animation - Only render on client */}
        <ClientOnly>
          <AnimatePresence>
            {isOpen && (
              <m.div
                initial="closed"
                animate="open"
                exit="closed"
                variants={menuVariants}
                className="md:hidden fixed inset-0 bg-white bg-opacity-95 z-40 pt-20"
              >
                <div className="container mx-auto px-4 py-5 flex flex-col space-y-4">
                  <MobileNavLink href="/" active={pathname === '/'} onClick={() => setIsOpen(false)}>
                    {t('nav.home')}
                  </MobileNavLink>
                  {/* Menambahkan MobileNavLink baru untuk Peraturan & Kebijakan */}
                  <MobileNavLink 
                    href="/peraturan-kebijakan" 
                    active={pathname?.includes('/peraturan-kebijakan')} 
                    onClick={() => setIsOpen(false)}
                  >
                    {t('nav.regulations') || (t('nav.language') === 'English' ? 'Regulations' : 'Peraturan')}
                  </MobileNavLink>
                  <MobileNavLink 
                    href="/layanan-administrasi" 
                    active={pathname?.includes('/layanan-administrasi')} 
                    onClick={() => setIsOpen(false)}
                  >
                    {t('nav.adminServices')}
                  </MobileNavLink>
                  <MobileNavLink 
                    href="/tracking" 
                    active={pathname?.includes('/tracking')} 
                    onClick={() => setIsOpen(false)}
                  >
                    {t('nav.docTracking')}
                  </MobileNavLink>
                  <MobileNavLink 
                    href="/survey-kepuasan" 
                    active={pathname?.includes('/survey-kepuasan')} 
                    onClick={() => setIsOpen(false)}
                  >
                    {t('nav.survey')}
                  </MobileNavLink>
                  <MobileNavLink 
                    href="#kontak" 
                    active={false} 
                    onClick={() => setIsOpen(false)}
                  >
                    {t('nav.contact')}
                  </MobileNavLink>

                  {/* Social Media Links */}
                  <div className="pt-6 mt-6 border-t border-gray-200">
                    <p className="text-gray-500 mb-4">Follow us:</p>
                    <div className="flex space-x-4">
                      <a 
                        href="https://www.instagram.com/fsti.itk" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="p-2 rounded-full bg-gray-100 hover:bg-primary-600 hover:text-white transition-colors duration-300"
                      >
                        <svg width="20" height="20" fill="currentColor" className="text-primary-600 hover:text-white" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </m.div>
            )}
          </AnimatePresence>
        </ClientOnly>
      </nav>
    </LazyMotion>
  );
};

// Desktop Navigation Link - Fixed to use m instead of motion
const NavLink = ({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) => {
  return (
    <Link 
      href={href} 
      className={`relative py-2 text-gray-700 font-medium transition-all duration-300 ${
        active ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600'
      }`}
    >
      {children}
      {active && (
        <ClientOnly>
          <m.span 
            layoutId="navIndicator"
            className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600" 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
        </ClientOnly>
      )}
    </Link>
  );
};

// Mobile Navigation Link
const MobileNavLink = ({ 
  href, 
  active, 
  onClick, 
  children 
}: { 
  href: string; 
  active: boolean; 
  onClick: () => void;
  children: React.ReactNode 
}) => {
  return (
    <Link 
      href={href} 
      className={`py-3 px-4 text-lg font-medium rounded-lg transition-colors duration-300 ${
        active 
          ? 'bg-primary-50 text-primary-600' 
          : 'text-gray-700 hover:bg-gray-100 hover:text-primary-600'
      }`}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default Navbar;