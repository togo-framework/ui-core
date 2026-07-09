"use client";

import * as React from "react";
import { cn } from "../../lib/utils";
import markColor from "../../assets/brand/mark-color.svg";
import markWhite from "../../assets/brand/mark-white.svg";
import monoColor from "../../assets/brand/mono-color.svg";
import monoWhite from "../../assets/brand/mono-white.svg";

export type LogoVariant = "mark" | "mono";
/** brand = gradient · white = reversed (dark bg) · inherit = currentColor (themes with text). */
export type LogoTone = "brand" | "white" | "inherit";

const ASSET: Record<LogoVariant, { color: string; white: string; ratio: number }> = {
  mark: { color: markColor, white: markWhite, ratio: 507 / 618 },   // tall mascot mark
  mono: { color: monoColor, white: monoWhite, ratio: 507 / 398.6 }, // wide monogram
};

export interface LogoProps extends Omit<React.HTMLAttributes<HTMLElement>, "color"> {
  variant?: LogoVariant;
  tone?: LogoTone;
  /** Rendered height in px; width derives from the mark's aspect ratio. */
  size?: number;
  title?: string;
}

/** ToGO Logo — the mascot mark or the monogram. `tone="inherit"` masks the shape
 * with currentColor so it themes with the surrounding text color. */
export function Logo({ variant = "mark", tone = "brand", size = 32, title = "ToGO", className, style, ...props }: LogoProps) {
  const a = ASSET[variant];
  const width = Math.round(size * a.ratio);

  if (tone === "inherit") {
    return (
      <span
        role="img"
        aria-label={title}
        className={cn("inline-block shrink-0", className)}
        style={{
          width,
          height: size,
          backgroundColor: "currentColor",
          WebkitMaskImage: `url(${a.white})`,
          maskImage: `url(${a.white})`,
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskSize: "contain",
          maskSize: "contain",
          WebkitMaskPosition: "center",
          maskPosition: "center",
          ...style,
        }}
        {...props}
      />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={tone === "white" ? a.white : a.color}
      alt={title}
      width={width}
      height={size}
      className={cn("inline-block shrink-0", className)}
      style={style}
      {...(props as React.ImgHTMLAttributes<HTMLImageElement>)}
    />
  );
}
Logo.displayName = "Logo";
