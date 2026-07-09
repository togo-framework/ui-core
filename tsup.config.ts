import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/shadcn.ts", "src/theme/index.ts"],
  format: ["esm"],
  dts: true,
  sourcemap: true,
  clean: true,
  external: ["react", "react-dom", "lucide-react"],
  loader: { ".css": "copy", ".svg": "dataurl" },
  onSuccess: "cp src/styles.css dist/styles.css && cp src/styles.css dist/shadcn.css && mkdir -p dist/theme && cp src/theme/*.css dist/theme/",
});
