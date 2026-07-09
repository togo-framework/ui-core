"use client";

import * as React from "react";
import { cn } from "../../lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Input } from "../ui/input";

export interface ColorPickerProps {
  /** Current color, hex (e.g. "#7c3aed"). */
  value: string;
  onChange: (hex: string) => void;
  /** Preset swatches shown in the popover. */
  presets?: string[];
  /** Optional className for the trigger. */
  className?: string;
  disabled?: boolean;
  "aria-label"?: string;
}

const DEFAULT_PRESETS = [
  "#7c3aed", "#931535", "#2563eb", "#0891b2", "#059669", "#16a34a",
  "#ca8a04", "#ea580c", "#dc2626", "#db2777", "#475569", "#0f172a",
];

function normalizeHex(v: string): string {
  let h = v.trim();
  if (h && !h.startsWith("#")) h = "#" + h;
  return h;
}

/** ColorPicker — a swatch trigger that opens a popover with a native color input,
 * a hex field, and preset swatches. Presentational + controlled. */
export function ColorPicker({
  value, onChange, presets = DEFAULT_PRESETS, className, disabled, ...rest
}: ColorPickerProps) {
  const [text, setText] = React.useState(value);
  React.useEffect(() => setText(value), [value]);

  const commitText = () => {
    const h = normalizeHex(text);
    if (/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(h)) onChange(h);
    else setText(value);
  };

  return (
    <Popover>
      <PopoverTrigger
        disabled={disabled}
        aria-label={rest["aria-label"] ?? "Pick a color"}
        className={cn(
          "inline-flex items-center gap-2 rounded-lg border border-input bg-background px-2.5 py-1.5 text-sm outline-none transition hover:bg-accent disabled:opacity-50",
          className,
        )}
      >
        <span className="h-5 w-5 shrink-0 rounded-md border border-border" style={{ background: value }} />
        <span className="font-mono text-xs uppercase text-muted-foreground">{value}</span>
      </PopoverTrigger>
      <PopoverContent className="w-60 space-y-3" align="start">
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={/^#[0-9a-fA-F]{6}$/.test(value) ? value : "#000000"}
            onChange={(e) => onChange(e.target.value)}
            className="h-9 w-9 shrink-0 cursor-pointer rounded-md border border-input bg-transparent p-0.5"
            aria-label="Color wheel"
          />
          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            onBlur={commitText}
            onKeyDown={(e) => e.key === "Enter" && commitText()}
            className="font-mono uppercase"
            placeholder="#000000"
          />
        </div>
        <div className="grid grid-cols-6 gap-1.5">
          {presets.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => onChange(p)}
              aria-label={p}
              className={cn(
                "h-7 w-7 rounded-md border border-border transition hover:scale-110",
                value.toLowerCase() === p.toLowerCase() && "ring-2 ring-ring ring-offset-1 ring-offset-background",
              )}
              style={{ background: p }}
            />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
