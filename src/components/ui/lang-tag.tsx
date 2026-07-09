'use client'

/**
 * LangTag — small "en" / "ar" content-language pill.
 *
 * Ported from app/src/components/admin/plugin/envelope/variants/_shared/LangTag.tsx.
 * Surfaces the language of the CONTENT (not the UI language) — amber for AR,
 * sky for EN. The pill text stays `dir="ltr"` (the language code is a Latin
 * token). Props-only (Rule 25).
 */

import { cn } from '../../lib/utils'

export interface LangTagProps {
  lang?: string | null
  className?: string
}

const LangTag = ({ lang, className }: LangTagProps) => {
  if (!lang) return null

  const isAr = lang.toLowerCase().startsWith('ar')

  return (
    <span
      className={cn(
        'inline-flex items-center rounded px-1.5 py-0.5',
        'text-[10px] font-semibold uppercase tracking-wide',
        isAr
          ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
          : 'bg-sky-500/10 text-sky-600 dark:text-sky-400',
        className,
      )}
      dir="ltr"
      aria-label={`Content language: ${lang}`}
    >
      {lang.slice(0, 2).toLowerCase()}
    </span>
  )
}

LangTag.displayName = 'LangTag'

export { LangTag }
export default LangTag
