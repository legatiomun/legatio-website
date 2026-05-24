import Image from "next/image";
import Link from "next/link";
import { Navigation } from "@/components/Navigation";
import { ChakraSymbol } from "@/components/landing/ChakraSymbol";
import { HeroCountdown } from "@/components/landing/HeroCountdown";
import { Colophon } from "@/components/landing/Colophon";
import { COMMITTEES } from "@/lib/data/committees";

export default function HomePage() {
  // Split the committee index into two columns for the design's two-column layout
  const half = Math.ceil(COMMITTEES.length / 2);
  const leftColumn = COMMITTEES.slice(0, half);
  const rightColumn = COMMITTEES.slice(half);

  return (
    <>
      <ChakraSymbol />
      <Navigation />

      {/* HERO ─────────────────────────────────────────────── */}
      <section className="hero">
        <svg className="chakra-bg" aria-hidden="true">
          <use href="#chakra" />
        </svg>

        <div
          className="container"
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            flex: 1,
          }}
        >
          <div className="hero-top-strip">
            <span className="hr" />
            <span className="mid">
              Fourth Edition · 2026 · DPS Siliguri
            </span>
            <span className="hr" />
          </div>

          <div className="hero-emblem">
            <Image
              src="/images/logo.png"
              alt="Legatio 4.0 — The Kurukshetra of Diplomacy"
              width={1120}
              height={1120}
              priority
            />
          </div>

          <div className="hero-shloka">
            <div className="ornament">
              <span>✦</span>
            </div>
            <div className="trans">
              <em>&ldquo; War is the failure of diplomacy. Diplomacy is the art of preventing it. &rdquo;</em>
            </div>
          </div>

          <div className="hero-meta">
            <div className="col">
              <div className="lbl">The Field</div>
              <div className="v">
                Delhi Public School<small>Siliguri · West Bengal</small>
              </div>
            </div>
            <div className="sep" aria-hidden="true" />
            <div className="col">
              <div className="lbl">The Days</div>
              <div className="v">
                31 Jul — 02 Aug<small>Friday — Sunday · 2026</small>
              </div>
            </div>
            <div className="sep" aria-hidden="true" />
            <div className="col">
              <div className="lbl">The Conch</div>
              <HeroCountdown />
            </div>
          </div>

          <div className="hero-actions">
            <Link href="/register" className="btn btn-primary">
              Register as a delegate <span className="arr">→</span>
            </Link>
            <a href="#prelude" className="btn btn-ghost">
              Read the prelude <span className="arr">↓</span>
            </a>
          </div>

          <div className="scroll-cue">Scroll · enter the field</div>
        </div>
      </section>

      {/* PRELUDE ──────────────────────────────────────────── */}
      <section className="prelude" id="prelude">
        <div className="container">
          <div className="prelude-grid">
            <div>
              <div className="section-eyebrow">
                <span>Prelude · I</span>
              </div>
              <h2>
                The arena where <em>clarity</em> is forged under pressure.
              </h2>
              <div className="stats">
                <div>
                  <div className="n">IV</div>
                  <div className="l">Editions</div>
                </div>
                <div>
                  <div className="n">15</div>
                  <div className="l">Committees</div>
                </div>
                <div>
                  <div className="n">
                    600<span className="suf">+</span>
                  </div>
                  <div className="l">Delegates</div>
                </div>
                <div>
                  <div className="n">3</div>
                  <div className="l">Days</div>
                </div>
              </div>
            </div>
            <div className="body">
              <p className="lead">
                <span className="yatra" style={{ color: "var(--ink)" }}>
                  Legatio
                </span>{" "}
                is the flagship Model United Nations conference of Delhi Public School, Siliguri — and the most
                anticipated MUN of the Indian North-Eastern circuit. Born from a conviction that young minds are
                capable of extraordinary things when placed in extraordinary environments.
              </p>
              <p>
                Now entering its <strong>fourth chapter</strong>, we return under the theme of{" "}
                <em>War &amp; Peace</em> — rooted in the philosophy of the Mahabharata and anchored by the tagline{" "}
                <strong>Kurukshetra of Diplomacy</strong>.
              </p>
              <p>
                Where every delegate stands as Arjuna — compelled not by comfort but by duty, tested not by ease but
                by the full weight of consequence. The conch is blown. The field is set. The standard, restored.
              </p>
              <p style={{ marginTop: 24 }}>
                <Link
                  href="/team"
                  style={{ borderBottom: "1px solid var(--accent)", color: "var(--accent)", paddingBottom: 2 }}
                >
                  Read about the secretariat →
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* DIPTYCH ──────────────────────────────────────────── */}
      <section className="diptych-section" id="theme">
        <div className="container">
          <div className="diptych-head">
            <div
              className="section-eyebrow"
              style={{ justifyContent: "center", display: "inline-flex" }}
            >
              <span>Canto · II · The Theme</span>
            </div>
            <h2>
              The oldest tension
              <br />
              in human <em>civilisation.</em>
            </h2>
            <div className="sub">— a contrast between what destroys and what endures —</div>
          </div>
        </div>

        <div className="diptych">
          <div className="panel dark">
            <svg className="chakra-bg" aria-hidden="true">
              <use href="#chakra" />
            </svg>
            <div>
              <div className="topline">— part the first</div>
              <div className="label">
                W<span className="ital">ar</span>
              </div>
              <div className="dev-tag">युद्ध</div>
            </div>
            <p>
              The conch is blown. The field is set. The moment demands everything — knowledge, character, the courage
              to hold a position when the world pushes back.
            </p>
          </div>
          <div className="divider" aria-hidden="true">
            <svg
              className="seal"
              viewBox="0 0 100 100"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <circle cx="50" cy="50" r="40" />
              <circle cx="50" cy="50" r="32" />
              <circle cx="50" cy="50" r="6" fill="currentColor" />
              <line x1="50" y1="14" x2="50" y2="86" />
              <line x1="14" y1="50" x2="86" y2="50" />
              <line x1="24.6" y1="24.6" x2="75.4" y2="75.4" />
              <line x1="75.4" y1="24.6" x2="24.6" y2="75.4" />
            </svg>
          </div>
          <div className="panel light">
            <svg className="chakra-bg" aria-hidden="true" style={{ color: "var(--ink)" }}>
              <use href="#chakra" />
            </svg>
            <div>
              <div className="topline">— part the second</div>
              <div className="label">
                P<span className="ital">eace</span>
              </div>
              <div className="dev-tag">शान्ति</div>
            </div>
            <p>
              Where words become weapons of wisdom. Where dialogue is not retreat, but the harder, finer discipline.
              The pathway forward.
            </p>
          </div>
        </div>

        <div className="container" style={{ marginTop: 80 }}>
          <div
            style={{
              maxWidth: 760,
              margin: "0 auto",
              textAlign: "center",
              fontFamily: "var(--font-serif), Georgia, serif",
              fontSize: 22,
              lineHeight: 1.5,
              fontStyle: "italic",
              color: "var(--ink)",
              textWrap: "pretty",
            }}
          >
            “Hinging upon the timeless philosophy of the Mahabharata, we recreate the intensity of the Kurukshetra —
            where every delegate stands as Arjuna, compelled not by comfort but by duty.”
          </div>
        </div>
      </section>

      {/* COMMITTEES INDEX ─────────────────────────────────── */}
      <section className="committees" id="committees">
        <div className="container">
          <div className="index-head">
            <div>
              <div className="section-eyebrow">
                <span>Canto · III · The Index</span>
              </div>
              <h2>
                Fifteen rooms.
                <br />
                One <em>Kurukshetra.</em>
              </h2>
            </div>
            <div className="meta">
              XV. agendas
              <br />
              IV. tiers
            </div>
          </div>

          <div className="index">
            <div>
              {leftColumn.map((c, i) => (
                <Link key={c.id} href="/committees" className="index-row">
                  <span className="n">{String(i + 1).padStart(2, "0")}</span>
                  <span className="name">{c.name}</span>
                  <span className="leader" aria-hidden="true" />
                  <span className="tier">{c.tier}</span>
                </Link>
              ))}
            </div>
            <div>
              {rightColumn.map((c, i) => (
                <Link key={c.id} href="/committees" className="index-row">
                  <span className="n">{String(half + i + 1).padStart(2, "0")}</span>
                  <span className="name">{c.name}</span>
                  <span className="leader" aria-hidden="true" />
                  <span className="tier">{c.tier}</span>
                </Link>
              ))}
              <Link href="/committees" className="index-row" style={{ borderBottom: 0 }}>
                <span className="n">→</span>
                <span className="name" style={{ fontStyle: "italic", color: "var(--accent)" }}>
                  View all committees &amp; agendas
                </span>
                <span className="leader" aria-hidden="true" />
                <span className="tier">All</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CANTOS / SCHEDULE ───────────────────────────────── */}
      <section className="cantos" id="schedule">
        <div className="container">
          <div className="cantos-head">
            <div
              className="section-eyebrow"
              style={{ justifyContent: "center", display: "inline-flex" }}
            >
              <span>Canto · IV · The Three Days</span>
            </div>
            <h2>
              Three days, written
              <br />
              as one story.
            </h2>
            <div className="sub">— from the blowing of the conch to the settling of the dust —</div>
          </div>

          <div className="cantos-grid">
            <article className="canto">
              <div className="initial">I</div>
              <div className="roman">Day I · Friday</div>
              <h3>31 July</h3>
              <div className="motif">The conch is blown.</div>
              <ul>
                <li>
                  <span className="t">09:30</span>
                  <span className="e">
                    Registration &amp; Briefing<small>Delegate check-in opens</small>
                  </span>
                </li>
                <li>
                  <span className="t">11:00</span>
                  <span className="e">
                    Opening Ceremony<small>Inaugural address &amp; lamp</small>
                  </span>
                </li>
                <li>
                  <span className="t">13:30</span>
                  <span className="e">
                    Committee Session I<small>Roll call · setting the agenda</small>
                  </span>
                </li>
                <li>
                  <span className="t">17:30</span>
                  <span className="e">
                    Executive Board Panel<small>The standard, rebuilt</small>
                  </span>
                </li>
              </ul>
            </article>

            <article className="canto">
              <div className="initial">II</div>
              <div className="roman">Day II · Saturday</div>
              <h3>01 August</h3>
              <div className="motif">The arrows are drawn.</div>
              <ul>
                <li>
                  <span className="t">09:00</span>
                  <span className="e">
                    Committee Session II<small>Moderated caucuses</small>
                  </span>
                </li>
                <li>
                  <span className="t">13:00</span>
                  <span className="e">
                    Press Conference<small>IPC interrogates the floor</small>
                  </span>
                </li>
                <li>
                  <span className="t">15:30</span>
                  <span className="e">
                    Committee Session III<small>Working papers &amp; blocs</small>
                  </span>
                </li>
                <li>
                  <span className="t">20:00</span>
                  <span className="e">
                    Delegate Social<small>Across the campus</small>
                  </span>
                </li>
              </ul>
            </article>

            <article className="canto">
              <div className="initial">III</div>
              <div className="roman">Day III · Sunday</div>
              <h3>02 August</h3>
              <div className="motif">The dust, settled.</div>
              <ul>
                <li>
                  <span className="t">09:00</span>
                  <span className="e">
                    Committee Session IV<small>Draft resolutions tabled</small>
                  </span>
                </li>
                <li>
                  <span className="t">12:30</span>
                  <span className="e">
                    Voting Procedure<small>The gavel falls</small>
                  </span>
                </li>
                <li>
                  <span className="t">15:00</span>
                  <span className="e">
                    Closing Ceremony<small>Awards &amp; valedictory</small>
                  </span>
                </li>
                <li>
                  <span className="t">17:00</span>
                  <span className="e">
                    Conch sounds, anew<small>Departure &amp; farewells</small>
                  </span>
                </li>
              </ul>
            </article>
          </div>

          <div style={{ textAlign: "center", marginTop: 32 }}>
            <Link
              href="/schedule"
              style={{
                fontFamily: "var(--font-mono), monospace",
                fontSize: 11,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "var(--accent)",
                borderBottom: "1px solid var(--accent)",
                paddingBottom: 4,
              }}
            >
              View the full itinerary →
            </Link>
          </div>
        </div>
      </section>

      {/* VOICE / President ───────────────────────────────── */}
      <section className="voice">
        <svg className="chakra-bg" aria-hidden="true">
          <use href="#chakra" />
        </svg>
        <div className="container voice-inner">
          <div className="tag">From the President&apos;s Desk</div>
          <span className="q">
            Every delegate stands as Arjuna — compelled not by comfort but by duty, tested not by ease but by the full
            weight of consequence.
          </span>
          <div className="attr">
            <div className="attr-portrait">SA</div>
            <div className="attr-name">
              Ms. Snigdha Agarwal
              <small>President · Legatio 4.0</small>
            </div>
          </div>
        </div>
      </section>

      {/* REGISTER ─────────────────────────────────────────── */}
      <section className="register" id="register">
        <svg className="chakra-bg" aria-hidden="true">
          <use href="#chakra" />
        </svg>
        <div className="ornament-glow" aria-hidden="true" />
        <div className="container register-inner">
          <div>
            <div className="register-eyebrow">
              <span>Take the field</span>
            </div>
            <h2>
              The conch is blown.
              <br />
              <em>Make it count.</em>
            </h2>
            <p className="lead">
              Individual delegate registrations are accepted on this site. School delegations should be coordinated by
              your institution directly with the Secretariat. If you&apos;re unsure which route fits, write to us.
            </p>
          </div>
          <div className="register-actions">
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

      <Colophon />

    </>
  );
}
