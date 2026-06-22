import type { Metadata } from "next";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/sections/Footer";
import { PageHeader } from "@/components/PageHeader";
import { ResourceGuide } from "@/components/ResourceGuide";

export const metadata: Metadata = {
  title: "Delegate Resources — Legatio 4.0",
  description:
    "A beginner's handbook for Legatio 4.0 — what Model UN is, how to prepare for your first conference, and a brief on every committee.",
};

export default function ResourcesPage() {
  return (
    <>
      <Navigation />
      <main id="main" className="bg-paper pb-24">
        <PageHeader
          eyebrow="Resources"
          title={<>The delegate&rsquo;s handbook.</>}
          lede="Everything a first-time delegate needs — what Model UN is, how to prepare for the floor, and a brief on every committee at Legatio 4.0."
        />

        <section className="mx-auto max-w-4xl px-5 py-20 sm:px-8">
          <ResourceGuide />

          <p className="mt-16 border-t border-line pt-8 text-center font-serif text-lg italic text-ink/70">
            Prepared for new and returning delegates. Welcome to the conference — we can&rsquo;t wait to
            see you in action.
          </p>

          <p className="mt-10 text-sm text-mute">
            Still have questions? See the{" "}
            <a href="/faq" className="text-accent hover:underline">
              FAQ
            </a>
            , email{" "}
            <a href="mailto:legatiomun@gmail.com" className="text-accent hover:underline">
              legatiomun@gmail.com
            </a>{" "}
            or call +91 70295 94737.
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
