export type Edition = {
  label: string;
  year: string;
  byline: string;
};

export const EDITIONS: Edition[] = [
  {
    label: "Legatio 1.0",
    year: "—",
    byline: "Ambition, when backed by discipline, creates something remarkable.",
  },
  {
    label: "Legatio 2.0",
    year: "—",
    byline: "A standard, once set, inspires others to reach for it.",
  },
  {
    label: "Legatio 3.0",
    year: "—",
    byline: "Community is perhaps Legatio's most enduring output.",
  },
];

export const LEGACY_STATS = [
  { value: "04", label: "Editions" },
  { value: "600+", label: "Delegates this year" },
  { value: "15", label: "Committees" },
  { value: "—", label: "Schools represented" },
];
