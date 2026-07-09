'use client'

/**
 * TimeAgo — renders a human-readable relative time string ("2 hours ago" /
 * "منذ ساعتين") from an ISO string or Date.
 *
 * Pure & product-agnostic (Rule 25): `language` is a prop, no context. Uses
 * date-fns with the Arabic locale for AR. Renders nothing for null/invalid
 * input. `suppressHydrationWarning` because relative time differs between SSR
 * and client.
 *
 * Ported from app/src/components/trends/TimeAgo.tsx.
 */

import { formatDistanceToNow } from 'date-fns'
import { ar } from 'date-fns/locale'

export interface TimeAgoProps {
  timestamp: string | Date | null | undefined
  language?: 'en' | 'ar'
  className?: string
}

export const TimeAgo = ({ timestamp, language = 'en', className }: TimeAgoProps) => {
  if (!timestamp) return null

  let relative: string
  try {
    const date = typeof timestamp === 'string' ? new Date(timestamp) : timestamp
    if (Number.isNaN(date.getTime())) return null
    relative = formatDistanceToNow(date, {
      addSuffix: true,
      locale: language === 'ar' ? ar : undefined,
    })
  } catch {
    return null
  }

  return (
    <span className={className} suppressHydrationWarning>
      {relative}
    </span>
  )
}

TimeAgo.displayName = 'TimeAgo'
export default TimeAgo
