export type RegistrationData = {
  // Personal
  fullName: string;
  gender: "Male" | "Female" | "Non-binary" | "Prefer not to say" | "";
  age: string;
  grade: string;

  // School
  school: string;
  city: string;
  faAdvisorName: string;
  faAdvisorContact: string;

  // Contact
  email: string;
  phone: string;
  emergencyName: string;
  emergencyPhone: string;

  // Experience
  experienceLevel: "First-timer" | "Beginner" | "Intermediate" | "Advanced" | "";
  conferencesAttended: string;
  bestAwards: string;

  // Preferences
  committee1: string;
  committee2: string;
  committee3: string;
  portfolio1: string;
  portfolio2: string;
  portfolio3: string;

  // Other
  dietary: string;
  accommodation: "Required" | "Not required" | "Undecided" | "";
  notes: string;

  // Consent
  consent: boolean;
};

export const INITIAL_DATA: RegistrationData = {
  fullName: "",
  gender: "",
  age: "",
  grade: "",
  school: "",
  city: "",
  faAdvisorName: "",
  faAdvisorContact: "",
  email: "",
  phone: "",
  emergencyName: "",
  emergencyPhone: "",
  experienceLevel: "",
  conferencesAttended: "",
  bestAwards: "",
  committee1: "",
  committee2: "",
  committee3: "",
  portfolio1: "",
  portfolio2: "",
  portfolio3: "",
  dietary: "",
  accommodation: "",
  notes: "",
  consent: false,
};

export const STEPS = [
  { id: 1, title: "Personal", caption: "Tell us who you are." },
  { id: 2, title: "School", caption: "Where you study." },
  { id: 3, title: "Contact", caption: "How we reach you." },
  { id: 4, title: "Experience", caption: "Your MUN journey so far." },
  { id: 5, title: "Preferences", caption: "Your committee and portfolio choices." },
  { id: 6, title: "Logistics", caption: "Last few practical details." },
  { id: 7, title: "Review", caption: "Confirm and submit." },
] as const;
