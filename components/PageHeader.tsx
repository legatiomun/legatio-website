"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type PageHeaderProps = {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
};

export function PageHeader({ eyebrow, title, lede }: PageHeaderProps) {
  const reduce = useReducedMotion();

  return (
    <header className="relative overflow-hidden border-b border-line bg-cream/50">
      {/* Decorative line accent */}
      <motion.div
        aria-hidden
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1, ease: [0.22, 0.8, 0.2, 1] }}
        className="absolute left-0 top-0 h-px w-full origin-left bg-accent"
      />

      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-32">
        {eyebrow && (
          <motion.p
            initial={{ opacity: 0, y: reduce ? 0 : 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 0.8, 0.2, 1] }}
            className="text-xs uppercase tracking-[0.22em] text-accent"
          >
            {eyebrow}
          </motion.p>
        )}
        <motion.h1
          initial={{ opacity: 0, y: reduce ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 0.8, 0.2, 1] }}
          className="mt-5 max-w-3xl font-serif text-4xl leading-[1.05] text-ink sm:text-6xl md:text-7xl"
        >
          {title}
        </motion.h1>
        {lede && (
          <motion.p
            initial={{ opacity: 0, y: reduce ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 0.8, 0.2, 1] }}
            className="mt-7 max-w-2xl text-lg leading-relaxed text-mute"
          >
            {lede}
          </motion.p>
        )}
      </div>
    </header>
  );
}
