'use client'

import * as React from "react";
import { cn } from "../../lib/utils";

/**
 * SessionExpired — the graceful "your session expired, sign in again" card,
 * rendered when an API returns 401. Product-agnostic: the consumer passes a
 * pre-resolved title/description/CTA label and a `loginHref` (the library does
 * not import next/link — it renders a plain anchor so it works in any app).
 */
export type SessionExpiredProps = {
  /** Pre-resolved headline, e.g. "Session expired". */
  title: string;
  /** Pre-resolved explanation line. */
  description?: string;
  /** Pre-resolved CTA label, e.g. "Sign in again". */
  ctaLabel: string;
  /** Where the CTA links (defaults to "/login"). */
  loginHref?: string;
  /** Optional leading icon. */
  icon?: React.ReactNode;
  className?: string;
};

const SessionExpired = ({
  title,
  description,
  ctaLabel,
  loginHref = "/login",
  icon,
  className,
}: SessionExpiredProps) => (
  <div
    className={cn(
      "flex flex-col items-center justify-center rounded-xl border bg-card px-6 py-12 text-center shadow-sm transition-shadow duration-base ease-standard",
      className,
    )}
  >
    {icon ? (
      <div className="mb-3 flex size-10 items-center justify-center rounded-full bg-muted text-muted-foreground [&>svg]:size-5">
        {icon}
      </div>
    ) : null}
    <p className="text-sm font-semibold text-foreground">{title}</p>
    {description ? (
      <p className="mt-1 max-w-sm text-xs text-muted-foreground">{description}</p>
    ) : null}
    <a
      href={loginHref}
      className="mt-4 inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow-sm transition-all duration-fast ease-standard hover:bg-primary/90 hover:shadow-md active:scale-[0.98] focus-visible:outline-none focus-visible:shadow-focus"
    >
      {ctaLabel}
    </a>
  </div>
);
SessionExpired.displayName = "SessionExpired";

export { SessionExpired };
