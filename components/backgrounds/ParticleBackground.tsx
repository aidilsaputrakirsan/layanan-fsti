"use client";
import { useEffect, useState } from 'react';

const ParticleBackground = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    console.log("🎨 ParticleBackground MOUNTED (Component Version)");
  }, []);

  if (!mounted) return null;

  console.log("✅ ParticleBackground RENDERING");

  return (
    <div className="elegant-particle-container">
      {/* Large Floating Orbs - Dominant Blue Theme */}
      <div className="elegant-orb elegant-orb-1"></div>
      <div className="elegant-orb elegant-orb-2"></div>
      <div className="elegant-orb elegant-orb-3"></div>
      <div className="elegant-orb elegant-orb-4"></div>
      
      {/* Small Particles - Blue Variations - OPTIMIZED COUNT */}
      <div className="elegant-particles-layer">
        {Array.from({ length: 15 }, (_, i) => (
          <div 
            key={i} 
            className={`elegant-particle elegant-particle-${i % 4}`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`
            }}
          />
        ))}
      </div>
      
      {/* Animated Lines - Subtle Blue */}
      <div className="elegant-lines-layer">
        <div className="elegant-line elegant-line-1"></div>
        <div className="elegant-line elegant-line-2"></div>
      </div>
      
      {/* CSS Styles - Embedded */}
      <style jsx>{`
        .elegant-particle-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -999;
          pointer-events: none;
          overflow: hidden;
        }
        
        /* Large Floating Orbs - ENHANCED VISIBILITY */
        .elegant-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(50px);
          will-change: transform;
          opacity: 0.5;
        }
        
        .elegant-orb-1 {
          width: 450px;
          height: 450px;
          background: radial-gradient(circle, rgba(47, 77, 211, 0.35) 0%, rgba(59, 130, 246, 0.18) 50%, transparent 80%);
          top: 10%;
          left: 15%;
          animation: elegantFloat1 40s infinite ease-in-out;
        }
        
        .elegant-orb-2 {
          width: 520px;
          height: 520px;
          background: radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, rgba(96, 165, 250, 0.15) 50%, transparent 80%);
          bottom: 15%;
          right: 10%;
          animation: elegantFloat2 45s infinite ease-in-out reverse;
          animation-delay: -20s;
        }
        
        .elegant-orb-3 {
          width: 380px;
          height: 380px;
          background: radial-gradient(circle, rgba(37, 99, 235, 0.25) 0%, rgba(59, 130, 246, 0.12) 50%, transparent 80%);
          top: 45%;
          right: 25%;
          animation: elegantFloat3 35s infinite ease-in-out;
          animation-delay: -30s;
        }
        
        .elegant-orb-4 {
          width: 320px;
          height: 320px;
          background: radial-gradient(circle, rgba(29, 78, 216, 0.2) 0%, rgba(147, 197, 253, 0.1) 50%, transparent 80%);
          bottom: 40%;
          left: 20%;
          animation: elegantFloat1 50s infinite ease-in-out;
          animation-delay: -15s;
        }
        
        /* Small Particles - Blue Spectrum - ENHANCED VISIBILITY */
        .elegant-particles-layer {
          position: absolute;
          width: 100%;
          height: 100%;
        }
        
        .elegant-particle {
          position: absolute;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          animation: elegantParticleFloat 22s infinite linear;
          opacity: 0.8;
        }
        
        .elegant-particle-0 {
          background: #3b82f6;
          box-shadow: 0 0 10px rgba(59, 130, 246, 0.9);
        }
        
        .elegant-particle-1 {
          background: #2563eb;
          box-shadow: 0 0 10px rgba(37, 99, 235, 0.9);
        }
        
        .elegant-particle-2 {
          background: #1d4ed8;
          box-shadow: 0 0 10px rgba(29, 78, 216, 0.9);
        }
        
        .elegant-particle-3 {
          background: #60a5fa;
          box-shadow: 0 0 10px rgba(96, 165, 250, 0.9);
        }
        
        /* Animated Lines - FIXED HORIZONTAL ONLY */
        .elegant-lines-layer {
          position: absolute;
          width: 100%;
          height: 100%;
        }
        
        .elegant-line {
          position: absolute;
          height: 1px;
          width: 70%;
          opacity: 0.25;
          animation: elegantLineMove 25s infinite ease-in-out;
          border-radius: 1px;
        }
        
        .elegant-line-1 {
          top: 25%;
          left: 15%;
          background: linear-gradient(90deg, transparent 0%, rgba(59, 130, 246, 0.4) 50%, transparent 100%);
          animation-delay: 0s;
        }
        
        .elegant-line-2 {
          top: 75%;
          right: 15%;
          background: linear-gradient(90deg, transparent 0%, rgba(37, 99, 235, 0.3) 50%, transparent 100%);
          animation-delay: -12s;
        }
        
        /* Animations - Smooth and Professional */
        @keyframes elegantFloat1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(20px, -15px) scale(1.05); }
          66% { transform: translate(-15px, 25px) scale(0.95); }
        }
        
        @keyframes elegantFloat2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-25px, -20px) scale(1.08); }
        }
        
        @keyframes elegantFloat3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(15px, -10px) scale(1.03); }
          75% { transform: translate(-10px, 20px) scale(0.97); }
        }
        
        @keyframes elegantParticleFloat {
          0% { 
            transform: translate(0, 0) rotate(0deg); 
            opacity: 0; 
          }
          10% { opacity: 0.7; }
          90% { opacity: 0.7; }
          100% { 
            transform: translate(-100px, -150px) rotate(180deg); 
            opacity: 0; 
          }
        }
        
        @keyframes elegantLineMove {
          0%, 100% { 
            transform: translateX(0) scaleX(0.8); 
            opacity: 0.1; 
          }
          50% { 
            transform: translateX(10px) scaleX(1.2); 
            opacity: 0.3; 
          }
        }
        
        /* Responsive Design - UPDATED FOR ENHANCED PARTICLES */
        @media (max-width: 768px) {
          .elegant-orb-1, .elegant-orb-2 {
            width: 280px;
            height: 280px;
            filter: blur(35px);
            opacity: 0.4;
          }
          
          .elegant-orb-3, .elegant-orb-4 {
            width: 220px;
            height: 220px;
            filter: blur(30px);
            opacity: 0.3;
          }
          
          .elegant-particle {
            width: 3px;
            height: 3px;
            opacity: 0.7;
          }
          
          .elegant-line {
            opacity: 0.15;
            width: 60%;
          }
        }
        
        /* Reduced Motion Support */
        @media (prefers-reduced-motion: reduce) {
          .elegant-orb,
          .elegant-particle,
          .elegant-line {
            animation: none !important;
          }
          
          .elegant-orb {
            opacity: 0.1;
          }
        }
      `}</style>
    </div>
  );
};

export default ParticleBackground;