"use client";

import { useEffect, useRef, useState } from "react";
import { ITINERARY, type Slot, type SessionKind } from "@/lib/data/itinerary";

const ROMAN = ["I", "II", "III"];

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

/** Kinds that get a highlighted (tinted) row in the programme. */
const FEATURED: SessionKind[] = ["ceremony", "panel", "press", "social"];

function legendFor(slots: Slot[]): SessionKind[] {
  const seen = new Set<SessionKind>();
  for (const s of slots) seen.add(s.kind);
  return Array.from(seen);
}

export function ScheduleTabs() {
  const [active, setActive] = useState(0);
  const stageRef = useRef<HTMLElement | null>(null);

  function go(idx: number) {
    const next = Math.max(0, Math.min(ITINERARY.length - 1, idx));
    if (next === active) return;
    setActive(next);
    if (typeof window !== "undefined" && stageRef.current) {
      const top =
        stageRef.current.getBoundingClientRect().top + window.scrollY - 96;
      window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    }
  }

  // Re-trigger entry animations when switching days
  const [animKey, setAnimKey] = useState(0);
  useEffect(() => {
    setAnimKey((k) => k + 1);
  }, [active]);

  return (
    <>
      {/* DAY SELECTOR */}
      <div className="sched-tabs-wrap">
        <div className="container">
          <div className="sched-tabs" role="tablist" aria-label="Conference days">
            {ITINERARY.map((d, i) => {
              const t = TITLE_PARTS[i];
              return (
                <button
                  key={d.label}
                  id={`day-tab-${i + 1}`}
                  className="sched-tab"
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
                  <span className="d-num">
                    Day {ROMAN[i]}
                    <span className="d-wd"> · {d.weekday}</span>
                  </span>
                  <span className="d-title">
                    {t.pre}
                    <em>{t.em}</em>
                    {t.post}
                  </span>
                  <span className="d-date">{d.date}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* DAY STAGE */}
      <section className="day-stage" ref={stageRef}>
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
                  <div className="roman">{ROMAN[i]}.</div>
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

                <ol className="programme">
                  {d.slots.map((slot, si) => (
                    <li
                      key={si}
                      className="prog-row"
                      data-kind={slot.kind}
                      data-featured={
                        FEATURED.includes(slot.kind) ? "true" : undefined
                      }
                      style={{ animationDelay: `${80 + si * 55}ms` }}
                    >
                      <div className="prog-time">{slot.time}</div>
                      <div className="prog-body">
                        <h3>{slot.title}</h3>
                        {slot.detail && <p className="detail">{slot.detail}</p>}
                      </div>
                      <span className="prog-kind">
                        <i className="prog-dot" aria-hidden="true" />
                        {KIND_LABEL[slot.kind]}
                      </span>
                    </li>
                  ))}
                </ol>

                <div className="day-foot">
                  <div className="legend">
                    {legend.map((k) => (
                      <span key={k} data-kind={k}>
                        <i className="swatch" aria-hidden="true" />
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
                      {active > 0 ? `← Day ${ROMAN[active - 1]}` : "← Previous"}
                    </button>
                    <button
                      type="button"
                      className="nav-arrow"
                      onClick={() => go(active + 1)}
                      disabled={active === ITINERARY.length - 1}
                    >
                      {active < ITINERARY.length - 1
                        ? `Day ${ROMAN[active + 1]} →`
                        : "Next →"}
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
