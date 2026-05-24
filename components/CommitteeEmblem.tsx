import Image from "next/image";
import type { Committee } from "@/lib/data/committees";

type Props = {
  committee: Committee;
  /** Box height in pixels. The image fits inside while preserving aspect ratio. */
  height?: number;
  /** Maximum width in pixels. Defaults to 2.2 × height to fit wide lockups. */
  maxWidth?: number;
};

export function CommitteeEmblem({ committee, height = 88, maxWidth }: Props) {
  const maxW = maxWidth ?? Math.round(height * 2.2);

  if (committee.image) {
    return (
      <div
        className="flex items-center justify-start"
        style={{ height, maxWidth: maxW, width: "100%" }}
      >
        <Image
          src={committee.image}
          alt={`${committee.name} emblem`}
          width={maxW * 2}
          height={height * 2}
          className="h-full w-auto object-contain"
          style={{ maxHeight: height, maxWidth: maxW }}
        />
      </div>
    );
  }

  // Fallback SVG seal for committees without an emblem image.
  const code = committee.code;
  const subtitle = (committee.subtitle ?? "").toUpperCase();
  const codeFontSize = Math.min(18, 76 / Math.max(code.length, 2));
  const size = height;

  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      role="img"
      aria-label={`${committee.name} emblem`}
      className="text-ink"
    >
      <circle cx="50" cy="50" r="47" stroke="currentColor" strokeWidth="0.5" fill="none" />
      <circle cx="50" cy="50" r="41" stroke="currentColor" strokeWidth="1.1" fill="none" />
      <circle cx="50" cy="6" r="0.9" fill="currentColor" />
      <circle cx="94" cy="50" r="0.9" fill="currentColor" />
      <circle cx="50" cy="94" r="0.9" fill="currentColor" />
      <circle cx="6" cy="50" r="0.9" fill="currentColor" />
      <line x1="50" y1="9" x2="50" y2="13" stroke="currentColor" strokeWidth="0.6" />
      <text
        x="50"
        y="50"
        textAnchor="middle"
        dominantBaseline="middle"
        fontFamily="var(--font-serif), Georgia, serif"
        fontWeight={500}
        fontSize={codeFontSize}
        fill="currentColor"
      >
        {code}
      </text>
      <line x1="34" y1="60" x2="66" y2="60" stroke="currentColor" strokeWidth="0.5" />
      <text
        x="50"
        y="70"
        textAnchor="middle"
        fontFamily="var(--font-sans), system-ui, sans-serif"
        fontSize="5.5"
        letterSpacing="1.2"
        fill="currentColor"
      >
        {subtitle}
      </text>
    </svg>
  );
}
