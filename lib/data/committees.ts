export type Tier = "Beginner" | "Intermediate" | "Advanced" | "Flagship";

export type Committee = {
  id: string;
  code: string;
  name: string;
  tier: Tier;
  agenda: string;
  /** Short word that describes the kind of body — appears under the code on the seal fallback. */
  subtitle: string;
  classified?: boolean;
  note?: string;
  /** Optional path to an emblem image. When set, the image replaces the SVG seal. */
  image?: string;
};

export const TIERS: Tier[] = ["Beginner", "Intermediate", "Advanced", "Flagship"];

export const TIER_DESCRIPTION: Record<Tier, string> = {
  Beginner:
    "For first-time delegates and those still finding their voice. Foundational committees with traditional UN rules of procedure.",
  Intermediate:
    "For delegates with prior experience. Deeper agendas, sharper crises, faster moderated caucuses.",
  Advanced:
    "For seasoned diplomats. High-stakes simulations with classified material, legal complexity, and continuous-crisis pacing.",
  Flagship:
    "The marquee committees of Legatio 4.0. Cinematic in scope, unprecedented in ambition. The defining arenas of this edition.",
};

export const COMMITTEES: Committee[] = [
  {
    id: "unhrc",
    code: "UNHRC",
    name: "UN Human Rights Council",
    subtitle: "Council",
    tier: "Beginner",
    image: "/committees/unhrc.png",
    agenda:
      "Deliberating upon the protection and promotion of Human Rights amidst Escalating Tensions and Armed Conflict in affected regions with special emphasis on the Middle East.",
  },
  {
    id: "uncsw",
    code: "UNCSW",
    name: "UN Commission on the Status of Women",
    subtitle: "Commission",
    tier: "Beginner",
    image: "/committees/uncsw.png",
    agenda:
      "Addressing the Disproportionate Impact of Armed Conflicts on Women and the Weaponization of Gender-Based Violence in Occupied Territories and Conflicted Regions.",
  },
  {
    id: "specpol",
    code: "SPECPOL",
    name: "UN General Assembly: Special Political & Decolonization Committee",
    subtitle: "Assembly",
    tier: "Beginner",
    image: "/committees/specpol.png",
    agenda:
      "Deliberating upon the Political Instability and Foreign Intervention in Latin America, particularly the Situation in Venezuela and its Impact on Regional Security.",
  },
  {
    id: "ipc",
    code: "IPC",
    name: "International Press Corps",
    subtitle: "Press",
    tier: "Beginner",
    image: "/committees/ipc.png",
    agenda:
      "Investigative Journalism: Journalism / Photojournalism / Caricatures.",
    note: "Submissions across written reporting, photojournalism, and political cartooning.",
  },
  {
    id: "ecofin",
    code: "ECOFIN",
    name: "Economic & Financial Committee",
    subtitle: "Committee",
    tier: "Intermediate",
    image: "/committees/ecofin.png",
    agenda:
      "Deliberating on the Reformation of the Global Financial Architecture: A Critical Reassessment of the Bretton Woods System in addressing 21st Century Economic Inequalities and Sovereign Autonomy.",
  },
  {
    id: "unodc",
    code: "UNODC",
    name: "United Nations Office on Drugs and Crime",
    subtitle: "Office",
    tier: "Intermediate",
    image: "/committees/unodc.png",
    agenda:
      "Addressing the Role of Illicit Drug Trafficking and Small Arms and Light Weapons (SALW) networks in Conflict-Affected Regions in Financing Armed Conflict and Non-State Armed Groups.",
  },
  {
    id: "brics",
    code: "BRICS",
    name: "BRICS Summit",
    subtitle: "Summit",
    tier: "Intermediate",
    image: "/committees/brics.png",
    agenda:
      "Deliberating on Challenging Western Dominance over Critical Mineral Supply Chains: Securing BRICS Resource Sovereignty and Strategic Autonomy in the Global Energy Transition.",
  },
  {
    id: "ccpa",
    code: "CCPA",
    name: "Cabinet Committee on Political Affairs",
    subtitle: "Cabinet",
    tier: "Intermediate",
    image: "/committees/ccpa.png",
    agenda:
      "Deliberating upon the implications of Illegal Immigration, Border Insecurity, and Ethnic Instability in Eastern and North-Eastern India.",
  },
  {
    id: "loksabha",
    code: "LS",
    name: "Lok Sabha",
    subtitle: "House",
    tier: "Intermediate",
    image: "/committees/loksabha.png",
    agenda:
      "Deliberating on the Nationwide Caste Census and its implications on the Reservation Policy.",
  },
  {
    id: "icj",
    code: "ICJ",
    name: "International Court of Justice",
    subtitle: "Court",
    tier: "Advanced",
    image: "/committees/icj.png",
    agenda:
      "The Tribunal on the Kulbhushan Jadhav Case (India vs Pakistan): Determination of State Responsibility for Violations of the Vienna Convention on Consular Relations and Non-Compliance with Orders of the International Court of Justice.",
  },
  {
    id: "unsc-ctc",
    code: "UNSC-CTC",
    name: "UN Security Council: Counter Terrorism Committee",
    subtitle: "Council",
    tier: "Advanced",
    image: "/committees/unsc-ctc.png",
    agenda:
      "Addressing the Expansion of Extremist Networks Through Encrypted Platforms and Emerging Technologies amid rising Proxy Warfare and Regional Conflicts.",
  },
  {
    id: "1962-ccc",
    code: "1962-CCC",
    name: "Indo-China War Cabinet (1962)",
    subtitle: "Crisis",
    tier: "Advanced",
    image: "/committees/1962-ccc.png",
    agenda: "Agenda: Classified. Timeline: October to November 1962.",
    classified: true,
    note: "Continuous Crisis Committee. Delegates briefed on arrival.",
  },
  {
    id: "hlpf",
    code: "HLPF",
    name: "High Level Political Forum",
    subtitle: "Forum",
    tier: "Flagship",
    image: "/committees/hlpf.png",
    agenda:
      "Reviewing Progress and Challenges in Financing Climate Resilience, Poverty Reduction, and inclusive Sustainable Development under the 2030 Agenda.",
  },
  {
    id: "copuos",
    code: "COPUOS",
    name: "UN Committee on the Peaceful Uses of Outer Space",
    subtitle: "Committee",
    tier: "Flagship",
    image: "/committees/copuos.png",
    agenda:
      "Establishing a Legally Binding Framework for the Prevention of an Arms Race in Outer Space (PAROS): Regulating Anti-Satellite (ASAT) Weapons and Cyber Operations Targeting Space Infrastructure.",
  },
  {
    id: "us-senate",
    code: "US-SEN",
    name: "United States Senate",
    subtitle: "Senate",
    tier: "Flagship",
    image: "/committees/us-senate.png",
    agenda:
      "Congressional Review of Government Transparency, Institutional Accountability, and Legal Oversight in the Release of High-Profile Criminal Investigation Records in the Disclosure of the Epstein Files.",
  },
];
