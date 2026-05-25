"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type NavLink = {
  href: string;
  label: string;
  /** Paths that should mark this link as active. Empty = never marks active. */
  match: string[];
};

const LINKS: NavLink[] = [
  { href: "/about", label: "Prelude", match: ["/about"] },
  { href: "/committees", label: "Committees", match: ["/committees"] },
  { href: "/schedule", label: "Schedule", match: ["/schedule"] },
  { href: "/team", label: "Secretariat", match: ["/team"] },
  { href: "/venue", label: "Venue", match: ["/venue"] },
  { href: "/faq", label: "FAQ", match: ["/faq"] },
];

export function Navigation() {
  const pathname = usePathname() ?? "";
  const [open, setOpen] = useState(false);

  // Close the drawer whenever the route changes
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll while the drawer is open
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // ESC closes the drawer
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={`nav${open ? " nav-open" : ""}`}>
      <div className="container nav-inner">
        <Link href="/" className="nav-brand" aria-label="Legatio 4.0 home">
          <Image src="/images/logo-emblem.png" alt="" width={72} height={72} priority />
          <span className="name">
            legatio<span className="ver">4.0</span>
          </span>
        </Link>
        <nav className="nav-links" aria-label="Primary">
          {LINKS.map((l) => {
            const active = l.match.some(
              (m) => pathname === m || pathname.startsWith(m + "/"),
            );
            return (
              <Link key={l.href} href={l.href} className={active ? "active" : undefined}>
                {l.label}
              </Link>
            );
          })}
        </nav>
        <div className="nav-right">
          <span className="nav-mono" style={{ whiteSpace: "nowrap" }}>
            31 Jul – 02 Aug 2026
          </span>
          <Link href="/register" className="nav-cta">
            Register <span className="arr">→</span>
          </Link>
          <button
            type="button"
            className="nav-toggle"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="nav-drawer"
            onClick={() => setOpen((o) => !o)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        id="nav-drawer"
        className={`nav-drawer${open ? " is-open" : ""}`}
        aria-hidden={!open}
      >
        <ul>
          {LINKS.map((l) => {
            const active = l.match.some(
              (m) => pathname === m || pathname.startsWith(m + "/"),
            );
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={active ? "active" : undefined}
                  tabIndex={open ? 0 : -1}
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
          <li className="nav-drawer-cta">
            <Link href="/register" tabIndex={open ? 0 : -1}>
              Register <span aria-hidden>→</span>
            </Link>
          </li>
          <li className="nav-drawer-meta">31 Jul – 02 Aug 2026 · DPS Siliguri</li>
        </ul>
      </div>
    </header>
  );
}
