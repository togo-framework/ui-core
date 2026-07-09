'use client'

import * as React from "react";
import { cn } from "../../lib/utils";

/**
 * PageHeader — the standard page title row for admin/ops dashboard pages: an
 * optional leading icon, a title, an optional description line, and an optional
 * trailing `actions` slot (filters, buttons). RTL-clean (logical gap/justify).
 *
 * Pure + product-agnostic: pre-resolved `title`/`description` strings in.
 */
export type PageHeaderProps = {
  /** Pre-resolved page title (consumer selects EN/AR). */
  title: string;
  /** Optional pre-resolved subtitle. */
  description?: string;
  /** Optional leading icon (sized to ~1.25rem). */
  icon?: React.ReactNode;
  /** Optional trailing actions (filters, buttons) — placed at the inline end. */
  actions?: React.ReactNode;
  className?: string;
};

const PageHeader = ({ title, description, icon, actions, className }: PageHeaderProps) => (
  <div className={cn("flex flex-wrap items-center justify-between gap-4", className)}>
    <div className="min-w-0">
      <h1 className="flex items-center gap-2 text-2xl font-bold text-foreground">
        {icon ? <span className="text-muted-foreground [&>svg]:size-5">{icon}</span> : null}
        {title}
      </h1>
      {description ? (
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      ) : null}
    </div>
    {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
  </div>
);
PageHeader.displayName = "PageHeader";

export { PageHeader };
