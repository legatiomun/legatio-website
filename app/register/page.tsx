import type { Metadata } from "next";
import Link from "next/link";
import { Navigation } from "@/components/Navigation";
import { Colophon } from "@/components/landing/Colophon";

export const metadata: Metadata = {
  title: "Registration closed · Legatio 4.0",
  description: "Individual delegate registrations for Legatio 4.0 are now closed.",
};

export default function RegisterPage() {
  return (
    <>
      <Navigation />

      <main id="main" className="page">
        <div className="container">
          <div className="intro">
            <div className="tag">Registration closed</div>
            <h1>
              The register is <em>closed.</em>
            </h1>
            <p className="lede">
              Thank you to every delegate, school, and faculty advisor who chose to be part of
              Legatio 4.0.
            </p>
            <div className="intro-chips" aria-hidden="true">
              <span className="chip">
                <strong>31 Jul – 02 Aug</strong> · 2026
              </span>
              <span className="chip">DPS Siliguri</span>
              <span className="chip">Edition 4</span>
            </div>
          </div>

          <section className="success active registration-closed" aria-labelledby="registration-closed-title">
            <div className="seal" aria-hidden="true">IV</div>
            <h2 id="registration-closed-title">
              Thank you for <em>joining us.</em>
            </h2>
            <p>
              Registrations for Legatio 4.0 have now closed. We look forward to welcoming our
              delegates to DPS Siliguri for three days of diplomacy, debate, and fellowship.
            </p>
            <p className="ref">31 JUL – 02 AUG 2026 · DPS SILIGURI</p>
            <div className="actions">
              <Link href="/" className="primary">Return home <span className="arr">→</span></Link>
              <Link href="/study-guides" className="secondary">Explore study guides <span className="arr">→</span></Link>
            </div>
          </section>
        </div>
      </main>

      <Colophon contextLine="Edition 4 · Registration" />
    </>
  );
}
