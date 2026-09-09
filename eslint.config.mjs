import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettierConfig from "eslint-config-prettier";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  prettierConfig,
  {
    // `any` is intentionally allowed (as a warning, not an error) at the
    // handful of boundary points where Contentlayer's dynamic dispatch
    // across 14 document types genuinely can't be narrowed further
    // (contentlayer.config.ts computed fields, lib/content's cross-type
    // lookups, and the sync script's per-type upsert dispatch).
    rules: {
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Contentlayer's generated output — not our code, regenerated on every build.
    ".contentlayer/**",
  ]),
]);

export default eslintConfig;
