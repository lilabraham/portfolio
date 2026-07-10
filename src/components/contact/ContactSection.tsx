// src/components/contact/ContactSection.tsx
"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { profile } from "@/lib/data/profile";

export default function ContactSection() {
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
          <Button href={`mailto:${profile.email}`} variant="primary">
            Email Me
          </Button>
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