"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type MarqueeProps = {
  children: ReactNode;
  /** Pixels per second. Lower = slower. */
  speed?: number;
  className?: string;
  /** If true, scroll right-to-left (default). */
  reverse?: boolean;
};

/** Smooth, framer-motion-driven marquee. Doubles content for seamless loop. */
export function Marquee({ children, speed = 50, className, reverse = false }: MarqueeProps) {
  const reduce = useReducedMotion();

  // We animate -50% so the doubled track shifts exactly one full copy width.
  // Duration scales with speed so larger content == proportionally longer cycle.
  const distancePx = 2400; // approximate; both copies move together
  const duration = reduce ? 0 : distancePx / speed;

  const from = reverse ? "-50%" : "0%";
  const to = reverse ? "0%" : "-50%";

  return (
    <div className={`group relative overflow-hidden ${className ?? ""}`}>
      <motion.div
        className="flex w-max gap-12 whitespace-nowrap will-change-transform"
        initial={{ x: from }}
        animate={reduce ? undefined : { x: to }}
        transition={reduce ? undefined : { duration, ease: "linear", repeat: Infinity }}
      >
        <div className="flex shrink-0 items-center gap-12">{children}</div>
        <div className="flex shrink-0 items-center gap-12" aria-hidden>
          {children}
        </div>
      </motion.div>
    </div>
  );
}
