"use client";
import { ReactNode, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
// Import components dengan dynamic untuk client-side only
import dynamic from 'next/dynamic';

const AnimatedBackground = dynamic(
  () => import('../ui/AnimatedBackground'),
  { ssr: false }
);

// Dynamic import BackgroundParticles
const BackgroundParticles = dynamic(
  () => import('../ui/BackgroundParticles'),
  { ssr: false }
);

// AOS hanya diinisialisasi di sisi client
const initAOS = () => {
  if (typeof window !== 'undefined') {
    import('aos').then((AOS) => {
      AOS.init({
        duration: 800,
        once: true,
        easing: 'ease-in-out',
      });
     
      const handleResize = () => {
        AOS.refresh();
      };
     
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    });
  }
};

interface MainLayoutProps {
  children: ReactNode;
  hideBackground?: boolean;
}

const MainLayout = ({ children, hideBackground = false }: MainLayoutProps) => {
  useEffect(() => {
    initAOS();
  }, []);

  return (
    <div className="flex flex-col min-h-screen relative">
      {!hideBackground && <AnimatedBackground />}
      {!hideBackground && <BackgroundParticles />} {/* Tambahkan komponen particles */}
      <div className="flex flex-col min-h-screen relative z-10">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;