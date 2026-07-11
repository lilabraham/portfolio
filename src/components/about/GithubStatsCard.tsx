"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Container from "@/components/ui/Container";

const GITHUB_USERNAME = "lilabraham";
const STATS_URL = "/api/github-stats";
const LANGS_URL = "/api/github-langs";

function StatImage({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="flex aspect-[2/1] w-full items-center justify-center rounded-lg border border-border p-4 text-center font-body text-xs text-muted">
        Couldn&apos;t load {alt.toLowerCase()}. Some ad-blockers block this domain —
        try disabling it or view directly on{" "}
        <a
          href={`https://github.com/${GITHUB_USERNAME}`}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-1 text-accent hover:underline"
        >
          GitHub
        </a>
        .
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className="w-full"
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}

export default function GithubStatsCard() {
  return (
    <section className="py-8">
      <Container className="flex flex-col gap-4">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-body text-xs font-semibold uppercase tracking-widest text-muted"
        >
          Live from GitHub
        </motion.p>
        <div className="grid gap-4 sm:grid-cols-2">
          <StatImage src={STATS_URL} alt="GitHub stats" />
          <StatImage src={LANGS_URL} alt="Most used languages" />
        </div>
      </Container>
    </section>
  );
}