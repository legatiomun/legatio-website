"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FAQ } from "@/lib/data/faq";
import { RevealStagger, StaggerItem } from "./motion/Reveal";

export function FAQList() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <RevealStagger className="divide-y divide-line border-y border-line" stagger={0.05}>
      {FAQ.map((item, i) => {
        const isOpen = openIdx === i;
        return (
          <StaggerItem key={item.q}>
            <div className="group">
              <button
                type="button"
                onClick={() => setOpenIdx(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-start gap-5 py-7 text-left"
              >
                <span
                  className={`font-mono text-xs uppercase tracking-wider transition-colors ${
                    isOpen ? "text-accent" : "text-mute group-hover:text-accent"
                  }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={`flex-1 font-serif text-xl leading-snug transition-colors sm:text-2xl ${
                    isOpen ? "text-ink" : "text-ink/85 group-hover:text-ink"
                  }`}
                >
                  {item.q}
                </span>
                <motion.span
                  className="mt-2 inline-grid h-7 w-7 flex-none place-items-center border border-line text-ink"
                  animate={{ rotate: isOpen ? 45 : 0, borderColor: isOpen ? "#A6491F" : "#E2DCCC" }}
                  transition={{ duration: 0.35, ease: [0.22, 0.8, 0.2, 1] }}
                  aria-hidden
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                  </svg>
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.45, ease: [0.22, 0.8, 0.2, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="max-w-prose pb-8 pl-12 pr-12 font-serif text-[17px] leading-relaxed text-ink/80">
                      {item.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </StaggerItem>
        );
      })}
    </RevealStagger>
  );
}
