"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

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
    <nav 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'navbar-blur py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo and Nama */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center shadow-md group-hover:shadow-glow transition-all duration-300">
            <span className="text-fsti-primary font-bold text-sm">FSTI</span>
          </div>
          <div className="hidden md:block">
            <div className="font-display font-bold text-lg text-white group-hover:text-gradient transition-all duration-300">FSTI ITK</div>
            <div className="text-xs text-white/80 -mt-1 transform transition-all duration-300">Fakultas Sains dan Teknologi Informasi</div>
          </div>
        </Link>

        {/* Menu Desktop */}
        <div className="hidden md:flex space-x-6">
          <NavLink href="/" active={pathname === '/'}>
            Beranda
          </NavLink>
          <NavLink href="/layanan-administrasi" active={pathname?.includes('/layanan-administrasi')}>
            Layanan Administrasi
          </NavLink>
          <NavLink href="/tracking" active={pathname?.includes('/tracking')}>
            Tracking Dokumen
          </NavLink>
          <NavLink href="#kontak" active={false}>
            Kontak
          </NavLink>
        </div>

        {/* Menu Mobile Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white focus:outline-none z-50"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          <span className="sr-only">{isOpen ? "Close menu" : "Open menu"}</span>
          <div className="relative w-6 h-5">
            <span 
              className={`absolute h-0.5 w-6 bg-white transform transition-all duration-300 ease-in-out ${
                isOpen ? 'rotate-45 translate-y-2.5' : ''
              }`} 
              style={{top: '0'}}
            />
            <span 
              className={`absolute h-0.5 bg-white transform transition-all duration-300 ease-in-out ${
                isOpen ? 'w-0 opacity-0' : 'w-6 opacity-100'
              }`} 
              style={{top: '50%', transform: 'translateY(-50%)'}}
            />
            <span 
              className={`absolute h-0.5 w-6 bg-white transform transition-all duration-300 ease-in-out ${
                isOpen ? '-rotate-45 -translate-y-2.5' : ''
              }`} 
              style={{bottom: '0'}}
            />
          </div>
        </button>
      </div>

      {/* Mobile Menu with Animation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="md:hidden fixed inset-0 bg-dark-bg bg-opacity-95 z-40 pt-20"
          >
            <div className="container mx-auto px-4 py-5 flex flex-col space-y-4">
              <MobileNavLink href="/" active={pathname === '/'} onClick={() => setIsOpen(false)}>
                Beranda
              </MobileNavLink>
              <MobileNavLink 
                href="/layanan-administrasi" 
                active={pathname?.includes('/layanan-administrasi')} 
                onClick={() => setIsOpen(false)}
              >
                Layanan Administrasi
              </MobileNavLink>
              <MobileNavLink 
                href="/tracking" 
                active={pathname?.includes('/tracking')} 
                onClick={() => setIsOpen(false)}
              >
                Tracking Dokumen
              </MobileNavLink>
              <MobileNavLink 
                href="#kontak" 
                active={false} 
                onClick={() => setIsOpen(false)}
              >
                Kontak
              </MobileNavLink>

              {/* Social Media Links */}
              <div className="pt-6 mt-6 border-t border-dark-border">
                <p className="text-dark-muted mb-4">Follow us:</p>
                <div className="flex space-x-4">
                  <a 
                    href="https://www.instagram.com/fsti.itk" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-dark-card hover:bg-fsti-primary transition-colors duration-300"
                  >
                    <svg width="20" height="20" fill="currentColor" className="text-white" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// Desktop Navigation Link
const NavLink = ({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) => {
  return (
    <Link 
      href={href} 
      className={`relative py-2 text-white font-medium transition-all duration-300 ${
        active ? 'text-white' : 'text-white/80 hover:text-white'
      }`}
    >
      {children}
      {active && (
        <motion.span 
          layoutId="navIndicator"
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-fsti-primary" 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
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
          ? 'bg-fsti-primary/20 text-white' 
          : 'text-white/80 hover:bg-dark-card hover:text-white'
      }`}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default Navbar;