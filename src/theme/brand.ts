'use client'

/**
 * brand.ts — Sentra dynamic theming primitives.
 *
 * Pure utilities: no React, no app context, no bridge dependency.
 * A product imports these and wires its own org-settings fetch,
 * then calls applyBrand() to override the CSS var baseline at runtime.
 *
 * CSS variables written (same set as app/src/components/BrandingProvider.tsx):
 *   --primary              HSL "H S% L%"  — buttons, rings, active states
 *   --brand-primary        HSL "H S% L%"  — alias kept for Situation Room glow
 *   --brand-primary-glow   HSL with +7 lightness — glow variant
 *   --ring                 same as --primary
 *   --sidebar-primary      same as --primary
 *   --sidebar-ring         same as --primary
 *   --ai-glow              same as --primary
 *   --accent-muted         accent HSL with -13 lightness
 *   --logo-url             CSS url("…") string for background-image consumers
 */

// ── Colour helpers ─────────────────────────────────────────────────────────

/** Returns true for the HSL string form "H S% L%". */
export function isHSL(value: string): boolean {
  return /^\d+(\.\d+)?\s+\d+(\.\d+)?%\s+\d+(\.\d+)?%$/.test(value.trim());
}

/** Returns true for "#RRGGBB" or "#RGB". */
export function isValidColor(value: string): boolean {
  const t = value.trim();
  return (
    isHSL(t) || /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(t)
  );
}

/**
 * Converts "#RRGGBB" or "#RGB" to the HSL string form "H S% L%".
 * Returns an empty string when the input is not a valid hex color.
 */
export function hexToHSL(hex: string): string {
  let h = hex.replace("#", "").trim();
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  if (h.length !== 6) return "";

  const r = parseInt(h.substring(0, 2), 16) / 255;
  const g = parseInt(h.substring(2, 4), 16) / 255;
  const b = parseInt(h.substring(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;

  if (max === min) return `0 0% ${Math.round(l * 100)}%`;

  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let hue = 0;
  if (max === r) hue = ((g - b) / d + (g < b ? 6 : 0)) / 6;
  else if (max === g) hue = ((b - r) / d + 2) / 6;
  else hue = ((r - g) / d + 4) / 6;

  return `${Math.round(hue * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}

/**
 * Normalises a hex or HSL value to the "H S% L%" form.
 * Returns null when the value is unrecognised — callers should skip setting
 * the var rather than writing a broken value.
 */
export function toHSLSafe(color: string): string | null {
  if (!color) return null;
  const t = color.trim();
  if (isHSL(t)) return t;
  const result = hexToHSL(t);
  return result !== "" ? result : null;
}

/**
 * Nudges the lightness of an "H S% L%" string by `delta` percentage points,
 * clamped to [0, 100].
 */
export function nudgeL(hsl: string, delta: number): string {
  const parts = hsl.trim().split(/\s+/);
  if (parts.length < 3) return hsl;
  const l = parseFloat(parts[2] ?? "0");
  const newL = Math.max(0, Math.min(100, l + delta));
  return `${parts[0]} ${parts[1]} ${Math.round(newL)}%`;
}

// ── Sentra platform defaults ───────────────────────────────────────────────

/**
 * SENTRA_BRAND — the platform's own brand tokens.
 *
 * These are the values used when no tenant branding is configured.
 * BrandingProvider applies them on first render so the first paint is always
 * branded; a tenant override writes over them once org-settings resolves.
 */
export const SENTRA_BRAND = {
  /** Brand primary: Sentra crimson (--primary 345 75% 33%). */
  primaryHex: "#931535",
  /** Brand accent: Tailwind violet-500. */
  accentHex: "#daab4e",
  /** Logo path — products serve this from their own /public directory. */
  logoUrl: "/sentra-logo-full.png",
} as const;

// ── Pre-computed HSL values for the defaults ──────────────────────────────

const SENTRA_PRIMARY_HSL = toHSLSafe(SENTRA_BRAND.primaryHex)!; // "160 84% 39%"
const SENTRA_ACCENT_HSL  = toHSLSafe(SENTRA_BRAND.accentHex)!;  // "263 70% 66%"

// ── Brand application ──────────────────────────────────────────────────────

export interface BrandTokens {
  /** Hex string ("#RRGGBB") or HSL string ("H S% L%") for the primary color. */
  primaryHex?: string;
  /** Hex string ("#RRGGBB") or HSL string ("H S% L%") for the accent color. */
  accentHex?: string;
  /** Absolute URL or relative path to the org logo image. */
  logoUrl?: string;
}

/**
 * applyBrand — writes brand CSS custom properties directly onto `root`
 * (typically `document.documentElement`).
 *
 * Call this inside a useEffect whenever org-settings data changes.
 * When a field is absent or invalid, the corresponding Sentra default fills
 * the gap — the product always has a styled baseline.
 *
 * @param root      The element to set properties on (usually document.documentElement).
 * @param tokens    The brand tokens from org-settings; all fields are optional.
 */
export function applyBrand(root: HTMLElement, tokens: BrandTokens = {}): void {
  // ── Primary ──────────────────────────────────────────────────────────────
  const primaryHSL =
    (tokens.primaryHex ? toHSLSafe(tokens.primaryHex) : null) ?? SENTRA_PRIMARY_HSL;

  root.style.setProperty("--primary", primaryHSL);
  root.style.setProperty("--brand-primary", primaryHSL);
  root.style.setProperty("--brand-primary-glow", nudgeL(primaryHSL, 7));
  root.style.setProperty("--ring", primaryHSL);
  root.style.setProperty("--sidebar-primary", primaryHSL);
  root.style.setProperty("--sidebar-ring", primaryHSL);
  root.style.setProperty("--ai-glow", primaryHSL);

  // ── Accent ───────────────────────────────────────────────────────────────
  const accentHSL =
    (tokens.accentHex ? toHSLSafe(tokens.accentHex) : null) ?? SENTRA_ACCENT_HSL;

  root.style.setProperty("--accent-muted", nudgeL(accentHSL, -13));

  // ── Logo ─────────────────────────────────────────────────────────────────
  // Only set --logo-url when the tenant actually has a logo. Do NOT fall back to
  // the Sentra default PNG (operator 2026-06-05: empty DB logo was rendering
  // /sentra-logo-full.png everywhere instead of the platform icon). When there's
  // no logo, set --logo-url: none so background-image consumers show nothing and
  // icon-based marks (AuthCard crest, AdminLayout brand mark) take over.
  const rawLogo = tokens.logoUrl;
  if (rawLogo && rawLogo.trim() !== "") {
    root.style.setProperty("--logo-url", `url("${rawLogo}")`);
  } else {
    root.style.setProperty("--logo-url", "none");
  }
}