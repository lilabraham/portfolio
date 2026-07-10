"use client";

import { motion } from "framer-motion";
import { profile } from "@/lib/data/profile";
import ScrollCue from "./ScrollCue";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import KeycapGrid from "./KeycapGrid";

const words = profile.tagline.split(" ");

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.045, delayChildren: 0.2 },
  },
};

const wordVariant = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function Hero() {
  return (
    <section className="relative flex min-h-[calc(100dvh-73px)] flex-col justify-between overflow-hidden px-6 py-16">
      <div className="absolute right-[-4rem] top-0 hidden h-full w-[55%] items-center justify-center lg:flex">
        <KeycapGrid />
      </div>
      <Container className="relative flex flex-1 flex-col justify-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-body text-sm font-medium uppercase tracking-widest text-accent"
        >
          Software Engineer — {profile.location}
        </motion.p>

        <motion.h1
          variants={container}
          initial="hidden"
          animate="visible"
          className="mt-6 max-w-3xl font-display text-4xl italic leading-tight text-foreground sm:text-5xl md:text-6xl"
        >
          {words.map((word, index) => (
            <motion.span
              key={`${word}-${index}`}
              variants={wordVariant}
              className="mr-3 inline-block"
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-10 flex flex-wrap gap-4"
        >
          <Button href="/projects" variant="primary">
            View All Projects
          </Button>
          <Button href={`mailto:${profile.email}`} variant="secondary">
            Get In Touch
          </Button>
        </motion.div>
      </Container>

      <Container className="mt-16 hidden justify-center sm:flex">
        <ScrollCue />
      </Container>
    </section>
  );
}