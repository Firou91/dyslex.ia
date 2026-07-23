import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import os from "node:os";
import { validateSuperpowersPath, resolveSuperpowersDependency } from "../src/dependency/superpowers.js";
import { formatStartupBlocked } from "../src/dependency/superpowers.js";

async function makeFakeSuperpowers(version: string): Promise<string> {
  const root = await mkdtemp(path.join(os.tmpdir(), "superpowers-"));
  await mkdir(path.join(root, "skills", "using-superpowers"), { recursive: true });
  await mkdir(path.join(root, ".codex-plugin"), { recursive: true });
  await writeFile(path.join(root, "skills", "using-superpowers", "SKILL.md"), "---\nname: using-superpowers\ndescription: Bootstrap.\n---\n");
  await writeFile(path.join(root, "package.json"), JSON.stringify({ name: "superpowers", version }));
  await writeFile(path.join(root, ".codex-plugin", "plugin.json"), JSON.stringify({ name: "superpowers", version }));
  return root;
}

test("valid Superpowers path requires bootstrap skill and compatible version", async () => {
  const root = await makeFakeSuperpowers("6.1.1");
  const result = await validateSuperpowersPath(root, "test");
  assert.equal(result.ok, true);
  if (result.ok) assert.equal(result.version, "6.1.1");
});

test("incompatible Superpowers version is rejected", async () => {
  const root = await makeFakeSuperpowers("99.0.0");
  const result = await validateSuperpowersPath(root, "test");
  assert.equal(result.ok, false);
});

test("dependency resolver blocks when explicit path is invalid", async () => {
  const result = await resolveSuperpowersDependency({
    env: { DYSLEXIA_SUPERPOWERS_PATH: path.join(os.tmpdir(), "missing-superpowers"), DYSLEXIA_HOST: "codex-cli" }
  });
  assert.equal(result.ok, false);
  if (!result.ok) {
    assert.match(formatStartupBlocked(result), /Startup blocked/);
    assert.match(formatStartupBlocked(result), /Codex CLI/);
  }
});
