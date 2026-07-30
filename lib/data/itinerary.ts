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
      { time: "07:30 – 08:00", title: "Registration of Delegates", kind: "registration", detail: "Delegates complete registration and proceed for breakfast." },
      { time: "08:00 – 09:00", title: "Breakfast", kind: "meal" },
      { time: "09:00 – 09:30", title: "Seating of Delegates & Guests", kind: "ceremony", detail: "Final preparations in SAM Hall." },
      { time: "09:30 – 09:35", title: "Welcome Speech & Introduction by the Anchors", kind: "ceremony" },
      { time: "09:35 – 09:40", title: "Floral Tribute & Lighting of the Lamp", kind: "ceremony", detail: "By the dignitaries." },
      { time: "09:40 – 09:50", title: "Address by the Principal, DPS Siliguri", kind: "ceremony" },
      { time: "09:50 – 10:00", title: "Keynote Address by Prof. Zinia Mitra", kind: "ceremony", detail: "Introduction and felicitation, followed by the keynote address." },
      { time: "10:00 – 10:04", title: "Introduction of Legatio", kind: "ceremony" },
      { time: "10:04 – 10:14", title: "School Band Performance (Celestial)", kind: "ceremony" },
      { time: "10:14 – 10:17", title: "Stage Set-up for Dance Drama", kind: "ceremony" },
      { time: "10:17 – 10:25", title: "Dance Drama", kind: "ceremony", detail: "'Vasudhaiva Kutumbakam: The Dance of Diplomacy'" },
      { time: "10:25 – 10:35", title: "March of the Scottish Band 'The Highlanders' & Secretariat", kind: "ceremony" },
      { time: "10:35 – 10:40", title: "Unveiling of the Best Delegation Trophy", kind: "ceremony" },
      { time: "10:40 – 10:45", title: "Address by the Secretary-General", kind: "ceremony" },
      { time: "10:45 – 10:55", title: "Calling Out of Committees", kind: "ceremony", detail: "Delegates proceed towards the committee rooms." },
      { time: "11:00 – 13:15", title: "Committee Session I", kind: "committee" },
      { time: "13:15 – 14:45", title: "Lunch Break", kind: "meal" },
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
      { time: "10:00 – 10:05", title: "Country Song by a Class IV Student", kind: "ceremony" },
      { time: "10:05 – 10:15", title: "Dispersal from Hall for Committee Sessions", kind: "dispersal" },
      { time: "10:15 – 13:40", title: "Committee Session III", kind: "committee" },
      { time: "13:40 – 14:40", title: "Lunch", kind: "meal" },
      { time: "14:40 – 17:30", title: "Committee Session IV", kind: "committee" },
      { time: "17:30 – 18:30", title: "Delegate Networking Session (High Tea)", kind: "social" },
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
