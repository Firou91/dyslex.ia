import os from "node:os";
import type { HostId } from "../shared/types.js";

export interface HostInfo {
  id: HostId;
  label: string;
  platform: NodeJS.Platform;
}

export function detectHost(env: NodeJS.ProcessEnv = process.env): HostInfo {
  const explicit = env.DYSLEXAI_HOST as HostId | undefined;
  if (explicit) return toHostInfo(explicit);
  if (env.CODEX_HOME || env.CODEX_SANDBOX || env.OPENAI_CODEX) return toHostInfo("codex-cli");
  if (env.CLAUDECODE || env.CLAUDE_CODE) return toHostInfo("claude-code");
  if (env.CURSOR_TRACE_ID || env.CURSOR_AGENT) return toHostInfo("cursor");
  if (env.OPENCODE_SESSION || env.OPENCODE) return toHostInfo("opencode");
  if (env.KIMI_CODE) return toHostInfo("kimi-code");
  if (env.ANTIGRAVITY_HOME) return toHostInfo("antigravity");
  if (env.PI_HOME) return toHostInfo("pi");
  return toHostInfo("unknown");
}

export function toHostInfo(id: HostId): HostInfo {
  const labels: Record<HostId, string> = {
    "claude-code": "Claude Code",
    antigravity: "Antigravity",
    "codex-app": "Codex App",
    "codex-cli": "Codex CLI",
    cursor: "Cursor",
    "factory-droid": "Factory Droid",
    "copilot-cli": "GitHub Copilot CLI",
    "kimi-code": "Kimi Code",
    opencode: "OpenCode",
    pi: "Pi",
    unknown: "Unknown host"
  };
  return { id, label: labels[id], platform: os.platform() };
}
