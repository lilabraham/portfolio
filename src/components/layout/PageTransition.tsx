"use client";

import { createContext, useContext, useRef, useState, type ReactNode } from "react";
import { motion, useAnimation } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { NAV_LINKS } from "@/lib/data/nav";

interface TransitionContextValue {
  navigate: (href: string) => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
}

const TransitionContext = createContext<TransitionContextValue | null>(null);

export function useTransitionNavigate() {
  const ctx = useContext(TransitionContext);
  if (!ctx) throw new Error("useTransitionNavigate must be used within PageTransition");
  return ctx.navigate;
}

export function useMenuState() {
  const ctx = useContext(TransitionContext);
  if (!ctx) throw new Error("useMenuState must be used within PageTransition");
  return { isMenuOpen: ctx.isMenuOpen, setIsMenuOpen: ctx.setIsMenuOpen };
}

const EASE = [0.65, 0, 0.35, 1] as const;

function getNavIndex(pathname: string): number {
  const index = NAV_LINKS.findIndex((link) => link.href === pathname);
  return index === -1 ? 0 : index;
}

export default function PageTransition({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const controls = useAnimation();
  const isAnimating = useRef(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = (href: string) => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    const isForward = getNavIndex(href) >= getNavIndex(pathname);
    const closeFrom = isForward ? "100%" : "-100%";
    const openTo = isForward ? "-100%" : "100%";

    (async () => {
      controls.set({ x: closeFrom });
      await controls.start({ x: "0%", transition: { duration: 0.7, ease: EASE } });
      router.push(href);
      await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
      controls.set({ x: "0%" });
      await new Promise((r) => setTimeout(r, 250));
      await controls.start({ x: openTo, transition: { duration: 0.7, ease: EASE } });
      controls.set({ x: closeFrom });
      isAnimating.current = false;
    })();
  };

  return (
    <TransitionContext.Provider value={{ navigate, isMenuOpen, setIsMenuOpen }}>
      <motion.div
        initial={{ x: "100%" }}
        animate={controls}
        className="pointer-events-none fixed inset-0 z-[100] bg-background"
      >
        <div className="absolute inset-y-0 left-0 w-0.5 bg-accent" />
      </motion.div>
      {children}
    </TransitionContext.Provider>
  );
}