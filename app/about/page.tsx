import type { Metadata } from "next";
import Link from "next/link";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/sections/Footer";
import { PageHeader } from "@/components/PageHeader";
import { LETTERS } from "@/lib/data/letters";
import { EDITIONS } from "@/lib/data/legacy";
import { Reveal, RevealStagger, StaggerItem, WordReveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "About — Legatio 4.0",
  description: "About Legatio 4.0 — theme, philosophy, and the legacy of past editions.",
};

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <main id="main" className="bg-paper pb-24">
        <PageHeader
          eyebrow="About"
          title={<>The Kurukshetra of Diplomacy.</>}
          lede="Legatio is DPS Siliguri's flagship Model United Nations conference. Now in its fourth edition, the conference returns under the theme of War and Peace, rooted in the Mahabharata and the tradition of Chanakya Neeti."
        />

        {/* Opening prose */}
        <section className="mx-auto max-w-3xl px-5 py-24 sm:px-8">
          <div className="space-y-6 font-serif text-xl leading-[1.75] text-ink/85">
            <Reveal>
              <p>
                Born from a conviction that young minds are capable of extraordinary things when placed
                in extraordinary environments, Legatio has grown across three editions into the most
                anticipated MUN in the North-Eastern circuit, and one of the most respected in the
                country.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p>
                The fourth edition returns under the theme of War and Peace: perhaps the oldest, most
                enduring tension in human civilisation. It is a theme that demands more than research.
                It demands empathy, moral clarity, and the courage to hold a position when the world
                around you pushes back.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p>
                Rooted in the philosophy of the Mahabharata and anchored by the tagline{" "}
                <em>Kurukshetra of Diplomacy</em>, this edition invites every delegate to step into
                that ancient field, not with weapons, but with words.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Mid pull quote */}
        <section className="border-y border-line bg-ink py-24 text-paper sm:py-32">
          <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
            <Reveal>
              <p className="text-xs uppercase tracking-[0.22em] text-accent">A founding conviction</p>
            </Reveal>
            <blockquote className="mt-8 font-serif text-3xl italic leading-snug sm:text-5xl">
              <WordReveal text={"“Every delegate stands as Arjuna, compelled not by comfort but by duty, tested not by ease but by the full weight of consequence.”"} />
            </blockquote>
          </div>
        </section>

        {/* Past Editions */}
        <section id="legacy" className="bg-cream/40">
          <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
            <div className="grid gap-12 lg:grid-cols-[1fr_2fr]">
              <Reveal>
                <div className="lg:sticky lg:top-32">
                  <p className="text-xs uppercase tracking-wider text-accent">Past Editions</p>
                  <h2 className="mt-3 font-serif text-3xl text-ink sm:text-5xl">
                    <WordReveal text="Three editions. One legacy." />
                  </h2>
                  <p className="mt-5 max-w-sm text-base text-mute">
                    A standard, once set, inspires others to reach for it.
                  </p>
                </div>
              </Reveal>

              <RevealStagger className="space-y-10" stagger={0.1}>
                {EDITIONS.map((ed, i) => (
                  <StaggerItem key={ed.label}>
                    <div className="group relative grid grid-cols-[60px_1fr] items-start gap-5 border-t border-line pt-8 sm:gap-8">
                      <p className="font-mono text-xs uppercase tracking-wider text-accent">
                        0{i + 1}
                      </p>
                      <div>
                        <p className="font-serif text-3xl text-ink transition-colors group-hover:text-accent">
                          {ed.label}
                        </p>
                        <p className="mt-1 text-xs uppercase tracking-wider text-mute">{ed.year}</p>
                        <p className="mt-4 max-w-xl font-serif text-lg italic leading-relaxed text-ink/75">
                          &ldquo;{ed.byline}&rdquo;
                        </p>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </RevealStagger>
            </div>
          </div>
        </section>

        {/* Letters */}
        <section id="letters" className="bg-paper">
          <div className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
            <Reveal>
              <p className="text-xs uppercase tracking-wider text-accent">Messages</p>
              <h2 className="mt-3 font-serif text-3xl text-ink sm:text-5xl">
                <WordReveal text="Letters from the desk." />
              </h2>
            </Reveal>

            <div className="mt-16 space-y-20">
              {LETTERS.map((l, idx) => (
                <Reveal key={l.id} delay={0}>
                  <article
                    className={`grid gap-8 border-t border-line pt-12 lg:grid-cols-[260px_1fr] lg:gap-16`}
                  >
                    <div className="lg:sticky lg:top-32 lg:self-start">
                      <p className="font-mono text-xs uppercase tracking-wider text-accent">
                        Letter 0{idx + 1}
                      </p>
                      <p className="mt-3 text-xs uppercase tracking-wider text-mute">{l.role}</p>
                      <p className="mt-1 font-serif text-2xl leading-tight text-ink">{l.name}</p>
                      <span aria-hidden className="mt-6 block h-px w-12 bg-accent" />
                    </div>
                    <div className="max-w-prose space-y-5 font-serif text-[17px] leading-[1.8] text-ink/85">
                      {l.body.map((para, i) => (
                        <p
                          key={i}
                          className={
                            i === 0
                              ? "first-letter:float-left first-letter:mr-3 first-letter:font-serif first-letter:text-6xl first-letter:leading-[0.85] first-letter:text-accent"
                              : ""
                          }
                        >
                          {para}
                        </p>
                      ))}
                      <p className="pt-2 text-sm text-mute">{l.closing}</p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Closing CTA */}
        <section className="border-t border-line bg-cream/40">
          <div className="mx-auto max-w-4xl px-5 py-20 text-center sm:px-8">
            <Reveal>
              <p className="text-xs uppercase tracking-wider text-accent">The field is set</p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-4 font-serif text-3xl text-ink sm:text-5xl">
                <WordReveal text="The standard is restored. Welcome to Legatio 4.0." />
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <div
                style={{
                  marginTop: 40,
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  gap: 14,
                }}
              >
                <Link href="/committees" className="btn btn-primary">
                  View committees <span className="arr">→</span>
                </Link>
                <Link href="/register" className="btn btn-ghost">
                  Register <span className="arr">→</span>
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
