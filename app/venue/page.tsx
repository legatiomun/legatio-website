import type { Metadata } from "next";
import Link from "next/link";
import { Navigation } from "@/components/Navigation";
import { Colophon } from "@/components/landing/Colophon";
import { PageHeader } from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Venue & Travel · Legatio 4.0",
  description:
    "How to reach DPS Siliguri for Legatio 4.0 — Bagdogra airport, NJP railway, accommodation pointers.",
};

const TRAVEL = [
  {
    label: "By Air",
    code: "IXB",
    title: "Bagdogra International Airport",
    detail:
      "Approximately 15 km from campus. Daily flights from Delhi, Kolkata, Mumbai, Bengaluru and Guwahati.",
    distance: "~15 km",
  },
  {
    label: "By Rail",
    code: "NJP",
    title: "New Jalpaiguri Railway Station",
    detail:
      "Approximately 14 km from campus. The main rail head for Siliguri, connected to all major Indian cities.",
    distance: "~14 km",
  },
  {
    label: "Local Rail",
    code: "SGUJ",
    title: "Siliguri Junction",
    detail:
      "A smaller heritage station serving the Northeast frontier, about 6 km from campus.",
    distance: "~6 km",
  },
  {
    label: "Stay",
    code: "STAY",
    title: "Accommodation",
    detail:
      "A curated list of partner hotels and homestays will be shared with allotted delegations. Group rates are available on request for outstation schools.",
    distance: "On request",
  },
];

export default function VenuePage() {
  return (
    <>
      <Navigation />

      <PageHeader
        eyebrow="Venue · Travel"
        title={
          <>
            DPS Siliguri, <em>West Bengal.</em>
          </>
        }
        lede="Legatio 4.0 is hosted on the DPS Siliguri campus — a short ride from Bagdogra airport and New Jalpaiguri railway, in the foothills of the Eastern Himalayas."
      />

      <main className="container" style={{ padding: "70px 40px 40px" }}>
        <div className="venue-grid">
          {/* ── Campus card ── */}
          <article className="venue-campus">
            <div className="venue-campus-corner venue-corner-tl" aria-hidden />
            <div className="venue-campus-corner venue-corner-tr" aria-hidden />
            <div className="venue-campus-corner venue-corner-bl" aria-hidden />
            <div className="venue-campus-corner venue-corner-br" aria-hidden />

            <p className="venue-eyebrow">The Campus</p>
            <h2 className="venue-title">
              Delhi Public School,
              <br />
              Siliguri.
            </h2>
            <address className="venue-address">
              Delhi Public School
              <br />
              Siliguri, West Bengal
              <br />
              India
            </address>
            <p className="venue-coords">26.7271° N · 88.4327° E</p>

            <div className="venue-actions">
              <a
                href="https://maps.google.com/?q=Delhi+Public+School+Siliguri"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                Open in Google Maps <span className="arr">→</span>
              </a>
              <a
                href="mailto:legatiomun@gmail.com?subject=Travel%20enquiry%20%E2%80%94%20Legatio%204.0"
                className="btn btn-ghost"
              >
                Email a travel query <span className="arr">→</span>
              </a>
            </div>
          </article>

          {/* ── Getting here ── */}
          <section className="venue-getting">
            <p className="venue-eyebrow venue-getting-eyebrow">Getting Here</p>

            <ul className="venue-travel">
              {TRAVEL.map((t) => (
                <li key={t.code} className="venue-row">
                  <div className="venue-row-meta">
                    <span className="venue-row-code">{t.code}</span>
                    <span className="venue-row-label">{t.label}</span>
                  </div>
                  <div className="venue-row-body">
                    <div className="venue-row-headline">
                      <h3 className="venue-row-title">{t.title}</h3>
                      <span className="venue-row-distance">{t.distance}</span>
                    </div>
                    <p className="venue-row-detail">{t.detail}</p>
                  </div>
                </li>
              ))}
            </ul>

            <p className="venue-foot-note">
              School delegations needing transport help can write to{" "}
              <Link
                href="mailto:legatiomun@gmail.com"
                style={{
                  color: "var(--accent)",
                  borderBottom: "1px solid var(--accent)",
                  paddingBottom: 2,
                }}
              >
                legatiomun@gmail.com
              </Link>{" "}
              once allotted.
            </p>
          </section>
        </div>
      </main>

      <Colophon contextLine="Edition 4 · Venue & Travel" />
    </>
  );
}
