"use client";

import { ReactNode, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import AnimatedBackground from '../ui/AnimatedBackground';
import AOS from 'aos';
import 'aos/dist/aos.css';

interface MainLayoutProps {
  children: ReactNode;
  hideBackground?: boolean;
}

const MainLayout = ({ children, hideBackground = false }: MainLayoutProps) => {
  useEffect(() => {
    console.log("MainLayout mounted, background hidden:", hideBackground);
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-in-out',
    });
    
    const handleResize = () => {
      AOS.refresh();
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [hideBackground]);

  return (
    <div className="flex flex-col min-h-screen relative">
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