// togo desktop wallpaper registry. Same shape convention as `themes.ts` — a flat
// array of `{id, label, css}` entries so a consuming app can look up the active
// wallpaper's CSS `background` value from `DesktopPrefs.wallpaper` (an id string).
//
// A wallpaper may be a pure CSS gradient (no assets, always works) or a photo
// (an `image` URL layered OVER a gradient fallback, so it never ends up blank if
// the image can't load). `wallpaperCss(id)` returns the composed CSS `background`.

export interface WallpaperDef {
  id: string;
  label: string;
  /** CSS `background` gradient value (also the fallback under any `image`). */
  css: string;
  /** Optional photo URL layered over `css` (cover/center). */
  image?: string;
}

export const wallpapers: WallpaperDef[] = [
  {
    id: "aurora",
    label: "Aurora",
    css: "linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)",
    image: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?auto=format&fit=crop&w=2400&q=80",
  },
  {
    id: "monterey",
    label: "Monterey",
    css: "linear-gradient(135deg, #4b6cb7 0%, #182848 100%)",
    image: "https://images.unsplash.com/photo-1502790671504-542ad42d5189?auto=format&fit=crop&w=2400&q=80",
  },
  {
    id: "dunes",
    label: "Dunes",
    css: "linear-gradient(135deg, #c79081 0%, #dfa579 100%)",
    image: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=2400&q=80",
  },
  {
    id: "forest",
    label: "Forest",
    css: "linear-gradient(135deg, #134e5e 0%, #71b280 100%)",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=2400&q=80",
  },
  {
    id: "sunset",
    label: "Sunset",
    css: "linear-gradient(135deg, #ff512f 0%, #dd2476 100%)",
  },
  {
    id: "ocean",
    label: "Ocean",
    css: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
  },
  {
    id: "dusk",
    label: "Dusk",
    css: "linear-gradient(135deg, #360033 0%, #0b8793 100%)",
  },
  {
    id: "meadow",
    label: "Meadow",
    css: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
  },
  {
    id: "slate",
    label: "Slate",
    css: "linear-gradient(135deg, #232526 0%, #414345 100%)",
  },
  {
    id: "candy",
    label: "Candy",
    css: "linear-gradient(135deg, #f857a6 0%, #ff5858 100%)",
  },
  {
    id: "daybreak",
    label: "Daybreak",
    css: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)",
  },
];

/** Composed CSS `background` for a wallpaper id (image over gradient fallback). */
export function wallpaperCss(id: string | null | undefined): string {
  const w = wallpapers.find((x) => x.id === id) ?? wallpapers[0];
  return w.image ? `url("${w.image}") center / cover no-repeat, ${w.css}` : w.css;
}

/** Just the gradient part (for small swatches/thumbnails where no image needed). */
export function wallpaperSwatch(id: string | null | undefined): string {
  const w = wallpapers.find((x) => x.id === id) ?? wallpapers[0];
  return w.css;
}
