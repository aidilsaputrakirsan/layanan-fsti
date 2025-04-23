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

// Dynamic import BackgroundParticles dan pastikan mengimpor versi terbaru
const BackgroundParticles = dynamic(
  () => import('../ui/BackgroundParticles'),
  { 
    ssr: false,
    loading: () => <div className="fixed inset-0 bg-light-bg"></div>
  }
);

// AOS hanya diinisialisasi di client
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
    
    // Tambahkan debug untuk memeriksa apakah particles berhasil dimuat
    console.log("MainLayout mounted, hideBackground:", hideBackground);
  }, [hideBackground]);

  return (
    <div className="flex flex-col min-h-screen relative bg-light-bg">
      {/* Particles ditampilkan terlebih dahulu agar berada di belakang */}
      {!hideBackground && <BackgroundParticles />}
      {!hideBackground && <AnimatedBackground />}
      <div className="flex flex-col min-h-screen relative z-10">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;