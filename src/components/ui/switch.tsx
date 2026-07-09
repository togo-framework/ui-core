'use client'

import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";

import { cn } from "../../lib/utils";

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, dir: propDirRaw, ...props }, ref) => {
  const propDir = (propDirRaw === "rtl" ? "rtl" : propDirRaw === "ltr" ? "ltr" : undefined) as "ltr" | "rtl" | undefined;
  const [resolvedDir, setResolvedDir] = React.useState<"ltr" | "rtl">(propDir ?? "ltr");
  React.useEffect(() => {
    if (propDir) { setResolvedDir(propDir); return; }
    if (typeof document !== "undefined") {
      const d: "ltr" | "rtl" = document.documentElement.getAttribute("dir") === "rtl" ? "rtl" : "ltr";
      setResolvedDir(d);
    }
  }, [propDir]);

  return (
    <SwitchPrimitives.Root
      dir={resolvedDir}
      className={cn(
        "peer relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-fast ease-standard data-[state=checked]:bg-primary data-[state=unchecked]:bg-input focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
      ref={ref}
    >
      <SwitchPrimitives.Thumb
        className={cn(
          "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0",
          "absolute top-1/2 -translate-y-1/2",
          "start-0 transition-[inset-inline-start] duration-fast ease-standard",
          "data-[state=checked]:start-[1.25rem] data-[state=unchecked]:start-0",
        )}
      />
    </SwitchPrimitives.Root>
  );
});
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };