"use client";

import { type ReactNode } from "react";

type LabelProps = {
  label: string;
  required?: boolean;
  hint?: string;
  children: ReactNode;
  error?: string;
};

export function Field({ label, required, hint, children, error }: LabelProps) {
  return (
    <label className="block">
      <span className="flex items-baseline justify-between gap-3">
        <span className="text-sm text-ink">
          {label} {required && <span className="text-accent">*</span>}
        </span>
        {hint && <span className="text-xs text-mute">{hint}</span>}
      </span>
      <div className="mt-2">{children}</div>
      {error && <span className="mt-2 block text-xs text-accent">{error}</span>}
    </label>
  );
}

export const inputClass =
  "w-full border border-line bg-paper px-3 py-2.5 text-[15px] text-ink placeholder:text-mute/60 outline-none transition-colors focus:border-ink";

export const selectClass = inputClass + " appearance-none cursor-pointer pr-10";

export const textareaClass = inputClass + " min-h-[100px] resize-y";
