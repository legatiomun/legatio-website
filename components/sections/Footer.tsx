import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-line bg-paper">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <Image
            src="/images/logo.png"
            alt="Legatio 4.0"
            width={400}
            height={400}
            className="h-24 w-24 object-contain"
          />
          <p className="mt-4 text-sm text-mute">DPS Siliguri Model United Nations</p>
          <p className="text-sm text-mute">31 July – 2 August 2026</p>
          <p className="mt-6 max-w-sm text-sm text-mute">
            The fourth edition of Legatio. Hosted by Delhi Public School, Siliguri.
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wider text-mute">Conference</p>
          <ul className="mt-4 space-y-2 text-sm text-ink/80">
            <li><Link href="/about" className="hover:text-accent">About</Link></li>
            <li><Link href="/committees" className="hover:text-accent">Committees</Link></li>
            <li><Link href="/schedule" className="hover:text-accent">Schedule</Link></li>
            <li><Link href="/team" className="hover:text-accent">Secretariat</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wider text-mute">Information</p>
          <ul className="mt-4 space-y-2 text-sm text-ink/80">
            <li><Link href="/venue" className="hover:text-accent">Venue & Travel</Link></li>
            <li><Link href="/faq" className="hover:text-accent">FAQ</Link></li>
            <li><Link href="/register" className="hover:text-accent">Register</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-xs uppercase tracking-wider text-mute">Contact</p>
          <ul className="mt-4 space-y-2 text-sm text-ink/80">
            <li><a href="mailto:legatiomun@gmail.com" className="hover:text-accent">legatiomun@gmail.com</a></li>
            <li><a href="tel:+918918849230" className="hover:text-accent">+91 89188 49230</a></li>
            <li><a href="https://instagram.com/legatio_4.0" target="_blank" rel="noopener noreferrer" className="hover:text-accent">@legatio_4.0</a></li>
            <li><a href="https://www.dpssiliguri.com/" target="_blank" rel="noopener noreferrer" className="hover:text-accent">DPS Siliguri</a></li>
            <li className="pt-2 text-sm text-mute">Delhi Public School, Siliguri<br />West Bengal, India</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-5 text-xs text-mute sm:px-8">
          <p>© 2026 Legatio · DPS Siliguri</p>
          <p>तमसो मा ज्योतिर्गमय</p>
        </div>
      </div>
    </footer>
  );
}
