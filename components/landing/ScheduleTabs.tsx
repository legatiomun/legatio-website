"use client";

import { useEffect, useRef, useState } from "react";
import { ITINERARY, type Slot, type SessionKind } from "@/lib/data/itinerary";

const ROMAN = ["I.", "II.", "III."];

const TITLE_PARTS: Array<{ pre: string; em: string; post: string }> = [
  { pre: "", em: "The Conch", post: " Sounds" },
  { pre: "", em: "The Field", post: " is Joined" },
  { pre: "", em: "The Standard", post: " Restored" },
];

const DAY_MOTIFS: string[] = [
  "the field is set, the moment arrives",
  "the arrows are drawn, the blocs are tested",
  "the gavel falls, the dust, settled",
];

const KIND_LABEL: Record<SessionKind, string> = {
  registration: "Registration",
  meal: "Meal",
  ceremony: "Ceremony",
  committee: "Committee",
  panel: "Panel",
  press: "Press",
  social: "Social",
  dispersal: "Dispersal",
};

const KIND_VAR: Record<SessionKind, string> = {
  registration: "var(--k-registration)",
  meal: "var(--k-meal)",
  ceremony: "var(--k-ceremony)",
  committee: "var(--k-committee)",
  panel: "var(--k-panel)",
  press: "var(--k-press)",
  social: "var(--k-social)",
  dispersal: "var(--k-dispersal)",
};

function legendFor(slots: Slot[]): SessionKind[] {
  const featured: SessionKind[] = ["ceremony", "press", "panel", "social", "committee"];
  const seen = new Set<SessionKind>();
  for (const s of slots) {
    if (featured.includes(s.kind)) seen.add(s.kind);
    if (seen.size >= 3) break;
  }
  if (seen.size < 3) {
    for (const s of slots) {
      seen.add(s.kind);
      if (seen.size >= 3) break;
    }
  }
  return Array.from(seen).slice(0, 3);
}

export function ScheduleTabs() {
  const [active, setActive] = useState(0);
  const tabKeyRef = useRef(0);

  function go(idx: number) {
    const next = Math.max(0, Math.min(ITINERARY.length - 1, idx));
    setActive(next);
    tabKeyRef.current += 1;
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 200, behavior: "smooth" });
    }
  }

  // Re-trigger animations when switching tabs
  const [animKey, setAnimKey] = useState(0);
  useEffect(() => {
    setAnimKey((k) => k + 1);
  }, [active]);

  return (
    <>
      {/* DAY TABS */}
      <div className="day-tabs-wrap">
        <div className="container">
          <div className="day-tabs" role="tablist">
            {ITINERARY.map((d, i) => {
              const t = TITLE_PARTS[i];
              return (
                <button
                  key={d.label}
                  id={`day-tab-${i + 1}`}
                  className="tab"
                  role="tab"
                  type="button"
                  aria-selected={i === active}
                  aria-controls={`day-${i + 1}`}
                  onClick={() => go(i)}
                  onKeyDown={(e) => {
                    if (e.key === "ArrowRight") go(i + 1);
                    if (e.key === "ArrowLeft") go(i - 1);
                  }}
                >
                  <div className="num">
                    Day {ROMAN[i]} · {d.weekday}
                  </div>
                  <div className="title">
                    {t.pre}
                    <em>{t.em}</em>
                    {t.post}
                  </div>
                  <div className="date">{d.date}</div>
                </button>
              );
            })}
            <div
              className="tab-indicator"
              style={{ transform: `translateX(${active * 100}%)` }}
            />
          </div>
        </div>
      </div>

      {/* DAY STAGE */}
      <section className="day-stage">
        <div className="container">
          {ITINERARY.map((d, i) => {
            const t = TITLE_PARTS[i];
            const legend = legendFor(d.slots);
            return (
              <article
                key={`${d.label}-${animKey}`}
                className="day"
                id={`day-${i + 1}`}
                role="tabpanel"
                aria-labelledby={`day-tab-${i + 1}`}
                data-active={i === active ? "true" : undefined}
              >
                <div className="day-head">
                  <div className="roman">{ROMAN[i]}</div>
                  <div>
                    <h2>
                      {t.em} {t.post.trim()}.
                    </h2>
                    <div className="motif">{DAY_MOTIFS[i]}</div>
                  </div>
                  <div className="date-block">
                    {d.weekday}
                    <br />
                    <strong>{d.date}</strong>
                  </div>
                </div>

                <ol className="timeline">
                  {d.slots.map((slot, si) => (
                    <li key={si} className="slot" data-kind={slot.kind}>
                      <div className="time">{slot.time}</div>
                      <div className="axis">
                        <span className="dot" />
                      </div>
                      <div className="ev">
                        <h3>{slot.title}</h3>
                        {slot.detail && <p className="detail">{slot.detail}</p>}
                      </div>
                      <span className="kind">{KIND_LABEL[slot.kind]}</span>
                    </li>
                  ))}
                </ol>

                <div className="day-foot">
                  <div className="legend">
                    {legend.map((k) => (
                      <span key={k}>
                        <span className="swatch" style={{ background: KIND_VAR[k] }} />
                        {KIND_LABEL[k]}
                      </span>
                    ))}
                  </div>
                  <div className="nav-arrows">
                    <button
                      type="button"
                      className="nav-arrow"
                      onClick={() => go(active - 1)}
                      disabled={active === 0}
                    >
                      ← Previous
                    </button>
                    <button
                      type="button"
                      className="nav-arrow"
                      onClick={() => go(active + 1)}
                      disabled={active === ITINERARY.length - 1}
                    >
                      Next →
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}
