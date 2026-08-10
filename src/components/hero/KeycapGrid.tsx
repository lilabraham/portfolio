"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const ROW_CHARS = ["1234567890", "QWERTYUIOP", "ASDFGHJKL;", "ZXCVBNM,./"];
const TYPE_SEQUENCE = ["I", "Q", "R", "O", "H"];
const HIGHLIGHT = new Set(TYPE_SEQUENCE);
const TECH_LABELS: Record<string, string> = {
  I: "TypeScript",
  Q: "Next.js",
  R: "React",
  O: "CodeIgniter",
  H: "Flutter",
};
const KEY_SIZE = 76;
const GAP = 14;
const TYPE_INTERVAL_MS = 400;
const LOOP_PAUSE_MS = 1800;

export default function KeycapGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const keyRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [pressedIndex, setPressedIndex] = useState<number | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Skip mouse-proximity animation on touch devices
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice) return;

    let mouseX = -1000;
    let mouseY = -1000;
    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const animate = () => {
      keyRefs.current.forEach((el) => {
        if (!el) return;
        const kx = el.offsetLeft + el.offsetWidth / 2;
        const ky = el.offsetTop + el.offsetHeight / 2;
        const dist = Math.hypot(kx - mouseX, ky - mouseY);
        const radius = 130;
        const strength = Math.max(0, 1 - dist / radius);
        const lift = strength * 10;
        el.style.setProperty("--lift", `${-lift}px`);
      });
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    const allChars = ROW_CHARS.join("");
    const sequenceIndices = TYPE_SEQUENCE.map((char) => allChars.indexOf(char));

    let step = 0;
    let timeoutId: ReturnType<typeof setTimeout>;

    const typeNext = () => {
      const idx = sequenceIndices[step];
      setPressedIndex(idx);
      setTimeout(() => setPressedIndex(null), 140);

      step += 1;
      if (step < sequenceIndices.length) {
        timeoutId = setTimeout(typeNext, TYPE_INTERVAL_MS);
      } else {
        step = 0;
        timeoutId = setTimeout(typeNext, LOOP_PAUSE_MS);
      }
    };

    timeoutId = setTimeout(typeNext, LOOP_PAUSE_MS);
    return () => clearTimeout(timeoutId);
  }, []);

  let keyIndex = 0;

  return (
    <div style={{ perspective: "900px", perspectiveOrigin: "50% 30%" }}>
      <div
        ref={containerRef}
        className="flex flex-col"
        style={{
          gap: GAP,
          transform: "rotateX(52deg) rotateZ(-8deg)",
          transformStyle: "preserve-3d",
        }}
      >
        {ROW_CHARS.map((row, rowIndex) => (
          <div key={rowIndex} className="flex" style={{ gap: GAP }}>
            {row.split("").map((char) => {
              const isHighlight = HIGHLIGHT.has(char);
              const idx = keyIndex++;
              const isPressed = pressedIndex === idx;

              return (
                <div
                  key={char + idx}
                  ref={(el) => {
                    keyRefs.current[idx] = el;
                  }}
                  className={
                    "relative flex items-center justify-center font-mono text-sm font-semibold " +
                    (isHighlight && !isPressed ? "keycap-glow" : "")
                  }
                  style={{
                    width: KEY_SIZE,
                    height: KEY_SIZE,
                    transformStyle: "preserve-3d",
                    transform: isPressed
                      ? "translateZ(36px) translateY(calc(var(--lift, 0px) - 24px)) scale(1.18)"
                      : "translateZ(8px) translateY(var(--lift, 0px)) scale(1)",
                    transition: isPressed
                      ? "transform 0.08s ease-out, background 0.08s, box-shadow 0.08s"
                      : "transform 0.25s ease-in, background 0.2s, box-shadow 0.2s",
                    borderRadius: 8,
                    background: isPressed
                      ? "var(--color-accent)"
                      : "linear-gradient(160deg, color-mix(in srgb, var(--color-background) 85%, white) 0%, var(--color-background) 55%)",
                    color: isPressed
                      ? "var(--color-background)"
                      : isHighlight
                        ? "var(--color-accent)"
                        : "var(--color-foreground)",
                    border: `1.5px solid ${isHighlight || isPressed ? "var(--color-accent)" : "var(--color-border)"}`,
                    boxShadow: isPressed
                      ? "inset 0 1px 0 rgba(255,255,255,0.15), inset 0 -2px 3px rgba(0,0,0,0.25), 0 0 24px rgba(168, 85, 247, 0.8), 0 12px 0 var(--color-border), 0 16px 20px rgba(0,0,0,0.45)"
                      : "inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -3px 4px rgba(0,0,0,0.35), 0 6px 0 var(--color-border), 0 8px 12px rgba(0,0,0,0.35)",
                  }}
                >
                  {char}
                  {isHighlight && (
                    <span
                      className="pointer-events-none absolute whitespace-nowrap rounded-full border border-accent/40 bg-background px-2 py-0.5 font-mono text-[10px] text-accent"
                      style={{
                        top: "-2.2rem",
                        left: "50%",
                        transform: `translateX(-50%) translateZ(40px) rotateZ(8deg) rotateX(-52deg) scale(${isPressed ? 1 : 0.85})`,
                        opacity: isPressed ? 1 : 0,
                        transition: "opacity 0.2s ease, transform 0.2s ease",
                      }}
                    >
                      {TECH_LABELS[char]}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}