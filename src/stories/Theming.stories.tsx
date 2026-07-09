import type { Meta, StoryObj } from "@storybook/react";
import { ThemeProvider } from "../theme";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";

const meta: Meta = {
  title: "Design System/Theming",
  parameters: {
    layout: "fullscreen",
    fullBleed: true,
    docs: { story: { inline: false, height: "820px" } },
  },
};
export default meta;

/** A self-contained sample surface — rendered identically inside each themed panel. */
function Sample({ label }: { label: string }) {
  return (
    <Card padded className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="font-display text-lg font-bold">{label}</span>
        <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">live</span>
      </div>
      <p className="text-sm text-muted-foreground">
        Every element here reads from the same token roles. Switching the theme re-points the
        variables — no React re-mount.
      </p>
      <div className="flex flex-wrap gap-2">
        <Button>Primary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
      </div>
      <div className="h-14 rounded-lg" style={{ background: "var(--togo-flow)" }} />
    </Card>
  );
}

/** Panel themes itself via `scope="self"` so multiple themes coexist on one page. */
function Panel({ theme, overrides, title }: { theme: string; overrides?: Record<string, string>; title: string }) {
  return (
    <ThemeProvider theme={theme} overrides={overrides} scope="self" persist={false} className="rounded-2xl border border-border p-5">
      <div className="mb-3 font-mono text-xs uppercase tracking-wider text-muted-foreground">{title}</div>
      <Sample label={title} />
    </ThemeProvider>
  );
}

export const Theming: StoryObj = {
  render: () => (
    <div className="min-h-screen bg-background px-8 py-10 text-foreground">
      <div className="mx-auto max-w-5xl">
        <h1 className="font-display text-3xl font-extrabold tracking-tight">Theming</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          <code className="font-mono text-sm">ThemeProvider</code> sets <code className="font-mono text-sm">data-theme</code> +
          <code className="font-mono text-sm"> dir</code> on its scope and applies per-app
          <code className="font-mono text-sm"> overrides</code> as inline custom properties. The three panels below run
          three different themes <em>on the same page</em> via <code className="font-mono text-sm">scope="self"</code> — the
          right-most one re-brands purely by overriding one variable.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <Panel theme="dark" title="Dark" />
          <Panel theme="light" title="Light" />
          <Panel theme="dark" title="Tenant override" overrides={{ "--primary": "270 80% 60%", "--ring": "270 80% 60%" }} />
        </div>

        <div className="mt-10 rounded-xl border border-border bg-card p-6">
          <h2 className="font-display text-lg font-bold">Add a tenant theme — no code</h2>
          <p className="mt-2 text-sm text-muted-foreground">Two steps, zero component edits:</p>
          <ol className="mt-3 list-decimal space-y-2 ps-5 text-sm">
            <li>Add a <code className="font-mono">[data-theme="acme"] {`{ --togo-color-accent: … }`}</code> block to <code className="font-mono">tokens.semantic.css</code>.</li>
            <li>Register it in <code className="font-mono">themes.ts</code> (<code className="font-mono">{`{ id: "acme", label: "Acme", base: "dark" }`}</code>).</li>
          </ol>
          <p className="mt-4 text-sm text-muted-foreground">
            Or, for a per-app accent without touching the package, pass
            <code className="font-mono"> overrides</code> to <code className="font-mono">ThemeProvider</code> (as the third panel does).
            For SSR no-flash, inline <code className="font-mono">themeInitScript</code> in <code className="font-mono">&lt;head&gt;</code>.
          </p>
        </div>
      </div>
    </div>
  ),
};
