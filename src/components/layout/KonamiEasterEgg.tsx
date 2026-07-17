"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const KONAMI_SEQUENCE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

const COLOR_VARS = ["--color-accent", "--color-success", "--color-warning", "--color-info", "--color-special"];

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
  life: number;
}

export default function KonamiEasterEgg() {
  const [isTriggered, setIsTriggered] = useState(false);
  const progressRef = useRef(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      const expected = KONAMI_SEQUENCE[progressRef.current];

      if (key === expected) {
        progressRef.current += 1;
        if (progressRef.current === KONAMI_SEQUENCE.length) {
          progressRef.current = 0;
          setIsTriggered(true);
        }
      } else {
        progressRef.current = key === KONAMI_SEQUENCE[0] ? 1 : 0;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (!isTriggered) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = COLOR_VARS.map((v) => getComputedStyle(document.documentElement).getPropertyValue(v).trim());

    const particles: Particle[] = Array.from({ length: 120 }, () => {
      const angle = Math.random() * Math.PI * 2;
      const speed = 4 + Math.random() * 10;
      return {
        x: canvas.width / 2,
        y: canvas.height / 2,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 4,
        size: 6 + Math.random() * 8,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.3,
        life: 1,
      };
    });

    const gravity = 0.25;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let anyAlive = false;
      for (const p of particles) {
        if (p.life <= 0) continue;
        anyAlive = true;

        p.vy += gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;
        p.life -= 0.012;

        ctx.save();
        ctx.globalAlpha = Math.max(p.life, 0);
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        ctx.restore();
      }

      if (anyAlive) {
        animationRef.current = requestAnimationFrame(render);
      }
    };

    render();

    const timeout = setTimeout(() => setIsTriggered(false), 3500);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      clearTimeout(timeout);
    };
  }, [isTriggered]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="pointer-events-none fixed inset-0 z-[600]"
        style={{ display: isTriggered ? "block" : "none" }}
      />
      <AnimatePresence>
        {isTriggered ? (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-8 left-1/2 z-[600] -translate-x-1/2 rounded-xl border border-border bg-background px-6 py-4 shadow-2xl"
          >
            <p className="font-mono text-sm">
              <span className="text-accent">$</span>{" "}
              <span className="text-foreground">cheat --activate</span>
            </p>
            <p className="mt-1 font-mono text-xs text-muted">You found the Konami code. Respect.</p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}