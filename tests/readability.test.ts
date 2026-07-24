import test from "node:test";
import assert from "node:assert/strict";
import { rewriteText } from "../src/readability/rewriter.js";
import { listTechnicalTokens } from "../src/readability/technicalTokens.js";
import { DEFAULT_PROFILES } from "../src/profiles/defaults.js";
import { detectAmbiguities, explainDiff, summarizeTerminal } from "../src/readability/structure.js";

test("rewrite preserves technical tokens by default", () => {
  const input = "Run npm run build in ./apps/web and keep DYSLEXAI_SUPERPOWERS_PATH unchanged.";
  const output = rewriteText(input, "plain-language", DEFAULT_PROFILES.balanced).text;
  assert.match(output, /npm run build/);
  assert.match(output, /\.\/apps\/web/);
  assert.match(output, /DYSLEXAI_SUPERPOWERS_PATH/);
});

test("technical token finder captures commands, paths, and env vars", () => {
  const tokens = listTechnicalTokens("Use pnpm build, ./src/index.ts, and DYSLEXAI_HOST.");
  assert.ok(tokens.includes("./src/index.ts"));
  assert.ok(tokens.includes("DYSLEXAI_HOST"));
});

test("ambiguity detector flags slash dates and units", () => {
  const ambiguities = detectAmbiguities("Schedule it on 07/08/2026 for 10m.");
  assert.ok(ambiguities.some((item) => item.includes("slash date")));
  assert.ok(ambiguities.some((item) => item.includes("unit")));
});

test("terminal summary preserves first useful error", () => {
  const summary = summarizeTerminal("ok\nError: Cannot find module './x'\nexit code 1");
  assert.equal(summary["First useful error"], "Error: Cannot find module './x'");
  assert.equal(summary["Exit code"], "1");
});

test("diff explanation separates additions and removals", () => {
  const result = explainDiff("--- a/file.ts\n+++ b/file.ts\n-old\n+new");
  assert.deepEqual(result["Files touched"], ["file.ts"]);
  assert.deepEqual(result.Added, ["+new"]);
  assert.deepEqual(result.Removed, ["-old"]);
});
