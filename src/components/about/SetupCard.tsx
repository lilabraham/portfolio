"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Container from "@/components/ui/Container";

const SPECS = [
  { label: "Keyboard", value: "75% Gasket Mount — Tri-Mode Wireless" },
  { label: "Keycaps", value: "PBT Dye-Sub, Cherry Profile (FBB)" },
  { label: "Switches", value: "Jwick T1 (Hotswap 5-Pin)" },
];

export default function SetupCard() {
    return (
        <section className="py-16">
            <Container className="flex flex-col gap-6">
                <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="font-body text-xs font-semibold uppercase tracking-widest text-muted"
                >
                    The Setup
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="relative grid grid-cols-1 gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-center"
                >
                    {/* Photo, tilted, with window chrome + oversized bleeding label */}
                    <div className="relative">
                        <span
                            aria-hidden
                            className="pointer-events-none absolute -left-2 -top-10 select-none font-display text-[6rem] italic leading-none text-accent/10 sm:text-[8rem]"
                        >
                            IRL
                        </span>
                        <div className="relative -rotate-2 overflow-hidden rounded-xl border border-border transition-transform duration-300 hover:rotate-0">
                            <div className="flex items-center gap-1.5 border-b border-border bg-border/20 px-3 py-2">
                                <span className="h-2.5 w-2.5 rounded-full bg-warning/60" />
                                <span className="h-2.5 w-2.5 rounded-full bg-success/60" />
                                <span className="h-2.5 w-2.5 rounded-full bg-info/60" />
                                <span className="ml-2 font-mono text-[10px] text-muted">desk.jpg</span>
                            </div>
                            <div className="relative aspect-[4/3]">
                                <Image
                                    src="/images/hero/keyboard-photo.webp"
                                    alt="My keyboard setup"
                                    fill
                                    quality={95}
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    loading="eager"
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Specs */}
                    <div className="flex flex-col gap-5">
                        <p className="font-mono text-sm leading-relaxed text-muted">
                            A 75% gasket-mount board that goes wherever I do — Bluetooth,
                            2.4G, or wired, whichever the moment calls for.
                        </p>
                        <div className="flex flex-col gap-3 border-t border-border pt-4">
                            {SPECS.map((spec, index) => (
                                <motion.div
                                    key={spec.label}
                                    initial={{ opacity: 0, x: -8 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: index * 0.08 }}
                                    className="flex items-center justify-between font-mono text-xs"
                                >
                                    <span className="uppercase tracking-widest text-muted">{spec.label}</span>
                                    <span className="text-foreground">{spec.value}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </Container>
        </section>
    );
}