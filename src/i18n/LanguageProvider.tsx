'use client'

/**
 * LanguageProvider — @prism/ui shared bilingual context.
 *
 * Single source of truth for language + RTL across all 5 product apps.
 * Default: EN (ltr). Switch to AR to get RTL + Arabic strings.
 *
 * Usage:
 *   // Root layout or _app:
 *   <LanguageProvider initialLanguage="en" onLanguageChange={persistToProfile}>
 *     {children}
 *   </LanguageProvider>
 *
 *   // Inside any component:
 *   const { t, language, setLanguage, isRTL } = useT()
 *   // or the alias:
 *   const { language, setLanguage } = useLanguage()
 *
 * The `language` prop on individual components still works as a Storybook /
 * standalone override — those components accept it and fall through to
 * conditional rendering when no context is present. At runtime the context
 * value always wins (components read context first).
 *
 * Rules: Rule 8 (bilingual EN/AR), Rule 16 (Sentra style), Rule 7 (displayName).
 */

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from 'react'
import { useTranslation } from 'react-i18next'
import i18n, { initI18n, type SupportedLanguage } from './index'

// ---------------------------------------------------------------------------
// Context shape
// ---------------------------------------------------------------------------

export interface LanguageContextValue {
  /** Current locale — 'en' | 'ar' */
  language: SupportedLanguage
  /** Alias used by components ported from the legacy Sentra app */
  lang: SupportedLanguage
  /** true when language === 'ar' */
  isRTL: boolean
  /** Switch language. Updates i18next, document.documentElement dir/lang,
   *  caches the choice to localStorage, and calls onLanguageChange. */
  setLanguage: (l: SupportedLanguage) => void
  /**
   * Seed the language from the Fort profile AFTER login — but ONLY when the user
   * has no cached choice yet. The cached selection (the user's explicit toggle)
   * always wins over profile.lang on reload. Use this instead of setLanguage()
   * for the post-login profile seed so it doesn't clobber a cached preference.
   */
  seedLanguage: (l: SupportedLanguage) => void
  /**
   * i18next `t()` bound to the current language.
   * Key format: `"namespace:key"` or just `"key"` (uses defaultNS = 'common').
   * Supports interpolation: `t('header:updated', { time: '5 min ago' })`.
   */
  t: (key: string, vars?: Record<string, unknown>) => string
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

export interface LanguageProviderProps {
  children: ReactNode
  /**
   * Seed language. Defaults to 'en'.
   * Pass `initialLanguage={profile.lang}` post-login to hydrate from Fort
   * profile without a flicker (SSR already sets the cookie; the provider
   * syncs immediately).
   */
  initialLanguage?: SupportedLanguage
  /**
   * Called whenever the user switches language (or on first mount if
   * initialLanguage differs from the stored preference). Products wire this
   * to `FortProfileClient.patchProfile({ lang })` to persist the choice.
   */
  onLanguageChange?: (lang: SupportedLanguage) => void
}

// Initialise i18next at module load time (idempotent — safe to call multiple times).
// This ensures the instance is ready synchronously before the first render.
initI18n()

const LANG_STORAGE_KEY = 'sentra:lang'
/** Cookie name must be colon-free (RFC 6265). Mirrors LANG_STORAGE_KEY. */
export const LANG_COOKIE_NAME = 'sentra_lang'

// Read the cached language choice (operator 2026-06-05: "selected lang must be
// cached"). SSR-safe (returns null when there's no window). Validates the value.
const readCachedLang = (): SupportedLanguage | null => {
  if (typeof window === 'undefined') return null
  try {
    const v = window.localStorage.getItem(LANG_STORAGE_KEY)
    return v === 'en' || v === 'ar' ? v : null
  } catch {
    return null
  }
}

/** Write the language choice to a cookie so server layouts can read it for SSR.
 *  1-year expiry so it survives restarts; SameSite=Lax is safe for same-site nav. */
const writeLangCookie = (l: SupportedLanguage): void => {
  if (typeof document === 'undefined') return
  document.cookie = `${LANG_COOKIE_NAME}=${l}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`
}

const LanguageProvider = ({
  children,
  initialLanguage = 'en',
  onLanguageChange,
}: LanguageProviderProps) => {
  // Start from initialLanguage for SSR (server has no localStorage → no hydration
  // mismatch); the cached choice is applied in a mount effect below.
  const [language, setLanguageState] = useState<SupportedLanguage>(initialLanguage)

  // Sync document dir/lang on mount and on every language change
  const applyDirToDocument = useCallback((l: SupportedLanguage) => {
    if (typeof document === 'undefined') return
    document.documentElement.dir  = l === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = l
  }, [])

  // On first render: the CACHED localStorage choice wins over initialLanguage.
  // If neither is set, initialLanguage (which is now the SSR cookie value) wins.
  // Writing the cookie here keeps it in sync with the resolved value even when
  // the user hasn't toggled language manually yet.
  useEffect(() => {
    const cached = readCachedLang()
    const resolved = cached ?? initialLanguage
    if (resolved !== language) setLanguageState(resolved)
    applyDirToDocument(resolved)
    writeLangCookie(resolved)
    if (i18n.language !== resolved) {
      i18n.changeLanguage(resolved)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const setLanguage = useCallback(
    (l: SupportedLanguage) => {
      setLanguageState(l)
      applyDirToDocument(l)
      i18n.changeLanguage(l)
      // Cache the selection so it survives reloads (localStorage + cookie).
      // The cookie is read by server layouts so the next SSR request renders the
      // correct lang/dir on <html> at first paint — zero EN→AR flash.
      try {
        if (typeof window !== 'undefined') window.localStorage.setItem(LANG_STORAGE_KEY, l)
      } catch {
        /* storage unavailable — non-fatal */
      }
      writeLangCookie(l)
      onLanguageChange?.(l)
    },
    [applyDirToDocument, onLanguageChange],
  )

  // seedLanguage — apply the profile lang ONLY if the user has no cached choice.
  // The cached selection (explicit toggle) wins on reload, so the post-login
  // profile seed must not clobber it. Does NOT write to the cache (a profile seed
  // is not an explicit user selection).
  const seedLanguage = useCallback(
    (l: SupportedLanguage) => {
      if (readCachedLang()) return // user already chose — keep their choice
      setLanguageState(l)
      applyDirToDocument(l)
      i18n.changeLanguage(l)
    },
    [applyDirToDocument],
  )

  // Simple translation helper that stays in sync with current language state.
  // We use i18n.t directly (synchronous after init) instead of useTranslation
  // here to keep the context value stable across re-renders.
  const t = useCallback(
    (key: string, vars?: Record<string, unknown>): string => {
      return i18n.t(key, { ...(vars as object), lng: language }) as string
    },
    [language],
  )

  const value: LanguageContextValue = {
    language,
    lang: language,
    isRTL: language === 'ar',
    setLanguage,
    seedLanguage,
    t,
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}
LanguageProvider.displayName = 'LanguageProvider'

// Also export as named export for destructured imports
export { LanguageProvider }

// ---------------------------------------------------------------------------
// Hooks
// ---------------------------------------------------------------------------

/**
 * useT — primary hook. Returns `{ t, language, setLanguage, isRTL }`.
 * Must be used inside a <LanguageProvider>.
 */
export const useT = (): LanguageContextValue => {
  const ctx = useContext(LanguageContext)
  if (!ctx) {
    throw new Error('[useT] Must be used inside <LanguageProvider> from @prism/ui')
  }
  return ctx
}

/**
 * useLanguage — alias for useT. Preferred by components that only need
 * `language` / `setLanguage` and don't call `t()`.
 */
export const useLanguage = (): LanguageContextValue => useT()

// ---------------------------------------------------------------------------
// Re-export i18next `useTranslation` for components that prefer the
// react-i18next API directly (optional — most components use useT)
// ---------------------------------------------------------------------------
export { useTranslation } from 'react-i18next'

export default LanguageProvider
