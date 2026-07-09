/**
 * localized — bilingual string picker.
 *
 * Ported from app/src/lib/i18n-utils.ts (`pickLocalized`). Picks the localised
 * string for the current language with graceful fallback (AR → EN, EN → AR).
 * Treats null / undefined / whitespace-only as "missing". Pure, props-only —
 * the canonical way @prism/ui components resolve `_en`/`_ar` field pairs
 * without reading a language context (Rule 8, Rule 25).
 */
export const pickLocalized = (
  en?: string | null,
  ar?: string | null,
  lang?: 'en' | 'ar',
): string => {
  if (lang === 'ar') {
    if (ar && ar.trim()) return ar
    return en || ''
  }
  return en || ar || ''
}
