"use client";

import * as React from "react";
import * as Icons from "lucide-react";
import { cn } from "../../lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";

export interface IconPickerProps {
  /** Current icon name (lucide PascalCase, e.g. "Sparkles"). */
  value?: string;
  onChange: (name: string) => void;
  /** Restrict to a custom icon list (defaults to a curated common set). */
  icons?: string[];
  className?: string;
  disabled?: boolean;
}

// A curated common set so the grid stays usable (lucide ships 1000+).
const COMMON: string[] = [
  "Activity", "AlertCircle", "Archive", "ArrowRight", "Bell", "Bookmark", "Box", "Calendar",
  "Camera", "Check", "CheckCircle", "ChevronRight", "Circle", "Clipboard", "Clock", "Cloud",
  "Code", "Cog", "Command", "Compass", "Copy", "CreditCard", "Database", "Download", "Edit",
  "Eye", "File", "FileText", "Filter", "Flag", "Folder", "Gift", "Globe", "Grid", "Hash",
  "Heart", "Home", "Image", "Inbox", "Info", "Key", "Layers", "Layout", "Link", "List", "Lock",
  "Mail", "Map", "MapPin", "Menu", "MessageSquare", "Mic", "Monitor", "Moon", "MoreHorizontal",
  "Move", "Music", "Package", "Paperclip", "Pencil", "Phone", "PieChart", "Play", "Plus", "Power",
  "Printer", "Radio", "RefreshCw", "Rocket", "Save", "Search", "Send", "Server", "Settings",
  "Share2", "Shield", "ShieldCheck", "ShoppingCart", "Sparkles", "Star", "Sun", "Tag", "Target",
  "Terminal", "Trash2", "TrendingUp", "Truck", "Upload", "User", "Users", "Video", "Wallet",
  "Wifi", "Workflow", "Wrench", "Zap",
];

function Glyph({ name, className }: { name: string; className?: string }) {
  const Cmp = (Icons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[name] ?? Icons.Sparkles;
  return <Cmp className={className} />;
}

/** IconPicker — a button that opens a searchable grid of lucide icons. Controlled
 * by `value` (icon name) + `onChange`. Presentational + token-themed. */
export function IconPicker({ value, onChange, icons = COMMON, className, disabled }: IconPickerProps) {
  const [q, setQ] = React.useState("");
  const filtered = React.useMemo(
    () => (q ? icons.filter((n) => n.toLowerCase().includes(q.toLowerCase())) : icons),
    [q, icons],
  );

  return (
    <Popover>
      <PopoverTrigger
        disabled={disabled}
        aria-label="Pick an icon"
        className={cn(
          "inline-flex items-center gap-2 rounded-lg border border-input bg-background px-2.5 py-1.5 text-sm outline-none transition hover:bg-accent disabled:opacity-50",
          className,
        )}
      >
        <Glyph name={value ?? "Sparkles"} className="h-4 w-4" />
        <span className="text-xs text-muted-foreground">{value ?? "Choose icon"}</span>
      </PopoverTrigger>
      <PopoverContent className="w-64 space-y-2" align="start">
        <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search icons…" autoFocus />
        <ScrollArea className="h-56">
          <div className="grid grid-cols-6 gap-1 pe-2">
            {filtered.map((n) => (
              <button
                key={n}
                type="button"
                title={n}
                onClick={() => onChange(n)}
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground transition hover:bg-accent hover:text-foreground",
                  value === n && "bg-primary/15 text-primary ring-1 ring-primary/40",
                )}
              >
                <Glyph name={n} className="h-4 w-4" />
              </button>
            ))}
            {filtered.length === 0 && (
              <p className="col-span-6 py-6 text-center text-xs text-muted-foreground">No icons found</p>
            )}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
