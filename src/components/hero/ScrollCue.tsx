
"use client";

import { motion } from "framer-motion";

export default function ScrollCue() {
  return (
    <motion.div
      className="flex flex-col items-center gap-2"
      animate={{ y: [0, 8, 0] }}
      transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
    >
      <span className="font-body text-xs uppercase tracking-widest text-muted">
        Scroll
      </span>
      <svg width="16" height="24" viewBox="0 0 16 24" fill="none" aria-hidden="true">
        <path
          d="M8 1V23M8 23L1 16M8 23L15 16"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-muted"
        />
      </svg>
    </motion.div>
  );
}
