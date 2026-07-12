"use client";

import { AnimatePresence, motion } from "framer-motion";

interface CVComingSoonModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function CVComingSoonModal({ isOpen, onClose }: CVComingSoonModalProps) {
    return (
        <AnimatePresence>
            {isOpen ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="fixed inset-0 z-[200] flex items-center justify-center bg-background/90 px-6 backdrop-blur-sm"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 16, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 16, scale: 0.96 }}
                        onClick={(e) => e.stopPropagation()}
                        className="flex max-w-sm flex-col items-center gap-4 rounded-xl border border-border bg-background p-8 text-center md:max-w-md md:gap-5 md:p-10"
                    >
                        {/* Ganti src ini pakai GIF pilihan kamu — taruh di public/gif/, atau pakai embed Giphy/Tenor */}
                        <img
                            src="/gif/cv-loading.gif"
                            alt="CV still loading"
                            className="h-64 w-64 rounded-lg object-cover md:h-80 md:w-80"
                        />
                        <p className="font-mono text-sm text-muted">
                            <span className="text-accent">$</span> cv --status
                        </p>
                        <p className="font-mono text-xs text-warning">pending</p>
                        <button
                            onClick={onClose}
                            className="mt-2 rounded-full border border-border px-5 py-2 font-body text-sm text-foreground transition-colors hover:border-accent"
                        >
                            Close
                        </button>
                    </motion.div>
                </motion.div>
            ) : null}
        </AnimatePresence>
    );
}