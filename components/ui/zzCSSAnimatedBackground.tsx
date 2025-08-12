"use client";
import { useEffect, useState } from 'react';

const CSSAnimatedBackground = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* CSS-only animated background */}
      <div className="css-animated-background">
        {/* Floating dots */}
        <div className="floating-dots">
          {Array.from({ length: 20 }, (_, i) => (
            <div 
              key={i} 
              className="dot" 
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${15 + Math.random() * 10}s`
              }}
            />
          ))}
        </div>

        {/* Gradient orbs */}
        <div className="gradient-orbs">
          <div className="orb orb-1"></div>
          <div className="orb orb-2"></div>
          <div className="orb orb-3"></div>
        </div>

        {/* SVG Pattern overlay */}
        <svg className="svg-pattern" width="100%" height="100%">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="1" fill="#2f4dd3" opacity="0.1">
                <animate attributeName="opacity" values="0.1;0.3;0.1" dur="4s" repeatCount="indefinite" />
              </circle>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Embedded CSS for the background */}
      <style jsx>{`
        .css-animated-background {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
          pointer-events: none;
          overflow: hidden;
        }

        .floating-dots {
          position: absolute;
          width: 100%;
          height: 100%;
        }

        .dot {
          position: absolute;
          width: 4px;
          height: 4px;
          background: linear-gradient(45deg, #2f4dd3, #5978ff);
          border-radius: 50%;
          animation: float 20s infinite linear;
          opacity: 0.6;
        }

        .dot::before {
          content: '';
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: radial-gradient(circle, rgba(47, 77, 211, 0.3) 0%, transparent 70%);
          border-radius: 50%;
          animation: pulse 3s infinite ease-in-out;
        }

        @keyframes float {
          0% {
            transform: translateY(0px) translateX(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-20px) translateX(10px) rotate(120deg);
          }
          66% {
            transform: translateY(10px) translateX(-10px) rotate(240deg);
          }
          100% {
            transform: translateY(0px) translateX(0px) rotate(360deg);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.2);
          }
        }

        .gradient-orbs {
          position: absolute;
          width: 100%;
          height: 100%;
        }

        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(40px);
          opacity: 0.15;
          animation: drift 30s infinite ease-in-out;
        }

        .orb-1 {
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, #2f4dd3 0%, transparent 70%);
          top: 20%;
          left: 10%;
          animation-delay: 0s;
        }

        .orb-2 {
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, #5978ff 0%, transparent 70%);
          bottom: 20%;
          right: 10%;
          animation-delay: -10s;
        }

        .orb-3 {
          width: 250px;
          height: 250px;
          background: radial-gradient(circle, #3b5bdb 0%, transparent 70%);
          top: 60%;
          left: 60%;
          animation-delay: -20s;
        }

        @keyframes drift {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          25% {
            transform: translate(30px, -30px) scale(1.1);
          }
          50% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          75% {
            transform: translate(20px, 10px) scale(1.05);
          }
        }

        .svg-pattern {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0.4;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .dot {
            width: 3px;
            height: 3px;
          }
          
          .orb {
            filter: blur(30px);
          }
          
          .orb-1, .orb-2 {
            width: 200px;
            height: 200px;
          }
          
          .orb-3 {
            width: 150px;
            height: 150px;
          }
        }

        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          .dot,
          .orb,
          .svg-pattern circle {
            animation: none !important;
          }
        }
      `}</style>
    </>
  );
};

export default CSSAnimatedBackground;