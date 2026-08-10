"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import { profile } from "@/lib/data/profile";

export default function AboutCTA() {
  return (
    <section className="py-16">
      <Container>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-body text-sm text-muted"
        >
          Like what you see?{" "}
          <a
            href={`mailto:${profile.email}`}
            className="font-semibold text-foreground transition-colors hover:text-accent"
          >
            Get in touch →
          </a>
        </motion.p>
      </Container>
    </section>
  );
}