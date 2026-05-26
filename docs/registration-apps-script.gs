/**
 * Legatio 4.0 — Registration intake (Google Apps Script)
 *
 * Receives POST requests from the Next.js `/api/register` route, validates the
 * shared secret, saves the payment screenshot to a Drive folder, and appends a
 * row to the bound Google Sheet.
 *
 * Setup:
 *   1. Create a Google Sheet with a tab named "Registrations".
 *      Paste the header row from HEADERS below into row 1.
 *   2. Create a Drive folder for payment screenshots. Copy its ID from the URL
 *      (after /folders/) and paste it into SCREENSHOT_FOLDER_ID below.
 *   3. Pick a long random string for SHARED_SECRET. The same string goes into
 *      the Vercel env var REGISTRATION_SHARED_SECRET.
 *   4. Extensions → Apps Script. Replace Code.gs with this file's contents.
 *   5. Save. Deploy → New deployment → Type: Web app.
 *        Description: Legatio registration intake
 *        Execute as: Me (your Google account)
 *        Who has access: Anyone   ← required so the Next.js server can post
 *   6. Copy the deployment URL (ends with /exec) and set it as Vercel env
 *      GOOGLE_SHEETS_WEBAPP_URL.
 *
 * After deployment, run `submitTestRow()` once from the Apps Script editor to
 * grant the script the Drive + Sheets scopes it needs.
 */

const SHEET_TAB_NAME      = "Registrations";
const SCREENSHOT_FOLDER_ID = "PASTE_DRIVE_FOLDER_ID_HERE";
const SHARED_SECRET        = "CHANGE_ME_to_a_long_random_string";

/** Order matches the header row written by ensureHeaderRow(). */
const HEADERS = [
  "Submitted At",
  "Ref",
  "Full Name",
  "Gender",
  "Age",
  "Class / Grade",
  "School",
  "City",
  "Faculty Advisor",
  "Advisor Contact",
  "Email",
  "Phone",
  "Emergency Name",
  "Emergency Phone",
  "Experience Level",
  "Conferences Attended",
  "Notable Awards",
  "Choice I",
  "Choice II",
  "Choice III",
  "Portfolio I",
  "Portfolio II",
  "Portfolio III",
  "Accommodation",
  "Notes",
  "Screenshot File",
  "Screenshot Link",
  "Consent",
];

/* ────────────────────────────────────────────────────────── HTTP entry */

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return jsonResponse({ ok: false, error: "Empty body" });
    }
    const body = JSON.parse(e.postData.contents);

    // Shared-secret guard. Vercel route sends `secret` set from
    // REGISTRATION_SHARED_SECRET; must match SHARED_SECRET here.
    if (SHARED_SECRET && body.secret !== SHARED_SECRET) {
      return jsonResponse({ ok: false, error: "Forbidden" });
    }

    const sheet = getSheet_();
    ensureHeaderRow_(sheet);

    // Decode payment screenshot (data URL) → save to Drive → keep a link
    const { fileLink, fileName } = saveScreenshot_(body);

    sheet.appendRow([
      body.submittedAt || new Date().toISOString(),
      body.id || "",
      body.fullName || "",
      body.gender || "",
      body.age || "",
      body.grade || "",
      body.school || "",
      body.city || "",
      body.faAdvisorName || "",
      body.faAdvisorContact || "",
      body.email || "",
      body.phone || "",
      body.emergencyName || "",
      body.emergencyPhone || "",
      body.experienceLevel || "",
      body.conferencesAttended || "",
      body.bestAwards || "",
      body.committee1 || "",
      body.committee2 || "",
      body.committee3 || "",
      body.portfolio1 || "",
      body.portfolio2 || "",
      body.portfolio3 || "",
      body.accommodation || "",
      body.notes || "",
      fileName,
      fileLink,
      body.consent ? "Yes" : "No",
    ]);

    return jsonResponse({ ok: true, id: body.id });
  } catch (err) {
    return jsonResponse({ ok: false, error: String(err) });
  }
}

/** Sanity ping. Visit the /exec URL in a browser to verify deployment. */
function doGet() {
  return jsonResponse({ ok: true, service: "Legatio registration intake" });
}

/* ────────────────────────────────────────────────────────── helpers */

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_TAB_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_TAB_NAME);
  }
  return sheet;
}

function ensureHeaderRow_(sheet) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
    sheet.setFrozenRows(1);
  }
}

function saveScreenshot_(body) {
  const dataUrl = body.paymentScreenshot;
  if (!dataUrl || !dataUrl.startsWith("data:")) {
    return { fileLink: "", fileName: body.paymentScreenshotName || "" };
  }
  const match = dataUrl.match(/^data:([^;]+);base64,(.+)$/);
  if (!match) return { fileLink: "", fileName: body.paymentScreenshotName || "" };

  const mime = match[1];
  const bytes = Utilities.base64Decode(match[2]);
  const ext = (mime.split("/")[1] || "jpg").toLowerCase().split("+")[0];
  const safeName = (body.fullName || "delegate")
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .trim()
    .replace(/\s+/g, "_");
  const fileName = `${body.id || Date.now()}__${safeName}.${ext}`;

  const blob = Utilities.newBlob(bytes, mime, fileName);
  const folder = DriveApp.getFolderById(SCREENSHOT_FOLDER_ID);
  const file = folder.createFile(blob);

  // Anyone with the link can view (so the Secretariat can open from the sheet)
  try {
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  } catch (_e) { /* folder may already inherit a sharing policy */ }

  return { fileLink: file.getUrl(), fileName: file.getName() };
}

/* ────────────────────────────────────────────────────────── test helper */

/** Run once from the Apps Script editor to grant scopes and verify the wire. */
function submitTestRow() {
  const fake = {
    postData: {
      contents: JSON.stringify({
        secret: SHARED_SECRET,
        id: "LEG4-TEST-" + Date.now(),
        submittedAt: new Date().toISOString(),
        fullName: "Test Delegate",
        gender: "Prefer not to say",
        age: "16",
        grade: "Class XI",
        school: "DPS Siliguri",
        city: "Siliguri",
        email: "test@example.com",
        phone: "+91 0000000000",
        emergencyName: "Test Guardian",
        emergencyPhone: "+91 0000000000",
        experienceLevel: "First-timer",
        committee1: "UNHRC — UN Human Rights Council",
        accommodation: "Not required",
        paymentScreenshot: "",
        paymentScreenshotName: "",
        consent: true,
      }),
    },
  };
  const out = doPost(fake);
  Logger.log(out.getContent());
}
