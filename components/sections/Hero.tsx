"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { Countdown } from "../ui/Countdown";
import { WordReveal } from "../motion/Reveal";
import { Magnetic } from "../motion/Magnetic";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Parallax: logo lifts slowly, eyebrow text drifts further, backdrop chakra moves opposite.
  const logoY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -60]);
  const eyebrowY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -90]);
  const chakraY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 80]);
  const chakraRot = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 22]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-paper pt-28 sm:pt-32">
      {/* Decorative chakra silhouette behind the logo */}
      <motion.div
        aria-hidden
        style={{ y: chakraY, rotate: chakraRot }}
        className="pointer-events-none absolute -right-32 top-10 hidden text-ink/[0.05] lg:block"
      >
        <svg width="640" height="640" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.5">
          <circle cx="50" cy="50" r="48" />
          <circle cx="50" cy="50" r="40" />
          <circle cx="50" cy="50" r="4" />
          {Array.from({ length: 24 }).map((_, i) => {
            const a = (i * Math.PI) / 12;
            return (
              <line
                key={i}
                x1={50 + Math.cos(a) * 6}
                y1={50 + Math.sin(a) * 6}
                x2={50 + Math.cos(a) * 40}
                y2={50 + Math.sin(a) * 40}
              />
            );
          })}
        </svg>
      </motion.div>

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.35fr_1fr] lg:items-center">
          <div>
            <motion.p
              style={{ y: eyebrowY }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 0.8, 0.2, 1] }}
              className="text-xs uppercase tracking-[0.22em] text-accent"
            >
              DPS Siliguri · Model United Nations · 2026
            </motion.p>

            <motion.div
              style={{ y: logoY }}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.1, ease: [0.22, 0.8, 0.2, 1] }}
              className="mt-6 max-w-[520px]"
            >
              <Image
                src="/images/logo.png"
                alt="Legatio 4.0 — The Kurukshetra of Diplomacy"
                width={1200}
                height={1200}
                priority
                className="h-auto w-full max-w-[460px]"
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-8 max-w-xl text-base leading-relaxed text-mute"
            >
              The fourth edition of the flagship Model United Nations conference of Delhi Public
              School, Siliguri. Fifteen committees. Six hundred delegates. Three days at the foot of the Eastern Himalayas.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <Magnetic strength={0.18}>
                <Link
                  href="/register"
                  className="group relative inline-flex items-center gap-3 overflow-hidden border border-ink bg-ink px-6 py-3 text-sm text-paper transition-colors hover:bg-accent hover:border-accent"
                >
                  <span className="relative z-10">Register as a delegate</span>
                  <span
                    aria-hidden
                    className="relative z-10 transition-transform duration-300 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </Link>
              </Magnetic>
              <Link
                href="/about"
                className="group inline-flex items-center gap-2 border border-line px-6 py-3 text-sm text-ink transition-colors hover:border-ink hover:bg-cream/40"
              >
                About the conference
                <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
            </motion.div>
          </div>

          {/* Dates / countdown card */}
          <motion.aside
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 0.8, 0.2, 1] }}
            className="relative border border-line bg-cream/40 p-6 sm:p-8"
          >
            {/* Corner ornaments */}
            <span aria-hidden className="absolute -left-1 -top-1 h-3 w-3 border-l border-t border-accent" />
            <span aria-hidden className="absolute -right-1 -top-1 h-3 w-3 border-r border-t border-accent" />
            <span aria-hidden className="absolute -left-1 -bottom-1 h-3 w-3 border-l border-b border-accent" />
            <span aria-hidden className="absolute -right-1 -bottom-1 h-3 w-3 border-r border-b border-accent" />

            <p className="text-xs uppercase tracking-wider text-mute">Conference Dates</p>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {[
                { d: "31", m: "Jul", w: "Fri" },
                { d: "01", m: "Aug", w: "Sat" },
                { d: "02", m: "Aug", w: "Sun" },
              ].map((day, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 + i * 0.08 }}
                  className="border border-line bg-paper px-3 py-3 text-center"
                >
                  <p className="font-serif text-3xl leading-none text-ink">{day.d}</p>
                  <p className="mt-1.5 text-[10px] uppercase tracking-wider text-accent">{day.m}</p>
                  <p className="text-[10px] uppercase tracking-wider text-mute">{day.w}</p>
                </motion.div>
              ))}
            </div>

            <p className="mt-8 text-xs uppercase tracking-wider text-mute">Venue</p>
            <p className="mt-2 text-base text-ink">Delhi Public School, Siliguri</p>
            <p className="text-sm text-mute">West Bengal, India</p>

            <div className="mt-8 border-t border-line pt-5">
              <p className="text-xs uppercase tracking-wider text-mute">Opens in</p>
              <div className="mt-3">
                <Countdown />
              </div>
            </div>
          </motion.aside>
        </div>

        {/* Hero quote with word-by-word reveal */}
        <div className="relative mt-28 max-w-4xl">
          <span aria-hidden className="absolute -left-3 top-0 h-full w-px bg-accent" />
          <p className="pl-8 text-xs uppercase tracking-[0.22em] text-accent">A founding conviction</p>
          <blockquote className="mt-3 pl-8 font-serif text-3xl italic leading-snug text-ink sm:text-4xl">
            <WordReveal text="“War is the failure of diplomacy. Diplomacy is the art of preventing it.”" />
          </blockquote>
        </div>
      </div>
    </section>
  );
}
