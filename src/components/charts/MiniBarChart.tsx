'use client'

/**
 * MiniBarChart — a dependency-free SVG/flex bar chart.
 *
 * Recharts (via ChartContainer) is overkill for a small sparkline-style chart,
 * so this renders a clean, responsive, semantic-token-styled bar chart from
 * plain data, RTL-safe (flips with `dir`), with an accessible title.
 * Promoted into @prism/ui from motor-web (product-agnostic).
 */

export type BarPoint = { label: string; value: number; sublabel?: string }

export const MiniBarChart = ({
  data,
  height = 140,
  valueFormatter = (n) => n.toLocaleString(),
}: {
  data: BarPoint[]
  height?: number
  valueFormatter?: (n: number) => string
}) => {
  if (data.length === 0) {
    return (
      <div
        className="flex items-center justify-center rounded-md border border-dashed text-xs text-muted-foreground"
        style={{ height }}
      >
        —
      </div>
    )
  }

  const max = Math.max(...data.map((d) => d.value), 1)
  const barH = (v: number) => Math.max(2, Math.round((v / max) * (height - 28)))

  return (
    <div className="flex items-end gap-1.5" style={{ height }} role="img">
      {data.map((d, i) => (
        <div key={`${d.label}-${i}`} className="flex flex-1 flex-col items-center justify-end gap-1">
          <span className="text-[10px] font-medium text-muted-foreground">
            {d.value > 0 ? valueFormatter(d.value) : ''}
          </span>
          <div
            className="w-full rounded-t bg-primary/80 transition-all duration-fast ease-standard hover:bg-primary"
            style={{ height: barH(d.value) }}
            title={`${d.sublabel ?? d.label}: ${valueFormatter(d.value)}`}
          />
          <span className="max-w-full truncate text-[9px] text-muted-foreground">{d.label}</span>
        </div>
      ))}
    </div>
  )
}
MiniBarChart.displayName = 'MiniBarChart'
