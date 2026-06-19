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

          <RegistrationFormV2 />
        </div>
      </main>

      <Colophon contextLine="Edition 4 · Registration" />
    </>
  );
}
