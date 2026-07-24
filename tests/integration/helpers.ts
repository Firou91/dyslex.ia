import { spawn, type ChildProcess } from "node:child_process";
import { mkdir, mkdtemp, readFile, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

export const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");
export const cliPath = path.join(repoRoot, "dist", "src", "cli", "index.js");

export async function makeTempDir(prefix = "dyslexai-test-"): Promise<string> {
  return mkdtemp(path.join(os.tmpdir(), prefix));
}

export async function makeFakeSuperpowers(version = "6.1.1", parent?: string): Promise<string> {
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

export function testEnv(extra: Record<string, string> = {}): Record<string, string> {
  const env: Record<string, string> = {};
  for (const [key, value] of Object.entries(process.env)) {
    const normalized = key.toLowerCase();
    if (normalized.startsWith("npm_")) continue;
    if (value !== undefined) env[key] = value;
  }
  return {
    ...env,
    ...extra
  };
}

export async function connectMcp(superpowersPath: string): Promise<{ client: Client; transport: StdioClientTransport }> {
  const configRoot = await makeTempDir("dyslexai-config-");
  const transport = new StdioClientTransport({
    command: process.execPath,
    args: [cliPath, "mcp"],
    env: testEnv({
      DYSLEXAI_SUPERPOWERS_PATH: superpowersPath,
      DYSLEXAI_HOST: "codex-cli",
      APPDATA: configRoot,
      XDG_CONFIG_HOME: configRoot
    }),
    stderr: "pipe"
  });
  const client = new Client({ name: "dyslexai-integration-test", version: "0.0.0" }, { capabilities: {} });
  await client.connect(transport);
  return { client, transport };
}

export async function closeMcp(client: Client, transport: StdioClientTransport): Promise<void> {
  await client.close();
  await transport.close();
}

export function spawnCli(args: string[], env: Record<string, string> = {}): ChildProcess {
  return spawn(process.execPath, [cliPath, ...args], {
    cwd: repoRoot,
    env: testEnv(env),
    stdio: ["pipe", "pipe", "pipe"]
  });
}

export async function collectProcess(child: ChildProcess, input?: string): Promise<{ code: number | null; stdout: string; stderr: string }> {
  let stdout = "";
  let stderr = "";
  child.stdout?.setEncoding("utf8");
  child.stderr?.setEncoding("utf8");
  child.stdout?.on("data", (chunk) => {
    stdout += chunk;
  });
  child.stderr?.on("data", (chunk) => {
    stderr += chunk;
  });
  if (input !== undefined) child.stdin?.end(input);
  else child.stdin?.end();
  const code = await new Promise<number | null>((resolve) => {
    child.on("close", resolve);
  });
  return { code, stdout, stderr };
}

export async function readJsonFile<T>(file: string): Promise<T> {
  return JSON.parse(await readFile(file, "utf8")) as T;
}
