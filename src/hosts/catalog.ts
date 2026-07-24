import type { HostId } from "../shared/types.js";

export interface HostCompatibility {
  id: HostId;
  displayName: string;
  integrationPriority: "plugin-first";
  plugin: {
    mode: "plugin" | "instructions-file" | "package";
    manifest: string;
  };
  skills: "native" | "plugin" | "instructions-file" | "package" | "unknown";
  adapterPath: string;
  superpowersInstall: string;
  dyslexaiInstall: string;
}

export const HOSTS: HostCompatibility[] = [
  {
    id: "claude-code",
    displayName: "Claude Code",
    integrationPriority: "plugin-first",
    plugin: { mode: "plugin", manifest: ".codex-plugin/plugin.json" },
    skills: "plugin",
    adapterPath: "adapters/claude-code",
    superpowersInstall: "/plugin install superpowers@claude-plugins-official",
    dyslexaiInstall: "dyslexai install --host claude-code"
  },
  {
    id: "antigravity",
    displayName: "Antigravity",
    integrationPriority: "plugin-first",
    plugin: { mode: "plugin", manifest: ".codex-plugin/plugin.json" },
    skills: "plugin",
    adapterPath: "adapters/antigravity",
    superpowersInstall: "agy plugin install https://github.com/obra/superpowers",
    dyslexaiInstall: "dyslexai install --host antigravity"
  },
  {
    id: "codex-app",
    displayName: "Codex App",
    integrationPriority: "plugin-first",
    plugin: { mode: "plugin", manifest: ".codex-plugin/plugin.json" },
    skills: "plugin",
    adapterPath: "adapters/codex-app",
    superpowersInstall: "Install Superpowers from the official Codex plugin marketplace.",
    dyslexaiInstall: "dyslexai install --host codex-app"
  },
  {
    id: "codex-cli",
    displayName: "Codex CLI",
    integrationPriority: "plugin-first",
    plugin: { mode: "plugin", manifest: ".codex-plugin/plugin.json" },
    skills: "plugin",
    adapterPath: "adapters/codex-cli",
    superpowersInstall: "Open /plugins, search for Superpowers, then install it.",
    dyslexaiInstall: "dyslexai install --host codex-cli"
  },
  {
    id: "cursor",
    displayName: "Cursor",
    integrationPriority: "plugin-first",
    plugin: { mode: "plugin", manifest: ".codex-plugin/plugin.json" },
    skills: "plugin",
    adapterPath: "adapters/cursor",
    superpowersInstall: "/add-plugin superpowers",
    dyslexaiInstall: "dyslexai install --host cursor"
  },
  {
    id: "factory-droid",
    displayName: "Factory Droid",
    integrationPriority: "plugin-first",
    plugin: { mode: "plugin", manifest: ".codex-plugin/plugin.json" },
    skills: "plugin",
    adapterPath: "adapters/factory-droid",
    superpowersInstall: "droid plugin marketplace add https://github.com/obra/superpowers && droid plugin install superpowers@superpowers",
    dyslexaiInstall: "dyslexai install --host factory-droid"
  },
  {
    id: "copilot-cli",
    displayName: "GitHub Copilot CLI",
    integrationPriority: "plugin-first",
    plugin: { mode: "plugin", manifest: ".codex-plugin/plugin.json" },
    skills: "plugin",
    adapterPath: "adapters/copilot-cli",
    superpowersInstall: "copilot plugin marketplace add obra/superpowers-marketplace && copilot plugin install superpowers@superpowers-marketplace",
    dyslexaiInstall: "dyslexai install --host copilot-cli"
  },
  {
    id: "kimi-code",
    displayName: "Kimi Code",
    integrationPriority: "plugin-first",
    plugin: { mode: "plugin", manifest: ".codex-plugin/plugin.json" },
    skills: "plugin",
    adapterPath: "adapters/kimi-code",
    superpowersInstall: "/plugins install https://github.com/obra/superpowers",
    dyslexaiInstall: "dyslexai install --host kimi-code"
  },
  {
    id: "opencode",
    displayName: "OpenCode",
    integrationPriority: "plugin-first",
    plugin: { mode: "instructions-file", manifest: ".opencode/INSTALL.md" },
    skills: "instructions-file",
    adapterPath: "adapters/opencode",
    superpowersInstall: "Follow https://raw.githubusercontent.com/obra/superpowers/refs/heads/main/.opencode/INSTALL.md",
    dyslexaiInstall: "dyslexai install --host opencode"
  },
  {
    id: "pi",
    displayName: "Pi",
    integrationPriority: "plugin-first",
    plugin: { mode: "package", manifest: ".pi" },
    skills: "package",
    adapterPath: "adapters/pi",
    superpowersInstall: "pi install git:github.com/obra/superpowers",
    dyslexaiInstall: "dyslexai install --host pi"
  }
];
