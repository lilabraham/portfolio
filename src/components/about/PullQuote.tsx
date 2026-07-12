// src/components/about/PullQuote.tsx
"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";

export default function PullQuote() {
    return (
        <section className="py-20">
            <Container>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="max-w-3xl font-display text-3xl italic leading-snug text-foreground sm:text-4xl md:text-5xl"
                >
                    Half of what I build{" "}
                    <span className="text-accent">starts because I wanted to know if it was possible.</span>
                </motion.p>
            </Container>
        </section>
    );
}