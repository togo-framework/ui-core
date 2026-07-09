'use client'

/**
 * TranslatableText — shows localized text with a hover toggle to reveal original.
 *
 * Adapted from app/src/components/ui/TranslatableText.tsx.
 * The shared version removes the LanguageContext dependency; the `isOriginal`
 * prop is passed directly by the consumer.
 */
import { useState } from "react";
import { Languages } from "lucide-react";
import { cn } from "../../lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "./tooltip";

interface TranslatableTextProps {
  display: string | null;
  original?: string;
  originalLang?: string;
  isOriginal: boolean;
  className?: string;
  dir?: string;
  lineClamp?: number;
  renderText?: (text: string) => React.ReactNode;
}

const TranslatableText = ({
  display,
  original,
  originalLang,
  isOriginal,
  className,
  dir = "auto",
  lineClamp = 3,
  renderText,
}: TranslatableTextProps) => {
  const [showOriginal, setShowOriginal] = useState(false);

  if (display === null) return null;

  const canToggle = !isOriginal && original && original !== display;
  const text = showOriginal && canToggle ? original! : display;

  const clampClass =
    lineClamp === 1 ? "line-clamp-1"
    : lineClamp === 2 ? "line-clamp-2"
    : lineClamp === 3 ? "line-clamp-3"
    : lineClamp === 4 ? "line-clamp-4"
    : "";

  return (
    <span className={cn("group/tl relative inline", className)}>
      <span dir={dir} className={clampClass}>
        {renderText ? renderText(text) : text}
      </span>
      {canToggle && (
        <TooltipProvider delayDuration={200}>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); setShowOriginal((v) => !v); }}
                className={cn(
                  "inline-flex items-center gap-0.5 ms-1 align-middle opacity-0 group-hover/tl:opacity-100 transition-opacity duration-fast ease-standard",
                  "text-muted-foreground hover:text-foreground",
                  showOriginal && "opacity-100 text-primary",
                )}
              >
                <Languages className="w-3 h-3" />
                {showOriginal && originalLang && (
                  <span className="text-2xs uppercase font-medium">{originalLang}</span>
                )}
              </button>
            </TooltipTrigger>
            <TooltipContent side="top" className="text-xs">
              {showOriginal ? "Show translation" : "Show original"}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </span>
  );
};
TranslatableText.displayName = "TranslatableText";

export default TranslatableText;
export { TranslatableText };
