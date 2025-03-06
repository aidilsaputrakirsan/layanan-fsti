"use client";

import React from 'react';

const DirectAnimation = () => {
  return (
    <>
      {/* Explicitly rendered animations with inline styles */}
      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: -1,
          overflow: 'hidden',
          pointerEvents: 'none'
        }}
      >
        {/* Glowing element 1 */}
        <div
          style={{
            position: 'absolute',
            width: '400px',
            height: '400px',
            borderRadius: '100%',
            backgroundColor: '#2f4dd3',
            opacity: 0.3,
            filter: 'blur(60px)',
            top: '10%',
            left: '15%',
            animation: 'float 15s infinite ease-in-out'
          }}
        />
        
        {/* Glowing element 2 */}
        <div
          style={{
            position: 'absolute',
            width: '500px',
            height: '500px',
            borderRadius: '100%',
            backgroundColor: '#3b5bdb',
            opacity: 0.3,
            filter: 'blur(70px)',
            bottom: '10%',
            right: '10%',
            animation: 'float 20s infinite ease-in-out',
            animationDelay: '-5s'
          }}
        />
        
        {/* Light bar */}
        <div
          style={{
            position: 'absolute',
            height: '2px',
            width: '50%',
            background: 'linear-gradient(90deg, transparent 0%, rgba(47, 77, 211, 0.5) 50%, transparent 100%)',
            top: '40%',
            left: '0',
            opacity: 0.5,
            animation: 'moveBar 8s infinite ease-in-out'
          }}
        />
        
        {/* Global styles for animations */}
        <style jsx global>{`
          @keyframes float {
            0%, 100% { transform: translateY(0) translateX(0); }
            25% { transform: translateY(-50px) translateX(25px); }
            50% { transform: translateY(20px) translateX(-30px); }
            75% { transform: translateY(30px) translateX(15px); }
          }
          
          @keyframes moveBar {
            0%, 100% { transform: translateY(0) scaleX(1); opacity: 0.3; }
            50% { transform: translateY(15px) scaleX(1.1); opacity: 0.6; }
          }
        `}</style>
      </div>
    </>
  );
};

export default DirectAnimation;