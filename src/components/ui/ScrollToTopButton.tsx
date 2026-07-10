"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useMenuState } from "@/components/layout/PageTransition";

const SCROLL_THRESHOLD = 400;

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const { isMenuOpen } = useMenuState();

  useEffect(() => {
    const onScroll = () => setIsVisible(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <AnimatePresence>
      {isVisible && !isMenuOpen ? (
        <motion.button
          type="button"
          aria-label="Back to top"
          onClick={scrollToTop}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background text-foreground shadow-lg transition-colors hover:border-accent hover:text-accent"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
            <path d="M12 19V5" />
            <path d="m5 12 7-7 7 7" />
          </svg>
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}