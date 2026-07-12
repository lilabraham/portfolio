"use client";

import { useEffect, useRef } from "react";

const COLOR_VARS = ["--color-accent", "--color-success", "--color-warning", "--color-info", "--color-special"];
const PARTICLE_COUNT = 22;
const GLYPHS = ["</>", "{}", ";", "#", "()", "=>", "[]", "$"];

interface Particle {
  x: number;
  y: number;
  size: number;
  speed: number;
  depth: number;
  opacity: number;
  color: string;
  glyph: string;
  rotation: number;
}

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const root = getComputedStyle(document.documentElement);
    const colors = COLOR_VARS.map((v) => root.getPropertyValue(v).trim()).filter(Boolean);
    if (colors.length === 0) colors.push("#a855f7");

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let mouseX = 0;
    let mouseY = 0;
    let rafId: number;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      width = parent.offsetWidth;
      height = parent.offsetHeight;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      particles = Array.from({ length: PARTICLE_COUNT }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 10 + 16,
        speed: Math.random() * 0.25 + 0.08,
        depth: Math.random() * 0.6 + 0.2,
        opacity: Math.random() * 0.18 + 0.14,
        color: colors[Math.floor(Math.random() * colors.length)],
        glyph: GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
        rotation: (Math.random() - 0.5) * 0.3,
      }));
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;
      mouseX = (e.clientX - rect.left - width / 2) / width;
      mouseY = (e.clientY - rect.top - height / 2) / height;
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.y += p.speed;
        if (p.y > height) {
          p.y = -10;
          p.x = Math.random() * width;
        }
        const px = p.x + mouseX * 20 * p.depth;
        const py = p.y + mouseY * 20 * p.depth;
        ctx.save();
        ctx.translate(px, py);
        ctx.rotate(p.rotation);
        ctx.font = `${p.size}px var(--font-mono, monospace)`;
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(p.glyph, 0, 0);
        ctx.restore();
      });
      ctx.globalAlpha = 1;
      rafId = requestAnimationFrame(draw);
    };

    const handleVisibility = () => {
      cancelAnimationFrame(rafId);
      if (!document.hidden) rafId = requestAnimationFrame(draw);
    };

    resize();
    rafId = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 z-0" aria-hidden="true" />;
}