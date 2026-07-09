"use client";

import * as React from "react";
import { cn } from "../../lib/utils";
import { Logo, type LogoVariant } from "./Logo";

export interface WordmarkProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Font size of the wordmark in px. */
  size?: number;
  /** Render the mark/monogram before the wordmark. */
  withMark?: boolean;
  markVariant?: LogoVariant;
}

/** ToGO Wordmark — "To" in Gopher Cyan, "GO" in Cobalt (brand-fixed, theme-independent),
 * set in the Sora display face. */
export function Wordmark({ size = 24, withMark = false, markVariant = "mono", className, style, ...props }: WordmarkProps) {
  return (
    <span className={cn("inline-flex items-center gap-2 font-display font-extrabold tracking-tight", className)} style={style} {...props}>
      {withMark && <Logo variant={markVariant} tone="brand" size={Math.round(size * 1.15)} />}
      <span style={{ fontSize: size, lineHeight: 1 }} aria-label="ToGO">
        <span style={{ color: "var(--togo-cyan-500)" }}>To</span>
        <span style={{ color: "var(--togo-cobalt-500)" }}>GO</span>
      </span>
    </span>
  );
}
Wordmark.displayName = "Wordmark";
