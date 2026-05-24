"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
  return (
    <header className="nav">
      <div className="container nav-inner">
        <Link href="/" className="nav-brand" aria-label="Legatio 4.0 home">
          <Image src="/images/logo.png" alt="" width={72} height={72} priority />
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
        </div>
      </div>
    </header>
  );
}
