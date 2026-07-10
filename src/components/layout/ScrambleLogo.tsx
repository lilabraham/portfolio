// AFTER
"use client";

import { useEffect, useState, useRef } from "react";

const CHARS = "!<>-_\\/[]{}—=+*^?#";
const TARGET = "-Iqroh-";
const LOOP_PAUSE_MS = 3000;

export default function ScrambleLogo() {
  const [display, setDisplay] = useState(TARGET);
  const frameRef = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scramble = (loop: boolean) => {
    if (intervalRef.current) return;
    frameRef.current = 0;

    intervalRef.current = setInterval(() => {
      frameRef.current += 1;

      setDisplay(
        TARGET.split("")
          .map((char, index) => {
            if (char === "-") return char;
            const revealThreshold = index * 4;
            if (frameRef.current > revealThreshold) return char;
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      if (frameRef.current > TARGET.length * 4 + 6) {
        setDisplay(TARGET);
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = null;

        if (loop) {
          timeoutRef.current = setTimeout(() => scramble(true), LOOP_PAUSE_MS);
        }
      }
    }, 70);
  };

  useEffect(() => {
    scramble(true);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleHover = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    scramble(true);
  };

  return (
    <span
      onMouseEnter={handleHover}
      className="inline-block min-w-[6ch] font-mono tracking-tight"
    >
      {display}
    </span>
  );
}