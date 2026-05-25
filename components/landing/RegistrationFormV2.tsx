"use client";

import { useEffect, useRef, useState, type ChangeEvent } from "react";
import Image from "next/image";
import Link from "next/link";

const STEPS = [
  { id: 1, title: "Personal" },
  { id: 2, title: "School" },
  { id: 3, title: "Contact" },
  { id: 4, title: "Experience" },
  { id: 5, title: "Preferences" },
  { id: 6, title: "Logistics" },
  { id: 7, title: "Payment" },
  { id: 8, title: "Review & submit" },
] as const;

type FormValues = {
  fullName: string;
  gender: string;
  age: string;
  grade: string;
  school: string;
  city: string;
  faAdvisorName: string;
  faAdvisorContact: string;
  email: string;
  phone: string;
  emergencyName: string;
  emergencyPhone: string;
  experienceLevel: string;
  conferencesAttended: string;
  bestAwards: string;
  committee1: string;
  committee2: string;
  committee3: string;
  portfolio1: string;
  portfolio2: string;
  portfolio3: string;
  accommodation: string;
  notes: string;
  paymentScreenshot: string;
  paymentScreenshotName: string;
  consent: boolean;
};

const INITIAL: FormValues = {
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
  accommodation: "",
  notes: "",
  paymentScreenshot: "",
  paymentScreenshotName: "",
  consent: false,
};

const COMMITTEE_OPTIONS = [
  { group: "Beginner", items: [
    "UNHRC — UN Human Rights Council",
    "UNCSW — UN Commission on the Status of Women",
    "SPECPOL — Special Political & Decolonization",
    "IPC — International Press Corps",
  ] },
  { group: "Intermediate", items: [
    "ECOFIN — Economic & Financial Committee",
    "UNODC — UN Office on Drugs and Crime",
    "BRICS — BRICS Summit",
    "CCPA — Cabinet Committee on Political Affairs",
    "LS — Lok Sabha",
  ] },
  { group: "Advanced", items: [
    "ICJ — International Court of Justice",
    "UNSC-CTC — UN Security Council CTC",
    "1962-CCC — Indo-China War Cabinet (1962)",
  ] },
  { group: "Flagship", items: [
    "HLPF — High Level Political Forum",
    "COPUOS — Peaceful Uses of Outer Space",
    "US-SEN — United States Senate",
  ] },
];

const ALL_COMMITTEES = COMMITTEE_OPTIONS.flatMap((g) => g.items);

const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
const isPhone = (s: string) => /^[0-9+\- ]{8,}$/.test(s);

function validateStep(step: number, v: FormValues): Set<keyof FormValues> {
  const errs = new Set<keyof FormValues>();
  const need = (k: keyof FormValues) => {
    const val = v[k];
    if (typeof val === "string" && !val.trim()) errs.add(k);
    if (typeof val === "boolean" && !val) errs.add(k);
  };
  if (step === 1) {
    need("fullName"); need("gender");
    const age = Number(v.age);
    if (!v.age || age < 10 || age > 30) errs.add("age");
    need("grade");
  }
  if (step === 2) { need("school"); need("city"); }
  if (step === 3) {
    if (!isEmail(v.email)) errs.add("email");
    if (!isPhone(v.phone)) errs.add("phone");
    need("emergencyName");
    if (!isPhone(v.emergencyPhone)) errs.add("emergencyPhone");
  }
  if (step === 4) need("experienceLevel");
  if (step === 5) {
    need("committee1"); need("committee2"); need("committee3");
    need("portfolio1"); need("portfolio2"); need("portfolio3");
  }
  if (step === 6) need("accommodation");
  if (step === 7) need("paymentScreenshot");
  if (step === 8 && !v.consent) errs.add("consent");
  return errs;
}

