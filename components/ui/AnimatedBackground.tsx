"use client";

import { useEffect, useState } from 'react';

const AnimatedBackground = () => {
  const [mounted, setMounted] = useState(false);
  // Only load animations on larger screens
  const [isLargeScreen, setIsLargeScreen] = useState(true);
  
  useEffect(() => {
    setMounted(true);
    
    // Check if screen is large enough for animations
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth > 768);
    };
    
    // Check on mount
    checkScreenSize();
    
    // Check on resize
    window.addEventListener('resize', checkScreenSize);
    
    return () => {
      window.removeEventListener('resize', checkScreenSize);
    };
  }, []);
  
  if (!mounted || !isLargeScreen) return null;
  
  // Reduced number of animation elements for better performance
  return (
    <div className="animation-container">
      {/* Spheres - reduced number */}
      <div className="animation-sphere sphere-1"></div>
      <div className="animation-sphere sphere-2"></div>
      
      {/* Light bars - reduced number */}
      <div className="animation-bar bar-1"></div>
      
      {/* Blobs - reduced number */}
      <div className="animation-blob blob-1"></div>
    </div>
  );
};

export default AnimatedBackground;