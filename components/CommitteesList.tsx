"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { COMMITTEES, TIERS, TIER_DESCRIPTION, type Tier } from "@/lib/data/committees";
import { CommitteeEmblem } from "./CommitteeEmblem";
import { Reveal } from "./motion/Reveal";

type Filter = "All" | Tier;

const TIER_ORDER: Record<Tier, number> = { Beginner: 1, Intermediate: 2, Advanced: 3, Flagship: 4 };

export function CommitteesList() {
  const [filter, setFilter] = useState<Filter>("All");

  const visible = useMemo(() => {
    if (filter === "All") return COMMITTEES;
    return COMMITTEES.filter((c) => c.tier === filter);
  }, [filter]);

  const grouped = TIERS.map((t) => ({ tier: t, items: visible.filter((c) => c.tier === t) })).filter((g) => g.items.length > 0);

  return (
    <LayoutGroup>
      <div>
        {/* Tier filter */}
        <div className="sticky top-[64px] z-30 -mx-5 border-b border-line bg-paper/90 px-5 py-4 backdrop-blur sm:-mx-8 sm:px-8">
          <div className="flex flex-wrap items-center gap-2">
            {(["All", ...TIERS] as Filter[]).map((t) => {
              const isActive = t === filter;
              const count = t === "All" ? COMMITTEES.length : COMMITTEES.filter((c) => c.tier === t).length;
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => setFilter(t)}
                  className={`relative flex items-baseline gap-2 px-3 py-1.5 text-sm transition-colors ${
                    isActive ? "text-paper" : "text-mute hover:text-ink"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="committee-filter-pill"
                      transition={{ type: "spring", stiffness: 360, damping: 28 }}
                      className="absolute inset-0 -z-10 bg-ink"
                    />
                  )}
                  <span className="relative">{t}</span>
                  <span className={`relative text-xs ${isActive ? "text-paper/70" : "text-mute"}`}>{count}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-12 space-y-20">
          <AnimatePresence mode="popLayout" initial={false}>
            {grouped
              .sort((a, b) => TIER_ORDER[a.tier] - TIER_ORDER[b.tier])
              .map((g) => (
                <motion.section
                  key={g.tier}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.45, ease: [0.22, 0.8, 0.2, 1] }}
                >
                  <div className="grid gap-6 lg:grid-cols-[220px_1fr] lg:gap-12">
                    <Reveal>
                      <div className="lg:sticky lg:top-32">
                        <p className="text-xs uppercase tracking-wider text-accent">{g.tier}</p>
                        <p className="mt-2 max-w-xs text-sm leading-relaxed text-mute">
                          {TIER_DESCRIPTION[g.tier]}
                        </p>
                        <p className="mt-4 text-xs uppercase tracking-wider text-mute">
                          {String(g.items.length).padStart(2, "0")} committees
                        </p>
                      </div>
                    </Reveal>

                    <ul className="divide-y divide-line border-y border-line">
                      <AnimatePresence initial={false}>
                        {g.items.map((c, i) => (
                          <motion.li
                            key={c.id}
                            layout
                            initial={{ opacity: 0, y: 18 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.25 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.5, delay: i * 0.05, ease: [0.22, 0.8, 0.2, 1] }}
                            className="relative"
                          >
                            <motion.div
                              whileHover={{ x: 4 }}
                              transition={{ type: "spring", stiffness: 240, damping: 22 }}
                              className="group relative py-8"
                            >
                              {/* Hover indent line */}
                              <span
                                aria-hidden
                                className="absolute -left-3 top-1/2 h-0 w-px -translate-y-1/2 bg-accent transition-all duration-500 group-hover:h-16"
                              />
                              <div className="grid gap-5 sm:grid-cols-[180px_1fr] sm:items-start sm:gap-8">
                                <motion.div
                                  whileHover={{ scale: 1.03 }}
                                  transition={{ type: "spring", stiffness: 220, damping: 18 }}
                                  className="flex justify-start sm:pt-1"
                                >
                                  <CommitteeEmblem committee={c} height={88} maxWidth={180} />
                                </motion.div>
                                <div>
                                  <div className="flex flex-wrap items-baseline gap-3">
                                    <p className="font-serif text-2xl leading-snug text-ink transition-colors group-hover:text-accent">
                                      {c.name}
                                    </p>
                                    {c.classified && (
                                      <span className="border border-accent/40 bg-accent/5 px-2 py-0.5 text-[10px] uppercase tracking-wider text-accent">
                                        Classified
                                      </span>
                                    )}
                                  </div>
                                  <p className="mt-1 text-xs uppercase tracking-wider text-mute">{c.code}</p>
                                  <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink/80">
                                    {c.agenda}
                                  </p>
                                  {c.note && <p className="mt-2 text-sm italic text-mute">{c.note}</p>}
                                </div>
                              </div>
                            </motion.div>
                          </motion.li>
                        ))}
                      </AnimatePresence>
                    </ul>
                  </div>
                </motion.section>
              ))}
          </AnimatePresence>
        </div>
      </div>
    </LayoutGroup>
  );
}
