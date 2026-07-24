import test from "node:test";
import assert from "node:assert/strict";
import { mkdir, symlink } from "node:fs/promises";
import path from "node:path";
import { makeFakeSuperpowers, makeTempDir } from "./helpers.js";
import { resolveSuperpowersDependency, validateSuperpowersPath } from "../../src/dependency/superpowers.js";

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
