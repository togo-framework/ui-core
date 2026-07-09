import { useState, useEffect } from 'react'

/**
 * useDebounce — delays state update until the value has been stable for `delay` ms.
 *
 * Ported from app/src/hooks/useDebounce.ts.
 * Used by ListPage consumers (search field debounce before query fire).
 */
export function useDebounce<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])

  return debounced
}
