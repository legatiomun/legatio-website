"use client";

import { useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  LayoutGroup,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { ITINERARY, type SessionKind, type Slot } from "@/lib/data/itinerary";
import { Reveal } from "./motion/Reveal";

type Emphasis = "featured" | "committee" | "muted";

const KIND_EMPHASIS: Record<SessionKind, Emphasis> = {
  ceremony: "featured",
  press: "featured",
  social: "featured",
  panel: "featured",
  committee: "committee",
  meal: "muted",
  registration: "muted",
  dispersal: "muted",
};

const KIND_LABEL: Record<SessionKind, string> = {
  ceremony: "Ceremony",
  press: "Press",
  social: "Social",
  panel: "Panel",
  committee: "Committee",
  meal: "Meal",
  registration: "Reporting",
  dispersal: "Dispersal",
};

const ROMAN = ["I", "II", "III"];

function parseStartMinutes(time: string) {
  // "07:30 – 08:30" → 450
  const m = time.match(/(\d{1,2}):(\d{2})/);
  if (!m) return 0;
  return Number(m[1]) * 60 + Number(m[2]);
}

function durationMinutes(time: string) {
  // "10:45 – 13:00" → 135 ; "5:00 PM onwards" → 0
  const m = time.match(/(\d{1,2}):(\d{2})\s*[–-]\s*(\d{1,2}):(\d{2})/);
  if (!m) return 0;
  return Number(m[3]) * 60 + Number(m[4]) - (Number(m[1]) * 60 + Number(m[2]));
}

function formatDuration(mins: number) {
  if (mins <= 0) return null;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  if (h === 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
}

export function ScheduleView() {
  const [dayIndex, setDayIndex] = useState(0);
  const day = ITINERARY[dayIndex];

  // Stats
  const committeeCount = day.slots.filter((s) => s.kind === "committee").length;
  const committeeMinutes = day.slots
    .filter((s) => s.kind === "committee")
    .reduce((sum, s) => sum + durationMinutes(s.time), 0);
  const featuredMoments = day.slots.filter((s) => KIND_EMPHASIS[s.kind] === "featured");
  const firstSlot = day.slots[0];
  const lastSlot = day.slots[day.slots.length - 1];

  return (
    <div className="bg-paper">
      {/* Sticky day tabs */}
      <div className="sticky top-16 z-30 border-y border-line bg-paper/95 backdrop-blur">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <LayoutGroup>
            <ul className="flex">
              {ITINERARY.map((d, i) => {
                const active = i === dayIndex;
                return (
                  <li key={d.label} className="flex-1">
                    <button
                      type="button"
                      onClick={() => setDayIndex(i)}
                      className="relative w-full py-5 text-left transition-colors"
                    >
                      <div className="flex items-baseline gap-3">
                        <span
                          className={`font-serif text-3xl leading-none transition-colors sm:text-4xl ${
                            active ? "text-ink" : "text-mute group-hover:text-ink"
                          }`}
                        >
                          {ROMAN[i]}
                        </span>
                        <div className="flex flex-col">
                          <span
                            className={`text-[11px] uppercase tracking-wider transition-colors ${
                              active ? "text-accent" : "text-mute"
                            }`}
                          >
                            Day · {String(i + 1).padStart(2, "0")}
                          </span>
                          <span className={`text-sm transition-colors ${active ? "text-ink" : "text-mute"}`}>
                            {d.weekday}
                          </span>
                        </div>
                      </div>
                      {active && (
                        <motion.span
                          layoutId="schedule-day-underline"
                          transition={{ type: "spring", stiffness: 360, damping: 30 }}
                          className="absolute -bottom-px left-0 right-0 h-[2px] bg-ink"
                        />
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </LayoutGroup>
        </div>
      </div>

      {/* Day content */}
      <AnimatePresence mode="wait">
        <motion.section
          key={day.label}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.45, ease: [0.22, 0.8, 0.2, 1] }}
        >
          {/* Day intro */}
          <div className="mx-auto max-w-6xl px-5 pt-20 sm:px-8 sm:pt-28">
            <div className="grid items-end gap-10 lg:grid-cols-[1fr_2fr]">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-accent">
                  Day {String(dayIndex + 1).padStart(2, "0")} · {day.weekday}
                </p>
                <p className="mt-4 font-serif text-7xl leading-none text-ink sm:text-[9rem]">
                  {ROMAN[dayIndex]}
                </p>
              </div>
              <div>
                <p className="font-serif text-3xl text-ink sm:text-5xl">{day.date}</p>
                <p className="mt-3 max-w-md font-serif text-xl italic leading-snug text-ink/70">
                  {day.motif}
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-14 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
              <Stat label="Sessions" value={String(day.slots.length).padStart(2, "0")} />
              <Stat
                label="Committee"
                value={String(committeeCount).padStart(2, "0")}
                hint={formatDuration(committeeMinutes) ?? undefined}
              />
              <Stat label="Featured" value={String(featuredMoments.length).padStart(2, "0")} />
              <Stat
                label="Window"
                value={firstSlot.time.split(" – ")[0]}
                hint={`Ends ${lastSlot.time.split(" – ")[1]?.replace(" onwards", "") ?? lastSlot.time.replace(" onwards", "")}`}
              />
            </div>

            {/* Featured moments strip */}
            {featuredMoments.length > 0 && (
              <div className="mt-16">
                <Reveal>
                  <p className="text-xs uppercase tracking-wider text-accent">Featured Moments</p>
                </Reveal>
                <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {featuredMoments.slice(0, 3).map((s, i) => (
                    <Reveal key={i} delay={i * 0.06}>
                      <article className="group relative h-full overflow-hidden border border-ink bg-ink p-6 text-paper">
                        <span className="absolute inset-0 -translate-x-full bg-accent transition-transform duration-700 group-hover:translate-x-0" />
                        <div className="relative">
                          <p className="text-[10px] uppercase tracking-wider text-accent group-hover:text-paper">
                            {KIND_LABEL[s.kind]}
                          </p>
                          <p className="mt-2 font-serif text-2xl leading-tight">{s.title}</p>
                          <p className="mt-4 font-mono text-xs text-paper/70 group-hover:text-paper/90">
                            {s.time}
                          </p>
                        </div>
                      </article>
                    </Reveal>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Timeline */}
          <Timeline slots={day.slots} />
        </motion.section>
      </AnimatePresence>

      <p className="mx-auto mt-8 max-w-6xl px-5 pb-20 text-sm text-mute sm:px-8">
        Schedule subject to refinement. The final itinerary is issued to allotted delegates.
      </p>
    </div>
  );
}

function Stat({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="bg-paper p-5 sm:p-6">
      <p className="text-[11px] uppercase tracking-wider text-mute">{label}</p>
      <p className="mt-3 font-serif text-3xl text-ink sm:text-4xl">{value}</p>
      {hint && <p className="mt-1 text-xs text-mute">{hint}</p>}
    </div>
  );
}

function Timeline({ slots }: { slots: Slot[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 30%"],
  });
  const spineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Determine sub-counter for committee sessions (Session 01, 02, …)
  let committeeNum = 0;
  const sessionNumbers = slots.map((s) => {
    if (s.kind === "committee") {
      committeeNum += 1;
      return committeeNum;
    }
    return null;
  });

  return (
    <div ref={ref} className="relative mt-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="relative grid grid-cols-[24px_1fr] gap-6 sm:grid-cols-[96px_24px_1fr] sm:gap-8">
          {/* Spine — base line */}
          <div
            aria-hidden
            className="absolute left-[40px] top-0 bottom-0 w-px bg-line sm:left-[108px]"
          />
          {/* Spine — animated fill */}
          {!reduce && (
            <motion.div
              aria-hidden
              style={{ scaleY: spineScale }}
              className="absolute left-[40px] top-0 bottom-0 w-px origin-top bg-ink sm:left-[108px]"
            />
          )}

          {slots.map((slot, i) => (
            <TimelineRow
              key={i}
              slot={slot}
              index={i}
              total={slots.length}
              sessionNumber={sessionNumbers[i] ?? null}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function TimelineRow({
  slot,
  index,
  sessionNumber,
}: {
  slot: Slot;
  index: number;
  total: number;
  sessionNumber: number | null;
}) {
  const emphasis = KIND_EMPHASIS[slot.kind];
  const dur = formatDuration(durationMinutes(slot.time));

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.55, delay: index * 0.04, ease: [0.22, 0.8, 0.2, 1] }}
      className="col-span-full grid grid-cols-subgrid items-start"
    >
      {/* TIME column (desktop) */}
      <div className="hidden sm:block sm:pt-2">
        <p className="font-mono text-xs uppercase tracking-wider text-mute">
          {slot.time.split(" – ")[0]}
        </p>
        {slot.time.includes(" – ") && (
          <p className="font-mono text-[10px] text-mute/70">
            – {slot.time.split(" – ")[1]}
          </p>
        )}
      </div>

      {/* NODE column */}
      <div className="relative flex justify-center pt-3">
        <Node emphasis={emphasis} />
      </div>

      {/* EVENT column */}
      <div className="pb-10">
        {/* Mobile time */}
        <p className="font-mono text-[10px] uppercase tracking-wider text-mute sm:hidden">
          {slot.time}
        </p>

        {emphasis === "featured" && <FeaturedSlot slot={slot} dur={dur} />}
        {emphasis === "committee" && (
          <CommitteeSlot slot={slot} dur={dur} sessionNumber={sessionNumber} />
        )}
        {emphasis === "muted" && <MutedSlot slot={slot} />}
      </div>
    </motion.div>
  );
}

function Node({ emphasis }: { emphasis: Emphasis }) {
  if (emphasis === "featured") {
    return (
      <motion.span
        whileHover={{ scale: 1.3 }}
        transition={{ type: "spring", stiffness: 360, damping: 18 }}
        className="relative z-10 block h-4 w-4 rounded-full bg-accent ring-4 ring-paper"
      >
        <span className="absolute inset-0 -m-1 animate-ping rounded-full bg-accent/30" aria-hidden />
      </motion.span>
    );
  }
  if (emphasis === "committee") {
    return (
      <motion.span
        whileHover={{ scale: 1.3 }}
        transition={{ type: "spring", stiffness: 360, damping: 18 }}
        className="relative z-10 block h-3 w-3 rounded-full bg-ink ring-4 ring-paper"
      />
    );
  }
  return (
    <span className="relative z-10 block h-2.5 w-2.5 rounded-full border border-mute/60 bg-paper" />
  );
}

function FeaturedSlot({ slot, dur }: { slot: Slot; dur: string | null }) {
  return (
    <motion.article
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 240, damping: 22 }}
      className="group relative overflow-hidden border border-ink bg-ink p-6 text-paper sm:p-8"
    >
      <span
        aria-hidden
        className="absolute inset-y-0 left-0 w-1 bg-accent transition-all duration-500 group-hover:w-2"
      />
      <div className="flex flex-wrap items-baseline justify-between gap-3 pl-3">
        <p className="text-[10px] uppercase tracking-[0.22em] text-accent">
          {KIND_LABEL[slot.kind]}
        </p>
        {dur && <p className="font-mono text-xs text-paper/60">{dur}</p>}
      </div>
      <h3 className="mt-2 pl-3 font-serif text-2xl leading-snug sm:text-3xl">{slot.title}</h3>
      {slot.detail && (
        <p className="mt-3 max-w-xl pl-3 font-serif text-base italic leading-relaxed text-paper/80">
          {slot.detail}
        </p>
      )}
    </motion.article>
  );
}

function CommitteeSlot({
  slot,
  dur,
  sessionNumber,
}: {
  slot: Slot;
  dur: string | null;
  sessionNumber: number | null;
}) {
  return (
    <motion.article
      whileHover={{ x: 4 }}
      transition={{ type: "spring", stiffness: 240, damping: 22 }}
      className="group relative border border-line bg-paper p-5 transition-colors hover:border-ink sm:p-6"
    >
      <span
        aria-hidden
        className="absolute left-0 top-0 h-full w-0 bg-cream/60 transition-all duration-500 group-hover:w-full"
      />
      <div className="relative flex flex-wrap items-baseline justify-between gap-3">
        <p className="text-[10px] uppercase tracking-[0.22em] text-accent">
          Session · {String(sessionNumber ?? 0).padStart(2, "0")}
        </p>
        {dur && <p className="font-mono text-xs text-mute">{dur}</p>}
      </div>
      <h3 className="relative mt-2 font-serif text-xl leading-snug text-ink transition-colors group-hover:text-accent sm:text-2xl">
        {slot.title}
      </h3>
      {slot.detail && (
        <p className="relative mt-2 max-w-xl text-sm leading-relaxed text-mute">{slot.detail}</p>
      )}
    </motion.article>
  );
}

function MutedSlot({ slot }: { slot: Slot }) {
  return (
    <div className="flex items-baseline gap-4">
      <p className="font-serif text-base text-ink/70 sm:text-lg">{slot.title}</p>
      <span className="text-[10px] uppercase tracking-wider text-mute">
        {KIND_LABEL[slot.kind]}
      </span>
    </div>
  );
}
