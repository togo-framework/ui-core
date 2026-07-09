/**
 * time-ago-fn — bilingual relative-time STRING helpers (pure functions).
 *
 * Ported from app/src/lib/time-ago.ts (Trends UI #1191). Turns an ISO string /
 * Date into a human relative label. Arabic output uses Eastern Arabic-Indic
 * numerals (٠١٢٣٤٥٦٧٨٩) so the page reads natively in RTL mode (Rule 8).
 *
 * Distinct from `ui/time-ago.tsx`, which is a <TimeAgo> COMPONENT. This module
 * exposes the underlying string functions (`timeAgo(ts, lang, now)`) used by
 * TrendCard and other inline relative-time renders.
 *
 * No date-fns import — keeps the consuming bundle small and avoids the
 * locale tree-shake problem.
 */

const AR_DIGITS = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'] as const

/** Convert Western digits in a string to Eastern Arabic numerals. */
const toArabicDigits = (input: string | number): string =>
  String(input).replace(/[0-9]/g, (d) => AR_DIGITS[Number(d)])

interface DiffParts {
  seconds: number
  minutes: number
  hours: number
  days: number
}

const computeDiff = (date: Date, now: number): DiffParts => {
  const diffMs = Math.max(0, now - date.getTime())
  const seconds = Math.floor(diffMs / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  return { seconds, minutes, hours, days }
}

/**
 * timeAgoEN — English relative time (compact form).
 *
 * Examples: "just now", "12s ago", "5m ago", "3h ago", "2d ago".
 * Returns null when the timestamp is missing or invalid so callers can
 * decide whether to render a placeholder or skip rendering entirely.
 */
export const timeAgoEN = (
  timestamp: string | Date | null | undefined,
  now: number = Date.now(),
): string | null => {
  if (!timestamp) return null
  const d = typeof timestamp === 'string' ? new Date(timestamp) : timestamp
  if (isNaN(d.getTime())) return null

  const { seconds, minutes, hours, days } = computeDiff(d, now)
  if (seconds < 5) return 'just now'
  if (seconds < 60) return `${seconds}s ago`
  if (minutes < 60) return `${minutes}m ago`
  if (hours < 24) return `${hours}h ago`
  return `${days}d ago`
}

/**
 * timeAgoAR — Arabic relative time using Eastern Arabic-Indic numerals.
 *
 * Examples: "الآن", "منذ ٥ ث", "منذ ١٢ د", "منذ ٣ س", "منذ ٢ ي".
 */
export const timeAgoAR = (
  timestamp: string | Date | null | undefined,
  now: number = Date.now(),
): string | null => {
  if (!timestamp) return null
  const d = typeof timestamp === 'string' ? new Date(timestamp) : timestamp
  if (isNaN(d.getTime())) return null

  const { seconds, minutes, hours, days } = computeDiff(d, now)
  if (seconds < 5) return 'الآن'
  if (seconds < 60) return `منذ ${toArabicDigits(seconds)} ث`
  if (minutes < 60) return `منذ ${toArabicDigits(minutes)} د`
  if (hours < 24) return `منذ ${toArabicDigits(hours)} س`
  return `منذ ${toArabicDigits(days)} ي`
}

/**
 * timeAgo — locale-aware wrapper. Returns the EN string for any non-'ar' lang.
 */
export const timeAgo = (
  timestamp: string | Date | null | undefined,
  lang: string,
  now: number = Date.now(),
): string | null => (lang === 'ar' ? timeAgoAR(timestamp, now) : timeAgoEN(timestamp, now))
