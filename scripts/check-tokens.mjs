#!/usr/bin/env node
/*
 * Token guardrail — keeps the "everything dynamic" guarantee from rotting.
 *
 * Fails CI on the anti-pattern that actually breaks runtime theming: arbitrary
 * Tailwind COLOR literals (bg-[#…], text-[#…], border-[#…], ring-/fill-/stroke-/
 * from-/to-/via-[#…]) anywhere in src/. Those bypass the token system and can't be
 * re-skinned by a theme. Use a semantic token / Tailwind alias instead
 * (bg-primary, text-muted-foreground, bg-[hsl(var(--token))], …).
 *
 * Raw hex inside data-viz components (ColorPicker swatches, map/graph series) is
 * allowed — those are data, not chrome. Brand hex lives only in tokens.primitive.css.
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOT = new URL("../src", import.meta.url).pathname;
const RE = /\b(?:bg|text|border|ring|fill|stroke|from|to|via|decoration|outline|shadow|caret|accent|divide)-\[#[0-9A-Fa-f]{3,8}\]/g;

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const s = statSync(p);
    if (s.isDirectory()) walk(p, out);
    else if (/\.(tsx?|jsx?)$/.test(name)) out.push(p);
  }
  return out;
}

let violations = 0;
for (const file of walk(ROOT)) {
  const text = readFileSync(file, "utf8");
  const lines = text.split("\n");
  lines.forEach((line, i) => {
    const m = line.match(RE);
    if (m) {
      violations += m.length;
      console.error(`${file.replace(ROOT, "src")}:${i + 1}  ${m.join(", ")}`);
    }
  });
}

if (violations) {
  console.error(`\n✗ ${violations} hardcoded Tailwind color literal(s) found. Use a semantic token (bg-primary, bg-[hsl(var(--token))], …).`);
  process.exit(1);
}
console.log("✓ token guardrail: no arbitrary Tailwind color literals in src/");
