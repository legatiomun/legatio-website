"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FAQ_SECTIONS } from "@/lib/data/faq";
import { RevealStagger, StaggerItem } from "./motion/Reveal";

export function FAQList() {
  const [open, setOpen] = useState<string | null>(`0-0`);

  let runningIndex = 0;

  return (
    <div className="space-y-16">
      {FAQ_SECTIONS.map((section, sIdx) => (
        <section key={section.label}>
          <header className="mb-6 flex items-baseline justify-between gap-4 border-b border-line pb-3">
            <h2 className="font-serif text-2xl text-ink sm:text-3xl">{section.label}</h2>
            <span className="font-mono text-[10px] uppercase tracking-wider text-mute">
              {String(section.items.length).padStart(2, "0")}{" "}
              {section.items.length === 1 ? "question" : "questions"}
            </span>
          </header>

          <RevealStagger className="divide-y divide-line border-y border-line" stagger={0.05}>
            {section.items.map((item, iIdx) => {
              const id = `${sIdx}-${iIdx}`;
              const isOpen = open === id;
              const displayNum = ++runningIndex;
              return (
                <StaggerItem key={item.q}>
                  <div className="group">
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : id)}
                      aria-expanded={isOpen}
                      className="flex w-full items-start gap-5 py-7 text-left"
                    >
                      <span
                        className={`font-mono text-xs uppercase tracking-wider transition-colors ${
                          isOpen ? "text-accent" : "text-mute group-hover:text-accent"
                        }`}
                      >
                        {String(displayNum).padStart(2, "0")}
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
        </section>
      ))}
    </div>
  );
}
