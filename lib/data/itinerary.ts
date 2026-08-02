export type SessionKind =
  | "registration"
  | "meal"
  | "ceremony"
  | "committee"
  | "panel"
  | "press"
  | "social"
  | "dispersal";

export type Slot = {
  time: string;
  title: string;
  kind: SessionKind;
  detail?: string;
};

export type Day = {
  label: string;
  date: string;
  weekday: string;
  motif: string;
  slots: Slot[];
};

export const ITINERARY: Day[] = [
  {
    label: "Day I",
    date: "31 July 2026",
    weekday: "Friday",
    motif: "The Conch Sounds",
    slots: [
      { time: "07:30 – 08:00", title: "Registration of Delegates", kind: "registration" },
      { time: "08:00 – 09:00", title: "Breakfast", kind: "meal" },
      { time: "09:00 – 09:30", title: "Seating in SAM Hall", kind: "registration" },
      { time: "09:30 – 10:55", title: "Inaugural Ceremony", kind: "ceremony" },
      { time: "11:00 – 13:15", title: "Committee Session I", kind: "committee" },
      { time: "13:15 – 14:45", title: "Lunch", kind: "meal" },
      { time: "14:45 – 17:00", title: "Committee Session II", kind: "committee" },
      { time: "17:00 – 17:30", title: "Tea & Dispersal", kind: "dispersal" },
    ],
  },
  {
    label: "Day II",
    date: "1 August 2026",
    weekday: "Saturday",
    motif: "The Field is Joined",
    slots: [
      { time: "07:30 – 08:00", title: "Reporting", kind: "registration" },
      { time: "08:00 – 09:00", title: "Breakfast", kind: "meal" },
      { time: "09:00 – 10:00", title: "EB Debate", kind: "panel" },
      { time: "10:00 – 10:15", title: "Country Song", kind: "ceremony" },
      { time: "10:15 – 13:40", title: "Committee Session III", kind: "committee" },
      { time: "13:40 – 14:40", title: "Lunch", kind: "meal" },
      { time: "14:40 – 17:30", title: "Committee Session IV", kind: "committee" },
      { time: "17:30 – 18:30", title: "Delegate Networking Session", kind: "social" },
      { time: "18:30 – 19:30", title: "Socials", kind: "social", detail: "An evening built for the friendships that outlast the gavel." },
      { time: "19:30 – 20:30", title: "Dinner", kind: "meal" },
      { time: "20:30 onwards", title: "Complete Dispersal", kind: "dispersal" },
    ],
  },
  {
    label: "Day III",
    date: "2 August 2026",
    weekday: "Sunday",
    motif: "The Standard Restored",
    slots: [
      { time: "07:30 – 08:00", title: "Reporting", kind: "registration" },
      { time: "08:00 – 09:00", title: "Breakfast", kind: "meal" },
      { time: "09:00 – 12:00", title: "Committee Session V", kind: "committee" },
      { time: "12:00 – 13:30", title: "Lunch", kind: "meal" },
      { time: "13:30 – 15:00", title: "Committee Session VI", kind: "committee" },
      { time: "15:00 – 15:30", title: "High Tea", kind: "meal" },
      { time: "15:30 – 16:00", title: "Delegates Proceed to SAM Hall", kind: "registration" },
      { time: "16:00 – 16:05", title: "Receiving of the Chief Guest", kind: "ceremony" },
      { time: "16:05 – 16:07", title: "Welcome Note", kind: "ceremony" },
      { time: "16:07 – 16:10", title: "Glimpses of Diplomacy of Kurukshetra", kind: "ceremony" },
      { time: "16:10 – 16:15", title: "Address by the Headmistress, DPS Siliguri", kind: "ceremony" },
      { time: "16:15 – 16:25", title: "Echoes of Kurukshetra", kind: "ceremony" },
      { time: "16:25 – 16:27", title: "Curtain Raiser — Smt. Agnimitra Paul", kind: "ceremony" },
      { time: "16:27 – 16:30", title: "Felicitation of the Chief Guest", kind: "ceremony" },
      { time: "16:30 – 16:40", title: "Keynote Address by the Chief Guest", kind: "ceremony" },
      { time: "16:40 – 16:50", title: "The Statesman’s Round", kind: "ceremony" },
      { time: "16:50 – 17:00", title: "Open Forum — Delegates’ Interaction", kind: "ceremony" },
      { time: "17:00 – 17:05", title: "Photo Session with the Chief Guest", kind: "ceremony" },
      { time: "17:05 – 17:10", title: "Spiritual Dance", kind: "ceremony" },
    ],
  },
];
