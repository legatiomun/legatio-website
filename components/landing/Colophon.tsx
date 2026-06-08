import Image from "next/image";
import Link from "next/link";

type Props = {
  /** Middle line of the bottom strip (after © and before "Set in …"). */
  contextLine?: string;
};

export function Colophon({ contextLine = "Edition 4 · Printed in cream & ink" }: Props) {
  return (
    <footer className="colophon">
      <div className="container">
        <div className="colophon-top">
          <div>
            <div className="colophon-brand">
              <Image src="/images/logo-emblem.png" alt="" width={112} height={112} />
              <span className="name">
                legatio<span className="ver">4.0</span>
              </span>
            </div>
            <div className="desc">
              The flagship Model United Nations conference of Delhi Public School, Siliguri.
            </div>
          </div>
          <div>
            <h4>Navigate</h4>
            <Link href="/">Home</Link>
            <Link href="/about">Prelude · About</Link>
            <Link href="/committees">Committees</Link>
            <Link href="/schedule">Schedule</Link>
            <Link href="/team">Secretariat</Link>
            <Link href="/venue">Venue · Travel</Link>
            <Link href="/faq">FAQ</Link>
            <Link href="/register">Register</Link>
          </div>
          <div>
            <h4>Connect</h4>
            <a href="mailto:legatiomun@gmail.com">legatiomun@gmail.com</a>
            <a href="tel:+918918849230">+91 89188 49230</a>
            <a href="https://instagram.com/legatio_4.0" target="_blank" rel="noopener noreferrer">@legatio_4.0</a>
            <a href="https://www.dpssiliguri.com/" target="_blank" rel="noopener noreferrer">DPS Siliguri</a>
          </div>
          <div>
            <h4>Address</h4>
            <div
              style={{
                fontFamily: "var(--font-serif), Georgia, serif",
                fontSize: 16,
                lineHeight: 1.7,
              }}
            >
              Delhi Public School
              <br />
              Siliguri, West Bengal
              <br />
              India
            </div>
          </div>
        </div>

        <div className="colophon-shloka">
          <span className="dev">तमसो मा ज्योतिर्गमय</span>
          <small>— Lead me from darkness to light —</small>
        </div>

        <div className="colophon-bot">
          <span>© 2026 · DPS Siliguri</span>
          <span>{contextLine}</span>
        </div>
      </div>
    </footer>
  );
}
