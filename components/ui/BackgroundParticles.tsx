"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import type { Container, Engine } from "tsparticles-engine";
import { loadSlim } from "tsparticles-slim"; // Gunakan slim version untuk performa lebih baik

// Dynamic import untuk lazy-loading
const Particles = dynamic(() => import("react-tsparticles"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-dark-bg"></div>
});

const BackgroundParticles = () => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    // Deteksi perangkat lemah
    if (typeof window !== "undefined") {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) {
        localStorage.setItem("disable-particles", "true");
      }
    }
  }, []);

  // Periksa apakah dinonaktifkan
  const isDisabled = typeof localStorage !== "undefined" 
    ? localStorage.getItem("disable-particles") === "true" 
    : false;

  // Inisialisasi dengan loadSlim
  const particlesInit = async (engine: Engine) => {
    await loadSlim(engine);
  };

  // Callback after particles loaded
  const particlesLoaded = async (container: Container | undefined) => {
    // Optional: do something after loading
  };

  if (!mounted || isDisabled) return null;

  return (
    <Particles
      id="tsparticles"
      className="fixed inset-0 -z-10"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        background: {
          color: {
            value: "transparent",
          },
        },
        fpsLimit: 30,
        particles: {
          number: {
            value: 15,
            density: {
              enable: true,
              value_area: 800,
            },
          },
          color: {
            value: "#5978ff",
          },
          shape: {
            type: "circle",
          },
          opacity: {
            value: 0.3,
            random: true,
          },
          size: {
            value: 3,
            random: true,
          },
          move: {
            enable: true,
            speed: 0.5,
            random: true,
            direction: "none",
            outModes: {
              default: "out",
            },
          },
        },
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "bubble",
            },
          },
          modes: {
            bubble: {
              distance: 150,
              size: 6,
              duration: 2,
              opacity: 0.5,
            },
          },
        },
        detectRetina: false,
      }}
    />
  );
};

export default BackgroundParticles;