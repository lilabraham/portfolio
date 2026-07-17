"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Container from "@/components/ui/Container";
import { socialLinks, type SocialIconName } from "@/lib/data/social";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/lib/data/nav";
import ScrambleLogo from "@/components/layout/ScrambleLogo"; import { EmailIcon, GithubIcon, InstagramIcon, LinkedinIcon } from "@/components/ui/icons";
import { useTransitionNavigate, useMenuState } from "@/components/layout/PageTransition";
import { useCommandPalette } from "@/components/layout/CommandPaletteContext";

const ICON_MAP: Record<SocialIconName, typeof EmailIcon> = {
  email: EmailIcon,
  github: GithubIcon,
  linkedin: LinkedinIcon,
  instagram: InstagramIcon,
};

export default function Navbar() {
  const { isMenuOpen: isOpen, setIsMenuOpen: setIsOpen } = useMenuState();
  const navigate = useTransitionNavigate();
  const pathname = usePathname();
  const { open: openPalette } = useCommandPalette();

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsOpen(false);
    if (pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const bar1Class = isOpen
    ? "h-0.5 w-6 bg-foreground transition-transform duration-300 ease-out translate-y-2 rotate-45"
    : "h-0.5 w-6 bg-foreground transition-transform duration-300 ease-out";
  const bar2Class = isOpen
    ? "h-0.5 w-6 bg-foreground transition-opacity duration-200 ease-out opacity-0"
    : "h-0.5 w-6 bg-foreground transition-opacity duration-200 ease-out";
  const bar3Class = isOpen
    ? "h-0.5 w-6 bg-foreground transition-transform duration-300 ease-out -translate-y-2 -rotate-45"
    : "h-0.5 w-6 bg-foreground transition-transform duration-300 ease-out";

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
        <Container as="nav" className="flex items-center justify-between py-4">
          <Link
            href="/"
            onClick={handleLogoClick}
            className="font-display text-lg italic tracking-tight text-foreground"
          >
            <ScrambleLogo />
          </Link>

          <div className="flex items-center gap-3">
            <motion.button
              type="button"
              aria-label="Open command palette"
              onClick={openPalette}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.92 }}
              transition={{ duration: 0.15 }}
              className="hidden items-center gap-2 rounded-full border border-border px-3 py-1.5 text-muted transition-colors hover:border-accent hover:text-accent md:flex"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                className="h-3.5 w-3.5"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" strokeLinecap="round" />
              </svg>
              <kbd className="font-mono text-[11px]">⌘K</kbd>
            </motion.button>

            <button
              type="button"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              onClick={() => setIsOpen(!isOpen)}
              className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full border border-border transition-colors hover:border-accent md:h-12 md:w-12"
            >
              <span className={bar1Class} />
              <span className={bar2Class} />
              <span className={bar3Class} />
            </button>
          </div>
        </Container>
      </header>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
            className="fixed left-0 right-0 top-[73px] bottom-0 z-40 flex flex-col items-center justify-center bg-background"
          >
            <motion.ul
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
                hidden: {},
              }}
              className="flex flex-col items-center gap-6 px-6 md:flex-row md:gap-12"
            >
              {NAV_LINKS.map((link) => (
                <motion.li
                  key={link.href}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.6 }}
                >
                  <motion.div whileTap={{ scale: 0.92 }}>
                    <Link
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        setIsOpen(false);
                        navigate(link.href);
                      }}
                      className="inline-block font-display text-4xl italic text-foreground transition-colors hover:text-accent md:text-6xl"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                </motion.li>
              ))}
            </motion.ul>

            <motion.ul
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-10 flex items-center justify-center gap-6 md:mt-16"
            >
              {socialLinks.map((link) => {
                const Icon = ICON_MAP[link.icon];
                return (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      aria-label={link.label}
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-accent hover:text-accent"
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  </li>
                );
              })}
            </motion.ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}