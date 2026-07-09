'use client'

/**
 * useInfiniteScroll
 *
 * Attaches an IntersectionObserver to a sentinel element.
 * When the sentinel enters the viewport the `onLoadMore` callback fires —
 * but only when `hasMore` is true and `isLoading` is false.
 *
 * Ported from app/src/hooks/useInfiniteScroll.ts (sentra-intel/hub#66).
 * This is the shared primitive used by ListPage in sentra-ui.
 */

import { useEffect, useRef } from 'react'

interface UseInfiniteScrollOptions {
  onLoadMore: () => void
  hasMore: boolean
  isLoading: boolean
  threshold?: number
}

export function useInfiniteScroll({
  onLoadMore,
  hasMore,
  isLoading,
  threshold = 0.1,
}: UseInfiniteScrollOptions) {
  const sentinelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = sentinelRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          onLoadMore()
        }
      },
      { threshold },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [hasMore, isLoading, onLoadMore, threshold])

  return { sentinelRef }
}
