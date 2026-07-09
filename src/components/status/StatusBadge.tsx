'use client'

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

/**
 * StatusBadge — a small tinted status pill driven by semantic tokens instead of
 * hardcoded `bg-emerald-500/15` color literals. Use for health / level / state
 * (running, ok, down, error, warn, info, …). Pure + product-agnostic.
 *
 * The consumer maps its domain status → a `tone` and passes a pre-resolved
 * label (EN/AR). This keeps colors centralised and RTL-/theme-safe.
 */
const statusBadgeVariants = cva(
  "inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-xs font-medium transition-colors duration-fast ease-standard",
  {
    variants: {
      tone: {
        neutral: "border-border bg-muted text-muted-foreground",
        success: "border-success/30 bg-success/15 text-success",
        warning: "border-warning/30 bg-warning/15 text-warning",
        danger: "border-destructive/30 bg-destructive/15 text-destructive",
        info: "border-info/30 bg-info/15 text-info",
      },
    },
    defaultVariants: { tone: "neutral" },
  },
);

export type StatusBadgeTone = NonNullable<
  VariantProps<typeof statusBadgeVariants>["tone"]
>;

export type StatusBadgeProps = VariantProps<typeof statusBadgeVariants> & {
  /** Pre-resolved label (consumer selects EN/AR). */
  children: React.ReactNode;
  className?: string;
};

const StatusBadge = ({ tone, children, className }: StatusBadgeProps) => (
  <span className={cn(statusBadgeVariants({ tone }), className)}>{children}</span>
);
StatusBadge.displayName = "StatusBadge";

export { StatusBadge, statusBadgeVariants };
