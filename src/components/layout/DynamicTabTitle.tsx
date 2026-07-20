"use client";

import { useEffect, useRef } from "react";

const AWAY_TITLE = "👋 Come back!";

export default function DynamicTabTitle() {
  const originalTitle = useRef<string>("");

  useEffect(() => {
    originalTitle.current = document.title;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        document.title = AWAY_TITLE;
      } else {
        document.title = originalTitle.current;
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.title = originalTitle.current;
    };
  }, []);

  return null;
}