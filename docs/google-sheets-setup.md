# Registration → Google Sheets — setup

End-to-end: every individual delegate registration appended as a row in a
Google Sheet, with the payment screenshot uploaded to a Drive folder and
linked from the row.

## Architecture

```
Browser ──▶ Vercel (/api/register)  ──▶  Apps Script Web App  ──▶  Sheet + Drive
              JSON, w/ shared secret      decode, save, append row
```

Nothing extra runs on Vercel — the existing API route just proxies to the
Apps Script URL set in `GOOGLE_SHEETS_WEBAPP_URL`.

---

## One-time setup (10–15 min)

### 1 · Create the Google Sheet

1. <https://sheets.new>
2. Name it something like **Legatio 4.0 — Registrations**
3. Rename the first tab to exactly `Registrations` (or leave it as `Sheet1` — the script will auto-create the tab if missing)

### 2 · Create a Drive folder for screenshots

1. <https://drive.google.com> → **New** → **Folder**
2. Name it something like **Legatio 4.0 — Payment Screenshots**
3. Open the folder. Copy the **folder ID** from the URL — it's the long string after `/folders/`:
   ```
   https://drive.google.com/drive/folders/1aBcDeFgHiJkLmNoP1234567890_xYz
                                          └────────── this part ──────────┘
   ```

### 3 · Paste the Apps Script

1. From the Sheet, **Extensions → Apps Script**. A new editor tab opens.
2. Replace the `Code.gs` contents with the file at [`docs/registration-apps-script.gs`](./registration-apps-script.gs).
3. At the top of the file, fill in two values:
   - `SCREENSHOT_FOLDER_ID` — the folder ID from step 2
   - `SHARED_SECRET` — pick a long random string (e.g. run `openssl rand -hex 24` in a terminal). Keep a copy; you'll paste the same value into Vercel in step 5.
4. **Save** (⌘S).

### 4 · Deploy the Apps Script as a Web App

1. In the Apps Script editor: **Deploy → New deployment**
2. Click the gear → **Web app**
3. Settings:
   - **Description**: `Legatio registration intake`
   - **Execute as**: *Me (your-account@gmail.com)*
   - **Who has access**: *Anyone* ← required, the Vercel server posts as an anonymous client
4. **Deploy**. Authorize the scopes when prompted (Sheets + Drive).
5. Copy the resulting **Web app URL** — ends with `/exec`.

> Verify by opening that URL in a browser. Should print
> `{"ok":true,"service":"Legatio registration intake"}`.

### 5 · Wire it into Vercel

1. <https://vercel.com/legatio-s-projects/legatio-website/settings/environment-variables>
2. Add two env vars (apply to **Production** and **Preview**):

   | Name | Value |
   |---|---|
   | `GOOGLE_SHEETS_WEBAPP_URL` | the `/exec` URL from step 4 |
   | `REGISTRATION_SHARED_SECRET` | the same long random string you put in the script |

3. Redeploy (push any commit, or **Redeploy** the latest from the dashboard) so the runtime picks up the new env vars.

### 6 · Smoke test

1. Open <https://legatio.vercel.app/register>
2. Fill in the form with junk data — including the payment screenshot file picker (any image)
3. Submit
4. Open the Google Sheet — a new row should appear with all fields populated and a link in the **Screenshot Link** column that opens the file in Drive

---

## Field mapping

The header row matches the keys in `components/landing/RegistrationFormV2.tsx`:

| Sheet column | Form field |
|---|---|
| Submitted At | (server) `submittedAt` ISO timestamp |
| Ref | (server) `id` — e.g. `LEG4-MPFANQU0-2Q1C` |
| Full Name | `fullName` |
| Gender | `gender` |
| Age | `age` |
| Class / Grade | `grade` |
| School | `school` |
| City | `city` |
| Faculty Advisor | `faAdvisorName` |
| Advisor Contact | `faAdvisorContact` |
| Email | `email` |
| Phone | `phone` |
| Emergency Name | `emergencyName` |
| Emergency Phone | `emergencyPhone` |
| Experience Level | `experienceLevel` |
| Conferences Attended | `conferencesAttended` |
| Notable Awards | `bestAwards` |
| Choice I / II / III | `committee1 / 2 / 3` |
| Portfolio I / II / III | `portfolio1 / 2 / 3` |
| Accommodation | `accommodation` |
| Notes | `notes` |
| Screenshot File | filename saved to Drive |
| Screenshot Link | Drive URL (anyone-with-link can view) |
| Consent | `Yes` / `No` |

---

## Updating the script later

Edit `docs/registration-apps-script.gs` here, paste into the Apps Script editor,
**Deploy → Manage deployments → ✎ (pencil)** → bump the version → **Deploy**.
You do NOT need to change the Vercel env var — the same `/exec` URL keeps
pointing at the latest deployment.

## Rotating the shared secret

Change `SHARED_SECRET` in the script, re-deploy a new version, then update
`REGISTRATION_SHARED_SECRET` in Vercel to match. Any in-flight submissions in
between will be rejected with `403 Forbidden` — fine for a school MUN volume.

## Troubleshooting

- **Submissions show `403 Forbidden`** → `SHARED_SECRET` doesn't match `REGISTRATION_SHARED_SECRET`. Double-check both values, no leading/trailing whitespace.
- **`Could not reach registration store`** → Apps Script deployment isn't *Anyone access*, or the `/exec` URL is wrong. Re-check step 4.
- **Screenshots aren't in Drive** → wrong `SCREENSHOT_FOLDER_ID`, or you didn't grant the Drive scope. Re-run `submitTestRow` from the Apps Script editor, accept the auth dialog.
- **The form submits but no row appears** → in the Apps Script editor, **Executions** (left sidebar clock icon) shows the last few runs and any error stack trace.
