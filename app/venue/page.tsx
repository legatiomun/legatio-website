import type { Metadata } from "next";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/sections/Footer";
import { PageHeader } from "@/components/PageHeader";
import { Reveal, RevealStagger, StaggerItem, WordReveal } from "@/components/motion/Reveal";
import { Magnetic } from "@/components/motion/Magnetic";

export const metadata: Metadata = {
  title: "Venue & Travel — Legatio 4.0",
  description: "How to reach DPS Siliguri for Legatio 4.0 — Bagdogra airport, NJP railway, accommodation pointers.",
};

const TRAVEL = [
  {
    label: "By Air",
    code: "IXB",
    title: "Bagdogra International Airport",
    detail: "Approximately 15 km from campus. Daily flights from Delhi, Kolkata, Mumbai, Bengaluru and Guwahati.",
    distance: "~15 km",
  },
  {
    label: "By Rail",
    code: "NJP",
    title: "New Jalpaiguri Railway Station",
    detail: "Approximately 14 km from campus. The main rail head for Siliguri, connected to all major Indian cities.",
    distance: "~14 km",
  },
  {
    label: "Local Rail",
    code: "SGUJ",
    title: "Siliguri Junction",
    detail: "A smaller heritage station serving the Northeast frontier, about 6 km from campus.",
    distance: "~6 km",
  },
  {
    label: "Stay",
    code: "STAY",
    title: "Accommodation",
    detail: "A curated list of partner hotels and homestays will be shared with allotted delegations. Group rates are available on request for outstation schools.",
    distance: "On request",
  },
];

export default function VenuePage() {
  return (
    <>
      <Navigation />
      <main className="bg-paper pb-24">
        <PageHeader
          eyebrow="Venue · Travel"
          title={<>DPS Siliguri, West Bengal.</>}
          lede="Legatio 4.0 is hosted on the DPS Siliguri campus, a short ride from Bagdogra airport and New Jalpaiguri railway, in the foothills of the Eastern Himalayas."
        />

        <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
            <Reveal>
              <div className="lg:sticky lg:top-32 lg:self-start">
                <div className="relative overflow-hidden border border-line bg-cream/50 p-6 sm:p-8">
                  <span aria-hidden className="absolute -left-1 -top-1 h-3 w-3 border-l border-t border-accent" />
                  <span aria-hidden className="absolute -right-1 -top-1 h-3 w-3 border-r border-t border-accent" />
                  <span aria-hidden className="absolute -left-1 -bottom-1 h-3 w-3 border-l border-b border-accent" />
                  <span aria-hidden className="absolute -right-1 -bottom-1 h-3 w-3 border-r border-b border-accent" />

                  <p className="text-xs uppercase tracking-wider text-accent">The campus</p>
                  <h2 className="mt-3 font-serif text-3xl text-ink sm:text-5xl">
                    <WordReveal text="Delhi Public School, Siliguri." />
                  </h2>
                  <address className="mt-6 block not-italic font-serif text-lg leading-relaxed text-ink/80">
                    Delhi Public School<br />
                    Siliguri, West Bengal<br />
                    India
                  </address>
                  <p className="mt-6 border-t border-line pt-4 font-mono text-xs uppercase tracking-wider text-mute">
                    26.7271° N · 88.4327° E
                  </p>

                  <div className="mt-8 flex flex-wrap gap-3">
                    <Magnetic strength={0.16}>
                      <a
                        href="https://maps.google.com/?q=Delhi+Public+School+Siliguri"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-2 border border-ink bg-ink px-5 py-2.5 text-sm text-paper transition-colors hover:bg-accent hover:border-accent"
                      >
                        Open in Google Maps
                        <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                      </a>
                    </Magnetic>
                    <a
                      href="mailto:legatiomun@gmail.com?subject=Travel%20enquiry%20%E2%80%94%20Legatio%204.0"
                      className="border border-line px-5 py-2.5 text-sm text-ink transition-colors hover:border-ink hover:bg-cream/60"
                    >
                      Email a travel query
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>

            <RevealStagger className="space-y-4" stagger={0.08}>
              <Reveal>
                <p className="text-xs uppercase tracking-wider text-accent">Getting here</p>
              </Reveal>
              {TRAVEL.map((t) => (
                <StaggerItem key={t.code}>
                  <div className="group relative grid grid-cols-[80px_1fr] gap-5 border border-line bg-paper p-6 transition-all hover:border-ink hover:shadow-[0_18px_40px_-24px_rgba(27,26,23,0.4)]">
                    <span
                      aria-hidden
                      className="absolute left-0 top-0 h-full w-0 bg-accent/[0.06] transition-all duration-500 group-hover:w-full"
                    />
                    <div className="relative">
                      <p className="font-mono text-[11px] uppercase tracking-wider text-accent">{t.code}</p>
                      <p className="mt-2 text-xs uppercase tracking-wider text-mute">{t.label}</p>
                    </div>
                    <div className="relative">
                      <div className="flex items-baseline justify-between">
                        <p className="font-serif text-xl leading-tight text-ink transition-colors group-hover:text-accent">
                          {t.title}
                        </p>
                        <p className="ml-3 whitespace-nowrap font-mono text-xs text-mute">{t.distance}</p>
                      </div>
                      <p className="mt-3 max-w-md text-sm leading-relaxed text-ink/75">{t.detail}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </RevealStagger>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
