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
    photoTransform: "translateY(-8%) scale(1.22)",
  },
  {
    id: "kevin-lama",
    name: "Kevin Lama",
    role: "ASG Conference Management",
    group: "Secretariat",
    photo: "/team/kevin-lama.jpg",
    photoTransform: "translateY(-18%) scale(1.32)",
  },
  {
    id: "samarth-sharma",
    name: "Samarth Sharma",
    role: "ASG Conference Management",
    group: "Secretariat",
    photo: "/team/samarth-sharma.jpg",
    photoTransform: "translateY(-8%) scale(1.2)",
  },
  {
    id: "suryanshu-chakraborty",
    name: "Suryanshu Chakraborty",
    role: "ASG Conference Management",
    group: "Secretariat",
    photo: "/team/suryanshu-chakraborty.jpg",
    photoTransform: "translateY(-22%) scale(1.34)",
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

  // Beginner tier
  { id: "eb-unhrc-parthajyoti", name: "Parthajyoti Roy", role: "Co-Chairperson", committee: "UNHRC", group: "Executive Board" },
  { id: "eb-unhrc-srotoswini", name: "Srotoswini Ghatak", role: "Co-Chairperson", committee: "UNHRC", group: "Executive Board" },
  { id: "eb-uncsw-namrata", name: "Namrata Mishra", role: "Chairperson", committee: "UNCSW", group: "Executive Board" },
  { id: "eb-uncsw-ahanjit", name: "Ahanjit Paul", role: "Co-Chairperson", committee: "UNCSW", group: "Executive Board" },
  { id: "eb-specpol-aryan", name: "Aryan Banerjee", role: "Co-Chairperson", committee: "UNGA-SPECPOL", group: "Executive Board" },
  { id: "eb-specpol-akashdeep", name: "Akashdeep Sen", role: "Co-Chairperson", committee: "UNGA-SPECPOL", group: "Executive Board" },
  { id: "eb-ipc-drishti", name: "Drishti Kedia", role: "Head of Journalists", committee: "IPC", group: "Executive Board" },
  { id: "eb-ipc-priyansha", name: "Priyansha Paul", role: "Head of Caricaturists", committee: "IPC", group: "Executive Board" },
  { id: "eb-ipc-vaishali", name: "Vaishali Pradhan", role: "Head of Photojournalists", committee: "IPC", group: "Executive Board" },
  // Intermediate tier
  { id: "eb-ecofin-sankalp", name: "Sankalp Ojha", role: "Chairperson", committee: "ECOFIN", group: "Executive Board" },
  { id: "eb-unodc-siddhant", name: "Siddhant Chilwarwar", role: "Chairperson", committee: "UNODC", group: "Executive Board" },
  { id: "eb-unodc-sanchayan", name: "Sanchayan Chakraborty", role: "Vice Chairperson", committee: "UNODC", group: "Executive Board" },
  { id: "eb-brics-utsav", name: "Utsav Dey", role: "Chairperson", committee: "BRICS+", group: "Executive Board" },
  { id: "eb-brics-sharmistha", name: "Sharmistha Kundu", role: "Vice Chairperson", committee: "BRICS+", group: "Executive Board" },
  { id: "eb-ccpa-shounak", name: "Shounak Banerjee Chowdhury", role: "Chairperson", committee: "CCPA", group: "Executive Board" },
  { id: "eb-ls-aaron", name: "Aaron Mirza", role: "Moderator", committee: "Lok Sabha", group: "Executive Board" },
  { id: "eb-ls-nazre", name: "Nazre Moin", role: "Deputy Moderator", committee: "Lok Sabha", group: "Executive Board" },
  // Advanced tier
  { id: "eb-icj-shourjo", name: "Shourjo Roychaudhuri", role: "President", committee: "ICJ", group: "Executive Board" },
  { id: "eb-unsc-riddhi", name: "Riddhi Sen Majumder", role: "Chairperson", committee: "UNSC", group: "Executive Board" },
  { id: "eb-indo-china-rutajeet", name: "Rutajeet Karmakar", role: "Co-Chairperson", committee: "Indo-China", group: "Executive Board" },
  { id: "eb-indo-china-tenzing", name: "Tenzing Namgyal Bhutia", role: "Co-Chairperson", committee: "Indo-China", group: "Executive Board" },
  // Flagship tier
  { id: "eb-hlpf-sankalpa", name: "Sankalpa Chakraborty", role: "Chairperson", committee: "HLPF", group: "Executive Board" },
  { id: "eb-copuos-kunwar", name: "Kunwar Dipankar", role: "Chairperson", committee: "UN-COPUOS", group: "Executive Board" },
  { id: "eb-us-senate-biprojit", name: "Biprojit Roy Choudhury", role: "President", committee: "US SENATE", group: "Executive Board" },
  { id: "eb-us-senate-samriddhi", name: "Samriddhi Ashra", role: "President Pro Tempore", committee: "US SENATE", group: "Executive Board" },
];
