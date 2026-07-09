'use client'

/**
 * SentraLoading — full-screen branded loading screen.
 *
 * Branding source (operator 2026-06-12): the loader NEVER fetches an image —
 * no logo URL, no SVG/PNG request. It renders the platform's BRAND ICON (a
 * Lucide icon name chosen in the Fort branding icon picker) and the platform
 * TITLE of the current product in the active language. Spinner uses the brand
 * primary color.
 *
 * The component accepts `language`/`dir` props so each product wires its own i18n.
 *
 * This is THE loading component for every product (operator 2026-06-12) — no
 * product ships its own loader. Wire it from Fort branding:
 *
 *   <SentraLoading language={language} dir={isRTL ? 'rtl' : 'ltr'}
 *                  iconName={branding?.icon ?? null}
 *                  productNameEn={branding?.product_name_en}
 *                  productNameAr={branding?.product_name_ar} />
 */

import * as LucideIcons from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Logo } from '../brand/Logo'

interface SentraLoadingProps {
  language?: 'en' | 'ar'
  dir?: 'ltr' | 'rtl'
  /** Lucide icon name from the branding icon picker — the platform brand icon. */
  iconName?: string | null
  /**
   * Platform title pair from Fort branding. The component resolves the active
   * language itself so every product gets the translated title for free.
   */
  productNameEn?: string | null
  productNameAr?: string | null
  /** Pre-resolved title override — wins over the En/Ar pair when set. */
  productName?: string
}

const SentraLoading = ({
  language = 'en',
  dir = 'ltr',
  iconName,
  productNameEn,
  productNameAr,
  productName,
}: SentraLoadingProps) => {
  const isAr = language === 'ar'
  const name =
    productName ??
    (isAr ? productNameAr || productNameEn : productNameEn) ??
    'Sentra'

  // Brand mark = the selected Lucide icon only. No image fetch, ever.
  let Icon: LucideIcon | undefined
  if (iconName) {
    Icon = (LucideIcons as Record<string, unknown>)[iconName] as LucideIcon | undefined
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center gap-6 bg-background"
      dir={dir}
      aria-label={isAr ? 'جاري التحميل' : 'Loading'}
      role="status"
    >
      {/* AI-thinking mark (operator 2026-06-12): the brand icon IS the loader —
          soft pulsing glow behind it + a slow orbit ring around it, so it reads
          as "intelligence working", not a bare spinner. When no icon is set the
          glow + orbit ring still animate around an empty core. */}
      <div className="relative flex h-24 w-24 items-center justify-center">
        {/* breathing glow */}
        <span className="absolute h-20 w-20 rounded-full bg-primary/20 blur-xl animate-pulse" />
        {/* outer orbit ring — slow spin, brand primary */}
        <span
          className="absolute h-24 w-24 rounded-full border border-primary/25 border-t-primary/90 animate-spin"
          style={{ animationDuration: '2.5s' }}
        />
        {/* inner counter-orbit ring */}
        <span
          className="absolute h-[4.2rem] w-[4.2rem] rounded-full border border-primary/15 border-b-primary/60 animate-spin"
          style={{ animationDuration: '1.8s', animationDirection: 'reverse' }}
        />
        {/* The brand icon IS the loader. When no Lucide icon is wired, fall back to
            the ToGO mark so the core is never empty. */}
        {Icon ? (
          <Icon className="relative h-10 w-10 text-primary animate-pulse" aria-hidden />
        ) : (
          <span className="relative text-primary animate-pulse" aria-hidden>
            <Logo variant="mono" tone="inherit" size={38} />
          </span>
        )}
      </div>

      {/* Platform title — the current product's name in the active language */}
      <h1 className="text-xl font-semibold text-foreground tracking-wide">{name}</h1>

      {/* thinking dots */}
      <div className="flex items-center gap-1.5" aria-hidden>
        <span className="h-1.5 w-1.5 rounded-full bg-primary/80 animate-bounce" style={{ animationDelay: '-0.3s' }} />
        <span className="h-1.5 w-1.5 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: '-0.15s' }} />
        <span className="h-1.5 w-1.5 rounded-full bg-primary/40 animate-bounce" />
      </div>

      <span className="sr-only">{isAr ? 'جاري التحميل...' : 'Loading...'}</span>
    </div>
  )
}

SentraLoading.displayName = 'SentraLoading'
export default SentraLoading
export { SentraLoading }
