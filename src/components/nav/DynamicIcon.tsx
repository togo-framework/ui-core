'use client'

// DynamicIcon — ported from app/src/components/nav/DynamicIcon.tsx
// Self-contained: lucide-react + boxicons (CSS class) + image URL support.
// No app-layer dependencies.

import * as Icons from 'lucide-react'
import { Sparkles } from 'lucide-react'

interface DynamicIconProps {
  name: string | null | undefined
  className?: string
  size?: number
  strokeWidth?: number
}

/**
 * Renders an icon by name string — supports four icon sources:
 *
 * 1. Image URL (starts with "http://", "https://", or "/"):
 *    Renders an <img> sized to match a lucide/boxicon of the same h-N class.
 *
 * 2. Boxicons brand icons — two accepted formats:
 *    a. Colon-prefix (canonical): "bxl:<name>" → "bxl-<name>" CSS class
 *    b. Legacy hyphen-prefix: "bxl-*" / "bx-*"
 *    Requires boxicons CSS loaded at the app root.
 *
 * 3. Lucide icons — two accepted formats:
 *    a. Colon-prefix (canonical): "lucide:<kebab-case>" → PascalCase lookup
 *    b. Legacy bare PascalCase (kept for backward-compat)
 *    Falls back to <Sparkles> when name is null, empty, or unrecognised.
 */
const DynamicIcon = ({ name, className, size, strokeWidth }: DynamicIconProps) => {
  if (!name) {
    return <Sparkles className={className} size={size} strokeWidth={strokeWidth} />
  }

  // Image URL branch
  if (name.startsWith('http://') || name.startsWith('https://') || name.startsWith('/')) {
    const px = size ?? hClassToPx(className) ?? 24
    return (
      <img
        src={name}
        alt=""
        className={className}
        style={{ width: px, height: px, objectFit: 'contain', display: 'inline-block' }}
        aria-hidden="true"
      />
    )
  }

  // Boxicons branch
  let bxClass: string | null = null
  if (name.startsWith('bxl:') || name.startsWith('bx:')) {
    const colonIdx = name.indexOf(':')
    const prefix = name.slice(0, colonIdx)
    const iconName = name.slice(colonIdx + 1)
    bxClass = `${prefix}-${iconName}`
  } else if (name.startsWith('bxl-') || name.startsWith('bx-')) {
    bxClass = name
  }

  if (bxClass !== null) {
    const fontSize = size ?? hClassToPx(className) ?? '1em'
    return (
      <i
        className={`bx ${bxClass}${className ? ` ${className}` : ''}`}
        style={{ fontSize, color: 'currentColor', lineHeight: 1 }}
        aria-hidden="true"
      />
    )
  }

  // Lucide branch
  const toPascal = (s: string) =>
    s
      .split(/[-_ ]/)
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join('')

  const registry = Icons as unknown as Record<string, React.ComponentType<React.SVGProps<SVGSVGElement> & { size?: number; strokeWidth?: number }>>

  // Try, in order: colon-prefixed kebab (canonical) → PascalCase conversion; a
  // bare name as-is (legacy PascalCase); and finally a kebab/lowercase → Pascal
  // conversion so plain names like "settings" or "sticky-note" resolve too.
  const candidates = name.startsWith('lucide:')
    ? [toPascal(name.slice(7))]
    : [name, toPascal(name)]

  const Cmp = candidates.map((n) => registry[n]).find(Boolean)

  if (!Cmp) {
    return <Sparkles className={className} size={size} strokeWidth={strokeWidth} />
  }

  return <Cmp className={className} size={size} strokeWidth={strokeWidth} />
}

DynamicIcon.displayName = 'DynamicIcon'

const H_CLASS_PX: Record<string, number> = {
  'h-3': 12,
  'h-4': 16,
  'h-5': 20,
  'h-6': 24,
  'h-7': 28,
  'h-8': 32,
  'h-9': 36,
  'h-10': 40,
  'h-12': 48,
  'h-14': 56,
  'h-16': 64,
}

function hClassToPx(className: string | undefined): number | undefined {
  if (!className) return undefined
  for (const cls of className.split(/\s+/)) {
    const px = H_CLASS_PX[cls]
    if (px !== undefined) return px
  }
  return undefined
}

export { DynamicIcon }
export default DynamicIcon
