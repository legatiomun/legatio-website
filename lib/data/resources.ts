/**
 * Content for the Delegate Resources page.
 *
 * Mirrors the FAQ data shape (sections → items) but each item carries a list
 * of rich content blocks instead of a single answer string, so it can hold
 * prose, bullet lists, callouts and tables. The three "pages" of the source
 * handbook map to the three sections below.
 */

export type ResourceBlock =
  | { type: "para"; text: string }
  | { type: "bullets"; items: string[] }
  | { type: "tip"; text: string }
  | { type: "note"; text: string }
  | { type: "tag"; label: string; value: string }
  | { type: "table"; columns: [string, string]; rows: [string, string][] };

export type ResourceItem = {
  title: string;
  blocks: ResourceBlock[];
};

export type ResourceSection = {
  /** Short label shown in the section header, e.g. "Page 01". */
  page: string;
  label: string;
  intro?: string;
  items: ResourceItem[];
};

export const RESOURCE_SECTIONS: ResourceSection[] = [
  {
    page: "Page 01",
    label: "What is Model United Nations?",
    intro:
      "New to MUN? Start here. This is the ground floor — what the activity is, why it is worth your time, and how it mirrors the real United Nations.",
    items: [
      {
        title: "What is Model United Nations?",
        blocks: [
          {
            type: "para",
            text: "Picture this: you walk into a room, take your seat behind a nameplate, and for the next three days, you are the representative of a country. You speak on their behalf. You argue their position. You negotiate with other nations. You try to solve some of the world's biggest problems.",
          },
          {
            type: "para",
            text: "That's exactly what Model United Nations (MUN) is.",
          },
          {
            type: "para",
            text: "MUN is a simulation of the United Nations, the greatest international organization where 193 countries come together to discuss and resolve global issues like climate change, human rights, poverty, and conflicts. In MUN, you become the diplomat. Students from different schools take on roles as delegates representing countries, and work together inside committees to debate, draft, and pass resolutions — just like real UN diplomats do.",
          },
        ],
      },
      {
        title: "Why does MUN matter?",
        blocks: [
          {
            type: "para",
            text: "MUN is not just a school activity — it's one of the best learning experiences a young person can have. Here's why:",
          },
          {
            type: "bullets",
            items: [
              "Public Speaking — You'll learn to express your ideas clearly and confidently in front of a room full of people.",
              "Critical Thinking — You'll research real-world issues and figure out what your assigned country actually believes about them.",
              "Negotiation & Teamwork — You'll work with other delegates to find common ground — even with people whose country's positions are very different from your own.",
              "Research & Writing — You'll learn to read reports, understand policies, and write formal documents.",
              "Global Awareness — You'll start seeing the world through the eyes of other nations, cultures, and people.",
            ],
          },
          {
            type: "para",
            text: "Whether you want to be a diplomat, a lawyer, a journalist, a scientist, or a business leader — MUN sharpens the skills that every profession needs.",
          },
        ],
      },
      {
        title: "A quick look at the real United Nations",
        blocks: [
          {
            type: "para",
            text: "The United Nations (UN) was founded in 1945 after World War II, with one goal: to prevent future wars and promote peace, human rights, and development. Today, it has 193 member states and works on everything from stopping terrorism to fighting hunger to protecting the environment.",
          },
          {
            type: "para",
            text: "MUN conferences recreate this structure. There are different committees — each one focused on a specific area — and delegates are assigned to one of these committees. You debate a specific topic called an agenda, and at the end, your committee tries to pass a resolution — a document that proposes solutions.",
          },
        ],
      },
    ],
  },
  {
    page: "Page 02",
    label: "How to prepare for your first conference",
    intro:
      "Six steps from the moment you receive your allotment to the moment you take the floor. Work through them in order and you'll walk in ready.",
    items: [
      {
        title: "Step 1 — Know your committee and your country",
        blocks: [
          {
            type: "para",
            text: "The very first thing you'll receive from the conference organizers is your committee assignment and your country/portfolio assignment. These two things are very important for how you'll prepare.",
          },
          {
            type: "bullets",
            items: [
              "Your committee tells you what topic area you'll be debating (e.g., human rights, the environment, security, economics).",
              "Your country tells you whose position you represent — regardless of your personal opinion.",
            ],
          },
          {
            type: "tip",
            text: "If you're assigned to represent a country like Russia, China, or the USA, remember — you are not voicing your own views. You represent that country's actual foreign policy and interests.",
          },
        ],
      },
      {
        title: "Step 2 — Read the Background Guide (Study Guide)",
        blocks: [
          {
            type: "para",
            text: "The delegates shall be provided a Background Guide (also called a Study Guide) for each committee. This document, written by the committee's Secretariat (the chairs and directors who run the committee), explains:",
          },
          {
            type: "bullets",
            items: [
              "What the committee is",
              "What the agenda topic is",
              "Key history and context about the issue",
              "Questions to guide your research",
            ],
          },
          {
            type: "para",
            text: "Read it carefully. It's the most important document you'll receive before the conference.",
          },
        ],
      },
      {
        title: "Step 3 — Research your country's position",
        blocks: [
          {
            type: "para",
            text: "Once you've read the Background Guide, research how your assigned country views the topic. Ask yourself:",
          },
          {
            type: "bullets",
            items: [
              "What has my country officially said about this issue?",
              "Has my country signed any treaties or agreements related to this?",
              "What are my country's allies saying? Who are its opponents?",
              "What would my country want the resolution to say?",
            ],
          },
          {
            type: "table",
            columns: ["Where to research", "What you'll find there"],
            rows: [
              ["UN Official Website (un.org)", "Official resolutions, reports, data"],
              ["Country's Ministry of Foreign Affairs website", "Your country's official positions"],
              ["BBC, Al Jazeera, Reuters", "Current news and events"],
              ["CIA World Factbook", "Country profiles and background"],
              ["General encyclopedias & reference sites", "General overviews — always verify with primary sources"],
            ],
          },
        ],
      },
      {
        title: "Step 4 — Write your Position Paper",
        blocks: [
          {
            type: "para",
            text: "A Position Paper is a short document (usually 1–2 pages) that summarizes:",
          },
          {
            type: "bullets",
            items: [
              "Your country's general view on the topic",
              "The key issues your country cares about",
              "The solutions your country proposes",
            ],
          },
          {
            type: "para",
            text: "Many conferences require you to submit this before the conference begins. Even if it's not mandatory, writing one is excellent practice because it forces you to organize your thoughts.",
          },
        ],
      },
      {
        title: "Step 5 — Prepare your opening speech",
        blocks: [
          {
            type: "para",
            text: "Your Opening Speech (also, in some procedures, called a General Speaker's List speech) is usually 60–90 seconds long and is your first chance to speak in committee. It should cover:",
          },
          {
            type: "bullets",
            items: [
              "Who you represent",
              "Your country's position on the agenda",
              "2–3 key points or solutions your country supports in committee",
            ],
          },
          {
            type: "para",
            text: "Practice it out loud — time yourself, stand straight, and speak clearly. Don't memorize it word-for-word; understand it well enough to say it naturally.",
          },
        ],
      },
      {
        title: "Step 6 — Understand basic MUN procedure",
        blocks: [
          {
            type: "para",
            text: "MUN has its own set of rules called Rules of Parliamentary Procedure. Here are the essential terms every first-timer needs to know:",
          },
          {
            type: "table",
            columns: ["Term", "What it means"],
            rows: [
              ["Delegate", "You — a student representing a country"],
              ["Dais / Executive Board / Secretariat", "The chairs and directors who run the committee"],
              ["Placard", "Your country's nameplate — raise it to be recognized to speak"],
              ["Yield", "What you do with leftover time after your speech (yield to another delegate, to points, or to the chair)"],
              ["Point of Information", "A question you ask another delegate after their speech"],
              ["Moderated Caucus", "A structured debate where delegates speak one at a time"],
              ["Unmoderated Caucus", "A break where delegates walk around and talk freely — great for making alliances!"],
              ["Resolution", "The final document your committee votes on, proposing solutions"],
              ["Clause", "A single point in a resolution; preambulatory clauses explain context, operative clauses propose action"],
            ],
          },
          {
            type: "note",
            text: "Please note the rules of procedure for various committees are subject to the committee. For more information on the Rules of Procedure for Indian committees / other ROP-based committees, please refer to the Background Guide or ask your respective Secretariat member.",
          },
          {
            type: "tip",
            text: "Don't worry if you don't remember all of this on Day 1. Your Secretariat will guide you through the procedure. Always remember — most experienced delegates were beginners once too!",
          },
        ],
      },
    ],
  },
  {
    page: "Page 03",
    label: "Committee brief",
    intro:
      "A snapshot of each committee at this conference — what they do, who's in them, and what kind of debates to expect.",
    items: [
      {
        title: "United Nations Human Rights Council (UNHRC)",
        blocks: [
          {
            type: "para",
            text: "The UNHRC is one of the most important bodies in the UN. Its job is to promote and protect human rights for every person on the planet — regardless of their country, religion, or background.",
          },
          {
            type: "para",
            text: "In committee, delegates review human rights situations in different countries, address violations, and work to create international standards. Think of it as the UN's watchdog for dignity and justice. Delegates draft resolutions that hold nations accountable and strengthen global human rights frameworks.",
          },
          { type: "tag", label: "Great for delegates interested in", value: "Law, social justice, human rights, politics." },
        ],
      },
      {
        title: "United Nations Commission on the Status of Women (UNCSW)",
        blocks: [
          {
            type: "para",
            text: "The UNCSW is the primary global body dedicated to gender equality and women's empowerment. It sets standards, evaluates progress, and shapes policies on issues faced by women worldwide.",
          },
          {
            type: "para",
            text: "Sessions tackle a wide range of themes — from economic rights and education access to ending gender-based violence. Delegates bring their country's perspective to these urgent conversations and work toward practical, enforceable change.",
          },
          { type: "tag", label: "Great for delegates interested in", value: "Gender studies, social policy, development, advocacy." },
        ],
      },
      {
        title: "UNGA — Special Political and Decolonization Committee (SPECPOL)",
        blocks: [
          {
            type: "para",
            text: "Also known as the Fourth Committee of the UN General Assembly, SPECPOL handles the topics that don't fit neatly into other boxes — issues at the intersection of politics and humanitarianism, such as decolonization, peacekeeping missions, and the effects of nuclear radiation.",
          },
          {
            type: "para",
            text: "This committee is known for its breadth. If you like exploring unusual and politically sensitive global topics, SPECPOL is the place to be.",
          },
          { type: "tag", label: "Great for delegates interested in", value: "Political science, history, peacekeeping, international law." },
        ],
      },
      {
        title: "International Press Corps (IPC) — Photojournalism, Journalism & Caricature",
        blocks: [
          {
            type: "para",
            text: "The IPC is unlike any other committee — delegates here don't represent countries. Instead, they simulate the role of real-world media covering the conference. Members act as journalists, photographers, and caricaturists, producing articles, photos, and illustrations about the debates happening in other committees.",
          },
          {
            type: "para",
            text: "If you love writing, art, or storytelling — this is your committee. It sharpens communication, creativity, and critical observation, and shows how media shapes public understanding of diplomacy.",
          },
          { type: "tag", label: "Great for delegates interested in", value: "Journalism, creative writing, art, media, communication." },
        ],
      },
      {
        title: "United Nations Office on Drugs and Crime (UNODC)",
        blocks: [
          {
            type: "para",
            text: "The UNODC is the UN's lead agency in the global fight against illicit drugs, organized crime, corruption, and terrorism. It helps member states build legal frameworks and enforcement capabilities to tackle threats that cross borders.",
          },
          {
            type: "para",
            text: "In committee, delegates address issues like drug trafficking networks, money laundering, and transnational organized crime. It's an intense, fast-moving topic requiring strategic thinking.",
          },
          { type: "tag", label: "Great for delegates interested in", value: "Security, criminal justice, international law, policy." },
        ],
      },
      {
        title: "BRICS+ (Brazil, Russia, India, China & South Africa)",
        blocks: [
          {
            type: "para",
            text: "BRICS+ is an expanded coalition of eleven full member nations working to reshape global governance and economic structures. Originally founded by Brazil, Russia, India, China, and South Africa, the bloc has grown significantly — with Egypt, Ethiopia, Iran, and the UAE joining in January 2024, Indonesia in January 2025, and Saudi Arabia completing its membership in July 2025. The bloc now represents over 40% of the world's population and approximately 37% of global GDP.",
          },
          {
            type: "para",
            text: "In committee, delegates debate trade, financial reform, and geopolitical cooperation. A central priority is reducing reliance on the US dollar and building alternative global financial systems that give developing nations more power.",
          },
          { type: "tag", label: "Great for delegates interested in", value: "Economics, geopolitics, finance, development." },
        ],
      },
      {
        title: "Cabinet Committee on Political Affairs (CCPA)",
        blocks: [
          {
            type: "para",
            text: "The CCPA simulates a group of senior government ministers making critical political decisions for their country. It handles issues like internal security, elections, and relations between states — essentially the government's core decision-making table.",
          },
          {
            type: "para",
            text: "This committee is highly dynamic, requiring delegates to think like statespeople under pressure. Expect real-time updates and rapidly changing scenarios.",
          },
          { type: "tag", label: "Great for delegates interested in", value: "Domestic politics, governance, policy-making, crisis management." },
        ],
      },
      {
        title: "Economic and Financial Committee (ECOFIN)",
        blocks: [
          {
            type: "para",
            text: "ECOFIN is the Second Committee of the UN General Assembly, focused on international economic cooperation and financial stability. It tackles issues like sustainable development, poverty eradication, debt relief, and global trade.",
          },
          {
            type: "para",
            text: "Delegates craft resolutions to bridge economic disparities between nations and build a more equitable world economy — one where growth benefits everyone, not just the wealthiest countries.",
          },
          { type: "tag", label: "Great for delegates interested in", value: "Economics, finance, development, sustainability." },
        ],
      },
      {
        title: "Lok Sabha",
        blocks: [
          {
            type: "para",
            text: "The Lok Sabha is the lower house of India's Parliament and the primary legislative body of the world's largest democracy. In this committee, delegates simulate real parliamentary debates on domestic legislation, national policy, and social issues.",
          },
          {
            type: "para",
            text: "Unlike UN committees, here delegates represent Indian constituencies, not countries. You'll engage with India's constitutional framework and the complex political, social, and economic landscape that shapes lawmaking in India.",
          },
          { type: "tag", label: "Great for delegates interested in", value: "Indian politics, law, governance, social policy." },
        ],
      },
      {
        title: "International Court of Justice (ICJ)",
        blocks: [
          {
            type: "para",
            text: "The ICJ is the principal judicial organ of the United Nations, settling legal disputes between sovereign states. Cases involve international law, treaties, territorial conflicts, and state responsibility.",
          },
          {
            type: "para",
            text: "This is the most formal committee at any MUN. Delegates take on the roles of judges or legal advocates, engaging in rigorous legal argumentation. If you like law, logical reasoning, and formal procedure — the ICJ is a unique and rewarding challenge.",
          },
          { type: "tag", label: "Great for delegates interested in", value: "Law, international relations, argumentation, justice." },
        ],
      },
      {
        title: "UNSC — Counter-Terrorism Committee (UNSC-CTC)",
        blocks: [
          {
            type: "para",
            text: "The UNSC-CTC is a specialized committee of the Security Council, established after the September 11, 2001 attacks to enhance global counter-terrorism efforts. It monitors and supports member states in implementing resolutions against terrorism financing, recruitment, and cross-border activity.",
          },
          {
            type: "para",
            text: "Delegates tackle one of the most urgent and complex threats to international peace and security. Expect high-stakes debates, technical detail, and the weight of real-world urgency.",
          },
          { type: "tag", label: "Great for delegates interested in", value: "Security, counter-terrorism, international law, intelligence policy." },
        ],
      },
      {
        title: "Crisis Cabinet Committee — Indo-China War Cabinet (CCC)",
        blocks: [
          {
            type: "para",
            text: "The CCC is a high-intensity crisis committee simulating real-time decision-making during an Indo-China conflict scenario. Delegates act as cabinet ministers or military advisors responding to rapidly evolving geopolitical and military situations.",
          },
          {
            type: "para",
            text: "Unlike standard committees where research determines your success, the CCC rewards quick thinking, strategy, and on-the-spot diplomacy. Every session brings new developments — and your ability to adapt will define your performance.",
          },
          { type: "tag", label: "Great for delegates interested in", value: "Military strategy, crisis management, geopolitics, foreign policy." },
        ],
      },
      {
        title: "High-Level Political Forum on Sustainable Development (HLPF)",
        blocks: [
          {
            type: "para",
            text: "The HLPF is the central UN platform for reviewing progress on the Sustainable Development Goals (SDGs) — the 17 global goals adopted in 2015 to end poverty, protect the planet, and ensure prosperity for all by 2030.",
          },
          {
            type: "para",
            text: "Delegates work alongside governments, civil society, and experts to assess where the world is falling short and accelerate action. It's a forward-looking committee for those who care about the future of our planet.",
          },
          { type: "tag", label: "Great for delegates interested in", value: "Environment, development, climate policy, social equity." },
        ],
      },
      {
        title: "UN Committee on the Peaceful Uses of Outer Space (UN-COPUOS)",
        blocks: [
          {
            type: "para",
            text: "UN-COPUOS is the primary UN forum governing international cooperation in the exploration and use of outer space. It develops legal frameworks and policies on satellite use, space debris management, and celestial resource governance.",
          },
          {
            type: "para",
            text: "As space becomes increasingly contested — with new nations and private companies entering the race — delegates navigate some of the most exciting frontier questions of 21st-century international law. What are the rules when there are no borders?",
          },
          { type: "tag", label: "Great for delegates interested in", value: "Space science, international law, technology policy, innovation." },
        ],
      },
      {
        title: "United States Senate",
        blocks: [
          {
            type: "para",
            text: "The US Senate is the upper chamber of the US Congress, holding significant authority over legislation, foreign policy, and executive appointments. In this committee, delegates simulate debates on landmark domestic and international issues shaping American governance.",
          },
          {
            type: "para",
            text: "Unlike UN committees, this one operates on US political dynamics — party negotiations, constitutional powers, and the real-world tension between domestic policy and global leadership.",
          },
          { type: "tag", label: "Great for delegates interested in", value: "American politics, law, foreign policy, governance." },
        ],
      },
    ],
  },
];
