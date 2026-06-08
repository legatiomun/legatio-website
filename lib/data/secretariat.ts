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
  /** Optional fine crop adjustment inside circular portraits. */
  photoTransform?: string;
  placeholder?: boolean;
};

export const SECRETARIAT: Officer[] = [
  {
    id: "snigdha-agarwal",
    name: "Mrs. Snigdha Agarwal",
    role: "President",
    group: "Patrons",
    photo: "/team/snigdha-agarwal.jpg",
    quote: "The field is set. The standard is restored. Welcome to Legatio 4.0.",
  },
  {
    id: "anisha-sharma",
    name: "Anisha Sharma",
    role: "Principal · DPS Siliguri",
    group: "Patrons",
    photo: "/team/anisha-sharma.jpg",
    quote: "Where words become weapons of wisdom and dialogue becomes the pathway to peace.",
  },
  {
    id: "moumita-debnath-pradhan",
    name: "Moumita Debnath Pradhan",
    role: "Head Mistress · DPS Siliguri",
    group: "Patrons",
    photo: "/team/moumita-debnath.jpg",
    quote: "What is tested here endures elsewhere.",
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
    id: "sinjini-banerjee",
    name: "Sinjini Banerjee",
    role: "Secretary-General",
    group: "Secretariat",
    quote:
      "The Mahabharata did not ask Arjuna if he was ready. The conch was blown, the field was set, and the moment demanded everything.",
  },
  {
    id: "debarya-chanda",
    name: "Debarya Chanda",
    role: "Deputy Secretary-General",
    group: "Secretariat",
    photo: "/team/debarya-chanda.jpg",
  },
  {
    id: "drishti-kedia",
    name: "Drishti Kedia",
    role: "Special Advisor",
    group: "Secretariat",
  },
  {
    id: "pratik-agarwal",
    name: "Pratik Agarwal",
    role: "Special Advisor",
    group: "Secretariat",
  },
  {
    id: "ansh-agarwal",
    name: "Ansh Agarwal",
    role: "Joint Chef de Cabinet",
    group: "Secretariat",
    photo: "/team/ansh-agarwal.jpg",
    photoTransform: "translateY(-6%) scale(1.28)",
  },
  {
    id: "mayank-upadhaya",
    name: "Mayank Upadhaya",
    role: "Joint Chef de Cabinet",
    group: "Secretariat",
    photo: "/team/mayank-upadhaya.jpg",
    photoTransform: "translateY(-6%) scale(1.24)",
  },
  {
    id: "jeevan-chhetri",
    name: "Jeevan Chhetri",
    role: "Deputy Chef de Cabinet",
    group: "Secretariat",
    photo: "/team/jeevan-chhetri.jpg",
    photoTransform: "translateY(-2%) scale(1.2)",
  },
  {
    id: "mayank-somani",
    name: "Mayank Somani",
    role: "USG Communications",
    group: "Secretariat",
    photo: "/team/mayank-somani.jpg",
    photoTransform: "translate(-2%, -22%) scale(1.34)",
  },
  {
    id: "debparna-saha",
    name: "Debparna Saha",
    role: "ASG Communications",
    group: "Secretariat",
    photo: "/team/debparna-saha.jpg",
    photoTransform: "translateY(-18%) scale(1.28)",
  },
  {
    id: "saksham-raj",
    name: "Saksham Raj",
    role: "ASG Communications",
    group: "Secretariat",
    photo: "/team/saksham-raj.jpg",
    photoTransform: "translate(5%, -24%) scale(1.36)",
  },
  {
    id: "zaina-sagir",
    name: "Zaina Sagir",
    role: "ASG Communications",
    group: "Secretariat",
    photo: "/team/zaina-sagir.jpg",
    photoTransform: "translateY(-18%) scale(1.28)",
  },
  {
    id: "sanvi-agarwal",
    name: "Sanvi Agarwal",
    role: "USG Delegate Affairs",
    group: "Secretariat",
    photo: "/team/sanvi-agarwal.jpg",
    photoTransform: "translateY(-16%) scale(1.24)",
  },
  {
    id: "ladipma-rai",
    name: "Ladipma Rai",
    role: "ASG Delegate Affairs",
    group: "Secretariat",
    photo: "/team/ladipma-rai.jpg",
  },
  {
    id: "aashish-agarwal",
    name: "Aashish Agarwal",
    role: "ASG Delegate Affairs",
    group: "Secretariat",
    photo: "/team/aashish-agarwal.jpg",
  },
  {
    id: "ishika-rawat",
    name: "Ishika Rawat",
    role: "USG Conference Management",
    group: "Secretariat",
    photo: "/team/ishika-rawat.jpg",
  },
  {
    id: "adarsh-jindal",
    name: "Adarsh Jindal",
    role: "ASG Conference Management",
    group: "Secretariat",
    photo: "/team/adarsh-jindal.jpg",
  },
  {
    id: "devarsh-sikdar",
    name: "Devarsh Sikdar",
    role: "ASG Conference Management",
    group: "Secretariat",
    photo: "/team/devarsh-sikdar.jpg",
  },
  {
    id: "kevin-lama",
    name: "Kevin Lama",
    role: "ASG Conference Management",
    group: "Secretariat",
    photo: "/team/kevin-lama.jpg",
  },
  {
    id: "samarth-sharma",
    name: "Samarth Sharma",
    role: "ASG Conference Management",
    group: "Secretariat",
    photo: "/team/samarth-sharma.jpg",
  },
  {
    id: "suryanshu-chakraborty",
    name: "Suryanshu Chakraborty",
    role: "ASG Conference Management",
    group: "Secretariat",
    photo: "/team/suryanshu-chakraborty.jpg",
  },
  {
    id: "saket-dewan",
    name: "Saket Dewan",
    role: "Head of CMO",
    group: "Secretariat",
  },
  {
    id: "tompok-sinha",
    name: "Tompok Sinha",
    role: "Deputy Head of CMO",
    group: "Secretariat",
    photo: "/team/tompok-sinha.jpg",
  },

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
