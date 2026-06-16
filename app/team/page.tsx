import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navigation } from "@/components/Navigation";
import { Colophon } from "@/components/landing/Colophon";
import { SECRETARIAT, type Officer } from "@/lib/data/secretariat";

export const metadata: Metadata = {
  title: "Secretariat · Legatio 4.0 — The Kurukshetra of Diplomacy",
  description:
    "The patrons, students and Executive Board running Legatio 4.0. Names update as appointments are confirmed.",
};

function getInitials(name: string): string {
  const clean = name.replace(/^(Dr|Mr|Ms|Mrs|Prof)\.?\s+/i, "").replace(/'/g, "");
  return clean
    .split(/\s+/)
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

const EB_MONOGRAM_OVERRIDES: Record<string, string> = {
  SPECPOL: "SPCP",
  ECOFIN: "ECO",
  UNODC: "UNO",
  BRICS: "BRC",
  "UNSC-CTC": "CTC",
  "1962-CCC": "CCC",
  COPUOS: "COP",
  "US Senate": "SEN",
  "Lok Sabha": "LS",
};

function ebMonogram(committee: string | undefined): string {
  if (!committee) return "—";
  return EB_MONOGRAM_OVERRIDES[committee] ?? committee;
}

export default function TeamPage() {
  const patrons = SECRETARIAT.filter((o) => o.group === "Patrons");
  const secretariat = SECRETARIAT.filter((o) => o.group === "Secretariat");
  const eb = SECRETARIAT.filter((o) => o.group === "Executive Board");

  return (
    <>
      <Navigation />

      {/* PAGE HEADER ─────────────────────────────────────── */}
      <section className="page-header">
        <div className="container">
          <div className="crumb">
            <Link href="/">Legatio 4.0</Link>
            <span className="sep">·</span>
            <span>The Secretariat</span>
          </div>

          <h1>
            The <em>Secretariat.</em>
          </h1>

          <div className="sub-grid">
            <p className="lede">
              The patrons, students and Executive Board running Legatio 4.0. Names update as appointments are
              confirmed.
            </p>
            <div className="header-stats">
              <div>
                <div className="n">{patrons.length}</div>
                <div className="l">Patrons</div>
              </div>
              <div>
                <div className="n">{secretariat.length}</div>
                <div className="l">Secretariat</div>
              </div>
              <div>
                <div className="n">{eb.length}</div>
                <div className="l">Executive Board</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GROUP NAV ───────────────────────────────────────── */}
      <nav className="group-nav" aria-label="Groups">
        <div className="container group-nav-inner">
          <span className="lbl">Jump to</span>
          <ul>
            <li>
              <a href="#patrons">
                <span className="num">I.</span> Patrons{" "}
                <span className="count">({String(patrons.length).padStart(2, "0")})</span>
              </a>
            </li>
            <li>
              <a href="#secretariat">
                <span className="num">II.</span> Secretariat{" "}
                <span className="count">({String(secretariat.length).padStart(2, "0")})</span>
              </a>
            </li>
            <li>
              <a href="#executive-board">
                <span className="num">III.</span> Executive Board{" "}
                <span className="count">({String(eb.length).padStart(2, "0")})</span>
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <main id="main" className="container">
        {/* PATRONS ────────────────────────────────────────── */}
        <section className="group" id="patrons">
          <div className="group-head">
            <div className="roman">I.</div>
            <div>
              <h2>The Patrons.</h2>
              <p className="desc">The faculty and leadership at DPS Siliguri who anchor the conference.</p>
            </div>
            <div className="meta">
              {String(patrons.length).padStart(2, "0")} Members
              <br />
              <strong>Patrons</strong>
            </div>
          </div>

          <div className="patrons">
            {patrons.map((p) => (
              <PatronCard key={p.id} officer={p} />
            ))}
          </div>
        </section>

        {/* SECRETARIAT ────────────────────────────────────── */}
        <section className="group" id="secretariat">
          <div className="group-head">
            <div className="roman">II.</div>
            <div>
              <h2>The Secretariat.</h2>
              <p className="desc">The students organising the conference — led by the Secretary-General.</p>
            </div>
            <div className="meta">
              {String(secretariat.length).padStart(2, "0")} Members
              <br />
              <strong>Secretariat</strong>
            </div>
          </div>

          <div className="usg-grid" data-orphans={secretariat.length % 4}>
            {secretariat.map((o) => (
              <UsgCard key={o.id} officer={o} />
            ))}
          </div>
        </section>

        {/* EXECUTIVE BOARD ────────────────────────────────── */}
        <section className="group" id="executive-board">
          <div className="group-head">
            <div className="roman">III.</div>
            <div>
              <h2>The Executive Board.</h2>
              <p className="desc">
                Chairs, Vice-Chairs and Crisis Directors for each committee. The full list publishes one month
                before the conference.
              </p>
            </div>
            <div className="meta">
              {eb.length} Officers
              <br />
              <strong>Across XV committees</strong>
            </div>
          </div>

          <div className="eb-grid">
            {eb.map((o) => (
              <EbCard key={o.id} officer={o} />
            ))}
          </div>
        </section>
      </main>

      {/* CTA BANNER ──────────────────────────────────────── */}
      <section className="cta-banner" id="register">
        <div className="ornament-glow" aria-hidden="true" />
        <div className="container cta-banner-inner">
          <div>
            <div className="eyebrow">
              <span>Register</span>
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
              Write to the Secretariat <span className="arr">→</span>
            </a>
            <Link href="/faq" className="secondary">
              Frequently asked questions <span className="arr">→</span>
            </Link>
          </div>
        </div>
      </section>

      <Colophon contextLine="Folio IV · The Secretariat" />
    </>
  );
}

function PatronCard({ officer }: { officer: Officer }) {
  const initials = officer.placeholder ? "—" : getInitials(officer.name);
  return (
    <article className="patron">
      <div className={`portrait${officer.photo ? " has-photo" : ""}`} aria-hidden="true">
        {officer.photo ? (
          <Image
            src={officer.photo}
            alt=""
            fill
            sizes="120px"
            style={{
              objectFit: "cover",
              objectPosition: officer.photoPosition ?? "center",
              transform: officer.photoTransform,
              borderRadius: "50%",
            }}
          />
        ) : (
          initials
        )}
      </div>
      <div className="role">{officer.role}</div>
      <div className="name">{officer.name}</div>
      {officer.quote ? (
        <blockquote className="quote">{officer.quote}</blockquote>
      ) : (
        <p className="note">Message to follow.</p>
      )}
    </article>
  );
}

function UsgCard({ officer }: { officer: Officer }) {
  const initials = officer.placeholder ? "—" : getInitials(officer.name);
  const cls = officer.placeholder ? "usg placeholder" : "usg";
  return (
    <article className={cls}>
      <div className={`portrait-sm${officer.photo ? " has-photo" : ""}`} aria-hidden="true">
        {officer.photo ? (
          <Image
            src={officer.photo}
            alt=""
            fill
            sizes="88px"
            style={{
              objectFit: "cover",
              objectPosition: officer.photoPosition ?? "center",
              transform: officer.photoTransform,
              borderRadius: "50%",
            }}
          />
        ) : (
          initials
        )}
      </div>
      <h3 className="role">{officer.role}</h3>
      <div className="name">{officer.placeholder ? "TBA · 2026" : officer.name}</div>
    </article>
  );
}

function EbCard({ officer }: { officer: Officer }) {
  const monogram = ebMonogram(officer.committee);
  const cls = officer.placeholder ? "eb placeholder" : "eb";
  return (
    <article className={cls}>
      <div className="portrait-md" aria-hidden="true">
        {monogram}
      </div>
      <div className="body">
        <div className="committee">{officer.committee ?? ""}</div>
        <p className="role-line">{officer.role}</p>
        <div className="name">{officer.placeholder ? "Appointment pending" : officer.name}</div>
      </div>
      <Link href="/committees" className="link">
        Committee →
      </Link>
    </article>
  );
}
