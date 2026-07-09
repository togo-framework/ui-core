'use client'

import * as React from "react";
import { Skeleton } from "../ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { EmptyState } from "./EmptyState";
import { ServiceUnavailable } from "./ServiceUnavailable";
import { SessionExpired } from "./SessionExpired";

/**
 * DataState — the single wrapper that guarantees a data page renders ONE of the
 * canonical states and NEVER a raw error string. Precedence:
 *
 *   loading → unauthorized (401) → unavailable (503) → error → empty → children
 *
 * Pure + product-agnostic (Rule 25): the consumer passes booleans + pre-resolved
 * EN/AR label bundles. The library never fetches and never reads a language
 * context — it just renders the resolved strings.
 */
export type DataStateLabels = {
  /** Unauthorized (401) card. */
  sessionExpiredTitle: string;
  sessionExpiredDescription?: string;
  signInLabel: string;
  loginHref?: string;
  /** Unavailable (503) card. */
  unavailableTitle: string;
  unavailableDescription?: string;
  unavailableHint?: React.ReactNode;
  /** Generic error card. */
  errorTitle: string;
  /** Empty card. */
  emptyTitle: string;
  emptyDescription?: string;
};

export type DataStateProps = {
  loading?: boolean;
  unauthorized?: boolean;
  unavailable?: boolean;
  /** Pre-resolved error detail (e.g. "HTTP 500"); shown under errorTitle. */
  error?: string | null;
  /** True when the request succeeded but returned no rows. */
  empty?: boolean;
  labels: DataStateLabels;
  /** Optional icon reused across empty/unavailable/session cards. */
  icon?: React.ReactNode;
  /** Optional action slot for the empty state (e.g. a "Create" button). */
  emptyAction?: React.ReactNode;
  /** Skeleton rendered while `loading`. Defaults to three bars. */
  loadingFallback?: React.ReactNode;
  /** The populated content, rendered only when no special state applies. */
  children?: React.ReactNode;
};

const DefaultSkeleton = () => (
  <div className="space-y-2">
    <Skeleton className="h-9 w-full" />
    <Skeleton className="h-9 w-full" />
    <Skeleton className="h-9 w-full" />
  </div>
);
DefaultSkeleton.displayName = "DefaultSkeleton";

const DataState = ({
  loading,
  unauthorized,
  unavailable,
  error,
  empty,
  labels,
  icon,
  emptyAction,
  loadingFallback,
  children,
}: DataStateProps) => {
  if (loading) return <>{loadingFallback ?? <DefaultSkeleton />}</>;

  if (unauthorized) {
    return (
      <SessionExpired
        title={labels.sessionExpiredTitle}
        description={labels.sessionExpiredDescription}
        ctaLabel={labels.signInLabel}
        loginHref={labels.loginHref}
        icon={icon}
      />
    );
  }

  if (unavailable) {
    return (
      <ServiceUnavailable
        title={labels.unavailableTitle}
        description={labels.unavailableDescription}
        hint={labels.unavailableHint}
        icon={icon}
      />
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTitle>{labels.errorTitle}</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (empty) {
    return (
      <EmptyState
        title={labels.emptyTitle}
        description={labels.emptyDescription}
        icon={icon}
        action={emptyAction}
      />
    );
  }

  return <>{children}</>;
};
DataState.displayName = "DataState";

export { DataState };
