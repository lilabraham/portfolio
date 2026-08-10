"use client";

import { motion, type Variants } from "framer-motion";
import Container from "@/components/ui/Container";

const CREDENTIALS = [
  "Bachelor of Informatics Engineering, Universitas Muhammadiyah Purwokerto",
  "BNSP-certified Software Engineer",
  "Certified Independent Study graduate (MSIB Batch 7)",
  "Certified English Proficiency",
];

const listVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0 },
};

export default function EducationSection() {
  return (
    <section className="py-16">
      <Container className="flex flex-col gap-6">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative inline-block w-fit font-display text-2xl italic text-foreground sm:text-3xl"
        >
          Education & Certifications
          <motion.span
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{ transformOrigin: "left" }}
            className="absolute -bottom-1 left-0 h-[2px] w-full bg-accent"
          />
        </motion.h2>

        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={listVariants}
          className="flex max-w-2xl flex-col gap-3"
        >
          {CREDENTIALS.map((item) => (
            <motion.li
              key={item}
              variants={itemVariants}
              transition={{ duration: 0.4 }}
              className="flex gap-3 font-body text-sm text-foreground"
            >
              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              {item}
            </motion.li>
          ))}
        </motion.ul>
      </Container>
    </section>
  );
}