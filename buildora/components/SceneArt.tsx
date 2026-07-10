"use client";

/**
 * SceneArt — Buildora's signature visual system.
 *
 * In place of photography (no image-generation model was available when this
 * project was built), every "photo" slot on the page is filled with a
 * consistent line-drawn architectural scene: building silhouettes rendered as
 * blueprint contours, resolving out of a soft gradient ground/sky. Swap any
 * <SceneArt variant="..." /> for a real <Image /> once photography is shot —
 * the surrounding layout does not need to change.
 */

type Variant =
  | "villa"
  | "interior"
  | "construction"
  | "maintenance"
  | "before"
  | "after"
  | "aerial"
  | "smartHome"
  | "blueprint"
  | "hq"
  | "mosaic";

const palettes: Record<string, { sky: [string, string]; line: string; accent: string }> = {
  warm: { sky: ["#F1EDE5", "#DDD4C2"], line: "#15171A", accent: "#B0813F" },
  dusk: { sky: ["#2B2620", "#15171A"], line: "#F1EDE5", accent: "#D4A868" },
  moss: { sky: ["#232B24", "#15171A"], line: "#F1EDE5", accent: "#B0813F" },
};

export default function SceneArt({
  variant,
  className = "",
  tone = "warm",
}: {
  variant: Variant;
  className?: string;
  tone?: "warm" | "dusk" | "moss";
}) {
  const p = palettes[tone];
  const id = `${variant}-${tone}`;

  return (
    <svg
      viewBox="0 0 800 600"
      className={className}
      preserveAspectRatio="xMidYMax slice"
      role="img"
      aria-label={`${variant} architectural illustration`}
    >
      <defs>
        <linearGradient id={`sky-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={p.sky[0]} />
          <stop offset="100%" stopColor={p.sky[1]} />
        </linearGradient>
        <linearGradient id={`glow-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={p.accent} stopOpacity="0.55" />
          <stop offset="100%" stopColor={p.accent} stopOpacity="0" />
        </linearGradient>
      </defs>

      <rect width="800" height="600" fill={`url(#sky-${id})`} />
      <circle cx="620" cy="140" r="180" fill={`url(#glow-${id})`} />

      {/* drafting grid */}
      <g opacity="0.08" stroke={p.line}>
        {Array.from({ length: 16 }).map((_, i) => (
          <line key={`v${i}`} x1={i * 50} y1="0" x2={i * 50} y2="600" strokeWidth="1" />
        ))}
        {Array.from({ length: 12 }).map((_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 50} x2="800" y2={i * 50} strokeWidth="1" />
        ))}
      </g>

      {renderVariant(variant, p, id)}
    </svg>
  );
}

