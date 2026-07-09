'use client'

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { Card, CardContent, CardHeader, CardDescription } from "../ui/card";

/**
 * StatCard — a compact metric tile (label + big value) for dashboard summary
 * strips. `tone` colors the value via semantic tokens (no hex literals).
 *
 * Pure + product-agnostic: pre-resolved `label` string + a value node in.
 */
const statValueVariants = cva("text-2xl font-bold font-mono tabular-nums", {
  variants: {
    tone: {
      default: "text-foreground",
      muted: "text-muted-foreground",
      success: "text-success",
      warning: "text-warning",
      danger: "text-destructive",
      info: "text-info",
    },
  },
  defaultVariants: { tone: "default" },
});

export type StatCardProps = VariantProps<typeof statValueVariants> & {
  /** Pre-resolved metric label (consumer selects EN/AR). */
  label: string;
  /** The metric value — string or number. */
  value: React.ReactNode;
  className?: string;
};

const StatCard = ({ label, value, tone, className }: StatCardProps) => (
  <Card className={cn("transition-all duration-base ease-standard hover:shadow-md", className)}>
    <CardHeader className="px-4 pb-1 pt-4">
      <CardDescription className="text-xs">{label}</CardDescription>
    </CardHeader>
    <CardContent className="px-4 pb-4">
      <p className={cn(statValueVariants({ tone }))}>{value}</p>
    </CardContent>
  </Card>
);
StatCard.displayName = "StatCard";

export { StatCard, statValueVariants };
