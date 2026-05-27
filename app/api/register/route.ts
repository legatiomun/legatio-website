import { NextResponse } from "next/server";

/**
 * Registration submission endpoint.
 *
 * If GOOGLE_SHEETS_WEBAPP_URL is set, this proxies the submission to a
 * Google Apps Script web app that writes a new row to a Google Sheet.
 * Otherwise, it logs the payload and returns success — useful for local
 * development while the backend isn't wired up.
 *
 * See README → "Wiring the registration backend" for setup.
 */

export const runtime = "nodejs";

type Payload = Record<string, unknown>;

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  if (typeof body !== "object" || body === null) {
    return NextResponse.json({ ok: false, error: "Invalid payload" }, { status: 400 });
  }

  // Minimal server-side validation. The client already validates step-by-step.
  const email = String(body.email ?? "");
  const fullName = String(body.fullName ?? "");
  if (!fullName.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 });
  }

  const id = `LEG4-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;

  const enriched = {
    id,
    submittedAt: new Date().toISOString(),
    secret: process.env.REGISTRATION_SHARED_SECRET || "",
    ...body,
  };

  const webhook = process.env.GOOGLE_SHEETS_WEBAPP_URL;

  if (!webhook) {
    // Dev fallback: log and accept.
    console.log("[register] no GOOGLE_SHEETS_WEBAPP_URL configured — logging payload", enriched);
    return NextResponse.json({ ok: true, id, dev: true });
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(enriched),
    });
    const text = await res.text();
    let upstream: unknown = null;
    try {
      upstream = text ? JSON.parse(text) : null;
    } catch {
      upstream = null;
    }

    if (!res.ok) {
      console.error("[register] upstream error", res.status, text);
      return NextResponse.json({ ok: false, error: "Upstream rejected submission" }, { status: 502 });
    }

    if (
      !upstream ||
      typeof upstream !== "object" ||
      !("ok" in upstream) ||
      upstream.ok !== true
    ) {
      console.error("[register] upstream rejected submission", upstream ?? text);
      return NextResponse.json({ ok: false, error: "Registration store rejected submission" }, { status: 502 });
    }

    return NextResponse.json({ ok: true, id });
  } catch (err) {
    console.error("[register] forward failed", err);
    return NextResponse.json(
      { ok: false, error: "Could not reach registration store" },
      { status: 502 },
    );
  }
}
