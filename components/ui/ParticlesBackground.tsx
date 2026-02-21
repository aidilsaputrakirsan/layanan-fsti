"use client";

import { useCallback, useEffect, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";

const ParticlesBackground = () => {
    const [init, setInit] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    const options: ISourceOptions = {
        fullScreen: false,
        fpsLimit: 60,
        background: {
            color: {
                value: "transparent",
            },
        },
        particles: {
            color: {
                value: ["#6366f1", "#8b5cf6", "#a78bfa", "#c4b5fd", "#93c5fd"],
            },
            links: {
                color: "#c7d2fe",
                distance: 150,
                enable: true,
                opacity: 0.3,
                width: 1,
            },
            move: {
                enable: true,
                speed: 0.8,
                direction: "none" as const,
                random: true,
                straight: false,
                outModes: {
                    default: "bounce" as const,
                },
            },
            number: {
                density: {
                    enable: true,
                    width: 1920,
                    height: 1080,
                },
                value: 50,
            },
            opacity: {
                value: { min: 0.1, max: 0.4 },
                animation: {
                    enable: true,
                    speed: 0.5,
                    sync: false,
                },
            },
            shape: {
                type: "circle",
            },
            size: {
                value: { min: 1, max: 4 },
                animation: {
                    enable: true,
                    speed: 1,
                    sync: false,
                },
            },
        },
        interactivity: {
            events: {
                onHover: {
                    enable: true,
                    mode: "grab",
                },
                onClick: {
                    enable: true,
                    mode: "push",
                },
            },
            modes: {
                grab: {
                    distance: 140,
                    links: {
                        opacity: 0.5,
                    },
                },
                push: {
                    quantity: 2,
                },
            },
        },
        detectRetina: true,
    };

    if (!init) return null;

    return (
        <Particles
            id="tsparticles"
            options={options}
            className="absolute inset-0 z-0"
        />
    );
};

export default ParticlesBackground;
