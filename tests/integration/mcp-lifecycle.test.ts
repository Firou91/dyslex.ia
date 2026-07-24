import test from "node:test";
import assert from "node:assert/strict";
import { closeMcp, collectProcess, connectMcp, makeFakeSuperpowers, spawnCli } from "./helpers.js";

test("MCP lifecycle handshakes and closes cleanly with valid Superpowers", async () => {
  const superpowers = await makeFakeSuperpowers();
  const { client, transport } = await connectMcp(superpowers);
  const tools = await client.listTools();
  assert.ok(tools.tools.some((tool) => tool.name === "dyslexai_rewrite"));
  await closeMcp(client, transport);
});

test("MCP startup without Superpowers writes only stderr and exits with code 1", async () => {
  const child = spawnCli(["mcp"], {
    DYSLEXAI_SUPERPOWERS_PATH: "Z:\\definitely\\missing\\superpowers",
    DYSLEXAI_HOST: "codex-cli"
  });
  const result = await collectProcess(child);
  assert.equal(result.code, 1);
  assert.equal(result.stdout, "");
  assert.match(result.stderr, /Startup blocked: Superpowers was not found/);
  assert.match(result.stderr, /Detected host: Codex CLI/);
  assert.doesNotMatch(result.stdout, /initialize/);
});
