"use client";

import { motion } from "framer-motion";
import { profile } from "@/lib/data/profile";

export default function TerminalCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="w-full overflow-hidden rounded-xl border border-border bg-background/60 font-mono text-sm"
    >
          <div className="flex items-center gap-2 border-b border-border bg-border/20 px-4 py-2">
            <span className="h-3 w-3 rounded-full bg-warning/60" />
            <span className="h-3 w-3 rounded-full bg-success/60" />
            <span className="h-3 w-3 rounded-full bg-info/60" />
            <span className="ml-2 font-body text-xs text-muted">whoami.sh</span>
          </div>

          <div className="flex flex-col gap-2 p-5 leading-relaxed">
            <p><span className="text-success">$</span> whoami</p>
            <p className="pl-4 text-foreground">{profile.name}</p>

            <p><span className="text-success">$</span> cat role.txt</p>
            <p className="pl-4 text-info">{profile.tagline}</p>

            <p><span className="text-success">$</span> echo $LOCATION</p>
            <p className="pl-4 text-foreground">{profile.location}</p>

            <p><span className="text-success">$</span> git log --current</p>
            <p className="pl-4 text-warning">
              Building Abhati Logistics (Flutter) & CERITA platform...
            </p>

            <p className="flex items-center gap-1">
              <span className="text-success">$</span>
              <span className="animate-pulse">▊</span>
            </p>
          </div>
    </motion.div>
  );
}