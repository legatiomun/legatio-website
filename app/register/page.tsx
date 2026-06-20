import type { Metadata } from "next";
import { Navigation } from "@/components/Navigation";
import { Colophon } from "@/components/landing/Colophon";
import { RegistrationFormV2 } from "@/components/landing/RegistrationFormV2";

export const metadata: Metadata = {
  title: "Register · Legatio 4.0",
  description: "Take your seat at Legatio 4.0 — individual delegate registration.",
};

export default function RegisterPage() {
  return (
    <>
      <Navigation />

      <main id="main" className="page">
        <div className="container">
          <div className="intro">
            <div className="tag">Registration</div>
            <h1>
              Take your seat at <em>Legatio 4.0.</em>
            </h1>
            <p className="lede">
              A short form. The Secretariat will be in touch with your committee allotment.
            </p>
            <a
              href="https://drive.google.com/file/d/1emuU8sTqBOrZS3vKAkNUpK_3hJze65k6/view"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                marginTop: 16,
                fontFamily: "var(--font-mono), monospace",
                fontSize: 11,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "var(--accent)",
                textDecoration: "none",
                borderBottom: "1px solid color-mix(in oklab, var(--accent) 35%, transparent)",
                paddingBottom: 2,
              }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              Watch the registration &amp; payment tutorial ↗
            </a>
            <div className="intro-chips" aria-hidden="true">
              <span className="chip">
                <strong>31 Jul – 02 Aug</strong> · 2026
              </span>
              <span className="chip">DPS Siliguri</span>
              <span className="chip">~5 min</span>
              <span className="chip"><strong>₹3,000</strong> · individual delegate</span>
            </div>
          </div>

          <div
            role="alert"
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 12,
              margin: "0 auto 32px",
              maxWidth: 640,
              padding: "14px 18px",
              border: "1px solid color-mix(in oklab, var(--maroon) 40%, transparent)",
              background: "color-mix(in oklab, var(--maroon) 6%, var(--paper))",
              borderRadius: 4,
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--maroon)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              style={{ flexShrink: 0, marginTop: 2 }}
            >
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
              <line x1="12" y1="9" x2="12" y2="13" />
              <line x1="12" y1="17" x2="12.01" y2="17" />
            </svg>
            <p
              style={{
                margin: 0,
                fontFamily: "var(--font-serif), serif",
                fontSize: 14,
                lineHeight: 1.55,
                color: "var(--maroon)",
              }}
            >
              <strong>Students of DPS Siliguri and DPS Fulbari are strictly not permitted to register through this form.</strong>{" "}
              Please contact your school&apos;s MUN Co-ordinator for participation details.
            </p>
          </div>

          <RegistrationFormV2 />
        </div>
      </main>

      <Colophon contextLine="Edition 4 · Registration" />
    </>
  );
}