function renderVariant(
  variant: Variant,
  p: { sky: [string, string]; line: string; accent: string },
  id: string
) {
  const stroke = p.line;
  switch (variant) {
    case "villa":
      return (
        <g fill="none" stroke={stroke} strokeWidth="2">
          <rect x="120" y="360" width="560" height="10" fill={stroke} opacity="0.15" stroke="none" />
          <path d="M160 360 L160 260 L360 260 L360 200 L560 200 L560 360" />
          <rect x="200" y="290" width="60" height="70" />
          <rect x="300" y="290" width="40" height="70" />
          <rect x="400" y="230" width="140" height="130" fill={p.accent} fillOpacity="0.12" />
          <line x1="120" y1="360" x2="680" y2="360" strokeWidth="1.5" />
          <path d="M160 260 L360 260 L360 200 L560 200" strokeWidth="1" opacity="0.5" />
        </g>
      );
    case "interior":
      return (
        <g fill="none" stroke={stroke} strokeWidth="2">
          <rect x="100" y="200" width="600" height="220" fill={p.accent} fillOpacity="0.06" />
          <line x1="100" y1="420" x2="700" y2="420" />
          <rect x="150" y="300" width="140" height="120" />
          <rect x="330" y="260" width="100" height="160" />
          <circle cx="600" cy="260" r="40" fill="none" />
          <line x1="600" y1="220" x2="600" y2="300" strokeWidth="1" opacity="0.5" />
        </g>
      );
    case "construction":
      return (
        <g fill="none" stroke={stroke} strokeWidth="2">
          <path d="M180 420 L180 240 L420 240 L420 420" />
          <line x1="180" y1="300" x2="420" y2="300" strokeWidth="1" opacity="0.6" />
          <line x1="180" y1="360" x2="420" y2="360" strokeWidth="1" opacity="0.6" />
          <line x1="260" y1="240" x2="260" y2="420" strokeWidth="1" opacity="0.6" />
          <line x1="340" y1="240" x2="340" y2="420" strokeWidth="1" opacity="0.6" />
          <path d="M460 420 L460 160 M460 160 L560 160 M520 160 L520 420" strokeWidth="1.5" />
          <circle cx="460" cy="160" r="6" fill={p.accent} stroke="none" />
        </g>
      );
    case "maintenance":
      return (
        <g fill="none" stroke={stroke} strokeWidth="2">
          <rect x="220" y="240" width="360" height="180" />
          <path d="M300 240 L340 190 L520 190 L560 240" />
          <circle cx="420" cy="330" r="28" />
          <path d="M420 302 L420 358 M392 330 L448 330" strokeWidth="1.5" />
        </g>
      );
    case "before":
      return (
        <g fill="none" stroke={stroke} strokeWidth="2" opacity="0.6">
          <rect x="160" y="260" width="480" height="160" strokeDasharray="6 6" />
          <line x1="160" y1="340" x2="640" y2="340" strokeDasharray="4 8" />
        </g>
      );
    case "after":
      return (
        <g fill="none" stroke={stroke} strokeWidth="2">
          <rect x="160" y="240" width="480" height="180" fill={p.accent} fillOpacity="0.08" />
          <line x1="160" y1="240" x2="640" y2="240" strokeWidth="1.5" />
          <rect x="220" y="280" width="120" height="140" />
          <rect x="380" y="280" width="200" height="60" />
        </g>
      );
    case "aerial":
      return (
        <g fill="none" stroke={stroke} strokeWidth="1.5">
          <rect x="140" y="200" width="160" height="120" />
          <rect x="330" y="180" width="140" height="160" />
          <rect x="500" y="220" width="150" height="100" />
          <path d="M100 400 L700 400" strokeWidth="1" opacity="0.4" />
          <path d="M220 320 L220 400 M400 340 L400 400 M575 320 L575 400" strokeWidth="1" opacity="0.4" />
        </g>
      );
    case "smartHome":
      return (
        <g fill="none" stroke={stroke} strokeWidth="2">
          <rect x="220" y="260" width="360" height="150" />
          <circle cx="400" cy="335" r="46" stroke={p.accent} />
          <circle cx="400" cy="335" r="4" fill={p.accent} stroke="none" />
          <path d="M400 289 L400 275 M400 381 L400 395 M354 335 L340 335 M446 335 L460 335" strokeWidth="1.5" />
        </g>
      );
    case "blueprint":
      return (
        <g fill="none" stroke={stroke} strokeWidth="1.5">
          <rect x="160" y="180" width="480" height="280" />
          <line x1="160" y1="320" x2="640" y2="320" />
          <line x1="400" y1="180" x2="400" y2="460" />
          <circle cx="280" cy="250" r="30" />
          <path d="M470 250 L560 250 M470 250 L470 200" strokeDasharray="3 5" />
          <text x="180" y="440" fontFamily="monospace" fontSize="14" fill={stroke} stroke="none" opacity="0.6">
            01 / PLAN A
          </text>
        </g>
      );
    case "hq":
      return (
        <g fill="none" stroke={stroke} strokeWidth="2">
          <rect x="260" y="140" width="280" height="280" />
          {Array.from({ length: 5 }).map((_, i) => (
            <line key={i} x1="260" y1={180 + i * 50} x2="540" y2={180 + i * 50} strokeWidth="1" opacity="0.5" />
          ))}
          <rect x="360" y="360" width="80" height="60" fill={p.accent} fillOpacity="0.15" />
        </g>
      );
    case "mosaic":
    default:
      return (
        <g fill="none" stroke={stroke} strokeWidth="1.5">
          <rect x="90" y="260" width="180" height="160" />
          <rect x="300" y="200" width="180" height="220" />
          <rect x="510" y="240" width="200" height="180" />
          <path d="M90 420 L710 420" strokeWidth="1" opacity="0.4" />
        </g>
      );
  }
}
