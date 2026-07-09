'use client'

import { Card, CardContent, CardHeader } from "./card";
import { Skeleton } from "./skeleton";

interface SectionSkeletonProps {
  title?: string;
  rows?: number;
}

const SectionSkeleton = ({ title, rows = 3 }: SectionSkeletonProps) => {
  return (
    <Card
      className="bg-card border-border"
      aria-busy="true"
      aria-label={title || "Loading"}
      data-testid={title ? `section-skeleton-${title.toLowerCase().replace(/\s+/g, "-")}` : "section-skeleton"}
    >
      {title && (
        <CardHeader className="pb-3">
          <Skeleton className="h-4 w-40" />
        </CardHeader>
      )}
      <CardContent className="space-y-2 pt-4">
        {Array.from({ length: rows }).map((_, i) => (
          <Skeleton
            key={i}
            className="h-4 rounded-md"
            style={{ width: `${100 - i * 10}%` }}
          />
        ))}
      </CardContent>
    </Card>
  );
};
SectionSkeleton.displayName = "SectionSkeleton";

export { SectionSkeleton };
