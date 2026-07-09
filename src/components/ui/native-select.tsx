'use client'

import * as React from "react";

import { cn } from "../../lib/utils";

/**
 * NativeSelect — a styled native <select>, token-clean and RTL-safe.
 *
 * The @prism/ui `Select` is the Radix compound (Trigger/Content/Item), which is
 * great for rich popovers but heavy for the many small enum dropdowns in the
 * issue UI (status / priority / type / assignee). This is the lightweight,
 * fully-controlled native control those forms want: pass `<option>` children,
 * read `value`, handle `onChange`. The chevron is a CSS background so it flips
 * correctly under `dir="rtl"`.
 *
 * Usage:
 *   <NativeSelect value={status} onChange={(e) => onStatusChange(e.target.value)}>
 *     {STATUS_COLUMNS.map((c) => <option key={c.key} value={c.key}>{label}</option>)}
 *   </NativeSelect>
 */
const NativeSelect = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>(({ className, children, ...props }, ref) => (
  <select
    ref={ref}
    className={cn(
      "flex h-9 w-full appearance-none rounded-md border border-input bg-background px-3 pe-8 text-sm text-foreground ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      // chevron rendered as an inline SVG background, anchored to the end edge
      "bg-[length:1rem] bg-no-repeat bg-[right_0.5rem_center] rtl:bg-[left_0.5rem_center]",
      "bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22/%3E%3C/svg%3E')]",
      className,
    )}
    {...props}
  >
    {children}
  </select>
));
NativeSelect.displayName = "NativeSelect";

export { NativeSelect };
