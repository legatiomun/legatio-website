export type Group = "Patrons" | "Secretariat" | "Executive Board";

export type Officer = {
  id: string;
  name: string;
  role: string;
  group: Group;
  committee?: string;
  /** Optional pull-quote shown for featured officers. */
  quote?: string;
  /** Drop a photo into /public/team/<id>.jpg and reference it here. */
  photo?: string;
  /** CSS object-position for the photo — e.g. "center 25%" for portrait shots. */
  photoPosition?: string;
  placeholder?: boolean;
};

export const SECRETARIAT: Officer[] = [
  {
    id: "snigdha-agarwal",
    name: "Ms. Snigdha Agarwal",
    role: "President",
    group: "Patrons",
    photo: "/team/snigdha-agarwal.jpg",
    quote: "The field is set. The standard is restored. Welcome to Legatio 4.0.",
  },
  {
    id: "anisha-sharma",
    name: "Dr. Anisha Sharma",
    role: "Principal",
    group: "Patrons",
    photo: "/team/anisha-sharma.jpg",
    quote: "Where words become weapons of wisdom and dialogue becomes the pathway to peace.",
  },
  {
    id: "moumita-debnath",
    name: "Moumita Debnath",
    role: "MUN Co-ordinator",
    group: "Patrons",
    photo: "/team/moumita-debnath.jpg",
    quote: "The standard we set begins long before the conch is blown.",
  },
  {
    id: "gopa-gurung",
    name: "Gopa Gurung",
    role: "MUN Co-ordinator",
    group: "Patrons",
    photo: "/team/gopa-gurung.jpg",
    photoPosition: "center 22%",
    quote: "The relationships forged here last a lifetime.",
  },

  {
    id: "sinjini-banarjee",
    name: "Sinjini Banarjee",
    role: "Secretary-General",
    group: "Secretariat",
    quote:
      "The Mahabharata did not ask Arjuna if he was ready. The conch was blown, the field was set, and the moment demanded everything.",
  },
  { id: "dsg", name: "—", role: "Deputy Secretary-General", group: "Secretariat", placeholder: true },
  { id: "dg", name: "—", role: "Director-General", group: "Secretariat", placeholder: true },
  { id: "cdc", name: "—", role: "Chef de Cabinet", group: "Secretariat", placeholder: true },
  { id: "usg-committees", name: "—", role: "USG, Committees", group: "Secretariat", placeholder: true },
  { id: "usg-delegate-affairs", name: "—", role: "USG, Delegate Affairs", group: "Secretariat", placeholder: true },
  { id: "usg-external", name: "—", role: "USG, External Affairs", group: "Secretariat", placeholder: true },
  { id: "usg-press", name: "—", role: "USG, Press & Publicity", group: "Secretariat", placeholder: true },

  { id: "eb-unhrc", name: "—", role: "Chairperson", committee: "UNHRC", group: "Executive Board", placeholder: true },
  { id: "eb-uncsw", name: "—", role: "Chairperson", committee: "UNCSW", group: "Executive Board", placeholder: true },
  { id: "eb-specpol", name: "—", role: "Chairperson", committee: "SPECPOL", group: "Executive Board", placeholder: true },
  { id: "eb-ipc", name: "—", role: "Editor-in-Chief", committee: "IPC", group: "Executive Board", placeholder: true },
  { id: "eb-ecofin", name: "—", role: "Chairperson", committee: "ECOFIN", group: "Executive Board", placeholder: true },
  { id: "eb-unodc", name: "—", role: "Chairperson", committee: "UNODC", group: "Executive Board", placeholder: true },
  { id: "eb-brics", name: "—", role: "Chairperson", committee: "BRICS", group: "Executive Board", placeholder: true },
  { id: "eb-ccpa", name: "—", role: "Chairperson", committee: "CCPA", group: "Executive Board", placeholder: true },
  { id: "eb-ls", name: "—", role: "Speaker", committee: "Lok Sabha", group: "Executive Board", placeholder: true },
  { id: "eb-icj", name: "—", role: "President of the Court", committee: "ICJ", group: "Executive Board", placeholder: true },
  { id: "eb-unsc-ctc", name: "—", role: "Chairperson", committee: "UNSC-CTC", group: "Executive Board", placeholder: true },
  { id: "eb-ccc", name: "—", role: "Crisis Director", committee: "1962-CCC", group: "Executive Board", placeholder: true },
  { id: "eb-hlpf", name: "—", role: "Chairperson", committee: "HLPF", group: "Executive Board", placeholder: true },
  { id: "eb-copuos", name: "—", role: "Chairperson", committee: "COPUOS", group: "Executive Board", placeholder: true },
  { id: "eb-us-senate", name: "—", role: "President of the Senate", committee: "US Senate", group: "Executive Board", placeholder: true },
];
