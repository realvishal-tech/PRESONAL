"use client";

import { useEffect, useRef } from "react";

export const BackgroundVisuals = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }

    let animationFrameId = 0;
    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random(),
      y: Math.random(),
      radius: 1 + Math.random() * 2,
      speed: 0.2 + Math.random() * 0.8,
    }));

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(56,189,248,0.65)";
      particles.forEach((particle) => {
        particle.y -= particle.speed / 1000;
        if (particle.y < 0) {
          particle.y = 1;
          particle.x = Math.random();
        }
        ctx.beginPath();
        ctx.arc(
          particle.x * canvas.width,
          particle.y * canvas.height,
          particle.radius,
          0,
          Math.PI * 2
        );
        ctx.fill();
      });
      animationFrameId = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.2),_transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_rgba(139,92,246,0.25),_transparent_45%)]" />
      <div className="absolute inset-0 bg-grid opacity-40" />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full opacity-50"
      />
    </div>
  );
};
