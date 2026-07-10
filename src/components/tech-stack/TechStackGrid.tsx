// src/components/tech-stack/TechStackGrid.tsx
"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import { techStack, CATEGORY_ORDER, groupByCategory } from "@/lib/data/tech-stack";

export default function TechStackGrid() {
  const grouped = groupByCategory(techStack);

  return (
    <section className="py-24">
      <Container className="flex flex-col gap-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-3"
        >
          <p className="font-body text-sm font-medium uppercase tracking-widest text-accent">
            Tech Stack
          </p>
          <h2 className="font-display text-3xl italic text-foreground sm:text-4xl">
            Tools I reach for
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORY_ORDER.map((category, index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="flex flex-col gap-4"
            >
              <h3 className="font-body text-sm font-semibold uppercase tracking-widest text-muted">
                {category}
              </h3>
              <ul className="flex flex-col gap-2">
                {grouped[category].map((item) => (
                  <li
                    key={item.name}
                    className="rounded-lg border border-border px-4 py-2 font-body text-sm text-foreground"
                  >
                    {item.name}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}