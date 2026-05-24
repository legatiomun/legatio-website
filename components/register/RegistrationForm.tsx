"use client";

import { useState } from "react";
import Link from "next/link";
import { COMMITTEES } from "@/lib/data/committees";
import { INITIAL_DATA, STEPS, type RegistrationData } from "./types";
import { ProgressBar } from "./ProgressBar";
import { Field, inputClass, selectClass, textareaClass } from "./Field";

type Errors = Partial<Record<keyof RegistrationData, string>>;

function validate(step: number, d: RegistrationData): Errors {
  const e: Errors = {};
  if (step === 1) {
    if (!d.fullName.trim()) e.fullName = "Required";
    if (!d.gender) e.gender = "Required";
    if (!d.age || Number(d.age) < 10 || Number(d.age) > 30) e.age = "Enter a valid age";
    if (!d.grade.trim()) e.grade = "Required";
  }
  if (step === 2) {
    if (!d.school.trim()) e.school = "Required";
    if (!d.city.trim()) e.city = "Required";
  }
  if (step === 3) {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)) e.email = "Enter a valid email";
    if (!/^[0-9+\- ]{8,}$/.test(d.phone)) e.phone = "Enter a valid phone";
    if (!d.emergencyName.trim()) e.emergencyName = "Required";
    if (!/^[0-9+\- ]{8,}$/.test(d.emergencyPhone)) e.emergencyPhone = "Enter a valid phone";
  }
  if (step === 4) {
    if (!d.experienceLevel) e.experienceLevel = "Required";
  }
  if (step === 5) {
    if (!d.committee1) e.committee1 = "Required";
  }
  if (step === 6) {
    if (!d.accommodation) e.accommodation = "Required";
  }
  if (step === 7) {
    if (!d.consent) e.consent = "Please accept the terms";
  }
  return e;
}

