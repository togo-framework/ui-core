'use client'
// src/theme/index.ts — Theme barrel.
// Re-exports all theming utilities and components from this folder.
// 'use client' marks this barrel so Next.js does not try to render BrandingProvider
// (which uses createContext + useEffect) in the RSC server context.

export {
  hexToHSL,
  isHSL,
  isValidColor,
  nudgeL,
  toHSLSafe,
  applyBrand,
  SENTRA_BRAND,
  type BrandTokens,
} from "./brand";

export {
  BrandingProvider,
  useBrand,
  type BrandingProviderProps,
  type BrandContextValue,
} from "./BrandingProvider";

export {
  ThemeProvider,
  useTheme,
  type ThemeProviderProps,
  type ThemeContextValue,
  type TogoTheme,
  type ThemeOverrides,
  type Dir,
} from "./ThemeProvider";

export { themes, themeInitScript, themeBase, STORAGE_KEY, type ThemeDef, type ThemeBase } from "./themes";

export { ThemePicker, type ThemePickerProps } from "./ThemePicker";

export { wallpapers, wallpaperCss, wallpaperSwatch, type WallpaperDef } from "./wallpapers";
