'use client'

/**
 * InterimBadge — small outlined badge with a spinner, marking partial/interim
 * (still-loading) content. Pure & product-agnostic (Rule 25): `language` prop,
 * no context. Semantic tokens only.
 *
 * Ported from app/src/components/loading/InterimBadge.tsx.
 */

import { Loader2 } from 'lucide-react'
import { Badge } from './badge'
import { cn } from '../../lib/utils'

export interface InterimBadgeProps {
  language?: 'en' | 'ar'
  className?: string
}

export const InterimBadge = ({ language = 'en', className }: InterimBadgeProps) => (
  <Badge
    variant="outline"
    className={cn('text-[10px] border-primary/30 text-primary gap-1', className)}
  >
    <Loader2 className="w-2.5 h-2.5 animate-spin" aria-hidden="true" />
    {language === 'ar' ? 'مبدئي' : 'Interim'}
  </Badge>
)

InterimBadge.displayName = 'InterimBadge'
export default InterimBadge
