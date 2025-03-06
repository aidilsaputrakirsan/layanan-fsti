"use client";

import React, { useEffect, useState } from 'react';

const AnimatedBackground = () => {
  const [mounted, setMounted] = useState(false);
  
  // Only render on client-side to avoid hydration issues
  useEffect(() => {
    setMounted(true);
    
    // Log to console to verify the component is mounted
    console.log("AnimatedBackground component mounted");
  }, []);
  
  if (!mounted) return null;
  
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-dark-bg">
      {/* High-contrast animated elements */}
      <div className="absolute w-[300px] h-[300px] rounded-full top-[10%] left-[15%] animate-float-slow opacity-30
           bg-blue-500 blur-[60px]"></div>
      
      <div className="absolute w-[400px] h-[400px] rounded-full bottom-[10%] right-[5%] animate-float-slow animation-delay-3000 opacity-30
           bg-indigo-600 blur-[60px]"></div>
      
      <div className="absolute w-[250px] h-[250px] rounded-full top-[40%] right-[15%] animate-float-slow animation-delay-7000 opacity-30
           bg-blue-400 blur-[60px]"></div>
      
      <div className="absolute w-[350px] h-[350px] rounded-full bottom-[25%] left-[5%] animate-float-slow animation-delay-11000 opacity-30
           bg-indigo-500 blur-[60px]"></div>
      
      {/* Animated light bars */}
      <div className="absolute top-[30%] left-0 w-1/2 h-[1px] opacity-40 animate-light-bar
           bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
      
      <div className="absolute top-[45%] right-0 w-1/2 h-[1px] opacity-40 animate-light-bar animation-delay-2000
           bg-gradient-to-l from-transparent via-blue-500 to-transparent"></div>
      
      <div className="absolute top-[70%] left-[10%] w-1/2 h-[1px] opacity-40 animate-light-bar animation-delay-5000
           bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
      
      {/* Star field effect */}
      <div className="absolute inset-0 opacity-20 bg-[length:200px_200px] animate-twinkle"
           style={{
             backgroundImage: `
               radial-gradient(1.5px 1.5px at 20px 30px, #ffffff, rgba(0,0,0,0)),
               radial-gradient(1.5px 1.5px at 40px 70px, #ffffff, rgba(0,0,0,0)),
               radial-gradient(1.5px 1.5px at 50px 160px, #ffffff, rgba(0,0,0,0)),
               radial-gradient(1.5px 1.5px at 90px 40px, #ffffff, rgba(0,0,0,0)),
               radial-gradient(1.5px 1.5px at 130px 80px, #ffffff, rgba(0,0,0,0)),
               radial-gradient(1.5px 1.5px at 160px 120px, #ffffff, rgba(0,0,0,0))
             `
           }}
      ></div>
    </div>
  );
};

export default AnimatedBackground;