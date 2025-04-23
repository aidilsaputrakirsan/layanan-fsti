"use client";
import { useEffect, useState } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import type { Container, Engine } from "tsparticles-engine";

const BackgroundParticles = () => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    
    if (typeof window !== "undefined") {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) {
        localStorage.setItem("disable-particles", "true");
      }
    }
  }, []);

  const isDisabled = typeof localStorage !== "undefined" 
    ? localStorage.getItem("disable-particles") === "true" 
    : false;

  const particlesInit = async (engine: Engine) => {
    await loadFull(engine);
  };

  const particlesLoaded = async (container: Container | undefined) => {
    console.log("Particles loaded");
  };

  if (!mounted || isDisabled) return null;

  return (
    <Particles
      id="tsparticles"
      className="fixed inset-0 z-0"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        background: {
          color: {
            value: "transparent",
          },
        },
        fpsLimit: 60,
        particles: {
          color: {
            value: "#2f4dd3", // Warna brand utama
          },
          links: {
            color: "#2f4dd3",
            distance: 100,
            enable: true,
            opacity: 0.2,
            width: 1,
            triangles: {
              enable: true,
              opacity: 0.05,
            },
          },
          collisions: {
            enable: false,
          },
          move: {
            enable: true,
            speed: 0.3, // Sangat lambat untuk efek grid yang halus
            direction: "none",
            random: false,
            straight: false,
            outModes: {
              default: "out",
            },
          },
          number: {
            density: {
              enable: true,
              area: 900,
            },
            value: 60, // Banyak titik untuk grid
          },
          opacity: {
            value: 0.4,
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 1, max: 3 },
          },
        },
        detectRetina: true,
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "grab", // Efek grab saat hover
              parallax: {
                enable: true,
                force: 60,
                smooth: 10
              }
            },
            onClick: {
              enable: true,
              mode: "repulse", // Efek repulse saat click
            },
          },
          modes: {
            grab: {
              distance: 200,
              links: {
                opacity: 0.5,
              },
            },
            repulse: {
              distance: 150,
              duration: 0.4,
            },
          },
        },
      }}
    />
  );
};

export default BackgroundParticles;