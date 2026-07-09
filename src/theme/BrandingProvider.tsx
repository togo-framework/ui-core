'use client'

/**
 * BrandingProvider.tsx — React wrapper for dynamic Sentra branding.
 *
 * Design contract (prop-driven, no app context):
 *   A product fetches its own org-settings and passes the values as props.
 *   BrandingProvider calls applyBrand() in a useEffect whenever the values
 *   change, writing the CSS custom properties onto document.documentElement.
 *
 * The tokens.css vars (--primary, --brand-primary, etc.) are the static
 * fallback baseline. applyBrand() overrides them at runtime with the org's
 * palette, making the UI theme dynamic per tenant.
 *
 * Placement: wrap the root of your product's component tree AFTER your
 * ThemeProvider (light/dark), so the dark-class is already on <html> when
 * the effect fires.
 *
 * Usage:
 *   import { BrandingProvider } from '@prism/ui'
 *
 *   // In your product's root layout / providers component:
 *   const { data: org } = useOrgSettings()   // your own fetch
 *
 *   return (
 *     <BrandingProvider
 *       primaryHex={org?.primaryColor}
 *       accentHex={org?.accentColor}
 *       logoUrl={org?.logoUrl}
 *     >
 *       {children}
 *     </BrandingProvider>
 *   )
 *
 * SSR note: applyBrand() only runs inside useEffect (client-side). On the
 * server the CSS var defaults from tokens.css are used — no flash for the
 * initial paint because the default palette is set in the stylesheet.
 */
import { createContext, useContext, useEffect, type ReactNode } from "react";
import { applyBrand, SENTRA_BRAND, type BrandTokens } from "./brand";

// ── BrandContext (optional — lets deeply-nested components read the current tokens) ──

interface BrandContextValue extends Omit<BrandTokens, 'logoUrl'> {
  /** The resolved primary hex/HSL that is currently active (may be the Sentra default). */
  primaryHex: string;
  /** The resolved accent hex/HSL that is currently active (may be the Sentra default). */
  accentHex: string;
  /**
   * The RAW logo URL the tenant set, or null when none is configured.
   * Intentionally NOT defaulted to the Sentra logo: consumers (AdminLayout,
   * AuthCard) use null to decide "no logo → render the icon mark instead".
   * (operator 2026-06-05: everything was showing /sentra-logo-full.png — the
   * default — instead of the platform icon when no DB logo exists.)
   * The `--logo-url` CSS var (set by applyBrand) still falls back to the Sentra
   * default for pure background-image consumers; this context value does not.
   */
  logoUrl: string | null;
  /** Lucide icon name (e.g. 'ShieldCheck') for the platform mark. Null if unset. */
  iconName: string | null;
  /** Resolved product/platform name (for the sidebar title). Empty if unset. */
  productName: string;
}

const BrandContext = createContext<BrandContextValue>({
  primaryHex: SENTRA_BRAND.primaryHex,
  accentHex: SENTRA_BRAND.accentHex,
  logoUrl: null,
  iconName: null,
  productName: "",
});

/**
 * useBrand — reads the currently-active brand tokens from context.
 *
 * Returns the Sentra defaults when no BrandingProvider is in the tree.
 * Only use this when a component genuinely needs to read the color values
 * (e.g. to pass them to a canvas API). For standard CSS theming the CSS
 * vars (hsl(var(--primary)) etc.) are always preferred.
 */
export function useBrand(): BrandContextValue {
  return useContext(BrandContext);
}

// ── BrandingProvider ───────────────────────────────────────────────────────

interface BrandingProviderProps extends BrandTokens {
  /** Lucide icon name for the platform mark (from Fort branding.icon). */
  iconName?: string | null;
  /** Product/platform display name (from Fort branding.product_name_*). */
  productName?: string;
  children: ReactNode;
}

/**
 * BrandingProvider — hot-applies org branding CSS vars and exposes the
 * active tokens via BrandContext.
 *
 * Renders no additional DOM nodes — it is a pure side-effect + context provider.
 *
 * Props (all optional — Sentra defaults fill any missing value):
 *   primaryHex   Hex "#RRGGBB" or HSL "H S% L%" for the brand primary color.
 *   accentHex    Hex "#RRGGBB" or HSL "H S% L%" for the brand accent color.
 *   logoUrl      Absolute URL or relative path to the org logo.
 */
const BrandingProvider = ({
  primaryHex,
  accentHex,
  logoUrl,
  iconName,
  productName,
  children,
}: BrandingProviderProps) => {
  // Apply CSS vars on mount and whenever the brand tokens change.
  useEffect(() => {
    if (typeof document === "undefined") return; // SSR guard
    applyBrand(document.documentElement, { primaryHex, accentHex, logoUrl });
  }, [primaryHex, accentHex, logoUrl]);

  const contextValue: BrandContextValue = {
    primaryHex: primaryHex ?? SENTRA_BRAND.primaryHex,
    accentHex: accentHex ?? SENTRA_BRAND.accentHex,
    // RAW logo: null when the tenant has none (empty/whitespace counts as none),
    // so consumers fall back to the icon mark instead of the Sentra default PNG.
    logoUrl: logoUrl && logoUrl.trim() !== '' ? logoUrl : null,
    iconName: iconName ?? null,
    productName: productName ?? "",
  };

  return (
    <BrandContext.Provider value={contextValue}>
      {children}
    </BrandContext.Provider>
  );
};

BrandingProvider.displayName = "BrandingProvider";

export { BrandingProvider };
export type { BrandingProviderProps, BrandContextValue };