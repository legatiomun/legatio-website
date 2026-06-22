import type { Metadata } from "next";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/sections/Footer";
import { PageHeader } from "@/components/PageHeader";
import { FAQList } from "@/components/FAQList";

export const metadata: Metadata = {
  title: "FAQ — Legatio 4.0",
  description: "Frequently asked questions about Legatio 4.0 — eligibility, fees, dress code, allotment and more.",
};

export default function FAQPage() {
  return (
    <>
      <Navigation />
      <main id="main" className="bg-paper pb-24">
        <PageHeader
          eyebrow="FAQ"
          title={<>Frequently asked questions.</>}
          lede="If your question isn't answered here, write to legatiomun@gmail.com."
        />

        <section className="mx-auto max-w-4xl px-5 py-20 sm:px-8">
          <FAQList />

          <p className="mt-12 text-sm text-mute">
            Still unsure? Email{" "}
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
