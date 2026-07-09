import type { Meta, StoryObj } from "@storybook/react";
import { Logo, Wordmark } from "../components/brand";

const meta: Meta = {
  title: "Design System/Foundations",
  parameters: {
    layout: "fullscreen",
    fullBleed: true,
    docs: { story: { inline: false, height: "900px" } },
  },
};
export default meta;

function Section({ n, title, desc, children }: { n: string; title: string; desc?: string; children: React.ReactNode }) {
  return (
    <section className="mb-12">
      <div className="mb-5 flex items-baseline gap-3">
        <span className="font-mono text-sm font-bold text-primary">{n}</span>
        <h2 className="font-display text-2xl font-bold tracking-tight">{title}</h2>
      </div>
      {desc && <p className="mb-6 max-w-2xl text-sm text-muted-foreground">{desc}</p>}
      {children}
    </section>
  );
}

/** Swatch reads its color from the live CSS variable, so it reflects the active theme. */
function Swatch({ label, varName, className }: { label: string; varName: string; className?: string }) {
  return (
    <div className="overflow-hidden rounded-xl border border-border">
      <div className={className} style={className ? undefined : { background: `hsl(var(${varName}))`, height: 88 }} />
      <div className="bg-card px-3 py-2">
        <div className="text-sm font-medium">{label}</div>
        <div className="font-mono text-[11px] text-muted-foreground">{varName}</div>
      </div>
    </div>
  );
}

export const Foundations: StoryObj = {
  render: () => (
    <div className="min-h-screen bg-background px-8 py-10 text-foreground">
      <div className="mx-auto max-w-5xl">
        <header className="mb-12 border-b border-border pb-8">
          <Wordmark size={40} withMark />
          <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight">Foundations</h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            The token-driven primitives every component is built from. Flip the theme toolbar — every value
            below re-skins live, because it reads from the same CSS variables the components do.
          </p>
        </header>

        <Section n="01" title="Logo" desc="The mascot mark and the monogram. tone='inherit' masks the shape with currentColor so it themes with text.">
          <div className="flex flex-wrap items-end gap-8 rounded-xl border border-border bg-card p-8">
            <div className="flex flex-col items-center gap-2"><Logo variant="mark" tone="brand" size={72} /><span className="text-xs text-muted-foreground">mark · brand</span></div>
            <div className="flex flex-col items-center gap-2"><Logo variant="mono" tone="brand" size={56} /><span className="text-xs text-muted-foreground">mono · brand</span></div>
            <div className="flex flex-col items-center gap-2 text-primary"><Logo variant="mark" tone="inherit" size={72} /><span className="text-xs text-muted-foreground">mark · inherit</span></div>
            <div className="flex flex-col items-center gap-2"><Wordmark size={28} /><span className="text-xs text-muted-foreground">wordmark</span></div>
          </div>
        </Section>

        <Section n="02" title="Color" desc="Semantic roles — components reference these, never raw hex. The ToGO Flow runs Gopher Cyan → Stack Sky → Cobalt.">
          <div className="mb-6 h-24 rounded-xl" style={{ background: "var(--togo-flow)" }} />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            <Swatch label="Primary / accent" varName="--primary" />
            <Swatch label="Info (Stack Sky)" varName="--info" />
            <Swatch label="Background" varName="--background" />
            <Swatch label="Card" varName="--card" />
            <Swatch label="Muted" varName="--muted" />
            <Swatch label="Border" varName="--border" />
            <Swatch label="Success" varName="--success" />
            <Swatch label="Warning" varName="--warning" />
            <Swatch label="Destructive" varName="--destructive" />
            <Swatch label="Ring (focus)" varName="--ring" />
            <Swatch label="Foreground" varName="--foreground" />
            <Swatch label="Muted foreground" varName="--muted-foreground" />
          </div>
        </Section>

        <Section n="03" title="Typography" desc="Geometric display (Sora), humanist body (IBM Plex Sans), monospaced code (JetBrains Mono). Lusail is the Arabic face.">
          <div className="space-y-5 rounded-xl border border-border bg-card p-8">
            <div><div className="mb-1 font-mono text-xs uppercase tracking-wider text-muted-foreground">Display · Sora</div><div className="font-display text-4xl font-extrabold tracking-tight">Ship the monolith</div></div>
            <div><div className="mb-1 font-mono text-xs uppercase tracking-wider text-muted-foreground">Body · IBM Plex Sans</div><div className="max-w-xl text-lg">One repo, one binary — your Go API and React UI compiled into a single deployable artifact.</div></div>
            <div><div className="mb-1 font-mono text-xs uppercase tracking-wider text-muted-foreground">Code · JetBrains Mono</div><div className="font-mono text-lg text-primary">$ togo build --release</div></div>
          </div>
        </Section>

        <Section n="04" title="Radius, elevation & spacing">
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="mb-3 font-mono text-xs uppercase tracking-wider text-muted-foreground">Radius</div>
              <div className="flex items-end gap-3">
                <div className="h-14 w-14 rounded-sm bg-primary/20" /><div className="h-14 w-14 rounded-md bg-primary/30" /><div className="h-14 w-14 rounded-lg bg-primary/40" />
              </div>
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="mb-3 font-mono text-xs uppercase tracking-wider text-muted-foreground">Elevation</div>
              <div className="flex items-end gap-3">
                <div className="h-14 w-14 rounded-lg bg-card shadow-sm" /><div className="h-14 w-14 rounded-lg bg-card shadow-md" /><div className="h-14 w-14 rounded-lg bg-card shadow-lg" />
              </div>
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <div className="mb-3 font-mono text-xs uppercase tracking-wider text-muted-foreground">Spacing</div>
              <div className="flex items-end gap-2">
                {[2, 3, 4, 6, 8].map((s) => <div key={s} className="bg-primary/30" style={{ width: 12, height: s * 4 }} />)}
              </div>
            </div>
          </div>
        </Section>
      </div>
    </div>
  ),
};
