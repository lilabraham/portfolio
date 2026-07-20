// src/components/contact/ContactSection.tsx
"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { profile } from "@/lib/data/profile";
import { CopyIcon } from "@/components/ui/icons";
import { useToast } from "@/components/layout/ToastContext";

export default function ContactSection() {
  const { showToast } = useToast();

  const handleCopyEmail = async () => {
    await navigator.clipboard.writeText(profile.email);
    showToast("Email copied to clipboard ✓");
  };

  return (
    <section className="py-24">
      <Container className="flex flex-col items-center gap-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-body text-sm font-medium uppercase tracking-widest text-accent"
        >
          Get In Touch
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="max-w-2xl font-display text-3xl italic leading-tight text-foreground sm:text-4xl"
        >
          Have a project in mind? Let&apos;s build something worth using.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-4 flex flex-wrap justify-center gap-4"
        >
          <div className="flex items-center gap-2">
            <Button href={`mailto:${profile.email}`} variant="primary">
              Email Me
            </Button>
            <button
              type="button"
              aria-label="Copy email to clipboard"
              onClick={handleCopyEmail}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-accent hover:text-accent"
            >
              <CopyIcon className="h-4 w-4" />
            </button>
          </div>
          {profile.whatsapp ? (
            <Button
              href={`https://wa.me/${profile.whatsapp.replace(/[^0-9]/g, "")}`}
              external
              variant="secondary"
            >
              WhatsApp
            </Button>
          ) : null}
        </motion.div>
      </Container>
    </section>
  );
}