export function RegistrationFormV2() {
  const [current, setCurrent] = useState(1);
  const [values, setValues] = useState<FormValues>(INITIAL);
  const [errors, setErrors] = useState<Set<keyof FormValues>>(new Set());
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState<{ id: string; name: string; email: string } | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const cardRef = useRef<HTMLFormElement>(null);

  function set<K extends keyof FormValues>(key: K, value: FormValues[K]) {
    setValues((v) => ({ ...v, [key]: value }));
    if (errors.has(key)) {
      const next = new Set(errors);
      next.delete(key);
      setErrors(next);
    }
  }

  function showStep(n: number) {
    const clamped = Math.max(1, Math.min(STEPS.length, n));
    setCurrent(clamped);
    setErrors(new Set());
  }

  async function submit() {
    const e = validateStep(8, values);
    if (e.size > 0) { setErrors(e); return; }
    setSubmitting(true);
    setServerError(null);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || "Submission failed");
      const id = json.id ?? `LEG·${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
      setSubmitted({
        id,
        name: values.fullName.split(" ")[0] || "delegate",
        email: values.email || "your email",
      });
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 80, behavior: "smooth" });
      }
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Submission failed");
    } finally {
      setSubmitting(false);
    }
  }

  function next() {
    const e = validateStep(current, values);
    if (e.size > 0) {
      setErrors(e);
      return;
    }
    if (current === STEPS.length) {
      void submit();
    } else {
      showStep(current + 1);
    }
  }

  // Enter to advance (except in textareas/checkbox)
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key !== "Enter") return;
      const target = e.target as HTMLElement;
      const tag = (target.tagName || "").toLowerCase();
      if (tag === "textarea") return;
      if ((target as HTMLInputElement).type === "checkbox") return;
      e.preventDefault();
      next();
    };
    const node = cardRef.current;
    node?.addEventListener("keydown", handler);
    return () => node?.removeEventListener("keydown", handler);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, values]);

  if (submitted) {
    return (
      <div className="form-wrap">
        <div className="success active">
          <div className="seal">✓</div>
          <h2>
            Thank you, <em>{submitted.name}</em>.
          </h2>
          <p>
            Your registration is in. The Secretariat will be in touch at{" "}
            <strong>{submitted.email}</strong> with your committee allotment.
          </p>
          <div className="ref">Reference · {submitted.id}</div>
          <div className="actions">
            <Link href="/" className="primary">
              Return home <span className="arr">→</span>
            </Link>
            <Link href="/committees" className="secondary">
              Explore committees
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const step = STEPS[current - 1];
  const fillPct = (current / STEPS.length) * 100;
  const hasErr = (k: keyof FormValues) => errors.has(k);
  const fieldClass = (k: keyof FormValues) => `field${hasErr(k) ? " has-error" : ""}`;

  return (
    <div className="form-wrap">
      <div className="step-dots" aria-hidden="true">
        {STEPS.map((s) => {
          const state = s.id < current ? "done" : s.id === current ? "current" : undefined;
          return <span key={s.id} className="dot" data-state={state} />;
        })}
      </div>

      <form ref={cardRef} noValidate onSubmit={(e) => e.preventDefault()}>
        <div className="form-card">
          <div className="progress-bar">
            <div className="fill" style={{ width: `${fillPct}%` }} />
          </div>

          <div className="form-body">
            <div className="step-head">
              <div className="num">Step {String(current).padStart(2, "0")}</div>
              <h2>{step.title}</h2>
            </div>

            {/* STEP 1 — Personal */}
            <div className={`step-panel${current === 1 ? " active" : ""}`}>
              <div className="grid-2">
                <div className={fieldClass("fullName")}>
                  <label>Full name <span className="req">●</span></label>
                  <input
                    name="fullName"
                    placeholder="As it should appear on your placard"
                    value={values.fullName}
                    onChange={(e) => set("fullName", e.target.value)}
                  />
                  <span className="err">Required</span>
                </div>
                <div className={fieldClass("gender")}>
                  <label>Gender <span className="req">●</span></label>
                  <select
                    name="gender"
                    value={values.gender}
                    onChange={(e) => set("gender", e.target.value)}
                  >
                    <option value="">Select…</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Non-binary</option>
                    <option>Prefer not to say</option>
                  </select>
                  <span className="err">Required</span>
                </div>
                <div className={fieldClass("age")}>
                  <label>Age <span className="req">●</span></label>
                  <input
                    name="age"
                    type="number"
                    min={10}
                    max={30}
                    placeholder="e.g. 16"
                    value={values.age}
                    onChange={(e) => set("age", e.target.value)}
                  />
                  <span className="err">Enter a valid age (10–30)</span>
                </div>
                <div className={fieldClass("grade")}>
                  <label>Class / Grade <span className="req">●</span></label>
                  <input
                    name="grade"
                    placeholder="e.g. Class XI"
                    value={values.grade}
                    onChange={(e) => set("grade", e.target.value)}
                  />
                  <span className="err">Required</span>
                </div>
              </div>
            </div>

            {/* STEP 2 — School */}
            <div className={`step-panel${current === 2 ? " active" : ""}`}>
              <div className="grid-2">
                <div className={fieldClass("school")}>
                  <label>School / Institution <span className="req">●</span></label>
                  <input
                    value={values.school}
                    onChange={(e) => set("school", e.target.value)}
                  />
                  <span className="err">Required</span>
                </div>
                <div className={fieldClass("city")}>
                  <label>City <span className="req">●</span></label>
                  <input value={values.city} onChange={(e) => set("city", e.target.value)} />
                  <span className="err">Required</span>
                </div>
                <div className={fieldClass("faAdvisorName")}>
                  <label>Faculty advisor</label>
                  <input
                    placeholder="Optional"
                    value={values.faAdvisorName}
                    onChange={(e) => set("faAdvisorName", e.target.value)}
                  />
                </div>
                <div className={fieldClass("faAdvisorContact")}>
                  <label>Advisor contact</label>
                  <input
                    placeholder="Email or phone"
                    value={values.faAdvisorContact}
                    onChange={(e) => set("faAdvisorContact", e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* STEP 3 — Contact */}
            <div className={`step-panel${current === 3 ? " active" : ""}`}>
              <div className="grid-2">
                <div className={fieldClass("email")}>
                  <label>Email <span className="req">●</span></label>
                  <input
                    type="email"
                    placeholder="you@school.edu"
                    value={values.email}
                    onChange={(e) => set("email", e.target.value)}
                  />
                  <span className="err">Enter a valid email</span>
                </div>
                <div className={fieldClass("phone")}>
                  <label>Phone <span className="req">●</span></label>
                  <input
                    type="tel"
                    placeholder="+91 …"
                    value={values.phone}
                    onChange={(e) => set("phone", e.target.value)}
                  />
                  <span className="err">Enter a valid phone number</span>
                </div>
                <div className={fieldClass("emergencyName")}>
                  <label>Emergency contact — name <span className="req">●</span></label>
                  <input
                    placeholder="A guardian we can reach"
                    value={values.emergencyName}
                    onChange={(e) => set("emergencyName", e.target.value)}
                  />
                  <span className="err">Required</span>
                </div>
                <div className={fieldClass("emergencyPhone")}>
                  <label>Emergency contact — phone <span className="req">●</span></label>
                  <input
                    type="tel"
                    value={values.emergencyPhone}
                    onChange={(e) => set("emergencyPhone", e.target.value)}
                  />
                  <span className="err">Enter a valid phone number</span>
                </div>
              </div>
            </div>

            {/* STEP 4 — Experience */}
            <div className={`step-panel${current === 4 ? " active" : ""}`}>
              <div className={fieldClass("experienceLevel")}>
                <label>Experience level <span className="req">●</span></label>
                <div className="segmented seg-4" role="group">
                  {(["First-timer", "Beginner", "Intermediate", "Advanced"] as const).map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      aria-pressed={values.experienceLevel === lvl}
                      onClick={() => set("experienceLevel", lvl)}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
                <span className="err">Pick one to continue</span>
              </div>
              {values.experienceLevel && values.experienceLevel !== "First-timer" && (
                <>
                  <div className={fieldClass("conferencesAttended")}>
                    <label>Conferences attended</label>
                    <textarea
                      placeholder="e.g. Legatio 3.0 — UNHRC (2025)"
                      value={values.conferencesAttended}
                      onChange={(e: ChangeEvent<HTMLTextAreaElement>) => set("conferencesAttended", e.target.value)}
                    />
                    <span className="hint">Optional — helps with allotments.</span>
                  </div>
                  <div className={fieldClass("bestAwards")}>
                    <label>Notable awards</label>
                    <textarea
                      placeholder="Best Delegate / High Commendation / etc."
                      value={values.bestAwards}
                      onChange={(e: ChangeEvent<HTMLTextAreaElement>) => set("bestAwards", e.target.value)}
                    />
                  </div>
                </>
              )}
            </div>

            {/* STEP 5 — Preferences */}
            <div className={`step-panel${current === 5 ? " active" : ""}`}>
              <div className="grid-3">
                <div className={fieldClass("committee1")}>
                  <label>Choice I <span className="req">●</span></label>
                  <select
                    value={values.committee1}
                    onChange={(e) => set("committee1", e.target.value)}
                  >
                    <option value="">Select a committee…</option>
                    {COMMITTEE_OPTIONS.map((g) => (
                      <optgroup key={g.group} label={g.group}>
                        {g.items.map((opt) => (
                          <option key={opt}>{opt}</option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                  <span className="err">Required</span>
                </div>
                <div className={fieldClass("committee2")}>
                  <label>Choice II <span className="req">●</span></label>
                  <select
                    value={values.committee2}
                    onChange={(e) => set("committee2", e.target.value)}
                  >
                    <option value="">Select…</option>
                    {ALL_COMMITTEES.map((opt) => (
                      <option key={opt}>{opt}</option>
                    ))}
                  </select>
                  <span className="err">Required</span>
                </div>
                <div className={fieldClass("committee3")}>
                  <label>Choice III <span className="req">●</span></label>
                  <select
                    value={values.committee3}
                    onChange={(e) => set("committee3", e.target.value)}
                  >
                    <option value="">Select…</option>
                    {ALL_COMMITTEES.map((opt) => (
                      <option key={opt}>{opt}</option>
                    ))}
                  </select>
                  <span className="err">Required</span>
                </div>
              </div>
              <div className="grid-3" style={{ marginTop: 18 }}>
                <div className={fieldClass("portfolio1")}>
                  <label>Portfolio I <span className="req">●</span></label>
                  <input
                    placeholder="e.g. United States"
                    value={values.portfolio1}
                    onChange={(e) => set("portfolio1", e.target.value)}
                  />
                  <span className="err">Required</span>
                </div>
                <div className={fieldClass("portfolio2")}>
                  <label>Portfolio II <span className="req">●</span></label>
                  <input
                    value={values.portfolio2}
                    onChange={(e) => set("portfolio2", e.target.value)}
                  />
                  <span className="err">Required</span>
                </div>
                <div className={fieldClass("portfolio3")}>
                  <label>Portfolio III <span className="req">●</span></label>
                  <input
                    value={values.portfolio3}
                    onChange={(e) => set("portfolio3", e.target.value)}
                  />
                  <span className="err">Required</span>
                </div>
              </div>
            </div>

            {/* STEP 6 — Logistics */}
            <div className={`step-panel${current === 6 ? " active" : ""}`}>
              <div className={fieldClass("accommodation")}>
                <label>Accommodation <span className="req">●</span></label>
                <div className="segmented seg-3" role="group">
                  {(["Required", "Not required", "Undecided"] as const).map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      aria-pressed={values.accommodation === opt}
                      onClick={() => set("accommodation", opt)}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
                <span className="err">Pick one to continue</span>
              </div>
              <div className={fieldClass("notes")}>
                <label>Notes for the Secretariat</label>
                <textarea
                  placeholder="Anything you'd like us to know."
                  value={values.notes}
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) => set("notes", e.target.value)}
                />
              </div>
            </div>

            {/* STEP 7 — Payment */}
            <div className={`step-panel${current === 7 ? " active" : ""}`}>
              <div className="pay">
                <div className="pay-amount">
                  <span className="pay-label">Registration fee</span>
                  <span className="pay-value">₹3,000</span>
                  <span className="pay-note">Per individual delegate</span>
                </div>
                <div className="pay-qr">
                  <Image
                    src="/images/payment-qr.png"
                    alt="UPI QR code for Legatio 4.0 registration fee"
                    width={300}
                    height={300}
                  />
                  <p className="pay-upi">
                    UPI · <strong>legatiomun@upi</strong>
                  </p>
                  <p className="pay-hint">Scan with any UPI app · GPay · PhonePe · Paytm</p>
                </div>
              </div>

              <div className={fieldClass("paymentScreenshot")}>
                <label>Payment screenshot <span className="req">●</span></label>
                <div className="file-upload">
                  {!values.paymentScreenshot ? (
                    <label className="file-pick">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          if (file.size > 5 * 1024 * 1024) {
                            alert("Please keep the screenshot under 5MB.");
                            e.target.value = "";
                            return;
                          }
                          const reader = new FileReader();
                          reader.onload = () => {
                            set("paymentScreenshot", reader.result as string);
                            set("paymentScreenshotName", file.name);
                          };
                          reader.readAsDataURL(file);
                        }}
                      />
                      <span className="file-pick-icon" aria-hidden>↑</span>
                      <span className="file-pick-title">Choose screenshot</span>
                      <span className="file-pick-hint">PNG or JPG · up to 5MB</span>
                    </label>
                  ) : (
                    <div className="file-selected">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={values.paymentScreenshot} alt="Payment screenshot preview" />
                      <div className="file-selected-meta">
                        <p className="file-selected-name">{values.paymentScreenshotName}</p>
                        <button
                          type="button"
                          className="file-change"
                          onClick={() => {
                            set("paymentScreenshot", "");
                            set("paymentScreenshotName", "");
                          }}
                        >
                          Change
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                <span className="err">Upload your transaction screenshot</span>
              </div>
            </div>

            {/* STEP 8 — Review */}
            <div className={`step-panel${current === 8 ? " active" : ""}`}>
              <dl className="review-list">
                {[
                  ["Full name", values.fullName],
                  ["Gender", values.gender],
                  ["Age", values.age],
                  ["Class / Grade", values.grade],
                  ["School", values.school],
                  ["City", values.city],
                  ["Email", values.email],
                  ["Phone", values.phone],
                  ["Emergency contact", [values.emergencyName, values.emergencyPhone].filter(Boolean).join(" · ")],
                  ["Experience level", values.experienceLevel],
                  ["Committee preferences", [values.committee1, values.committee2, values.committee3].filter(Boolean).join("; ")],
                  ["Portfolio preferences", [values.portfolio1, values.portfolio2, values.portfolio3].filter(Boolean).join("; ")],
                  ["Accommodation", values.accommodation],
                  ["Notes", values.notes],
                  ["Payment screenshot", values.paymentScreenshotName || (values.paymentScreenshot ? "attached" : "")],
                ].map(([label, value]) => {
                  const empty = !value;
                  return (
                    <div key={label}>
                      <dt>{label}</dt>
                      <dd className={empty ? "empty" : ""}>
                        {empty ? "— not provided —" : value}
                      </dd>
                    </div>
                  );
                })}
              </dl>
              <label className="consent">
                <input
                  type="checkbox"
                  checked={values.consent}
                  onChange={(e) => set("consent", e.target.checked)}
                />
                <span className="text">
                  I confirm the details above are accurate and consent to Legatio 4.0 contacting me at the
                  provided email and phone.
                </span>
              </label>
              <div className={fieldClass("consent")} style={{ marginTop: 8 }}>
                <span className="err">Please accept to submit</span>
              </div>
              {serverError && (
                <p className="hint" style={{ marginTop: 12, color: "var(--maroon)", fontStyle: "normal" }}>
                  {serverError}
                </p>
              )}
            </div>
          </div>

          <div className="form-foot">
            <button
              type="button"
              className="back"
              disabled={current === 1 || submitting}
              onClick={() => showStep(current - 1)}
            >
              ← Back
            </button>
            <span className="pgr">
              <strong>{String(current).padStart(2, "0")}</strong> / {String(STEPS.length).padStart(2, "0")}
            </span>
            <button
              type="button"
              className="next"
              disabled={submitting}
              onClick={() => next()}
            >
              {current === STEPS.length
                ? submitting ? "Submitting…" : "Submit registration"
                : "Continue"}{" "}
              <span className="arr">→</span>
            </button>
          </div>
        </div>

        <p className="form-foot-note">
          Questions? Write to{" "}
          <a
            href="mailto:legatiomun@gmail.com"
            style={{ color: "var(--accent)", borderBottom: "1px solid var(--accent)" }}
          >
            legatiomun@gmail.com
          </a>
        </p>
      </form>

      <aside className="after-note" aria-label="After you submit">
        <div className="lbl">After you submit</div>
        <ol>
          <li>We confirm receipt by email within 48 hours.</li>
          <li>The Secretariat allots a committee based on your preferences and experience.</li>
          <li>A briefing pack arrives three weeks before the conference.</li>
        </ol>
      </aside>
    </div>
  );
}
