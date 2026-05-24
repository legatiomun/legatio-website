"use client";

import { useEffect, useState } from "react";
import { timeToConference } from "@/lib/utils";

export function Countdown() {
  const [t, setT] = useState(() => timeToConference());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const id = setInterval(() => setT(timeToConference()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!mounted) return <div className="h-[48px]" aria-hidden />;

  if (t.started) {
    return <p className="font-serif text-xl text-accent">The conference is underway.</p>;
  }

  const cells = [
    { label: "days", value: t.days },
    { label: "hours", value: t.hours },
    { label: "min", value: t.minutes },
  ];

  return (
    <div className="flex items-baseline gap-5">
      {cells.map((c) => (
        <div key={c.label}>
          <div className="font-serif text-3xl tabular-nums text-ink">{c.value}</div>
          <div className="text-xs uppercase tracking-wider text-mute">{c.label}</div>
        </div>
      ))}
    </div>
  );
}
