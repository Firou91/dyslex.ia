import { access, readFile, realpath, stat } from "node:fs/promises";
import path from "node:path";
import os from "node:os";
import semver from "semver";
import { loadConfig } from "../profiles/config.js";
import { detectHost, type HostInfo } from "../hosts/detect.js";
import { HOSTS } from "../hosts/catalog.js";
import { SUPPORTED_SUPERPOWERS_RANGE } from "../shared/version.js";

export interface SuperpowersDependency {
  ok: true;
  path: string;
  version: string;
  source: string;
  host: HostInfo;
}

export interface SuperpowersDependencyFailure {
  ok: false;
  host: HostInfo;
  reason: string;
  checked: Array<{ path: string; source: string; reason: string }>;
}

export type SuperpowersDependencyResult = SuperpowersDependency | SuperpowersDependencyFailure;

function home(...parts: string[]): string {
  return path.join(os.homedir(), ...parts);
}

async function exists(file: string): Promise<boolean> {
  try {
    await access(file);
    return true;
  } catch {
    return false;
  }
}

async function readJson(file: string): Promise<Record<string, unknown> | undefined> {
  try {
    return JSON.parse(await readFile(file, "utf8")) as Record<string, unknown>;
  } catch {
    return undefined;
  }
}

async function expandCacheRoots(root: string): Promise<string[]> {
  try {
    const fs = await import("node:fs/promises");
    const entries = await fs.readdir(root, { withFileTypes: true });
    const candidates: string[] = [];
    for (const entry of entries) {
      if (!entry.isDirectory()) continue;
      const first = path.join(root, entry.name);
      candidates.push(first);
      try {
        const nested = await fs.readdir(first, { withFileTypes: true });
        for (const child of nested) {
          if (child.isDirectory()) candidates.push(path.join(first, child.name));
        }
      } catch {
        // Ignore unreadable nested cache entries.
      }
    }
    return candidates;
  } catch {
    return [];
  }
}

export async function candidateSuperpowersPaths(cwd = process.cwd(), env: NodeJS.ProcessEnv = process.env): Promise<Array<{ path: string; source: string }>> {
  const { config } = await loadConfig(cwd);
  const explicit = env.DYSLEXIA_SUPERPOWERS_PATH;
  const codexHome = env.CODEX_HOME ?? home(".codex");
  const roots = [
    { path: explicit, source: "DYSLEXIA_SUPERPOWERS_PATH" },
    { path: config.superpowersPath, source: "dyslex.ia config" },
    { path: path.join(codexHome, "plugins", "cache"), source: "Codex plugin cache" },
    { path: path.join(codexHome, "superpowers"), source: "Codex legacy source cache" },
    { path: home(".claude", "plugins", "cache"), source: "Claude plugin cache" },
    { path: home(".cursor", "plugins"), source: "Cursor plugin cache" },
    { path: home(".opencode", "plugins"), source: "OpenCode plugin cache" },
    { path: path.join(cwd, "superpowers"), source: "project-local explicit path" }
  ].filter((candidate): candidate is { path: string; source: string } => Boolean(candidate.path));

  const expanded: Array<{ path: string; source: string }> = [];
  for (const root of roots) {
    expanded.push(root);
    expanded.push(...(await expandCacheRoots(root.path)).map((pathValue) => ({ path: pathValue, source: root.source })));
  }
  return expanded;
}

export async function validateSuperpowersPath(rawPath: string, source = "unknown"): Promise<SuperpowersDependency | { ok: false; reason: string }> {
  let resolved: string;
  try {
    resolved = await realpath(rawPath);
    const info = await stat(resolved);
    if (!info.isDirectory()) return { ok: false, reason: "Path is not a directory." };
  } catch {
    return { ok: false, reason: "Path does not exist or cannot be resolved." };
  }

  const hasBootstrapSkill = await exists(path.join(resolved, "skills", "using-superpowers", "SKILL.md"));
  const packageJson = await readJson(path.join(resolved, "package.json"));
  const claudePlugin = await readJson(path.join(resolved, ".claude-plugin", "plugin.json"));
  const codexPlugin = await readJson(path.join(resolved, ".codex-plugin", "plugin.json"));
  const hasPluginMetadata = Boolean(claudePlugin ?? codexPlugin);
  const version =
    typeof packageJson?.version === "string"
      ? packageJson.version
      : typeof claudePlugin?.version === "string"
        ? claudePlugin.version
        : typeof codexPlugin?.version === "string"
          ? codexPlugin.version
          : undefined;

  if (!hasBootstrapSkill) return { ok: false, reason: "Missing skills/using-superpowers/SKILL.md." };
  if (!hasPluginMetadata && !packageJson) return { ok: false, reason: "Missing package or plugin metadata." };
  if (!version || !semver.valid(version)) return { ok: false, reason: "No valid Superpowers version found." };
  if (!semver.satisfies(version, SUPPORTED_SUPERPOWERS_RANGE)) {
    return { ok: false, reason: `Version ${version} is outside supported range ${SUPPORTED_SUPERPOWERS_RANGE}.` };
  }
  return { ok: true, path: resolved, version, source, host: detectHost() };
}

export async function resolveSuperpowersDependency(options: { cwd?: string; env?: NodeJS.ProcessEnv } = {}): Promise<SuperpowersDependencyResult> {
  const host = detectHost(options.env);
  const checked: SuperpowersDependencyFailure["checked"] = [];
  for (const candidate of await candidateSuperpowersPaths(options.cwd, options.env)) {
    const result = await validateSuperpowersPath(candidate.path, candidate.source);
    if (result.ok) return { ...result, host };
    checked.push({ ...candidate, reason: result.reason });
  }
  return { ok: false, host, reason: "Superpowers was not found.", checked };
}

export function formatStartupBlocked(result: SuperpowersDependencyFailure): string {
  const hostDoc = HOSTS.find((host) => host.id === result.host.id);
  const resolution = hostDoc?.superpowersInstall ?? "Install Superpowers for the active host, then restart the agent.";
  return [
    "[dyslex.ia] Startup blocked: Superpowers was not found.",
    "",
    "dyslex.ia extends Superpowers and cannot run independently.",
    "",
    `Detected host: ${result.host.label}`,
    "Expected dependency: obra/superpowers",
    "Resolution:",
    `  1. ${resolution}`,
    "  2. Restart the agent.",
    "  3. Run: dyslexia doctor",
    "",
    "Documentation: docs/installation/README.md"
  ].join("\n");
}
