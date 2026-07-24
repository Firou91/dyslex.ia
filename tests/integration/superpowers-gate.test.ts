import test from "node:test";
import assert from "node:assert/strict";
import { mkdir, mkdtemp, symlink, writeFile } from "node:fs/promises";
import path from "node:path";
import os from "node:os";
import { resolveSuperpowersDependency, validateSuperpowersPath } from "../../src/dependency/superpowers.js";

async function makeTempDir(prefix = "dyslexai-test-"): Promise<string> {
  return mkdtemp(path.join(os.tmpdir(), prefix));
}

async function makeFakeSuperpowers(version = "6.1.1", parent?: string): Promise<string> {
  const root = parent ? path.join(parent, "Superpowers With Spaces") : await makeTempDir("superpowers with spaces-");
  await mkdir(path.join(root, "skills", "using-superpowers"), { recursive: true });
  await mkdir(path.join(root, ".codex-plugin"), { recursive: true });
  await writeFile(
    path.join(root, "skills", "using-superpowers", "SKILL.md"),
    "---\nname: using-superpowers\ndescription: Minimal test fixture for dependency validation.\n---\n",
    "utf8"
  );
  await writeFile(path.join(root, "package.json"), `${JSON.stringify({ name: "superpowers", version }, null, 2)}\n`, "utf8");
  await writeFile(path.join(root, ".codex-plugin", "plugin.json"), `${JSON.stringify({ name: "superpowers", version }, null, 2)}\n`, "utf8");
  return root;
}

test("rejects fake folder that is only named superpowers", async () => {
  const root = path.join(await makeTempDir(), "superpowers");
  await mkdir(root, { recursive: true });
  const result = await validateSuperpowersPath(root, "fake");
  assert.equal(result.ok, false);
});

test("rejects incompatible Superpowers fixture", async () => {
  const root = await makeFakeSuperpowers("99.0.0");
  const result = await validateSuperpowersPath(root, "fake");
  assert.equal(result.ok, false);
});

test("accepts path with spaces", async () => {
  const parent = await makeTempDir("path with spaces-");
  const root = await makeFakeSuperpowers("6.1.1", parent);
  const result = await validateSuperpowersPath(root, "spaces");
  assert.equal(result.ok, true);
});

test("accepts symlink or junction to valid Superpowers", async (t) => {
  const target = await makeFakeSuperpowers("6.1.1");
  const link = path.join(await makeTempDir(), "superpowers-link");
  try {
    await symlink(target, link, process.platform === "win32" ? "junction" : "dir");
  } catch (error) {
    t.skip(`symlink/junction unavailable: ${error instanceof Error ? error.message : String(error)}`);
    return;
  }
  const result = await validateSuperpowersPath(link, "link");
  assert.equal(result.ok, true);
  if (result.ok) assert.equal(result.path, await import("node:fs/promises").then((fs) => fs.realpath(target)));
});

test("explicit valid path wins dependency resolution", async () => {
  const root = await makeFakeSuperpowers("6.1.1");
  const result = await resolveSuperpowersDependency({
    env: { DYSLEXAI_SUPERPOWERS_PATH: root, DYSLEXAI_HOST: "codex-cli" }
  });
  assert.equal(result.ok, true);
  if (result.ok) assert.equal(result.source, "DYSLEXAI_SUPERPOWERS_PATH");
});
