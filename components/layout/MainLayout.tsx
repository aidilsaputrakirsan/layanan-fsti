"use client";
import { ReactNode, useEffect, useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import dynamic from 'next/dynamic';

// Simplified dynamic imports with better error handling
const AnimatedBackground = dynamic(() => import('../ui/AnimatedBackground'), {
  ssr: false,
  loading: () => null
});

const BackgroundParticles = dynamic(() => import('../ui/BackgroundParticles'), {
  ssr: false,
  loading: () => null
});

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
  const [backgroundsReady, setBackgroundsReady] = useState(false);

  useEffect(() => {
    setMounted(true);
    initAOS();
    console.log("🏠 MainLayout mounted, hideBackground:", hideBackground);
    
    // Add a small delay to ensure DOM is ready for background components
    if (!hideBackground) {
      const timer = setTimeout(() => {
        setBackgroundsReady(true);
        console.log("🎨 Backgrounds ready to render");
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [hideBackground]);

  // Debug z-index conflicts
  useEffect(() => {
    if (mounted && backgroundsReady) {
      const checkElements = () => {
        const particles = document.querySelector('#particles-canvas');
        const animation = document.querySelector('.animation-container');
        const mainContent = document.querySelector('.main-content');
        
        console.log("🔍 Element check:", {
          particles: particles ? {
            element: particles,
            zIndex: window.getComputedStyle(particles).zIndex,
            display: window.getComputedStyle(particles).display,
            visibility: window.getComputedStyle(particles).visibility,
            opacity: window.getComputedStyle(particles).opacity
          } : null,
          animation: animation ? {
            element: animation,
            zIndex: window.getComputedStyle(animation).zIndex
          } : null,
          mainContent: mainContent ? {
            element: mainContent,
            zIndex: window.getComputedStyle(mainContent).zIndex
          } : null
        });
      };
      
      // Check after a short delay to ensure everything is rendered
      setTimeout(checkElements, 500);
    }
  }, [mounted, backgroundsReady]);

  return (
    <div className="flex flex-col min-h-screen relative bg-light-bg">
      {/* Background layers - render only when ready and not hidden */}
      {mounted && backgroundsReady && !hideBackground && (
        <>
          <AnimatedBackground />
          <BackgroundParticles />
        </>
      )}
     
      {/* Main content with explicit z-index */}
      <div className="flex flex-col min-h-screen relative main-content" style={{ zIndex: 1 }}>
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;