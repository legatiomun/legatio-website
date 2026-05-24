"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

type Props = {
  name: string;
  photo?: string;
  /** Subtle role label rendered in the corner */
  caption?: string;
  /** When true, applies the dim/silvered look for unfilled placeholder seats */
  empty?: boolean;
  className?: string;
};

function getInitials(name: string) {
  const clean = name.replace(/^(Dr|Mr|Ms|Mrs|Prof)\.?\s+/i, "");
  return clean
    .split(/\s+/)
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function PortraitFrame({ name, photo, caption, empty, className }: Props) {
  const [hover, setHover] = useState(false);
  const initials = getInitials(name);

  return (
    <motion.figure
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => setHover(false)}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className={`group relative aspect-[4/5] overflow-hidden border border-line bg-cream/60 ${
        className ?? ""
      }`}
    >
      {photo ? (
        <Image
          src={photo}
          alt={name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          className={`object-cover transition-all duration-700 ${
            hover ? "scale-[1.04] saturate-100" : "scale-100 saturate-[0.85]"
          }`}
        />
      ) : (
        <div className="absolute inset-0 grid place-items-center">
          {/* Texture lines */}
          <svg className="absolute inset-0 h-full w-full text-ink/[0.04]" aria-hidden>
            <defs>
              <pattern id="diag" width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                <line x1="0" y1="0" x2="0" y2="14" stroke="currentColor" strokeWidth="0.6" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#diag)" />
          </svg>

          {/* Inner frame */}
          <div className="absolute inset-3 border border-line/80" />
          <div className="absolute inset-5 border border-line/40" />

          {/* Corner mark */}
          <svg
            className="absolute right-3 top-3 text-mute/60"
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            aria-hidden
          >
            <path d="M7 0 L14 7 L7 14 L0 7 Z" stroke="currentColor" strokeWidth="0.7" />
          </svg>

          {/* Initials */}
          <span
            className={`relative font-serif text-5xl tracking-tight transition-colors ${
              empty ? "text-mute/40" : "text-ink/55 group-hover:text-ink"
            }`}
          >
            {empty ? "—" : initials}
          </span>
        </div>
      )}

      {/* Caption overlay */}
      {caption && (
        <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-paper/95 via-paper/70 to-transparent px-4 pb-3 pt-12 text-xs uppercase tracking-wider text-ink/70">
          {caption}
        </figcaption>
      )}
    </motion.figure>
  );
}
