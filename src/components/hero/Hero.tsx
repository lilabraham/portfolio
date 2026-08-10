"use client";

import { motion } from "framer-motion";
import { profile } from "@/lib/data/profile";
import ScrollCue from "./ScrollCue";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import KeycapGrid from "./KeycapGrid";
import Image from "next/image";


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
      {/* Desktop: keycap grid as side element */}
      <div className="absolute right-[-8rem] top-0 hidden h-full w-[55%] items-center justify-center lg:flex">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(var(--color-border) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
            opacity: 0.4,
            maskImage: "radial-gradient(ellipse 60% 60% at 50% 50%, black 0%, transparent 70%)",
          }}
        />
        <KeycapGrid />
        <div className="absolute bottom-6 right-0.3 flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-1.5 backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-success" />
          <span className="font-mono text-xs uppercase tracking-widest text-foreground">
            75% Gasket Mount - Jwick T1
          </span>
        </div>
      </div>

      {/* Mobile: keycap grid as dimmed background layer */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.5] lg:hidden">
        <div className="scale-125">
          <KeycapGrid />
        </div>
      </div>
      <div
        className="pointer-events-none absolute inset-0 lg:hidden"
        style={{
          background:
            "radial-gradient(ellipse 90% 70% at 50% 45%, var(--color-background) 0%, transparent 65%)",
        }}
      />

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
          {words.map((word, index) =>
            word === "—" ? (
              <motion.span
                key={`${word}-${index}`}
                variants={wordVariant}
                className="mx-2 inline-block h-[0.65em] w-[0.65em] -translate-y-1 rotate-[-6deg] overflow-hidden rounded-sm border border-border align-middle"
              >
                <Image
                  src="/images/hero/keyboard-photo.webp"
                  alt=""
                  width={60}
                  height={60}
                  className="h-full w-full object-cover"
                />
              </motion.span>
            ) : (
              <motion.span
                key={`${word}-${index}`}
                variants={wordVariant}
                className="mr-3 inline-block"
              >
                {word}
              </motion.span>
            )
          )}
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