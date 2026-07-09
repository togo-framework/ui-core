// @togo-framework/ui-core — public API.
// Foundation package: shadcn/ui primitives (RTL-ready, dark/light, multi-theme via
// BrandingProvider, bilingual EN/AR, mobile-first), theme system, i18n, status/page
// chrome, and shared utils/hooks. Feature packages (@togo-framework/ui-auth,
// ui-admin, ui-data-table, ui-markdown, ui-map, ui-plugin, ui-feedback, ui-logs,
// ui-entity, ui-layout, ui-marketing, ui-copilot, ui-desktop, …) depend on this.
// Import the design system once: `import "@togo-framework/ui-core/styles.css"`.

// ── Primitives (shadcn/ui: Button, Badge, Card, Input, Label, Checkbox, Switch,
//    Select, Dialog, Sheet, Drawer, DropdownMenu, Tabs, Tooltip, Popover, Accordion,
//    Table, Form, Calendar, Command, Avatar, Separator, Skeleton, Progress, …) ──
export * from "./shadcn";

// ── Status / page chrome ──
export * from "./components/status";

// ── Charts (lightweight recharts wrapper) ──
export * from "./components/charts/MiniBarChart";

// ── Nav ──
export { DynamicIcon } from "./components/nav/DynamicIcon";

// ── pickers (color + icon) ──
export { ColorPicker } from "./components/pickers/ColorPicker";
export type { ColorPickerProps } from "./components/pickers/ColorPicker";
export { IconPicker } from "./components/pickers/IconPicker";
export type { IconPickerProps } from "./components/pickers/IconPicker";

// ── realtime loading ──
export { default as SentraLoading } from "./components/ui/sentra-loading";
export { ContextualSkeleton } from "./components/ui/contextual-skeleton";
export { SectionSkeleton } from "./components/ui/section-skeleton";

// ── Theme (multi-theme color system) ──
export * from "./theme";

// ── i18n (translations) ──
export {
  LanguageProvider,
  useT,
  useLanguage,
  useTranslation,
  LANG_COOKIE_NAME,
} from "./i18n/LanguageProvider";
export type { LanguageContextValue, LanguageProviderProps } from "./i18n/LanguageProvider";

// ── brand ──
export * from "./components/brand";

// ── utils ──
export { cn, formatRelativeTime } from "./lib/utils";
export { getEntityTypeLabel } from "./lib/entityTypeLabels";
export { resolveEventBody } from "./lib/eventBody";
export type { EventBodyResult } from "./lib/eventBody";
export { pickLocalized } from "./lib/localized";
export { timeAgoEN, timeAgoAR, timeAgo } from "./lib/time-ago-fn";

// ── shared hooks ──
// Note: hooks/use-toast's `toast`/`useToast` (shadcn Toaster) is intentionally
// NOT re-exported here — it collides with sonner's `toast` from ./shadcn, which
// is this package's canonical toast API (components/ui/toaster.tsx uses the
// shadcn hook internally via a relative import; it isn't public API).
export { useDebounce } from "./hooks/useDebounce";
export { useInfiniteScroll } from "./hooks/useInfiniteScroll";
export { useIsMobile } from "./hooks/use-mobile";
