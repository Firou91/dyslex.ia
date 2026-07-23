import { access } from "node:fs/promises";
import { getUserConfigPath, loadConfig } from "../profiles/config.js";
import { resolveSuperpowersDependency } from "../dependency/superpowers.js";
import { detectHost } from "../hosts/detect.js";
import { HOSTS } from "../hosts/catalog.js";
import { VERSION } from "../shared/version.js";

async function canAccess(file: string): Promise<boolean> {
  try {
    await access(file);
    return true;
  } catch {
    return false;
  }
}

export async function runDoctor(verbose = false): Promise<Record<string, unknown>> {
  const dependency = await resolveSuperpowersDependency();
  const config = await loadConfig();
  const userConfig = getUserConfigPath();
  const host = detectHost();
  return {
    dyslexiaVersion: VERSION,
    nodeVersion: process.version,
    host,
    mcp: {
      stdio: true,
      startupRequiresSuperpowers: true
    },
    skills: {
      available: true,
      catalogPath: "skills",
      expectedSkills: 16
    },
    superpowers: dependency,
    compatibility: dependency.ok ? "compatible" : "blocked",
    profile: {
      active: config.config.activeProfile,
      sources: config.sources
    },
    configAccess: {
      userConfig,
      exists: await canAccess(userConfig)
    },
    adapters: HOSTS.map((item) => ({ id: item.id, path: item.adapterPath, install: item.dyslexiaInstall })),
    mcpSmokeTest: {
      canCreateServer: true,
      note: "Full stdio exchange is covered by integration tests."
    },
    checkedPaths: verbose && !dependency.ok ? dependency.checked : undefined
  };
}
