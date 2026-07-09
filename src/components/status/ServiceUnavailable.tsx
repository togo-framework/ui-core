'use client'

import * as React from "react";
import { cn } from "../../lib/utils";

/**
 * ServiceUnavailable — the graceful "this service/backend dependency is not
 * connected" card. Rendered when an API returns 503 (a DB / NATS / Fort the
 * page depends on is down or unconfigured).
 *
 * This is an EXPECTED state, not an error — styled calm (amber-tinted, not
 * destructive). Pure + product-agnostic: pre-resolved strings in, optional
 * `hint` (e.g. which env var to set) and an action slot.
 */
export type ServiceUnavailableProps = {
  /** Pre-resolved headline, e.g. "Service not connected". */
  title: string;
  /** Pre-resolved explanation line. */
  description?: string;
  /** Optional secondary hint (e.g. a config key) rendered muted/mono. */
  hint?: React.ReactNode;
  /** Optional leading icon. */
  icon?: React.ReactNode;
  /** Optional action slot (e.g. a retry / docs button). */
  action?: React.ReactNode;
  className?: string;
};

const ServiceUnavailable = ({
  title,
  description,
  hint,
  icon,
  action,
  className,
}: ServiceUnavailableProps) => (
  <div
    className={cn(
      "rounded-xl border border-alert-amber/30 bg-alert-amber/5 p-5 shadow-sm transition-shadow duration-base ease-standard",
      className,
    )}
  >
    <div className="flex items-start gap-3">
      {icon ? (
        <div className="mt-0.5 text-alert-amber [&>svg]:size-5">{icon}</div>
      ) : null}
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-foreground">{title}</p>
        {description ? (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        ) : null}
        {hint ? (
          <p className="mt-2 text-xs text-muted-foreground">{hint}</p>
        ) : null}
        {action ? <div className="mt-3">{action}</div> : null}
      </div>
    </div>
  </div>
);
ServiceUnavailable.displayName = "ServiceUnavailable";

export { ServiceUnavailable };
