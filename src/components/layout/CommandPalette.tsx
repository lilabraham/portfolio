"use client";

import { useEffect, useMemo, useState, useRef, type KeyboardEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HomeIcon, AboutIcon, ProjectsIcon, GithubIcon, LinkedinIcon, InstagramIcon, EmailIcon } from "@/components/ui/icons";
import { useTransitionNavigate } from "./PageTransition";
import { useCommandPalette } from "@/context/CommandPaletteContext";
import { NAV_LINKS } from "@/lib/data/nav";
import { socialLinks } from "@/lib/data/social";

interface PaletteItem {
  id: string;
  label: string;
  hint: string;
  icon: React.ReactNode;
  action: () => void;
}

const NAV_ICONS: Record<string, React.ReactNode> = {
  "/": <HomeIcon className="h-4 w-4" />,
  "/about": <AboutIcon className="h-4 w-4" />,
  "/projects": <ProjectsIcon className="h-4 w-4" />,
};

const SOCIAL_ICONS: Record<string, React.ReactNode> = {
  github: <GithubIcon className="h-4 w-4" />,
  linkedin: <LinkedinIcon className="h-4 w-4" />,
  instagram: <InstagramIcon className="h-4 w-4" />,
  email: <EmailIcon className="h-4 w-4" />,
};

export default function CommandPalette() {
  const { isOpen, close: closeContext, toggle } = useCommandPalette();
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useTransitionNavigate();

  const items: PaletteItem[] = useMemo(() => {
    const navItems: PaletteItem[] = NAV_LINKS.map((link) => ({
      id: `nav-${link.href}`,
      label: link.label,
      hint: "Go to page",
      icon: NAV_ICONS[link.href] ?? <ProjectsIcon className="h-4 w-4" />,
      action: () => navigate(link.href),
    }));

    const socialItems: PaletteItem[] = socialLinks.map((social) => ({
      id: `social-${social.icon}`,
      label: social.label,
      hint: social.external ? "Open link" : "Send email",
      icon: SOCIAL_ICONS[social.icon] ?? <ProjectsIcon className="h-4 w-4" />,
      action: () => {
        window.open(social.href, social.external ? "_blank" : "_self");
      },
    }));

    return [...navItems, ...socialItems];
  }, [navigate]);

  const filtered = useMemo(() => {
    if (!query.trim()) return items;
    const q = query.toLowerCase();
    return items.filter((item) => item.label.toLowerCase().includes(q));
  }, [items, query]);

  const close = () => {
    closeContext();
    setQuery("");
    setActiveIndex(0);
  };

  useEffect(() => {
    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().includes("MAC");
      const modifierPressed = isMac ? e.metaKey : e.ctrlKey;

      if (modifierPressed && e.key.toLowerCase() === "k") {
        e.preventDefault();
        toggle();
      }
      if (e.key === "Escape") {
        close();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      requestAnimationFrame(() => inputRef.current?.focus());
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % filtered.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const selected = filtered[activeIndex];
      if (selected) {
        selected.action();
        close();
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={close}
          className="fixed inset-0 z-[400] flex items-start justify-center bg-background/80 px-4 pt-[15vh] backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg overflow-hidden rounded-xl border border-border bg-background shadow-2xl"
          >
            <div className="flex items-center gap-2 border-b border-border px-4 py-3">
              <span className="font-mono text-sm text-accent">$</span>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleInputKeyDown}
                placeholder="Type a command or search..."
                className="flex-1 bg-transparent font-mono text-sm text-foreground placeholder:text-muted focus:outline-none"
              />
              <kbd className="rounded border border-border px-1.5 py-0.5 font-mono text-[10px] text-muted">
                ESC
              </kbd>
            </div>

            <motion.ul
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.04, delayChildren: 0.05 } },
                hidden: {},
              }}
              className="max-h-80 overflow-y-auto py-2"
            >
              {filtered.length === 0 ? (
                <li className="px-4 py-6 text-center font-mono text-sm text-muted">
                  No results found.
                </li>
              ) : (
                filtered.map((item, index) => (
                  <motion.li
                    key={item.id}
                    variants={{
                      hidden: { opacity: 0, y: 8 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <button
                      onClick={() => {
                        item.action();
                        close();
                      }}
                      onMouseEnter={() => setActiveIndex(index)}
                      className={`flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left font-body text-sm transition-colors ${
                        index === activeIndex
                          ? "bg-border/40 text-foreground"
                          : "text-muted hover:bg-border/20"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <span className="text-accent">{item.icon}</span>
                        {item.label}
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
                        {item.hint}
                      </span>
                    </button>
                  </motion.li>
                ))
              )}
            </motion.ul>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}