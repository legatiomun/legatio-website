export type FAQItem = {
  q: string;
  a: string;
};

export type FAQSection = {
  label: string;
  items: FAQItem[];
};

export const FAQ_SECTIONS: FAQSection[] = [
  {
    label: "About the conference",
    items: [
      {
        q: "What is Legatio 4.0?",
        a: "Legatio 4.0 is the fourth edition of DPS Siliguri's flagship Model United Nations — the most prestigious MUN in the regional circuit, themed around War and Peace with the tagline Kurukshetra of Diplomacy.",
      },
      {
        q: "When and where is Legatio 4.0?",
        a: "31st July – 2nd August 2026, at Delhi Public School, Siliguri.",
      },
      {
        q: "Who can participate?",
        a: "Students from Grade 7 and above from any school — both first-time delegates and experienced MUNers are welcome.",
      },
      {
        q: "Do I need prior MUN experience?",
        a: "Not at all. Legatio 4.0 is open to students from Grade 7 and above, across all experience levels. Come prepared, come curious.",
      },
      {
        q: "How many committees are there?",
        a: "Legatio 4.0 features 15 committees — 12 UN bodies, 2 Indian simulations, and the International Press Corps.",
      },
    ],
  },
  {
    label: "Registration",
    items: [
      {
        q: "How do I register and what is the registration fee?",
        a: "Registrations are processed through your school's Faculty Advisor. Schools register as delegations. Follow our official handles for the registration link and deadlines. The registration fee is ₹3,000.",
      },
      {
        q: "Can I register individually without a school delegation?",
        a: "Individual registration is opening soon. Stay tuned to our official channels for the announcement.",
      },
      {
        q: "How are committee and country allotments decided?",
        a: "Preferences can be indicated at the time of registration. Final allotments are at the Secretariat's discretion based on accommodation.",
      },
      {
        q: "What do I receive after registering?",
        a: "A confirmation email of registration, your committee and country allotment, and the official Study Guide.",
      },
      {
        q: "What should I wear?",
        a: "The dress code for Legatio 4.0 will be announced shortly. Keep an eye on our official handles for the update.",
      },
      {
        q: "What should I bring?",
        a: "Research notes, your Position Paper, a notepad and pen for lobbying, and a copy of the Rules of Procedure. Your placard will be issued at registration.",
      },
    ],
  },
  {
    label: "Perks",
    items: [
      {
        q: "What awards are given?",
        a: "Each committee will recognise the top 3 delegates with standard awards, alongside Special Mentions and Verbal Mentions as decided by the Executive Board.",
      },
      {
        q: "How are delegates judged?",
        a: "On research quality, speech clarity, negotiation skills, contribution to resolutions, and adherence to diplomatic decorum.",
      },
      {
        q: "Can a first-time delegate win an award?",
        a: "Absolutely. Awards are merit-based. Preparation and genuine engagement matter far more than experience.",
      },
    ],
  },
  {
    label: "General",
    items: [
      {
        q: "What is the code of conduct?",
        a: "Diplomatic decorum is expected at all times — respectful debate, formal address, and adherence to committee rules. The Chair reserves the right to issue warnings for disruptive behaviour.",
      },
      {
        q: "Who do I contact if I have a problem during the conference?",
        a: "Your committee's Executive Board for session-related concerns. The Secretariat help desk will be available throughout the conference for everything else.",
      },
      {
        q: "How do I stay updated on all Legatio 4.0 announcements?",
        a: "Follow our official Instagram handle and watch out for circulars sent through your school. All key announcements — schedules, deadlines, and updates — will be posted there first.",
      },
    ],
  },
];

/** Backwards-compat flat list, in case any old import is still around. */
export const FAQ: FAQItem[] = FAQ_SECTIONS.flatMap((s) => s.items);
