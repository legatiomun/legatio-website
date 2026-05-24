import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navigation } from "@/components/Navigation";
import { Colophon } from "@/components/landing/Colophon";
import { COMMITTEES, TIERS, TIER_DESCRIPTION, type Tier, type Committee } from "@/lib/data/committees";

export const metadata: Metadata = {
  title: "Committees · Legatio 4.0 — The Kurukshetra of Diplomacy",
  description: "Fifteen committees across four tiers. Index of agendas for Legatio 4.0.",
};

const TIER_SLUG: Record<Tier, string> = {
  Beginner: "beginner",
  Intermediate: "intermediate",
  Advanced: "advanced",
  Flagship: "flagship",
};

const ROMAN: Record<Tier, string> = {
  Beginner: "I.",
  Intermediate: "II.",
  Advanced: "III.",
  Flagship: "IV.",
};

const TIER_NUM_LABEL: Record<Tier, string> = {
  Beginner: "Tier I",
  Intermediate: "Tier II",
  Advanced: "Tier III",
  Flagship: "Tier IV",
};

const SUBTITLE_PHRASE: Record<string, string> = {
  Council: "— a Council",
  Commission: "— a Commission",
  Assembly: "— an Assembly",
  Press: "— the Press",
  Committee: "— a Committee",
  Office: "— an Office",
  Summit: "— a Summit",
  Cabinet: "— a Cabinet",
  House: "— a House",
  Court: "— a Court",
  Crisis: "— a Continuous Crisis",
  Forum: "— a Forum",
  Senate: "— a Senate",
};

export default function CommitteesPage() {
  const grouped = TIERS.map((tier) => ({
    tier,
    items: COMMITTEES.filter((c) => c.tier === tier),
  }));

  return (
    <>
      <Navigation />

      {/* PAGE HEADER */}
      <section className="page-header">
        <div className="container">
          <div className="crumb">
            <Link href="/">Legatio 4.0</Link>
            <span className="sep">·</span>
            <span>Index of Committees</span>
          </div>

          <h1>
            Fifteen rooms.
            <br />
            One <em>Kurukshetra.</em>
          </h1>

          <div className="sub-grid">
            <p className="lede">
              Across four tiers — Beginner, Intermediate, Advanced and Flagship — every committee is paired to a
              single, contemporary agenda. <em>Tier selection is informed by your experience during registration.</em>
            </p>
            <div className="header-stats" data-cols="4">
              <div>
                <div className="n">XV</div>
                <div className="l">Committees</div>
              </div>
              <div>
                <div className="n">IV</div>
                <div className="l">Tiers</div>
              </div>
              <div>
                <div className="n">
                  600<span style={{ color: "var(--accent)", fontStyle: "italic" }}>+</span>
                </div>
                <div className="l">Delegates</div>
              </div>
              <div>
                <div className="n">3</div>
                <div className="l">Days</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STICKY TIER NAV */}
      <nav className="tier-nav" aria-label="Tiers">
        <div className="container tier-nav-inner">
          <span className="lbl">Jump to tier</span>
          <ul>
            {grouped.map((g) => (
              <li key={g.tier}>
                <a href={`#${TIER_SLUG[g.tier]}`}>
                  <span className="num">{ROMAN[g.tier]}</span> {g.tier}{" "}
                  <span className="count">({String(g.items.length).padStart(2, "0")})</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <main className="container">
        {grouped.map((g) => (
          <section
            key={g.tier}
            className="tier-section"
            id={TIER_SLUG[g.tier]}
            data-tier={TIER_SLUG[g.tier]}
          >
            <div className="tier-head">
              <div className="roman">{ROMAN[g.tier]}</div>
              <div>
                <h2>{g.tier}</h2>
                <p className="desc">{TIER_DESCRIPTION[g.tier]}</p>
              </div>
              <div className="meta">
                {String(g.items.length).padStart(2, "0")} Committees
                <br />
                <strong>{TIER_NUM_LABEL[g.tier]}</strong>
              </div>
            </div>

            <div className="committees-grid">
              {g.items.map((c, idx) => {
                const number = COMMITTEES.indexOf(c) + 1;
                const reverse = idx % 2 === 1;
                return (
                  <CommitteeCard
                    key={c.id}
                    committee={c}
                    number={number}
                    reverse={reverse}
                  />
                );
              })}
            </div>
          </section>
        ))}
      </main>

      {/* CTA BANNER */}
      <section className="cta-banner" id="register">
        <div className="ornament-glow" aria-hidden="true" />
        <div className="container cta-banner-inner">
          <div>
            <div className="eyebrow">
              <span>Choose your field</span>
            </div>
            <h2>
              The conch is blown.
              <br />
              <em>Take your seat.</em>
            </h2>
            <p className="lede-dark">
              Indicate your top three committee preferences in the registration form. Tier eligibility is reviewed
              by the Secretariat based on your prior experience.
            </p>
          </div>
          <div className="cta-banner-actions">
            <Link href="/register" className="primary">
              Register as a delegate <span className="arr">→</span>
            </Link>
            <a href="mailto:legatiomun@gmail.com" className="secondary">
              Tier &amp; allotment enquiry <span className="arr">→</span>
            </a>
            <Link href="/faq" className="secondary">
              Frequently asked questions <span className="arr">→</span>
            </Link>
          </div>
        </div>
      </section>

      <Colophon contextLine="Edition 4 · Index of Committees" />
    </>
  );
}

function CommitteeCard({
  committee,
  number,
  reverse,
}: {
  committee: Committee;
  number: number;
  reverse: boolean;
}) {
  const subtitlePhrase = SUBTITLE_PHRASE[committee.subtitle] ?? `— a ${committee.subtitle}`;
  const labelText = committee.classified ? "Crisis" : committee.code === "IPC" ? "Mandate" : "Agenda";

  const classes = ["committee"];
  if (reverse) classes.push("reverse");
  if (committee.classified) classes.push("classified");

  return (
    <article className={classes.join(" ")}>
      <div className="c-emblem">
        <span className="c3" />
        <span className="c4" />
        <span className="stamp">№ {String(number).padStart(2, "0")}</span>
        {committee.image && (
          <Image
            src={committee.image}
            alt={`${committee.name} emblem`}
            width={400}
            height={300}
            style={{ objectFit: "contain", maxWidth: "100%", maxHeight: "100%", height: "auto", width: "auto" }}
          />
        )}
        <span className="classified-mark">Classified</span>
      </div>
      <div className="c-body">
        <div className="c-meta-row">
          <span className="c-tier">{committee.tier}</span>
          <span className="c-code">{committee.code}</span>
          <span className="c-subtitle">{subtitlePhrase}</span>
        </div>
        <h3 className="c-name">{committee.name}</h3>
        <div className="c-agenda-label">{labelText}</div>
        <p className="c-agenda">{committee.agenda}</p>
        {committee.note && <p className="c-note">{committee.note}</p>}
        <div className="c-actions">
          <a href="#" className="c-link">
            Read briefing <span>→</span>
          </a>
          <Link href="/register" className="c-link">
            {committee.code === "IPC" ? "Apply to the Press" : "Apply for this committee"} <span>→</span>
          </Link>
        </div>
      </div>
    </article>
  );
}
