/**
 * Legatio 4.0 — Registration intake (Google Apps Script)
 *
 * Receives POST requests from the Next.js `/api/register` route, validates the
 * shared secret, saves the payment screenshot to a Drive folder, runs Drive's
 * built-in OCR on it to extract the UPI transaction ID, and appends a row to
 * the bound Google Sheet.
 *
 * Setup:
 *   1. Create a Google Sheet with a tab named "Registrations".
 *      The script writes the header row automatically on first submission.
 *   2. Create a Drive folder for payment screenshots. Copy its ID from the URL
 *      (after /folders/) and paste it into SCREENSHOT_FOLDER_ID below.
 *   3. Pick a long random string for SHARED_SECRET. The same string goes into
 *      the Vercel env var REGISTRATION_SHARED_SECRET.
 *   4. Extensions → Apps Script. Replace Code.gs with this file's contents.
 *   5. Enable the Drive advanced service:
 *        In the Apps Script editor's left sidebar, click "Services" (+ icon)
 *        → "Drive API" → Add. Identifier stays "Drive". Either v2 or v3 works
 *        — this script auto-detects which version you enabled.
 *   6. Save. Deploy → Manage deployments → ✎ → bump version → Deploy.
 *        (Same /exec URL, no Vercel changes needed.)
 *   7. Run `submitTestRow()` once to grant the new Drive scopes.
 *
 * The same /exec URL keeps working; you do NOT need to update Vercel env.
 */

const SHEET_TAB_NAME       = "Registrations";
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
  "Detected Txn ID",        // ← NEW: filled by OCR
  "Consent",
  "School ID Link",          // ← NEW: appended at end so existing columns don't shift
];

/* ────────────────────────────────────────────────────────── HTTP entry */

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return jsonResponse({ ok: false, error: "Empty body" });
    }
    const body = JSON.parse(e.postData.contents);

    if (SHARED_SECRET && body.secret !== SHARED_SECRET) {
      return jsonResponse({ ok: false, error: "Forbidden" });
    }

    const sheet = getSheet_();
    ensureHeaderRow_(sheet);

    // Save screenshot to Drive and OCR it for a transaction ID
    const { fileLink, fileName, fileId } = saveScreenshot_(body);
    const detectedTxnId = fileId ? extractTransactionId_(fileId) : "";

    // Save school ID card to Drive
    const schoolId = saveSchoolId_(body);

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
      detectedTxnId,
      body.consent ? "Yes" : "No",
      schoolId.fileLink,
    ]);

    return jsonResponse({ ok: true, id: body.id, txnId: detectedTxnId });
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
  const firstRow = sheet.getRange(1, 1, 1, Math.max(sheet.getLastColumn(), 1)).getValues()[0];
  // If the sheet is empty OR the first row doesn't already contain our headers,
  // write them. If a header row exists but is missing newer columns (e.g. "Detected Txn ID"),
  // extend it without losing existing data.
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
    sheet.setFrozenRows(1);
    return;
  }
  // Ensure every managed header (columns 1..HEADERS.length) matches HEADERS,
  // WITHOUT touching any columns to the right (e.g. a manual "Approved" column).
  // We compare cell-by-cell and only rewrite if something in the managed range
  // differs, so a sheet that already has extra trailing columns is handled
  // correctly (getLastColumn() may exceed HEADERS.length).
  let needsWrite = false;
  for (let i = 0; i < HEADERS.length; i++) {
    if ((firstRow[i] || "") !== HEADERS[i]) { needsWrite = true; break; }
  }
  if (needsWrite) {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
  }
}

function saveScreenshot_(body) {
  return saveDataUrlFile_(body.paymentScreenshot, body.paymentScreenshotName, body, "");
}

function saveSchoolId_(body) {
  return saveDataUrlFile_(body.schoolIdCard, body.schoolIdCardName, body, "schoolid");
}

/**
 * Decode a data: URL and save it to the screenshot Drive folder.
 * `suffix` is appended to the file name to distinguish file types
 * (e.g. "schoolid"). Returns { fileLink, fileName, fileId }.
 */
function saveDataUrlFile_(dataUrl, fallbackName, body, suffix) {
  if (!dataUrl || !dataUrl.startsWith("data:")) {
    return { fileLink: "", fileName: fallbackName || "", fileId: "" };
  }
  const match = dataUrl.match(/^data:([^;]+);base64,(.+)$/);
  if (!match) return { fileLink: "", fileName: fallbackName || "", fileId: "" };

  const mime = match[1];
  const bytes = Utilities.base64Decode(match[2]);
  const ext = (mime.split("/")[1] || "jpg").toLowerCase().split("+")[0];
  const safeName = (body.fullName || "delegate")
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .trim()
    .replace(/\s+/g, "_");
  const tag = suffix ? `__${suffix}` : "";
  const fileName = `${body.id || Date.now()}__${safeName}${tag}.${ext}`;

  const blob = Utilities.newBlob(bytes, mime, fileName);
  const folder = DriveApp.getFolderById(SCREENSHOT_FOLDER_ID);
  const file = folder.createFile(blob);

  try {
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  } catch (_e) { /* folder may already inherit a sharing policy */ }

  return { fileLink: file.getUrl(), fileName: file.getName(), fileId: file.getId() };
}

