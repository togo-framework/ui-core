'use client'

import * as React from "react";
import { cn } from "../../lib/utils";

/**
 * EmptyState — a centered "no data" placeholder for tables / lists / panels.
 *
 * Pure + product-agnostic (Rule 25): takes a pre-resolved `title`/`description`
 * (the consumer picks EN/AR via its `language`) and an optional `icon` + action
 * slot. Semantic tokens only; RTL-clean (logical centering).
 */
export type EmptyStateProps = {
  /** Pre-resolved title string (consumer selects EN/AR). */
  title: string;
  /** Optional pre-resolved supporting line. */
  description?: string;
  /** Optional leading icon (e.g. a lucide-react element). */
  icon?: React.ReactNode;
  /** Optional action slot (button / link) rendered below the text. */
  action?: React.ReactNode;
  className?: string;
};

const EmptyState = ({ title, description, icon, action, className }: EmptyStateProps) => (
  <div
    className={cn(
      "flex flex-col items-center justify-center rounded-xl border border-dashed bg-card/40 px-6 py-12 text-center transition-colors duration-base ease-standard",
      className,
    )}
  >
    {icon ? (
      <div className="mb-3 flex size-10 items-center justify-center rounded-full bg-muted text-muted-foreground [&>svg]:size-5">
        {icon}
      </div>
    ) : null}
    <p className="text-sm font-medium text-foreground">{title}</p>
    {description ? (
      <p className="mt-1 max-w-sm text-xs text-muted-foreground">{description}</p>
    ) : null}
    {action ? <div className="mt-4">{action}</div> : null}
  </div>
);
EmptyState.displayName = "EmptyState";

export { EmptyState };
