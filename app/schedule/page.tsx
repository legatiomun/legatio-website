import type { Metadata } from "next";
import Link from "next/link";
import { Navigation } from "@/components/Navigation";
import { Colophon } from "@/components/landing/Colophon";
import { ScheduleTabs } from "@/components/landing/ScheduleTabs";

export const metadata: Metadata = {
  title: "Schedule · Legatio 4.0 — The Kurukshetra of Diplomacy",
  description:
    "Three days, one story. The itinerary for Legatio 4.0 — 31 July to 2 August 2026.",
};

export default function SchedulePage() {
  return (
    <>
      <Navigation />

      <main id="main">
      {/* PAGE HEADER (compact) */}
      <section className="page-header page-header-compact">
        <div className="container">
          <div className="crumb">
            <Link href="/">Legatio 4.0</Link>
            <span className="sep">·</span>
            <span>Schedule</span>
          </div>
          <div className="row">
            <h1>
              Three days,
              <br />
              one <em>story.</em>
            </h1>
            <p className="lede">
              From the blowing of the conch to the settling of the dust. Times in IST; programme indicative.
            </p>
          </div>
        </div>
      </section>

      <ScheduleTabs />

      {/* CTA BANNER */}
      <section className="cta-banner" id="register">
        <div className="ornament-glow" aria-hidden="true" />
        <div className="container cta-banner-inner">
          <div>
            <div className="eyebrow">
              <span>Three days · One field</span>
            </div>
            <h2>
              Take your seat
              <br />
              at <em>Legatio 4.0.</em>
            </h2>
            <p className="lede-dark">
              Individual delegate registrations are accepted on this site. School delegations should be coordinated
              by your institution directly with the Secretariat.
            </p>
          </div>
          <div className="cta-banner-actions">
            <Link href="/register" className="primary">
              Register as a delegate <span className="arr">→</span>
            </Link>
            <a href="mailto:legatiomun@gmail.com" className="secondary">
              School delegation enquiry <span className="arr">→</span>
            </a>
            <Link href="/faq" className="secondary">
              Frequently asked questions <span className="arr">→</span>
            </Link>
          </div>
        </div>
      </section>

      <Colophon contextLine="Edition 4 · The Three Days" />
      </main>
    </>
  );
}
