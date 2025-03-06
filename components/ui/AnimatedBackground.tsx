"use client";

import React, { useEffect, useState } from 'react';

const AnimatedBackground = () => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted) return null;
  
  return (
    <div className="bg-animation">
      <div className="bg-sphere bg-sphere-1"></div>
      <div className="bg-sphere bg-sphere-2"></div>
      <div className="bg-sphere bg-sphere-3"></div>
      <div className="bg-sphere bg-sphere-4"></div>
      
      <div className="bg-light-bar bg-light-bar-1"></div>
      <div className="bg-light-bar bg-light-bar-2"></div>
      <div className="bg-light-bar bg-light-bar-3"></div>
      
      <div className="bg-stars"></div>
    </div>
  );
};

export default AnimatedBackground;