// ToGO theme registry. A theme is a `data-theme` value + a dark/light base (so the
// existing `.dark`-driven utilities stay in sync). Add a tenant/brand theme by adding
// one block to tokens.semantic.css and one entry here — no component changes.

export type ThemeBase = "dark" | "light";

export interface ThemeDef {
  id: string;
  label: string;
  /** Whether this theme toggles the `.dark` class (keeps `dark:` utilities in sync). */
  base: ThemeBase;
  /** Optional accent hex for swatch display (not used by ThemeProvider itself). */
  accent?: string;
}

export const themes: ThemeDef[] = [
  { id: "dark",    label: "Dark",    base: "dark",  accent: "#1FC7DC" },
  { id: "light",   label: "Light",   base: "light", accent: "#1659C8" },
  { id: "purple",  label: "Purple",  base: "dark",  accent: "#9B6DF5" },
  { id: "rose",    label: "Rose",    base: "dark",  accent: "#F5427B" },
  { id: "emerald", label: "Emerald", base: "dark",  accent: "#10B981" },
  { id: "purple-light",  label: "Purple Light",  base: "light", accent: "#7C3AED" },
  { id: "rose-light",    label: "Rose Light",    base: "light", accent: "#E11D48" },
  { id: "emerald-light", label: "Emerald Light", base: "light", accent: "#059669" },
];

export function themeBase(id: string): ThemeBase {
  return themes.find((t) => t.id === id)?.base ?? "dark";
}

export const STORAGE_KEY = "togo-theme";

/**
 * Inline this string in a <script> in <head> to set the theme before first paint
 * (no flash of the wrong theme). The framework injects it server-side.
 *
 *   <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
 */
export const themeInitScript = `(function(){try{
var k=${JSON.stringify(STORAGE_KEY)};
var t=localStorage.getItem(k);
if(!t){t=window.matchMedia&&window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';}
var d=document.documentElement;
d.setAttribute('data-theme',t);
d.classList.toggle('dark', t!=='light');
}catch(e){}})();`;
