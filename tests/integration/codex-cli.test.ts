import test from "node:test";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import path from "node:path";
import { cliPath, makeFakeSuperpowers, makeTempDir, testEnv } from "./helpers.js";

function hasCodex(): boolean {
  return spawnSync("codex", ["--version"], { encoding: "utf8", shell: process.platform === "win32" }).status === 0;
}

test("Codex CLI can add and list dyslex.ia MCP server in isolated CODEX_HOME", async (t) => {
  if (!hasCodex()) {
    t.skip("codex CLI is not installed");
    return;
  }
  const codexHome = await makeTempDir("codex-home-");
  const superpowers = await makeFakeSuperpowers("6.1.1");
  const env = testEnv({ CODEX_HOME: codexHome, HOME: codexHome, USERPROFILE: codexHome });
  const add = spawnSync(
    "codex",
    [
      "mcp",
      "add",
      "dyslex-ia-local-test",
      "--env",
      `DYSLEXIA_SUPERPOWERS_PATH=${superpowers}`,
      "--",
      process.execPath,
      cliPath,
      "mcp"
    ],
    { cwd: path.dirname(cliPath), env, encoding: "utf8", shell: process.platform === "win32" }
  );
  assert.equal(add.status, 0, add.stderr || add.stdout);
  const list = spawnSync("codex", ["mcp", "list"], { env, encoding: "utf8", shell: process.platform === "win32" });
  assert.equal(list.status, 0, list.stderr || list.stdout);
  assert.match(list.stdout, /dyslex-ia-local-test/);
});