export function RegistrationForm() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<RegistrationData>(INITIAL_DATA);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  function update<K extends keyof RegistrationData>(key: K, value: RegistrationData[K]) {
    setData((d) => ({ ...d, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function next() {
    const e = validate(step, data);
    if (Object.keys(e).length > 0) {
      setErrors(e);
      return;
    }
    setStep((s) => Math.min(s + 1, STEPS.length));
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function back() {
    setStep((s) => Math.max(s - 1, 1));
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function submit() {
    const e = validate(7, data);
    if (Object.keys(e).length > 0) {
      setErrors(e);
      return;
    }
    setSubmitting(true);
    setServerError(null);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || "Submission failed");
      setSubmittedId(json.id ?? "received");
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Submission failed");
    } finally {
      setSubmitting(false);
    }
  }

  if (submittedId) {
    return (
      <div className="border border-line bg-cream/40 p-10 text-center">
        <p className="text-xs uppercase tracking-wider text-accent">Submitted</p>
        <h2 className="mt-3 font-serif text-3xl text-ink sm:text-4xl">
          Thank you, {data.fullName.split(" ")[0]}.
        </h2>
        <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-ink/80">
          Your registration has been received. The Secretariat will be in touch at{" "}
          <span className="text-ink">{data.email}</span> with your allotment and next steps.
        </p>
        <p className="mt-4 text-xs text-mute">Reference: {submittedId}</p>
        <Link
          href="/"
          className="mt-8 inline-block border border-ink bg-ink px-5 py-2.5 text-sm text-paper hover:bg-accent hover:border-accent"
        >
          Return home
        </Link>
      </div>
    );
  }

  return (
    <div className="border border-line bg-paper p-6 sm:p-10">
      <ProgressBar step={step} />

      <div className="mt-8">
        <h2 className="font-serif text-3xl text-ink">{STEPS[step - 1].title}</h2>
        <p className="mt-1 text-base text-mute">{STEPS[step - 1].caption}</p>
      </div>

      <div className="mt-8">
        {step === 1 && (
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Full name" required error={errors.fullName}>
              <input
                className={inputClass}
                value={data.fullName}
                onChange={(e) => update("fullName", e.target.value)}
                placeholder="As it should appear on your placard"
              />
            </Field>
            <Field label="Gender" required error={errors.gender}>
              <select
                className={selectClass}
                value={data.gender}
                onChange={(e) => update("gender", e.target.value as RegistrationData["gender"])}
              >
                <option value="">Select…</option>
                <option>Male</option>
                <option>Female</option>
                <option>Non-binary</option>
                <option>Prefer not to say</option>
              </select>
            </Field>
            <Field label="Age" required error={errors.age}>
              <input
                className={inputClass}
                type="number"
                min={10}
                max={30}
                value={data.age}
                onChange={(e) => update("age", e.target.value)}
              />
            </Field>
            <Field label="Class / Grade" required error={errors.grade}>
              <input
                className={inputClass}
                value={data.grade}
                onChange={(e) => update("grade", e.target.value)}
                placeholder="e.g. Class XI"
              />
            </Field>
          </div>
        )}

        {step === 2 && (
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="School / Institution" required error={errors.school}>
              <input className={inputClass} value={data.school} onChange={(e) => update("school", e.target.value)} />
            </Field>
            <Field label="City" required error={errors.city}>
              <input className={inputClass} value={data.city} onChange={(e) => update("city", e.target.value)} />
            </Field>
            <Field label="Faculty advisor (optional)" hint="If applicable">
              <input className={inputClass} value={data.faAdvisorName} onChange={(e) => update("faAdvisorName", e.target.value)} />
            </Field>
            <Field label="Faculty advisor contact (optional)">
              <input
                className={inputClass}
                value={data.faAdvisorContact}
                onChange={(e) => update("faAdvisorContact", e.target.value)}
                placeholder="Email or phone"
              />
            </Field>
          </div>
        )}

        {step === 3 && (
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Email" required error={errors.email}>
              <input className={inputClass} type="email" value={data.email} onChange={(e) => update("email", e.target.value)} />
            </Field>
            <Field label="Phone" required error={errors.phone}>
              <input
                className={inputClass}
                type="tel"
                value={data.phone}
                onChange={(e) => update("phone", e.target.value)}
                placeholder="+91 …"
              />
            </Field>
            <Field label="Emergency contact name" required error={errors.emergencyName}>
              <input className={inputClass} value={data.emergencyName} onChange={(e) => update("emergencyName", e.target.value)} />
            </Field>
            <Field label="Emergency contact phone" required error={errors.emergencyPhone}>
              <input
                className={inputClass}
                type="tel"
                value={data.emergencyPhone}
                onChange={(e) => update("emergencyPhone", e.target.value)}
              />
            </Field>
          </div>
        )}

        {step === 4 && (
          <div className="grid gap-5">
            <Field label="Experience level" required error={errors.experienceLevel}>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {(["First-timer", "Beginner", "Intermediate", "Advanced"] as const).map((lvl) => {
                  const active = data.experienceLevel === lvl;
                  return (
                    <button
                      type="button"
                      key={lvl}
                      onClick={() => update("experienceLevel", lvl)}
                      className={`border px-3 py-2.5 text-sm transition-colors ${
                        active ? "border-ink bg-ink text-paper" : "border-line text-ink/80 hover:border-ink"
                      }`}
                    >
                      {lvl}
                    </button>
                  );
                })}
              </div>
            </Field>
            <Field label="Conferences attended (optional)" hint="Brief list with years">
              <textarea
                className={textareaClass}
                value={data.conferencesAttended}
                onChange={(e) => update("conferencesAttended", e.target.value)}
                placeholder="e.g. Legatio 3.0 — UNHRC (2025)"
              />
            </Field>
            <Field label="Notable awards (optional)">
              <textarea
                className={textareaClass}
                value={data.bestAwards}
                onChange={(e) => update("bestAwards", e.target.value)}
                placeholder="Best Delegate / High Commendation / etc."
              />
            </Field>
          </div>
        )}

        {step === 5 && (
          <div className="grid gap-6">
            <p className="text-base text-ink/80">
              Pick three committees in order of preference. Allotments consider experience and fit.
            </p>
            <div className="grid gap-4 lg:grid-cols-3">
              {(["committee1", "committee2", "committee3"] as const).map((key, i) => (
                <Field key={key} label={`Choice ${i + 1}`} required={i === 0} error={errors[key]}>
                  <select className={selectClass} value={data[key]} onChange={(e) => update(key, e.target.value)}>
                    <option value="">Select a committee…</option>
                    {COMMITTEES.map((c) => (
                      <option key={c.id} value={`${c.code} — ${c.name}`}>
                        [{c.tier}] {c.code} — {c.name}
                      </option>
                    ))}
                  </select>
                </Field>
              ))}
            </div>
            <p className="text-base text-ink/80">Country / portfolio preferences (if applicable).</p>
            <div className="grid gap-4 lg:grid-cols-3">
              {(["portfolio1", "portfolio2", "portfolio3"] as const).map((key, i) => (
                <Field key={key} label={`Portfolio ${i + 1}`}>
                  <input
                    className={inputClass}
                    value={data[key]}
                    onChange={(e) => update(key, e.target.value)}
                    placeholder={i === 0 ? "e.g. United States" : ""}
                  />
                </Field>
              ))}
            </div>
          </div>
        )}

        {step === 6 && (
          <div className="grid gap-5">
            <Field label="Dietary requirements" hint="Veg / Non-veg / Jain / Allergies">
              <input className={inputClass} value={data.dietary} onChange={(e) => update("dietary", e.target.value)} />
            </Field>
            <Field label="Accommodation" required error={errors.accommodation}>
              <div className="grid grid-cols-3 gap-2">
                {(["Required", "Not required", "Undecided"] as const).map((opt) => {
                  const active = data.accommodation === opt;
                  return (
                    <button
                      type="button"
                      key={opt}
                      onClick={() => update("accommodation", opt)}
                      className={`border px-3 py-2.5 text-sm transition-colors ${
                        active ? "border-ink bg-ink text-paper" : "border-line text-ink/80 hover:border-ink"
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </Field>
            <Field label="Notes for the Secretariat (optional)">
              <textarea
                className={textareaClass}
                value={data.notes}
                onChange={(e) => update("notes", e.target.value)}
                placeholder="Anything you'd like us to know."
              />
            </Field>
          </div>
        )}

        {step === 7 && (
          <div>
            <p className="text-base text-ink/80">Confirm your details before submitting.</p>
            <dl className="mt-6 grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {Object.entries({
                "Full name": data.fullName,
                Gender: data.gender,
                Age: data.age,
                Grade: data.grade,
                School: data.school,
                City: data.city,
                Email: data.email,
                Phone: data.phone,
                "Emergency contact": `${data.emergencyName} · ${data.emergencyPhone}`,
                "Experience level": data.experienceLevel,
                "Conferences attended": data.conferencesAttended || "—",
                "Notable awards": data.bestAwards || "—",
                "Committee preferences": [data.committee1, data.committee2, data.committee3].filter(Boolean).join("; ") || "—",
                "Portfolio preferences": [data.portfolio1, data.portfolio2, data.portfolio3].filter(Boolean).join("; ") || "—",
                Dietary: data.dietary || "—",
                Accommodation: data.accommodation,
                Notes: data.notes || "—",
              }).map(([k, v]) => (
                <div key={k} className="border-b border-line py-2">
                  <dt className="text-xs uppercase tracking-wider text-mute">{k}</dt>
                  <dd className="mt-1 text-[15px] text-ink">{v || "—"}</dd>
                </div>
              ))}
            </dl>

            <label className="mt-8 flex items-start gap-3">
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 accent-ink"
                checked={data.consent}
                onChange={(e) => update("consent", e.target.checked)}
              />
              <span className="text-sm text-ink/80">
                I confirm the details above are accurate and consent to Legatio 4.0 contacting me at
                the provided email and phone for matters related to this conference.
              </span>
            </label>
            {errors.consent && <p className="mt-2 text-xs text-accent">{errors.consent}</p>}

            {serverError && (
              <div className="mt-6 border border-accent/40 bg-accent/5 p-3 text-sm text-accent">
                {serverError}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="mt-10 flex items-center justify-between gap-3 border-t border-line pt-6">
        <button
          type="button"
          onClick={back}
          disabled={step === 1 || submitting}
          className="text-sm text-mute disabled:opacity-30"
        >
          ← Back
        </button>
        {step < STEPS.length ? (
          <button
            type="button"
            onClick={next}
            className="border border-ink bg-ink px-5 py-2.5 text-sm text-paper hover:bg-accent hover:border-accent"
          >
            Continue
          </button>
        ) : (
          <button
            type="button"
            onClick={submit}
            disabled={submitting}
            className="border border-ink bg-ink px-5 py-2.5 text-sm text-paper hover:bg-accent hover:border-accent disabled:opacity-50"
          >
            {submitting ? "Submitting…" : "Submit registration"}
          </button>
        )}
      </div>
    </div>
  );
}