/* ────────────────────────────────────────────────────────── OCR */

/**
 * Convert the uploaded image to a Google Doc (Drive runs OCR during the
 * conversion), read the text, then trash the temp Doc. Returns the matched
 * transaction reference or an empty string.
 *
 * Requires the advanced Drive service to be enabled — see setup step 5.
 * Works with either v2 or v3 of the Drive advanced service.
 */
function extractTransactionId_(fileId) {
  try {
    // Drive advanced service v2 uses `title` and accepts `ocr: true`.
    // Drive advanced service v3 uses `name` and `ocr` was removed (OCR
    // happens automatically when copying an image into a Google Doc).
    // Detect which version is enabled by sniffing the namespace.
    const isV3 = typeof Drive.About !== "undefined" && typeof Drive.About.get === "function" &&
                 typeof Drive.Files !== "undefined" && typeof Drive.Files.create === "function";

    let tempDoc;
    if (isV3) {
      tempDoc = Drive.Files.copy(
        { name: "OCR temp · " + fileId, mimeType: "application/vnd.google-apps.document" },
        fileId,
        { ocrLanguage: "en" }
      );
    } else {
      tempDoc = Drive.Files.copy(
        { title: "OCR temp · " + fileId, mimeType: "application/vnd.google-apps.document" },
        fileId,
        { ocr: true, ocrLanguage: "en" }
      );
    }

    const docId = tempDoc.id;
    let text = "";
    try {
      text = DocumentApp.openById(docId).getBody().getText();
    } finally {
      DriveApp.getFileById(docId).setTrashed(true);
    }
    return parseTransactionId_(text);
  } catch (err) {
    Logger.log("OCR failed: " + err);
    return "";
  }
}

/**
 * Best-effort regex extraction for Indian UPI transaction IDs in OCR'd text.
 * Tries labelled matches first (UPI Ref / UTR / Txn ID / Transaction ID /
 * Reference No), then falls back to any 12-digit number (UPI reference
 * numbers are always 12 digits).
 */
function parseTransactionId_(text) {
  if (!text) return "";

  const cleaned = text.replace(/ /g, " ");

  const labelled = [
    /UPI\s*(?:Ref(?:erence)?|Transaction\s*ID|Txn\s*ID)(?:\s*No\.?)?\s*[:\-]?\s*([A-Z0-9]{10,40})/i,
    /\bUTR(?:\s*No\.?)?\s*[:\-]?\s*([A-Z0-9]{10,40})/i,
    /\bTransaction\s*(?:ID|No\.?)\s*[:\-]?\s*([A-Z0-9]{10,40})/i,
    /\bTxn\s*(?:ID|No\.?)\s*[:\-]?\s*([A-Z0-9]{10,40})/i,
    /\bReference\s*(?:ID|No\.?|Number)\s*[:\-]?\s*([A-Z0-9]{10,40})/i,
    /\bOrder\s*(?:ID|No\.?)\s*[:\-]?\s*([A-Z0-9]{10,40})/i,
  ];
  for (const re of labelled) {
    const m = cleaned.match(re);
    if (m && m[1]) return m[1];
  }

  // Fallback: any standalone 12-digit number (UPI ref format)
  const m12 = cleaned.match(/(?:^|[^\d])(\d{12})(?:[^\d]|$)/);
  if (m12) return m12[1];

  return "";
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

/** Optional: backfill OCR for rows already in the sheet that have a screenshot
 *  link but a blank "Detected Txn ID". Run from the Apps Script editor. */
function backfillTransactionIds() {
  const sheet = getSheet_();
  const linkCol = HEADERS.indexOf("Screenshot Link") + 1;
  const idCol = HEADERS.indexOf("Detected Txn ID") + 1;
  if (linkCol === 0 || idCol === 0) return;

  const lastRow = sheet.getLastRow();
  for (let row = 2; row <= lastRow; row++) {
    const link = sheet.getRange(row, linkCol).getValue();
    const existing = sheet.getRange(row, idCol).getValue();
    if (existing || !link) continue;

    const m = String(link).match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (!m) continue;
    const fileId = m[1];
    const txn = extractTransactionId_(fileId);
    if (txn) {
      sheet.getRange(row, idCol).setValue(txn);
      Logger.log(`Row ${row}: ${txn}`);
    }
  }
}
