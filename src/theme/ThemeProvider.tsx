"use client";

import * as React from "react";
import { themes as defaultThemes, themeBase, STORAGE_KEY, type ThemeDef } from "./themes";

export type TogoTheme = "dark" | "light" | (string & {});
export type Dir = "ltr" | "rtl";

/** Per-app brand overrides: any `--togo-*` (or bridged) custom property → value. */
export type ThemeOverrides = Record<string, string>;

export interface ThemeContextValue {
  theme: TogoTheme;
  setTheme: (t: TogoTheme) => void;
  themes: ThemeDef[];
  dir: Dir;
  setDir: (d: Dir) => void;
}

const ThemeContext = React.createContext<ThemeContextValue | null>(null);

export interface ThemeProviderProps {
  theme?: TogoTheme;
  /** Per-app brand overrides applied as inline custom properties on the scope element. */
  overrides?: ThemeOverrides;
  dir?: Dir;
  /** "html" (default) themes <html>; "self" themes a wrapper div (so themes can coexist on one page). */
  scope?: "html" | "self";
  themes?: ThemeDef[];
  /** Persist theme/dir choice to localStorage and read it on first mount. */
  persist?: boolean;
  className?: string;
  children: React.ReactNode;
}

function applyToElement(el: HTMLElement, theme: string, dir: Dir, overrides?: ThemeOverrides) {
  el.setAttribute("data-theme", theme);
  el.classList.toggle("dark", themeBase(theme) === "dark");
  el.setAttribute("dir", dir);
  if (overrides) for (const [k, v] of Object.entries(overrides)) el.style.setProperty(k, v);
}

/**
 * ThemeProvider — runtime theming. Sets `data-theme` + toggles `.dark` + `dir` on its
 * scope (the <html> element, or a wrapper when scope="self"), applies per-app `overrides`
 * as inline custom properties, and exposes `useTheme()`. SSR-safe (no DOM access at module
 * top level; all mutations run in effects). For no-flash, also inline `themeInitScript`.
 */
export function ThemeProvider({
  theme: themeProp,
  overrides,
  dir: dirProp,
  scope = "html",
  themes = defaultThemes,
  persist = true,
  className,
  children,
}: ThemeProviderProps) {
  const [theme, setThemeState] = React.useState<TogoTheme>(themeProp ?? "dark");
  const [dir, setDirState] = React.useState<Dir>(dirProp ?? "ltr");
  const selfRef = React.useRef<HTMLDivElement>(null);

  // First mount: hydrate from localStorage / prefers-color-scheme (only when uncontrolled).
  React.useEffect(() => {
    if (themeProp != null || !persist || typeof window === "undefined") return;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) setThemeState(stored);
    else if (window.matchMedia?.("(prefers-color-scheme: light)").matches) setThemeState("light");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep state in sync when controlled.
  React.useEffect(() => { if (themeProp != null) setThemeState(themeProp); }, [themeProp]);
  React.useEffect(() => { if (dirProp != null) setDirState(dirProp); }, [dirProp]);

  const setTheme = React.useCallback((t: TogoTheme) => {
    setThemeState(t);
    if (persist && typeof window !== "undefined") window.localStorage.setItem(STORAGE_KEY, String(t));
  }, [persist]);

  const setDir = React.useCallback((d: Dir) => setDirState(d), []);

  // Apply to the chosen scope.
  React.useEffect(() => {
    if (typeof document === "undefined") return;
    const el = scope === "self" ? selfRef.current : document.documentElement;
    if (el) applyToElement(el, String(theme), dir, overrides);
  }, [theme, dir, overrides, scope]);

  const value = React.useMemo<ThemeContextValue>(() => ({ theme, setTheme, themes, dir, setDir }), [theme, setTheme, themes, dir, setDir]);

  return (
    <ThemeContext.Provider value={value}>
      {scope === "self" ? (
        <div
          ref={selfRef}
          data-theme={theme}
          dir={dir}
          className={["tg-root", themeBase(String(theme)) === "dark" ? "dark" : "", "bg-background text-foreground", className].filter(Boolean).join(" ")}
          style={overrides as React.CSSProperties}
        >
          {children}
        </div>
      ) : (
        children
      )}
    </ThemeContext.Provider>
  );
}
ThemeProvider.displayName = "ThemeProvider";

export function useTheme(): ThemeContextValue {
  const ctx = React.useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within a <ThemeProvider>");
  return ctx;
}
