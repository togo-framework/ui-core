"use client";

/**
 * ThemePicker — a compact dropdown that lists every registered theme with a colour
 * swatch and checks the currently active one. Wires directly to useTheme(); no
 * external props needed unless you want to pass a custom theme list.
 *
 * Design: semantic tokens only, RTL-safe, accessible (role="menuitemradio").
 */

import * as React from "react";
import { Palette } from "lucide-react";
import { Button } from "../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { cn } from "../lib/utils";
import { useTheme } from "./ThemeProvider";
import { themes as defaultThemes, type ThemeDef } from "./themes";

export interface ThemePickerProps {
  /** Override the list of themes shown (defaults to the kit's built-in presets). */
  themes?: ThemeDef[];
  /** Button size */
  size?: "sm" | "default";
  className?: string;
  /** Label shown in the dropdown header (defaults to no header). */
  label?: string;
}

/** Colour swatch chip — 14 × 14 px circle with the theme's accent colour. */
function Swatch({ color, className }: { color?: string; className?: string }) {
  if (!color) return null;
  return (
    <span
      className={cn("inline-block h-3.5 w-3.5 shrink-0 rounded-full border border-white/20", className)}
      style={{ backgroundColor: color }}
    />
  );
}

export function ThemePicker({ themes = defaultThemes, size = "default", className, label }: ThemePickerProps) {
  const { theme, setTheme } = useTheme();
  const current = themes.find((t) => t.id === theme) ?? themes[0];
  const iconCls = size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4";
  const btnCls = size === "sm" ? "h-7 w-7" : "h-8 w-8";

  // Separate into dark-base and light-base groups.
  const dark = themes.filter((t) => t.base === "dark");
  const light = themes.filter((t) => t.base === "light");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn(btnCls, "text-muted-foreground", className)}
          aria-label="Switch theme"
        >
          {current?.accent ? (
            <Swatch color={current.accent} className="h-4 w-4" />
          ) : (
            <Palette className={iconCls} />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        {label && (
          <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">{label}</div>
        )}
        <div className="px-2 py-1 text-[10px] uppercase tracking-wider text-muted-foreground/70">Dark</div>
        {dark.map((t) => (
          <ThemeItem key={t.id} def={t} active={theme === t.id} onSelect={() => setTheme(t.id)} />
        ))}
        <DropdownMenuSeparator />
        <div className="px-2 py-1 text-[10px] uppercase tracking-wider text-muted-foreground/70">Light</div>
        {light.map((t) => (
          <ThemeItem key={t.id} def={t} active={theme === t.id} onSelect={() => setTheme(t.id)} />
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function ThemeItem({ def, active, onSelect }: { def: ThemeDef; active: boolean; onSelect: () => void }) {
  return (
    <DropdownMenuItem
      role="menuitemradio"
      aria-checked={active}
      onClick={onSelect}
      className={cn("flex items-center gap-2", active && "font-medium text-foreground")}
    >
      <Swatch color={def.accent} />
      <span className="flex-1">{def.label}</span>
      {active && (
        <span className="text-xs text-muted-foreground">✓</span>
      )}
    </DropdownMenuItem>
  );
}

ThemePicker.displayName = "ThemePicker";
