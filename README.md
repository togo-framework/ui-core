<!-- togo-header -->
# @togo-framework/ui-core

Foundation package of the togo UI kit — shadcn/ui primitives, theme system
(multi-theme via `BrandingProvider`), i18n, status/page chrome, and shared
utils/hooks. RTL-ready, dark-first, framework-agnostic.

Install this first, then add the feature package(s) you need on top of it:
`@togo-framework/ui-auth`, `ui-admin`, `ui-data-table`, `ui-markdown`,
`ui-map`, `ui-plugin`, `ui-feedback`, `ui-logs`, `ui-entity`, `ui-layout`,
`ui-marketing`, `ui-copilot`, `ui-desktop`.

```bash
npm install @togo-framework/ui-core
```

```tsx
import "@togo-framework/ui-core/styles.css";
import { Button, ThemeProvider, LanguageProvider } from "@togo-framework/ui-core";
```

This package was split out of the former monolithic `@togo-framework/ui` to
let apps install only the pieces they actually use.
<!-- togo-sponsors -->
