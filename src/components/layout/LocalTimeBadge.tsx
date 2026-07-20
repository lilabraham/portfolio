"use client";

import { useEffect, useState } from "react";

export default function LocalTimeBadge() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone: "Asia/Jakarta",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    const update = () => setTime(formatter.format(new Date()));
    update();

    const interval = setInterval(update, 1000 * 30);
    return () => clearInterval(interval);
  }, []);

  if (!time) return null;

  return (
    <div className="flex items-center gap-2 font-mono text-xs text-muted">
      <span className="h-1.5 w-1.5 rounded-full bg-success" />
      <span>{time} WIB</span>
    </div>
  );
}