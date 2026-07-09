/**
 * eventBody — pure helper for event-detail body-dedup logic.
 *
 * Ported from app/src/lib/eventBody.ts. Seeders historically set `summary_*`
 * to the first 500 runes of `description_*` (a truncated prefix); an exact-`!==`
 * guard misses prefix-vs-full pairs and renders two near-identical cards.
 *
 * `resolveEventBody` normalises both strings (trim + collapse whitespace) and
 * returns the single body text to display, or signals two genuinely-distinct
 * cards. Pure, no side effects (Rule 25).
 */

/** Normalise a string for duplicate detection: trim + collapse whitespace. */
const norm = (s: string): string => s.replace(/\s+/g, ' ').trim()

export type EventBodyResult =
  | { kind: 'single'; body: string }
  | { kind: 'dual'; summary: string; description: string }

/**
 * Decide how to render the event body cards.
 *
 * Rules:
 * - Both empty → `single` with empty body (caller may hide the whole panel).
 * - One empty, one present → `single` with the non-empty value.
 * - Both present AND one is a (normalised) prefix of the other, or they are
 *   equal → `single` using the longer text (prefer description when it is the
 *   superset, otherwise whichever is longer).
 * - Both present AND genuinely distinct → `dual`.
 */
export const resolveEventBody = (
  summary: string,
  description: string,
): EventBodyResult => {
  const nSum = norm(summary)
  const nDesc = norm(description)

  // Both empty
  if (!nSum && !nDesc) {
    return { kind: 'single', body: '' }
  }

  // Only one present
  if (!nSum) return { kind: 'single', body: description }
  if (!nDesc) return { kind: 'single', body: summary }

  // Duplicate or prefix check
  const isDuplicate =
    nSum === nDesc ||
    nDesc.startsWith(nSum) ||
    nSum.startsWith(nDesc)

  if (isDuplicate) {
    // Prefer the longer raw text (description is the full analysis superset)
    const body = description.length >= summary.length ? description : summary
    return { kind: 'single', body }
  }

  return { kind: 'dual', summary, description }
}
