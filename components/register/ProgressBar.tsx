"use client";

import { STEPS } from "./types";

export function ProgressBar({ step }: { step: number }) {
  const percent = ((step - 1) / (STEPS.length - 1)) * 100;
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase tracking-wider text-mute">
          Step {step} of {STEPS.length}
        </p>
        <p className="text-xs text-mute">{STEPS[step - 1].title}</p>
      </div>
      <div className="mt-3 h-px w-full overflow-hidden bg-line">
        <div
          className="h-full bg-ink transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
