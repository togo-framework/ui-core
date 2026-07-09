'use client'

/**
 * ContextualSkeleton — a loading skeleton with a contextual header (spinner +
 * a bilingual "loading X…" caption) and one of three body shapes: default
 * (text lines), grid (cards), or timeline (dot + lines rows).
 *
 * Pure & product-agnostic (Rule 25): `language` is a prop, no context. Distinct
 * from SectionSkeleton (which is a single card-shaped block) — this one carries
 * a caption + variant body for richer loading states.
 *
 * Ported from app/src/components/loading/ContextualSkeleton.tsx.
 */

import * as React from 'react'
import { Loader2 } from 'lucide-react'
import { Skeleton } from './skeleton'

export type ContextualSkeletonVariant = 'default' | 'grid' | 'timeline'

export interface ContextualSkeletonProps {
  /** Bilingual caption shown next to the spinner, e.g. {en:'Loading alerts…', ar:'…'} */
  description: { en: string; ar: string }
  variant?: ContextualSkeletonVariant
  /** Number of text lines for the 'default' variant. Default: 3. */
  lines?: number
  language?: 'en' | 'ar'
  /**
   * Optional icon (LucideIcon component) rendered before the caption.
   * Accepted for API parity with hub callers — visually ignored (spinner
   * already serves as the loading indicator). Pass it to keep TS happy when
   * migrating from the old hub ContextualSkeleton.
   */
  icon?: React.ComponentType<{ className?: string }>
  /**
   * Bilingual title shown above the skeleton body. Optional — omitted if not provided.
   */
  title?: { en: string; ar: string }
}

const LINE_WIDTHS = ['w-full', 'w-5/6', 'w-4/6', 'w-3/4', 'w-2/3']

const DefaultBody = ({ lines }: { lines: number }) => (
  <div className="space-y-3">
    {Array.from({ length: lines }, (_, i) => (
      <Skeleton key={i} className={`h-4 ${LINE_WIDTHS[i % LINE_WIDTHS.length]}`} />
    ))}
  </div>
)

const GridBody = () => (
  <div className="space-y-3">
    {[1, 2, 3].map(i => (
      <Skeleton key={i} className="h-16 w-full" />
    ))}
  </div>
)

const TimelineBody = () => (
  <div className="space-y-4">
    {[1, 2, 3].map(i => (
      <div key={i} className="flex gap-3">
        <Skeleton className="w-2.5 h-2.5 rounded-full mt-1.5 shrink-0" />
        <div className="flex-1 space-y-1">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-4 w-full" />
        </div>
      </div>
    ))}
  </div>
)

export const ContextualSkeleton = ({
  description,
  variant = 'default',
  lines = 3,
  language = 'en',
}: ContextualSkeletonProps) => {
  const lang = language === 'ar' ? 'ar' : 'en'
  return (
    <div className="space-y-3" aria-busy="true">
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Loader2 className="w-3.5 h-3.5 animate-spin text-primary" aria-hidden="true" />
        <span>{description[lang]}</span>
      </div>
      {variant === 'timeline' ? (
        <TimelineBody />
      ) : variant === 'grid' ? (
        <GridBody />
      ) : (
        <DefaultBody lines={lines} />
      )}
    </div>
  )
}

ContextualSkeleton.displayName = 'ContextualSkeleton'
export default ContextualSkeleton
