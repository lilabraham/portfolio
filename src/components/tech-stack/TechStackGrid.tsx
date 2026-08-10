"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import { techStack, CATEGORY_ORDER, groupByCategory } from "@/lib/data/tech-stack";
import { TECH_ICON_MAP, CATEGORY_COLOR } from "@/lib/data/tech-icons";

export default function TechStackGrid() {
  const grouped = groupByCategory(techStack);

  return (
    <section className="py-16">
      <Container className="flex flex-col gap-10">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-display text-2xl italic text-foreground sm:text-3xl"
        >
          Tech Stack
        </motion.h2>

        <div className="flex flex-col gap-8">
          {CATEGORY_ORDER.map((category) => {
            const items = grouped[category];
            if (items.length === 0) return null;
            const color = CATEGORY_COLOR[category];

            return (
              <div key={category} className="flex flex-col gap-3">
                <p
                  className="font-body text-xs font-semibold uppercase tracking-widest"
                  style={{ color }}
                >
                  {category}
                </p>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {items.map((item, index) => {
                    const icons = TECH_ICON_MAP[item.name] ?? [];
                    return (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                        className="flex min-w-0 items-center gap-3 rounded-xl border border-border p-3"
                      >
                        <div className="flex shrink-0 items-center gap-1" style={{ color }}>
                          {icons.map((Icon, i) => (
                            <Icon key={i} className="h-5 w-5 shrink-0" />
                          ))}
                        </div>
                        <span className="min-w-0 flex-1 truncate font-body text-sm text-foreground">
                          {item.name}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}