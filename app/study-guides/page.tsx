import type { Metadata } from "next";
import Link from "next/link";
import { Navigation } from "@/components/Navigation";
import { Colophon } from "@/components/landing/Colophon";
import { CommitteeEmblem } from "@/components/CommitteeEmblem";
import { COMMITTEES, TIERS, TIER_DESCRIPTION, type Tier, type Committee } from "@/lib/data/committees";

export const metadata: Metadata = {
  title: "Study Guides · Legatio 4.0 — The Kurukshetra of Diplomacy",
  description: "Every committee background guide for Legatio 4.0, in one index.",
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

export default function StudyGuidesPage() {
  const grouped = TIERS.map((tier) => ({
    tier,
    items: COMMITTEES.filter((c) => c.tier === tier),
  }));

  const totalGuides = COMMITTEES.reduce((sum, c) => sum + (c.studyGuides?.length ?? 0), 0);

  return (
    <>
      <Navigation />

      {/* PAGE HEADER */}
      <section className="page-header">
        <div className="container">
          <div className="crumb">
            <Link href="/">Legatio 4.0</Link>
            <span className="sep">·</span>
            <span>Study Guides</span>
          </div>

          <h1>
            Read before
            <br />
            you <em>arrive.</em>
          </h1>

          <div className="sub-grid">
            <p className="lede">
              Every committee&rsquo;s background guide, indexed in one place. <em>Read the guide for your
              allotted committee before the conference begins.</em>
            </p>
            <div className="header-stats">
              <div>
                <div className="n">XV</div>
                <div className="l">Committees</div>
              </div>
              <div>
                <div className="n">{String(totalGuides).padStart(2, "0")}</div>
                <div className="l">Guides</div>
              </div>
              <div>
                <div className="n">IV</div>
                <div className="l">Tiers</div>
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

      <main id="main" className="container">
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

            <ul className="sg-list">
              {g.items.map((c) => (
                <StudyGuideRow key={c.id} committee={c} />
              ))}
            </ul>
          </section>
        ))}
      </main>

      {/* CTA BANNER */}
      <section className="cta-banner">
        <div className="ornament-glow" aria-hidden="true" />
        <div className="container cta-banner-inner">
          <div>
            <div className="eyebrow">
              <span>Prepare for the floor</span>
            </div>
            <h2>
              Know your brief.
              <br />
              <em>Walk in ready.</em>
            </h2>
            <p className="lede-dark">
              Haven&rsquo;t registered yet? Indicate your top three committee preferences on the registration
              form, then return here for your background guide.
            </p>
          </div>
          <div className="cta-banner-actions">
            <Link href="/committees" className="primary">
              Browse committees <span className="arr">→</span>
            </Link>
            <a href="mailto:legatiomun@gmail.com" className="secondary">
              Missing a guide? Let us know <span className="arr">→</span>
            </a>
          </div>
        </div>
      </section>

      <Colophon contextLine="Edition 4 · Study Guides" />
    </>
  );
}

function StudyGuideRow({ committee }: { committee: Committee }) {
  const guides = committee.studyGuides ?? [];

  return (
    <li className={`sg-row${committee.classified ? " classified" : ""}`}>
      <div className="sg-emblem">
        <CommitteeEmblem committee={committee} height={64} maxWidth={140} />
      </div>
      <div className="sg-info">
        <div className="sg-meta-row">
          <span className="sg-code">{committee.code}</span>
          {committee.classified && <span className="sg-tag">Classified</span>}
        </div>
        <p className="sg-name">{committee.name}</p>
      </div>
      <div className="sg-links">
        {guides.length > 0 ? (
          guides.map((guide) => (
            <a
              key={guide.href}
              href={guide.href}
              className="sg-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              {guide.label} <span>→</span>
            </a>
          ))
        ) : (
          <span className="sg-pending">Guide coming soon</span>
        )}
      </div>
    </li>
  );
}
