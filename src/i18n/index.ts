'use client'

/**
 * @prism/ui — shared i18next initialisation
 *
 * Called once by LanguageProvider. Safe to call multiple times (idempotent via
 * `i18n.isInitialized` guard). Defaults to EN so every app boots with zero
 * Arabic strings until the provider explicitly switches to AR.
 *
 * Consumers: import `i18n` from here if direct access is needed; prefer the
 * `useT()` / `useLanguage()` hooks for component-level translation.
 *
 * Rules: Rule 8 (bilingual EN/AR), Rule 16 (Sentra style — client component).
 */

import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import enJson from './locales/en.json'
import arJson from './locales/ar.json'

export const SUPPORTED_LANGUAGES = ['en', 'ar'] as const
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number]

const resources = {
  en: {
    common: enJson.common,
    header: enJson.header,
    profile: enJson.profile,
    nav: enJson.nav,
    copilot: enJson.copilot,
    auth: enJson.auth,
  },
  ar: {
    common: arJson.common,
    header: arJson.header,
    profile: arJson.profile,
    nav: arJson.nav,
    copilot: arJson.copilot,
    auth: arJson.auth,
  },
}

/**
 * Initialise i18next. Idempotent — safe to call from multiple providers
 * (e.g. in Storybook + the consuming app mounting two providers).
 */
export function initI18n(): void {
  if (i18n.isInitialized) return

  i18n
    .use(initReactI18next)
    .init({
      /**
       * DEFAULT LANGUAGE = EN. This is the bug fix: all panels default to
       * English. Arabic is only rendered when the user explicitly switches or
       * the app seeds the provider with `initialLanguage="ar"` from a Fort
       * profile (post-login).
       */
      lng: 'en',
      fallbackLng: 'en',
      supportedLngs: ['en', 'ar'],
      defaultNS: 'common',
      ns: ['common', 'header', 'profile', 'nav', 'copilot', 'auth'],
      resources,
      interpolation: {
        escapeValue: false, // React already escapes
      },
      // Disable auto-detection — language is controlled exclusively via
      // LanguageProvider.setLanguage (reads Fort profile.lang post-login).
      detection: undefined,
    })
}

export default i18n
