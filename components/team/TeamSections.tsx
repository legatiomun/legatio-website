"use client";

import { motion } from "framer-motion";
import { PortraitFrame } from "@/components/PortraitFrame";
import { Reveal, RevealStagger, StaggerItem } from "@/components/motion/Reveal";
import { SECRETARIAT, type Officer } from "@/lib/data/secretariat";

export function TeamSections() {
  const featured = SECRETARIAT.find((o) => o.id === "sinjini-banarjee");
  const patrons = SECRETARIAT.filter((o) => o.group === "Patrons");
  const secretariat = SECRETARIAT.filter((o) => o.group === "Secretariat" && o.id !== "sinjini-banarjee");
  const eb = SECRETARIAT.filter((o) => o.group === "Executive Board");

  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-8">
      {/* Featured Sec-Gen masthead */}
      {featured && <Masthead officer={featured} />}

      {/* Patrons — 3 large portraits */}
      <section className="mt-32">
        <Reveal>
          <SectionHead label="Patronage" caption="The leadership behind Legatio 4.0." />
        </Reveal>

        <RevealStagger className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {patrons.map((o) => (
            <StaggerItem key={o.id}>
              <PatronCard o={o} />
            </StaggerItem>
          ))}
        </RevealStagger>
      </section>

      {/* Conference Secretariat */}
      <section className="mt-32">
        <Reveal>
          <SectionHead label="Conference Secretariat" caption="The officers convening the conference." count={secretariat.length} />
        </Reveal>

        <RevealStagger
          className="mt-12 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          stagger={0.05}
        >
          {secretariat.map((o) => (
            <StaggerItem key={o.id}>
              <PersonCard o={o} />
            </StaggerItem>
          ))}
        </RevealStagger>
      </section>

      {/* Executive Board — committee chairs */}
      <section className="mt-32">
        <Reveal>
          <SectionHead
            label="Executive Board"
            caption="Chairpersons, vice-chairs, crisis directors and editors across all fifteen committees."
            count={eb.length}
          />
        </Reveal>

        <RevealStagger
          className="mt-12 grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          stagger={0.04}
        >
          {eb.map((o) => (
            <StaggerItem key={o.id}>
              <PersonCard o={o} showCommittee />
            </StaggerItem>
          ))}
        </RevealStagger>
      </section>

      <p className="mt-24 max-w-prose text-sm text-mute">
        Portraits marked &mdash; will be filled as appointments are announced. To add a photo, drop a square or 4:5
        JPG into <code className="rounded bg-cream/60 px-1.5 py-0.5 text-xs">public/team/&lt;id&gt;.jpg</code> and
        set <code className="rounded bg-cream/60 px-1.5 py-0.5 text-xs">photo</code> on the matching entry in{" "}
        <code className="rounded bg-cream/60 px-1.5 py-0.5 text-xs">lib/data/secretariat.ts</code>.
      </p>
    </div>
  );
}

function Masthead({ officer }: { officer: Officer }) {
  return (
    <section className="mt-16">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:items-center">
        <Reveal y={28}>
          <div className="relative max-w-[460px]">
            <PortraitFrame name={officer.name} photo={officer.photo} className="aspect-[4/5]" />
            <div className="pointer-events-none absolute -bottom-3 -right-3 h-24 w-24 border border-line bg-paper/80" aria-hidden />
            <div className="pointer-events-none absolute -top-3 -left-3 h-24 w-24 border border-accent/40" aria-hidden />
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-accent">
              {officer.role} · Legatio 4.0
            </p>
            <h2 className="mt-5 font-serif text-5xl leading-[0.95] text-ink sm:text-6xl">
              {officer.name.split(" ").map((w, i) => (
                <motion.span
                  key={i}
                  className="inline-block"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.7, delay: 0.15 + i * 0.08, ease: [0.22, 0.8, 0.2, 1] }}
                >
                  {w}
                  {i < officer.name.split(" ").length - 1 && <>&nbsp;</>}
                </motion.span>
              ))}
            </h2>

            {officer.quote && (
              <figure className="mt-8 max-w-xl border-l-2 border-accent pl-5">
                <blockquote className="font-serif text-xl italic leading-relaxed text-ink/80 sm:text-2xl">
                  &ldquo;{officer.quote}&rdquo;
                </blockquote>
              </figure>
            )}

            <a
              href="/about#letters"
              className="mt-8 inline-flex items-center gap-2 border-b border-ink/70 pb-1 text-sm text-ink transition-colors hover:border-accent hover:text-accent"
            >
              Read the full letter
              <span aria-hidden>→</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function SectionHead({ label, caption, count }: { label: string; caption: string; count?: number }) {
  return (
    <div className="flex items-end justify-between gap-6 border-b border-line pb-5">
      <div>
        <p className="text-xs uppercase tracking-wider text-accent">{label}</p>
        <p className="mt-2 max-w-xl text-base text-mute">{caption}</p>
      </div>
      {count !== undefined && (
        <p className="text-xs uppercase tracking-wider text-mute">{String(count).padStart(2, "0")}</p>
      )}
    </div>
  );
}

function PatronCard({ o }: { o: Officer }) {
  return (
    <article className="group">
      <PortraitFrame name={o.name} photo={o.photo} empty={o.placeholder} />
      <div className="mt-4">
        <p className="text-xs uppercase tracking-wider text-accent">{o.role}</p>
        <p className={`mt-1 font-serif text-2xl leading-tight ${o.placeholder ? "text-mute" : "text-ink"}`}>
          {o.name}
        </p>
        {o.quote && (
          <p className="mt-3 text-sm italic leading-relaxed text-ink/70">&ldquo;{o.quote}&rdquo;</p>
        )}
      </div>
    </article>
  );
}

function PersonCard({ o, showCommittee }: { o: Officer; showCommittee?: boolean }) {
  return (
    <article className="group">
      <PortraitFrame
        name={o.name}
        photo={o.photo}
        empty={o.placeholder}
        caption={showCommittee && o.committee ? o.committee : undefined}
      />
      <div className="mt-3">
        <p className="text-[11px] uppercase tracking-wider text-mute">{o.role}</p>
        <p className={`mt-1 font-serif text-base leading-tight ${o.placeholder ? "text-mute" : "text-ink"}`}>
          {o.name}
        </p>
        {showCommittee && o.committee && (
          <p className="mt-1 text-[11px] uppercase tracking-wider text-accent">{o.committee}</p>
        )}
      </div>
    </article>
  );
}
