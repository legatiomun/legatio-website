"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  amount?: number;
  once?: boolean;
};

/** Subtle fade + lift as content scrolls into view. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 20,
  amount = 0.2,
  once = true,
}: RevealProps) {
  const reduce = useReducedMotion();
  const variants: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : y },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, delay, ease: [0.22, 0.8, 0.2, 1] },
    },
  };
  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount }}
    >
      {children}
    </motion.div>
  );
}

type RevealStaggerProps = {
  children: ReactNode;
  className?: string;
  stagger?: number;
  once?: boolean;
};

/** Wrap a list of children to stagger their reveals. Children should be Reveal.Item. */
export function RevealStagger({ children, className, stagger = 0.07, once = true }: RevealStaggerProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: 0.15 }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger } },
      }}
    >
      {children}
    </motion.div>
  );
}

/** Stagger child. Use inside <RevealStagger>. */
export function StaggerItem({ children, className, y = 16 }: { children: ReactNode; className?: string; y?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: reduce ? 0 : y },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 0.8, 0.2, 1] } },
      }}
    >
      {children}
    </motion.div>
  );
}

/** Per-word reveal for big headings. Splits on spaces, animates each word. */
export function WordReveal({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  return (
    <span className={className} aria-label={text}>
      {words.map((w, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, y: reduce ? 0 : 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: delay + i * 0.05, ease: [0.22, 0.8, 0.2, 1] }}
        >
          {w}
          {i < words.length - 1 && <span>&nbsp;</span>}
        </motion.span>
      ))}
    </span>
  );
}
