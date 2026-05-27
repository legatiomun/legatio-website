export type Letter = {
  id: string;
  role: string;
  name: string;
  honorific?: string;
  body: string[];
  closing: string;
};

export const LETTERS: Letter[] = [
  {
    id: "president",
    role: "President",
    name: "Mrs. Snigdha Agarwal",
    body: [
      "There are moments in an institution's journey that transcend the ordinary ones, not merely marking, but defining. Legatio is one such moment and with its fourth edition, it becomes something more than a milestone… it becomes a statement.",
      "When Legatio was first conceived, the vision was simple in its ambition but vast in its scope — to create a space where young minds could engage with the world not as observers, but as architects of its future. Three editions later, that vision has not only been realised, it has been exceeded. Legatio has grown into the most anticipated, most respected, and most transformative Model United Nations conference in this region.",
      "Legatio 4.0 arrives under the theme of War and Peace — perhaps the oldest, most enduring tension in human civilisation. It is a theme that demands more than research. It demands empathy, moral clarity, and the courage to hold a position when the world around you pushes back. Rooted in the philosophy of the Mahabharata and anchored by the tagline Kurukshetra of Diplomacy, this edition invites every delegate to step into that ancient field — not with weapons, but with words.",
      "To every delegate, faculty advisor, and institution joining us for Legatio 4.0 — you are not attending a conference. You are entering a Kurukshetra. Like every Kurukshetra, what you carry out of it will define you far longer than what you carried in. The field is set. The standard is restored. Welcome to Legatio 4.0.",
    ],
    closing: "President — Legatio 4.0, DPS Siliguri",
  },
  {
    id: "principal",
    role: "Principal",
    name: "Dr. Anisha Sharma",
    honorific: "Dr.",
    body: [
      "It is with immense pride and profound enthusiasm that I invite you to Legatio 4.0, the fourth edition of the Model United Nations Conference hosted by Delhi Public School, Siliguri, from 31st July to 2nd August 2026, under the visionary guidance of Mrs. Snigdha Agarwal, Director of Delhi Public School, Siliguri, and Delhi Public School, Fulbari.",
      "Legatio 4.0 is the platform 'where words become weapons of wisdom and dialogue becomes the pathway to peace.' In an era marked by uncertainty, conflict, and rapid transformation, the need for thoughtful leaders and compassionate diplomats has never been greater.",
      "Each of the previous editions of Legatio was a resounding success, celebrated for its intellectual rigor, spirited debate, and the extraordinary calibre of its participants. This year, we raise the bar even higher by bringing together nearly 600 delegates from esteemed institutions across the region. For these young changemakers, Legatio 4.0 will serve as a crucible of ideas — an arena where they will sharpen their skills in public speaking, in-depth research, negotiation, policy analysis, diplomacy, and collaborative problem-solving.",
      "I extend a heartfelt welcome to every delegate, executive board member, and mentor. May Legatio 4.0 ignite bold ideas, forge enduring friendships, and inspire each participant to become a voice of reason in a world that urgently needs understanding. I wish Legatio 4.0 unparalleled success, leaving behind an unforgettable legacy of diplomacy, leadership, and global impact.",
    ],
    closing: "Principal — Delhi Public School, Siliguri",
  },
  {
    id: "coordinator",
    role: "MUN Co-ordinator",
    name: "Gopa Gurung",
    body: [
      "Every edition of Legatio has taught us something. The first showed us that ambition, when backed by discipline, creates something remarkable. The second proved that a standard, once set, inspires others to reach for it. The third demonstrated that community — the bonds formed across debate tables and in the margins of position papers — is perhaps Legatio's most enduring output. Legatio 4.0 takes all of that and builds upward.",
      "Behind every successful conference is a team that works not for recognition, but for the moment a delegate finds his or her voice in a packed committee room. That is what drives this work. In this edition, under the theme of War and Peace, delegates will engage with some of the most consequential questions of our time — questions that demand not just knowledge, but character. That is precisely what Legatio is designed to develop.",
      "We welcome each participating school with great enthusiasm and deep respect. You are not merely sending students to a conference — you are sending them to an experience that will shape how they think, speak, and lead. We are honoured to be the ones who provide that space for them.",
    ],
    closing: "MUN Co-ordinator",
  },
  {
    id: "secgen",
    role: "Secretary-General",
    name: "Sinjini Banarjee",
    body: [
      "The Mahabharata did not ask Arjuna if he was ready. The conch was blown, the field was set, and the moment demanded everything. Legatio 4.0 carries that same spirit — unflinching, purposeful, and greater than anything that has come before it.",
      "When I took on the responsibility of this conference, I inherited three editions of excellence and an expectation that the fourth would surpass them all. That is not pressure, it is a privilege. Legatio 4.0 is built on a single conviction: that the standard we set today will echo in the circuit for years to come. Every committee, every crisis, every agenda crafted under the weight of this conference's theme — War and Peace — has been designed to push delegates further than they believed they could go, and bring them out stronger on the other side.",
      "With this edition, we are not simply returning but rebuilding — with grander ambition, sharper programming, and a renewed commitment to the one thing that has always set Legatio apart: the relationships forged here last a lifetime. To every delegate arriving at this Kurukshetra, know that the floor is yours. Make it count.",
    ],
    closing: "Secretary-General — Legatio 4.0",
  },
];
