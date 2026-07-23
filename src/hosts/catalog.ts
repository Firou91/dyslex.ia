import type { HostId } from "../shared/types.js";

export interface HostCompatibility {
  id: HostId;
  displayName: string;
  mcp: "stdio" | "configuration" | "not-native";
  skills: "native" | "plugin" | "instructions-file" | "package" | "unknown";
  adapterPath: string;
  superpowersInstall: string;
  dyslexiaInstall: string;
}

export const HOSTS: HostCompatibility[] = [
  {
    id: "claude-code",
    displayName: "Claude Code",
    mcp: "configuration",
    skills: "plugin",
    adapterPath: "adapters/claude-code",
    superpowersInstall: "/plugin install superpowers@claude-plugins-official",
    dyslexiaInstall: "dyslexia install --host claude-code"
  },
  {
    id: "antigravity",
    displayName: "Antigravity",
    mcp: "configuration",
    skills: "plugin",
    adapterPath: "adapters/antigravity",
    superpowersInstall: "agy plugin install https://github.com/obra/superpowers",
    dyslexiaInstall: "dyslexia install --host antigravity"
  },
  {
    id: "codex-app",
    displayName: "Codex App",
    mcp: "configuration",
    skills: "plugin",
    adapterPath: "adapters/codex-app",
    superpowersInstall: "Install Superpowers from the official Codex plugin marketplace.",
    dyslexiaInstall: "dyslexia install --host codex-app"
  },
  {
    id: "codex-cli",
    displayName: "Codex CLI",
    mcp: "configuration",
    skills: "plugin",
    adapterPath: "adapters/codex-cli",
    superpowersInstall: "Open /plugins, search for Superpowers, then install it.",
    dyslexiaInstall: "dyslexia install --host codex-cli"
  },
  {
    id: "cursor",
    displayName: "Cursor",
    mcp: "configuration",
    skills: "plugin",
    adapterPath: "adapters/cursor",
    superpowersInstall: "/add-plugin superpowers",
    dyslexiaInstall: "dyslexia install --host cursor"
  },
  {
    id: "factory-droid",
    displayName: "Factory Droid",
    mcp: "configuration",
    skills: "plugin",
    adapterPath: "adapters/factory-droid",
    superpowersInstall: "droid plugin marketplace add https://github.com/obra/superpowers && droid plugin install superpowers@superpowers",
    dyslexiaInstall: "dyslexia install --host factory-droid"
  },
  {
    id: "copilot-cli",
    displayName: "GitHub Copilot CLI",
    mcp: "configuration",
    skills: "plugin",
    adapterPath: "adapters/copilot-cli",
    superpowersInstall: "copilot plugin marketplace add obra/superpowers-marketplace && copilot plugin install superpowers@superpowers-marketplace",
    dyslexiaInstall: "dyslexia install --host copilot-cli"
  },
  {
    id: "kimi-code",
    displayName: "Kimi Code",
    mcp: "configuration",
    skills: "plugin",
    adapterPath: "adapters/kimi-code",
    superpowersInstall: "/plugins install https://github.com/obra/superpowers",
    dyslexiaInstall: "dyslexia install --host kimi-code"
  },
  {
    id: "opencode",
    displayName: "OpenCode",
    mcp: "configuration",
    skills: "instructions-file",
    adapterPath: "adapters/opencode",
    superpowersInstall: "Follow https://raw.githubusercontent.com/obra/superpowers/refs/heads/main/.opencode/INSTALL.md",
    dyslexiaInstall: "dyslexia install --host opencode"
  },
  {
    id: "pi",
    displayName: "Pi",
    mcp: "configuration",
    skills: "package",
    adapterPath: "adapters/pi",
    superpowersInstall: "pi install git:github.com/obra/superpowers",
    dyslexiaInstall: "dyslexia install --host pi"
  }
];
