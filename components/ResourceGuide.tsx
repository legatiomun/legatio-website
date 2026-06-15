"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RESOURCE_SECTIONS, type ResourceBlock } from "@/lib/data/resources";
import { RevealStagger, StaggerItem } from "./motion/Reveal";

function Block({ block }: { block: ResourceBlock }) {
  switch (block.type) {
    case "para":
      return (
        <p className="max-w-prose font-serif text-[17px] leading-relaxed text-ink/80">
          {block.text}
        </p>
      );
    case "bullets":
      return (
        <ul className="max-w-prose space-y-2.5">
          {block.items.map((it) => (
            <li key={it} className="flex gap-3 font-serif text-[17px] leading-relaxed text-ink/80">
              <span aria-hidden className="mt-2 inline-block h-1.5 w-1.5 flex-none rotate-45 bg-accent/70" />
              <span>{it}</span>
            </li>
          ))}
        </ul>
      );
    case "tip":
      return (
        <div className="max-w-prose border-l-2 border-accent bg-cream/60 px-5 py-4">
          <span className="font-mono text-[10px] uppercase tracking-wider text-accent">Tip</span>
          <p className="mt-1.5 font-serif text-[16px] leading-relaxed text-ink/85">{block.text}</p>
        </div>
      );
    case "note":
      return (
        <div className="max-w-prose border-l-2 border-line bg-paper-deep/40 px-5 py-4">
          <span className="font-mono text-[10px] uppercase tracking-wider text-mute">Note</span>
          <p className="mt-1.5 font-serif text-[16px] leading-relaxed text-ink/75">{block.text}</p>
        </div>
      );
    case "tag":
      return (
        <p className="max-w-prose text-[15px] leading-relaxed text-ink/80">
          <span className="font-mono text-[10px] uppercase tracking-wider text-accent">
            {block.label}:
          </span>{" "}
          <span className="font-serif italic">{block.value}</span>
        </p>
      );
    case "table":
      return (
        <div className="max-w-prose overflow-hidden border border-line">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-cream/70">
                {block.columns.map((c) => (
                  <th
                    key={c}
                    className="border-b border-line px-4 py-3 font-mono text-[10px] uppercase tracking-wider text-mute"
                  >
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map(([a, b]) => (
                <tr key={a} className="align-top odd:bg-paper/40">
                  <td className="border-b border-line/70 px-4 py-3 font-serif text-[15px] font-semibold text-ink/90">
                    {a}
                  </td>
                  <td className="border-b border-line/70 px-4 py-3 font-serif text-[15px] leading-relaxed text-ink/75">
                    {b}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
  }
}

export function ResourceGuide() {
  // Open the very first item of the first section by default.
  const [open, setOpen] = useState<string | null>("0-0");

  return (
    <div className="space-y-20">
      {RESOURCE_SECTIONS.map((section, sIdx) => (
        <section key={section.label} className="scroll-mt-28">
          <header className="mb-6 border-b border-line pb-4">
            <h2 className="font-serif text-2xl text-ink sm:text-3xl">{section.label}</h2>
            {section.intro && (
              <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-mute">{section.intro}</p>
            )}
          </header>

          <RevealStagger className="divide-y divide-line border-y border-line" stagger={0.05}>
            {section.items.map((item, iIdx) => {
              const id = `${sIdx}-${iIdx}`;
              const isOpen = open === id;
              return (
                <StaggerItem key={item.title}>
                  <div className="group">
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : id)}
                      aria-expanded={isOpen}
                      className="flex w-full items-start gap-5 py-7 text-left"
                    >
                      <span
                        className={`flex-1 font-serif text-xl leading-snug transition-colors sm:text-2xl ${
                          isOpen ? "text-ink" : "text-ink/85 group-hover:text-ink"
                        }`}
                      >
                        {item.title}
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
                          <div className="space-y-5 pb-9 pl-1 pr-2 sm:pr-12">
                            {item.blocks.map((b, bIdx) => (
                              <Block key={bIdx} block={b} />
                            ))}
                          </div>
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
