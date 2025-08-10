"use client";
import { useEffect, useState } from 'react';

const AnimatedBackground = () => {
  const [mounted, setMounted] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(true);
 
  useEffect(() => {
    setMounted(true);
   
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth > 768);
    };
   
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    console.log("🎭 AnimatedBackground mounted, screen size:", window.innerWidth);
   
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);
 
  if (!mounted || !isLargeScreen) {
    console.log("⏳ AnimatedBackground not ready:", { mounted, isLargeScreen });
    return null;
  }

  console.log("✅ AnimatedBackground rendering");
 
  return (
    <div
      className="animation-container"
      style={{ 
        zIndex: -10,
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        display: 'block',
        visibility: 'visible',
        opacity: 1
      }}
    >
      <div className="animation-sphere sphere-1"></div>
      <div className="animation-sphere sphere-2"></div>
      <div className="animation-sphere sphere-3"></div>
      <div className="animation-sphere sphere-4"></div>
      <div className="animation-bar bar-1"></div>
      <div className="animation-bar bar-2"></div>
      <div className="animation-stars"></div>
      <div className="animation-blob blob-1"></div>
      <div className="animation-blob blob-2"></div>
    </div>
  );
};

export default AnimatedBackground;