# Legatio 4.0 — Website

The official site for **Legatio 4.0**, the fourth edition of DPS Siliguri's flagship Model United Nations conference (31 July – 2 August 2026). Theme: *Kurukshetra of Diplomacy — War & Peace*.

Built with **Next.js 16 (App Router) + TypeScript + Tailwind CSS + Framer Motion**.

---

## Quick start

```bash
npm install
npm run dev          # → http://localhost:3000
```

Production build:

```bash
npm run build
npm run start
```

---

## Project shape

```
app/
  layout.tsx              fonts, metadata, root
  page.tsx                long-scroll homepage
  globals.css             tailwind + tokens + paper-grain overlay
  register/page.tsx       individual delegate registration
  api/register/route.ts   form submission endpoint

components/
  Navigation.tsx
  sections/               every section of the homepage
  ui/                     primitives — Ornament, Countdown, CommitteeCard, ScrollReveal…
  register/               multi-step form pieces

lib/
  data/                   committees, itinerary, letters, secretariat, faq, legacy
  utils.ts                cn(), countdown math

public/
  ornaments/  textures/  images/   (drop-in assets)

tailwind.config.ts        custom palette + fonts + ember keyframes
```

---

## Visual system

| Token | Hex | Use |
|---|---|---|
| `ink` | `#1A1410` | Primary text, deep backgrounds |
| `parchment` | `#F1E6CF` | Background base |
| `parchment-deep` | `#E4D2A8` | Section dividers |
| `saffron` | `#D77A2C` | Primary accent / CTAs |
| `blood` | `#7A1F1F` | "War" motif, emphasis |
| `brass` | `#B08A3E` | Gold rules, ornaments |
| `lapis` | `#1B2A4E` | "Peace" / diplomacy / links |
| `bone` | `#FAF4E6` | Cards on dark sections |

Fonts (loaded via `next/font/google`):
- **Cinzel** — display
- **EB Garamond** — editorial body
- **Tiro Devanagari Sanskrit** — shloka accents
- **JetBrains Mono** — UI / committee codes

---

## Wiring the registration backend (Google Sheets)

Out of the box, the registration form posts to `/api/register`. If you don't set a backend URL, the API logs the submission and returns success — useful in dev.

To persist submissions to a Google Sheet, **no database required**:

1. **Create a Sheet.** Add a header row matching the fields in `components/register/types.ts` (full name, email, school, etc.). Add columns for `submittedAt` and `id`.
2. **Open Extensions → Apps Script.** Paste:
   ```javascript
   function doPost(e) {
     const body = JSON.parse(e.postData.contents);
     // Optional: verify shared secret
     // if (body.secret !== "your-secret-here") return ContentService.createTextOutput("forbidden").setMimeType(ContentService.MimeType.TEXT);
     const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
     const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
     const row = headers.map(h => body[h] ?? "");
     sheet.appendRow(row);
     return ContentService.createTextOutput(JSON.stringify({ ok: true, id: body.id })).setMimeType(ContentService.MimeType.JSON);
   }
   ```
3. **Deploy → New deployment → Web app.**
   - Execute as: *Me*
   - Who has access: *Anyone*
   - Copy the resulting `/exec` URL.
4. **Copy** `.env.example` to `.env.local` and fill:
   ```
   GOOGLE_SHEETS_WEBAPP_URL=https://script.google.com/macros/s/.../exec
   REGISTRATION_SHARED_SECRET=some-long-random-string
   ```
5. Restart `npm run dev` — submissions now flow into your Sheet.

The form is structured so swapping to a real DB (Supabase, Postgres, etc.) is a one-file change in `app/api/register/route.ts`.

---

## Asset checklist (drop-in as you receive them)

The site is fully functional without these. Add them when ready:

- [x] **Conference logo** — `public/images/logo.png` (in place). Already wired into Navigation, Hero, Footer and Open Graph.
- [ ] **Committee emblems** — by default each committee shows an SVG seal with its code + subtitle. To use real emblems, save the file as `public/committees/<committee-id>.png` (or `.svg`) and set `image: "/committees/<id>.png"` on the matching entry in `lib/data/committees.ts`. IDs are: `unhrc`, `uncsw`, `specpol`, `ipc`, `ecofin`, `unodc`, `brics`, `ccpa`, `loksabha`, `icj`, `unsc-ctc`, `1962-ccc`, `hlpf`, `copuos`, `us-congress`.
- [ ] **Past edition photos** — `public/images/legacy/01.jpg`, etc. Wire into the Legacy block on `/about`.
- [ ] **Real legacy stats** — `lib/data/legacy.ts` (delegate counts, schools, awards across past editions).
- [ ] **Secretariat headshots + names** — edit `lib/data/secretariat.ts` to replace `—` placeholders.
- [ ] **Campus photo** — `public/images/campus.jpg`. Reference from `app/venue/page.tsx`.
- [ ] **Wide OG image** — `public/og.jpg` (1200×630) for X/Twitter share cards. Reference in `app/layout.tsx`.
- [ ] **Background-guide PDFs** — when EB briefs are ready, drop into `public/briefs/` and link from `components/CommitteesList.tsx`.

---

## Deploying

**Vercel** (recommended, zero-config):
```
npm i -g vercel
vercel
```
Set `GOOGLE_SHEETS_WEBAPP_URL` and `REGISTRATION_SHARED_SECRET` in the Vercel project settings → Environment Variables.

**Static export** is not used here because `/api/register` needs a server runtime. If you ever want a fully static site, replace the registration route with a direct client-side POST to the Apps Script URL (loses validation/secret guard).

---

## Editorial content (where to change what)

- All **committee data** — `lib/data/committees.ts`
- The **3-day itinerary** — `lib/data/itinerary.ts`
- The four **letters from the desk** — `lib/data/letters.ts`
- **Secretariat** roster — `lib/data/secretariat.ts`
- **FAQ** — `lib/data/faq.ts`
- **Legacy** stats and edition byelines — `lib/data/legacy.ts`
- Conference **start date / countdown** — `lib/utils.ts` → `CONFERENCE_START`
- **Phone / email** addresses are hardcoded in Footer + FAQ + RegisterCTA — search `legatiomun@gmail.com` to update.

---

## Accessibility

- Honors `prefers-reduced-motion`.
- All buttons have focus rings (`*:focus-visible { outline: 2px solid var(--saffron); }`).
- Color contrast aims for WCAG AA on body text. The hero gold-foil heading is decorative — meaning is duplicated elsewhere.

---

## License

© 2026 Legatio · Delhi Public School Siliguri. All rights reserved.
