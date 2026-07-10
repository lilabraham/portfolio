"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";

interface ExperienceEntry {
  role: string;
  org: string;
  period: string;
  description: string;
}

const EXPERIENCE: ExperienceEntry[] = [
  {
    role: "IT Programmer Intern",
    org: "Abhati Group · Onsite · Contract",
    period: "Jun 2026 – Present",
    description:
      "Working across full-stack web, mobile, desktop, and backend development for internal ERP systems — including Abhati Logistics and Abhati Inventory, both featured in my projects.",
  },
  {
    role: "Freelance Full-Stack Developer",
    org: "Client Projects",
    period: "Mar 2026 – Present",
    description:
      "Building full-stack web apps for clients, including CERITA (an HIV/AIDS education platform) and EternaWed (a digital wedding invitation platform) — both featured in my projects.",
  },
  {
    role: "Backend Developer Intern",
    org: "PT Orbit Ventura Indonesia · Remote · MSIB Batch 7",
    period: "Sep 2024 – Dec 2024",
    description:
      "900-hour AI Developer internship (Certified Independent Study). Built PharmaFusion, an AI-integrated pharmaceutical data management system.",
  },
];

export default function ExperienceSection() {
  return (
    <section className="py-16">
      <Container className="flex flex-col gap-8">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative inline-block w-fit font-display text-2xl italic text-foreground sm:text-3xl"
        >
          Experience
          <motion.span
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{ transformOrigin: "left" }}
            className="absolute -bottom-1 left-0 h-[2px] w-full bg-accent"
          />
        </motion.h2>

        <div className="flex max-w-2xl flex-col gap-8">
          {EXPERIENCE.map((entry, index) => (
            <motion.div
              key={entry.role + entry.period}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -3 }}
              className="group relative flex flex-col gap-1.5 pl-5"
            >
              <motion.span
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 + 0.1 }}
                style={{ transformOrigin: "top" }}
                className="absolute left-0 top-0 h-full w-[2px] bg-border transition-colors duration-200 group-hover:bg-accent"
              />

              <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                <h3 className="font-display text-lg italic text-foreground">{entry.role}</h3>
                <span className="font-body text-xs uppercase tracking-widest text-accent">
                  {entry.period}
                </span>
              </div>
              <p className="font-body text-sm text-muted">{entry.org}</p>
              <p className="mt-1 font-body text-sm leading-relaxed text-muted">
                {entry.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}