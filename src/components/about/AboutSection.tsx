"use client";

import { useState } from "react";
import CVComingSoonModal from "./CVComingSoonModal";
import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import TerminalCard from "./TerminalCard";

export default function AboutSection() {
  const [showCVModal, setShowCVModal] = useState(false);

  return (
    <section className="py-24">
      <Container className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div className="flex flex-col gap-6">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-body text-sm font-medium uppercase tracking-widest text-accent"
          >
            About
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-3xl italic text-foreground sm:text-4xl"
          >
            A bit about how I work
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-xl font-body text-base leading-relaxed text-muted"
          >
            I&apos;m a freelance full-stack developer and data analyst based in
            Central Java, Indonesia. I care more about software that actually
            gets used than software that just ships — which shapes how I
            approach every project, from enterprise dashboards to research
            instruments for public health education.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <button
              onClick={() => setShowCVModal(true)}
              className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 font-body text-sm text-foreground transition-colors hover:border-accent"
            >
              View CV
            </button>
          </motion.div>

          <CVComingSoonModal isOpen={showCVModal} onClose={() => setShowCVModal(false)} />
        </div>

        <TerminalCard />
      </Container>
    </section>
  );
}