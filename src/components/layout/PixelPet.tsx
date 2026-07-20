"use client";

import { useEffect, useRef } from "react";
import { useToast } from "@/components/layout/ToastContext";

const PIXEL_SIZE = 4;
const GRID = 8;
const PET_SIZE = PIXEL_SIZE * GRID;

const PET_QUOTES = [
  "Still compiling my thoughts...",
  "404: motivation not found. jk, found it.",
  "I run on curiosity and cold coffee.",
  "Half of what I build starts as 'what if'.",
  "Beep boop. Just vibing.",
  "Currently debugging my own existence.",
];

type PixelColor = "body" | "eye" | "shadow";

interface Pixel {
  x: number;
  y: number;
  color: PixelColor;
}

const PET_MAP: Pixel[] = [
  { x: 2, y: 0, color: "body" }, { x: 3, y: 0, color: "body" }, { x: 4, y: 0, color: "body" }, { x: 5, y: 0, color: "body" },
  { x: 1, y: 1, color: "body" }, { x: 2, y: 1, color: "body" }, { x: 3, y: 1, color: "body" }, { x: 4, y: 1, color: "body" }, { x: 5, y: 1, color: "body" }, { x: 6, y: 1, color: "body" },
  { x: 1, y: 2, color: "body" }, { x: 2, y: 2, color: "eye" }, { x: 3, y: 2, color: "body" }, { x: 4, y: 2, color: "body" }, { x: 5, y: 2, color: "eye" }, { x: 6, y: 2, color: "body" },
  { x: 0, y: 3, color: "body" }, { x: 1, y: 3, color: "body" }, { x: 2, y: 3, color: "body" }, { x: 3, y: 3, color: "body" }, { x: 4, y: 3, color: "body" }, { x: 5, y: 3, color: "body" }, { x: 6, y: 3, color: "body" }, { x: 7, y: 3, color: "body" },
  { x: 0, y: 4, color: "body" }, { x: 1, y: 4, color: "body" }, { x: 2, y: 4, color: "body" }, { x: 3, y: 4, color: "body" }, { x: 4, y: 4, color: "body" }, { x: 5, y: 4, color: "body" }, { x: 6, y: 4, color: "body" }, { x: 7, y: 4, color: "body" },
  { x: 1, y: 5, color: "body" }, { x: 2, y: 5, color: "body" }, { x: 3, y: 5, color: "body" }, { x: 4, y: 5, color: "body" }, { x: 5, y: 5, color: "body" }, { x: 6, y: 5, color: "body" },
  { x: 1, y: 6, color: "body" }, { x: 2, y: 6, color: "body" }, { x: 5, y: 6, color: "body" }, { x: 6, y: 6, color: "body" },
  { x: 1, y: 7, color: "shadow" }, { x: 2, y: 7, color: "shadow" }, { x: 5, y: 7, color: "shadow" }, { x: 6, y: 7, color: "shadow" },
];

const SPEED = 40; // px/sec
const TOP_MARGIN = 90; // clear the sticky navbar
const SIDE_MARGIN = 20;
const BOTTOM_MARGIN = 40;

export default function PixelPet() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const { showToast } = useToast();

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const body = bodyRef.current;
    if (!wrapper || !body) return;

    let x = SIDE_MARGIN + Math.random() * (window.innerWidth - PET_SIZE - SIDE_MARGIN * 2);
    let y = TOP_MARGIN + Math.random() * (window.innerHeight - PET_SIZE - TOP_MARGIN - BOTTOM_MARGIN);
    let targetX = x;
    let targetY = y;
    let facing = 1;
    let isPaused = false;
    let pauseUntil = 0;
    let bobPhase = 0;
    let rafId: number;
    let lastTime = performance.now();

    const pickNewTarget = () => {
      targetX = SIDE_MARGIN + Math.random() * (window.innerWidth - PET_SIZE - SIDE_MARGIN * 2);
      targetY = TOP_MARGIN + Math.random() * (window.innerHeight - PET_SIZE - TOP_MARGIN - BOTTOM_MARGIN);
    };

    const tick = (time: number) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      if (document.hidden) {
        rafId = requestAnimationFrame(tick);
        return;
      }

      let bobOffset = 0;

      if (isPaused) {
        if (time >= pauseUntil) {
          isPaused = false;
          pickNewTarget();
        }
      } else {
        const dx = targetX - x;
        const dy = targetY - y;
        const dist = Math.hypot(dx, dy);

        if (dist < 2) {
          isPaused = true;
          pauseUntil = time + 1000 + Math.random() * 2500;
        } else {
          const step = SPEED * dt;
          x += (dx / dist) * step;
          y += (dy / dist) * step;
          if (Math.abs(dx) > 1) facing = dx > 0 ? 1 : -1;
          bobPhase += dt * 10;
          bobOffset = Math.abs(Math.sin(bobPhase)) * -3;
        }
      }

      wrapper.style.transform = `translate(${x}px, ${y}px)`;
      body.style.transform = `scaleX(${facing}) translateY(${bobOffset}px)`;

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    const handleResize = () => {
      x = Math.min(x, window.innerWidth - PET_SIZE - SIDE_MARGIN);
      y = Math.min(y, window.innerHeight - PET_SIZE - BOTTOM_MARGIN);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleClick = () => {
    const body = bodyRef.current;
    if (body) {
      body.classList.remove("pet-jump");
      void body.offsetWidth;
      body.classList.add("pet-jump");
    }
    const quote = PET_QUOTES[Math.floor(Math.random() * PET_QUOTES.length)];
    showToast(quote);
  };

  return (
    <div ref={wrapperRef} className="pointer-events-none fixed left-0 top-0 z-[150]" style={{ willChange: "transform" }}>
      <div
        ref={bodyRef}
        onClick={handleClick}
        className="relative cursor-pointer pointer-events-auto"
        style={{ width: PET_SIZE, height: PET_SIZE }}
      >
        {PET_MAP.map((pixel, i) => (
          <span
            key={i}
            className={
              pixel.color === "body"
                ? "absolute bg-accent"
                : pixel.color === "eye"
                ? "absolute bg-background"
                : "absolute bg-foreground/20"
            }
            style={{
              width: PIXEL_SIZE,
              height: PIXEL_SIZE,
              left: pixel.x * PIXEL_SIZE,
              top: pixel.y * PIXEL_SIZE,
            }}
          />
        ))}
      </div>
    </div>
  );
}