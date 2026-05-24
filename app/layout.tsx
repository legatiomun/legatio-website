import type { Metadata, Viewport } from "next";
import {
  EB_Garamond,
  Inter,
  JetBrains_Mono,
  Tiro_Devanagari_Sanskrit,
  Yatra_One,
} from "next/font/google";
import "./globals.css";

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const yatra = Yatra_One({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-display",
  display: "swap",
});

const tiro = Tiro_Devanagari_Sanskrit({
  subsets: ["devanagari", "latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-sanskrit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Legatio 4.0 — The Kurukshetra of Diplomacy",
  description:
    "The fourth edition of Legatio, the flagship Model United Nations conference of Delhi Public School Siliguri. 31 July – 2 August 2026.",
  icons: {
    icon: "/images/logo.png",
    apple: "/images/logo.png",
  },
  openGraph: {
    title: "Legatio 4.0 — The Kurukshetra of Diplomacy",
    description: "DPS Siliguri Model United Nations 2026. 31 July – 2 August.",
    type: "website",
    images: [{ url: "/images/logo.png", width: 1200, height: 1200, alt: "Legatio 4.0" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#F4EBD0",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${ebGaramond.variable} ${inter.variable} ${jetbrains.variable} ${yatra.variable} ${tiro.variable}`}
    >
      <body data-scheme="saffron" data-density="standard">
        {children}
      </body>
    </html>
  );
}
