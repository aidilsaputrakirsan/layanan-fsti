"use client";
import { useEffect, useState, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
}

const BackgroundParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mounted, setMounted] = useState(false);
  const animationRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    setMounted(true);
    console.log("✨ BackgroundParticles component mounted");
  }, []);

  useEffect(() => {
    if (!mounted || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    console.log("🎨 Initializing canvas...", { 
      canvas: canvas, 
      width: window.innerWidth, 
      height: window.innerHeight 
    });

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      
      ctx.scale(dpr, dpr);
      
      console.log("📏 Canvas resized:", { 
        width: canvas.width, 
        height: canvas.height, 
        dpr 
      });
    };

    resizeCanvas();

    // Create particles
    const createParticles = () => {
      const particles: Particle[] = [];
      const numParticles = Math.floor((window.innerWidth * window.innerHeight) / 12000);
      
      for (let i = 0; i < numParticles; i++) {
        particles.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8,
          size: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.6 + 0.2
        });
      }
      
      console.log("🎯 Created", particles.length, "particles");
      return particles;
    };

    particlesRef.current = createParticles();

    const animate = () => {
      if (!ctx || !canvas) return;
      
      // Clear with transparency
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      // Set composite operation for better blending
      ctx.globalCompositeOperation = 'source-over';

      particlesRef.current.forEach((particle, i) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off edges with some randomness
        if (particle.x < 0 || particle.x > window.innerWidth) {
          particle.vx *= -1;
          particle.vx += (Math.random() - 0.5) * 0.2;
        }
        if (particle.y < 0 || particle.y > window.innerHeight) {
          particle.vy *= -1;
          particle.vy += (Math.random() - 0.5) * 0.2;
        }

        // Keep in bounds
        particle.x = Math.max(0, Math.min(window.innerWidth, particle.x));
        particle.y = Math.max(0, Math.min(window.innerHeight, particle.y));

        // Limit velocity
        particle.vx = Math.max(-2, Math.min(2, particle.vx));
        particle.vy = Math.max(-2, Math.min(2, particle.vy));

        // Draw particle with glow effect
        ctx.save();
        ctx.globalAlpha = particle.opacity;
        
        // Main particle
        ctx.fillStyle = '#2f4dd3';
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Glow effect
        ctx.globalAlpha = particle.opacity * 0.3;
        ctx.fillStyle = '#5978ff';
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();

        // Draw connections (optimized)
        particlesRef.current.slice(i + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.save();
            ctx.strokeStyle = '#2f4dd3';
            ctx.globalAlpha = (0.4 * (1 - distance / 120)) * Math.min(particle.opacity, otherParticle.opacity);
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
            ctx.restore();
          }
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    // Start animation with a small delay to ensure everything is ready
    const startAnimation = () => {
      console.log("🚀 Starting particles animation...");
      animate();
    };

    setTimeout(startAnimation, 100);

    // Handle resize
    const handleResize = () => {
      resizeCanvas();
      particlesRef.current = createParticles();
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
      console.log("🧹 BackgroundParticles cleanup completed");
    };
  }, [mounted]);

  if (!mounted) {
    console.log("⏳ BackgroundParticles waiting for mount...");
    return null;
  }

  return (
    <div 
      className="particles-container fixed inset-0 pointer-events-none"
      style={{ 
        zIndex: -1,
        display: 'block',
        visibility: 'visible',
        opacity: 1
      }}
    >
      <canvas
        ref={canvasRef}
        id="particles-canvas"
        className="particles-canvas"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
          pointerEvents: 'none',
          display: 'block',
          visibility: 'visible',
          opacity: 1,
          background: 'transparent'
        }}
      />
    </div>
  );
};

export default BackgroundParticles;