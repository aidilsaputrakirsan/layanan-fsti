"use client";
import { useEffect, useState, useRef, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  baseOpacity: number; // Untuk animasi opacity
}

const BackgroundParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mounted, setMounted] = useState(false);
  const [canvasReady, setCanvasReady] = useState(false);
  const animationRef = useRef<number | undefined>(undefined);
  const particlesRef = useRef<Particle[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Mount detection dengan debugging
  useEffect(() => {
    setMounted(true);
    console.log("✨ BackgroundParticles component mounted");
    
    // Set initial dimensions
    if (typeof window !== 'undefined') {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    }
  }, []);

  // Improved resize handler
  const handleResize = useCallback(() => {
    if (typeof window !== 'undefined') {
      const newDimensions = {
        width: window.innerWidth,
        height: window.innerHeight
      };
      setDimensions(newDimensions);
      console.log("📏 Window resized:", newDimensions);
    }
  }, []);

  // Canvas setup and animation
  useEffect(() => {
    if (!mounted || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      console.error("❌ Failed to get canvas context");
      return;
    }

    console.log("🎨 Initializing canvas with dimensions:", dimensions);

    const setupCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      
      // Set canvas size
      canvas.width = dimensions.width * dpr;
      canvas.height = dimensions.height * dpr;
      
      // Set CSS size
      canvas.style.width = dimensions.width + 'px';
      canvas.style.height = dimensions.height + 'px';
      
      // Scale context
      ctx.scale(dpr, dpr);
      
      // Ensure canvas is visible
      canvas.style.display = 'block';
      canvas.style.visibility = 'visible';
      canvas.style.opacity = '1';
      canvas.style.background = 'transparent';
      
      console.log("🖼️ Canvas setup complete:", { 
        canvasWidth: canvas.width, 
        canvasHeight: canvas.height,
        cssWidth: canvas.style.width,
        cssHeight: canvas.style.height,
        dpr 
      });
    };

    setupCanvas();

    // Create particles with better visibility
    const createParticles = () => {
      const particles: Particle[] = [];
      const numParticles = Math.max(30, Math.floor((dimensions.width * dimensions.height) / 8000));
      
      for (let i = 0; i < numParticles; i++) {
        const baseOpacity = Math.random() * 0.4 + 0.3; // 0.3 to 0.7
        particles.push({
          x: Math.random() * dimensions.width,
          y: Math.random() * dimensions.height,
          vx: (Math.random() - 0.5) * 1.5, // Slightly faster
          vy: (Math.random() - 0.5) * 1.5,
          size: Math.random() * 2.5 + 1.5, // Larger: 1.5 to 4px
          opacity: baseOpacity,
          baseOpacity: baseOpacity
        });
      }
      
      console.log("🎯 Created", particles.length, "particles");
      return particles;
    };

    particlesRef.current = createParticles();

    // Animation loop with better performance
    let animationId: number;
    const animate = () => {
      if (!ctx || !canvas) return;
      
      // Clear with proper dimensions
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);

      // Draw particles with enhanced visibility
      particlesRef.current.forEach((particle, i) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off edges
        if (particle.x < 0 || particle.x > dimensions.width) {
          particle.vx *= -0.9; // Add some damping
          particle.x = Math.max(0, Math.min(dimensions.width, particle.x));
        }
        if (particle.y < 0 || particle.y > dimensions.height) {
          particle.vy *= -0.9;
          particle.y = Math.max(0, Math.min(dimensions.height, particle.y));
        }

        // Animate opacity for twinkling effect
        particle.opacity = particle.baseOpacity + Math.sin(Date.now() * 0.001 + i) * 0.2;

        // Draw particle with multiple colors for better visibility
        ctx.save();
        
        // Main particle - use darker color for better contrast
        ctx.globalAlpha = particle.opacity;
        ctx.fillStyle = '#1e40af'; // Darker blue
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Inner glow
        ctx.globalAlpha = particle.opacity * 0.6;
        ctx.fillStyle = '#3b82f6'; // Medium blue
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 0.7, 0, Math.PI * 2);
        ctx.fill();
        
        // Outer glow
        ctx.globalAlpha = particle.opacity * 0.3;
        ctx.fillStyle = '#60a5fa'; // Light blue
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 1.5, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();

        // Draw connections with better visibility
        particlesRef.current.slice(i + 1, i + 6).forEach((otherParticle) => { // Limit connections
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) { // Shorter connection distance
            ctx.save();
            ctx.strokeStyle = '#1e40af'; // Darker blue for lines
            ctx.globalAlpha = (0.6 * (1 - distance / 100)) * Math.min(particle.opacity, otherParticle.opacity);
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
            ctx.restore();
          }
        });
      });

      animationId = requestAnimationFrame(animate);
    };

    // Start animation after a short delay
    const startDelay = setTimeout(() => {
      console.log("🚀 Starting particles animation...");
      setCanvasReady(true);
      animate();
    }, 200);

    // Cleanup
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      clearTimeout(startDelay);
      console.log("🧹 BackgroundParticles cleanup completed");
    };
  }, [mounted, dimensions]);

  // Handle window resize
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  if (!mounted) {
    console.log("⏳ BackgroundParticles waiting for mount...");
    return null;
  }

  return (
    <>
      {/* Debug info */}
      <div 
        style={{
          position: 'fixed',
          top: '10px',
          right: '10px',
          background: 'rgba(0,0,0,0.7)',
          color: 'white',
          padding: '5px',
          fontSize: '12px',
          zIndex: 1000,
          borderRadius: '4px',
          display: process.env.NODE_ENV === 'development' ? 'block' : 'none'
        }}
      >
        Particles: {mounted ? 'Mounted' : 'Not Mounted'} | 
        Canvas: {canvasReady ? 'Ready' : 'Loading'} |
        Count: {particlesRef.current.length}
      </div>

      <div 
        className="particles-container"
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
    </>
  );
};

export default BackgroundParticles;