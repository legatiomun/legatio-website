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

      <main className="page">
        <div className="container">
          <div className="intro">
            <div className="tag">Registration</div>
            <h1>
              Take your seat at <em>Legatio 4.0.</em>
            </h1>
            <p className="lede">
              A short form. The Secretariat will be in touch with your committee allotment.
            </p>
            <div className="intro-chips" aria-hidden="true">
              <span className="chip">
                <strong>31 Jul – 02 Aug</strong> · 2026
              </span>
              <span className="chip">DPS Siliguri</span>
              <span className="chip">~5 min</span>
              <span className="chip">Free — individual delegate</span>
            </div>
          </div>

          <RegistrationFormV2 />
        </div>
      </main>

      <Colophon contextLine="Edition 4 · Registration" />
    </>
  );
}
