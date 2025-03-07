"use client";

import { useEffect, useState } from 'react';

const AnimatedBackground = () => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) return null;
  
  return (
    <div className="animation-container">
      {/* Spheres */}
      <div className="animation-sphere sphere-1"></div>
      <div className="animation-sphere sphere-2"></div>
      <div className="animation-sphere sphere-3"></div>
      <div className="animation-sphere sphere-4"></div>
      
      {/* Light bars - diposisikan ulang ke bagian bawah */}
      <div className="animation-bar bar-1"></div>
      <div className="animation-bar bar-2"></div>
      
      {/* Blobs */}
      <div className="animation-blob blob-1"></div>
      <div className="animation-blob blob-2"></div>
      
      {/* Stars dengan ukuran yang lebih besar */}
      <div className="animation-stars"></div>
    </div>
  );
};

export default AnimatedBackground;