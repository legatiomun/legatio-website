"use client";

import { useEffect, useState } from "react";
import { timeToConference } from "@/lib/utils";

/**
 * Renders the hero's countdown line in the format used by the design:
 *   D d · HH h · MM m  (opens in)
 *
 * Outputs nothing client-specific on first paint to avoid hydration mismatch,
 * then updates every 30s once mounted.
 */
export function HeroCountdown() {
  const [t, setT] = useState(() => timeToConference());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const id = setInterval(() => setT(timeToConference()), 30000);
    return () => clearInterval(id);
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");
  const unitStyle: React.CSSProperties = { color: "var(--mute)", fontSize: 14 };

  if (!mounted) {
    return (
      <div className="v">
        — · — · —<small>opens in</small>
      </div>
    );
  }

  if (t.started) {
    return (
      <div className="v">
        Now<small>the conch is blown</small>
      </div>
    );
  }

  return (
    <div className="v">
      {t.days} <span style={unitStyle}>d</span> · {pad(t.hours)}{" "}
      <span style={unitStyle}>h</span> · {pad(t.minutes)}{" "}
      <span style={unitStyle}>m</span>
      <small>opens in</small>
    </div>
  );
}
