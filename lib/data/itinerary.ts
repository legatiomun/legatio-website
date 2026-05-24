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
      { time: "07:30 – 08:30", title: "Reporting & Registration", kind: "registration" },
      { time: "08:30 – 09:30", title: "Breakfast", kind: "meal" },
      { time: "09:30 – 10:45", title: "Opening Ceremony", kind: "ceremony", detail: "Lighting of the lamp. Address by the Secretariat." },
      { time: "10:45 – 13:00", title: "Committee Session I", kind: "committee" },
      { time: "13:00 – 14:30", title: "Lunch", kind: "meal" },
      { time: "14:30 – 17:00", title: "Committee Session II", kind: "committee" },
      { time: "17:00 onwards", title: "High Tea & Dispersal", kind: "dispersal" },
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
      { time: "09:00 – 10:00", title: "EB Panel Discussion", kind: "panel" },
      { time: "10:00 – 13:00", title: "Committee Session III", kind: "committee" },
      { time: "13:00 – 14:30", title: "Lunch", kind: "meal" },
      { time: "14:30 – 17:00", title: "Committee Session IV", kind: "committee" },
      { time: "17:00 – 17:30", title: "High Tea", kind: "meal" },
      { time: "17:30 – 19:00", title: "Socials", kind: "social", detail: "An evening built for the friendships that outlast the gavel." },
      { time: "19:00 onwards", title: "Dinner & Dispersal", kind: "dispersal" },
    ],
  },
  {
    label: "Day III",
    date: "2 August 2026",
    weekday: "Sunday",
    motif: "The Standard Restored",
    slots: [
      { time: "07:30 – 08:00", title: "Reporting", kind: "registration" },
      { time: "08:00 – 09:30", title: "Committee Session V", kind: "committee" },
      { time: "09:30 – 10:30", title: "Breakfast", kind: "meal" },
      { time: "10:30 – 13:00", title: "Committee Session VI", kind: "committee" },
      { time: "13:00 – 14:00", title: "Lunch", kind: "meal" },
      { time: "14:00 – 15:30", title: "Committee Session VII", kind: "committee" },
      { time: "15:45 – 16:45", title: "Grand Press Conference", kind: "press", detail: "IPC convenes every committee under one roof." },
      { time: "16:45 – 17:15", title: "High Tea", kind: "meal" },
      { time: "17:15 – 20:00", title: "Closing Ceremony", kind: "ceremony", detail: "Awards, valedictory address, the closing gavel." },
      { time: "20:15 onwards", title: "Dispersal", kind: "dispersal" },
    ],
  },
];
