"use client";
import { ReactNode, useEffect, useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    initAOS();
    console.log("🏠 MainLayout mounted - CLEAN VERSION (no background)");
  }, []);

  return (
    <div className="flex flex-col min-h-screen relative">
      {/* NO BACKGROUND HERE - Background sekarang di app/layout.tsx */}
      
      {/* Main content */}
      <div 
        className="flex flex-col min-h-screen relative main-content" 
        style={{ zIndex: 1 }}
      >
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;