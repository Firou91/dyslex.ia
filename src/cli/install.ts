import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { HOSTS } from "../hosts/catalog.js";
import type { HostId } from "../shared/types.js";
import { resolveSuperpowersDependency } from "../dependency/superpowers.js";

export async function installHost(hostId: HostId): Promise<Record<string, unknown>> {
  const host = HOSTS.find((item) => item.id === hostId);
  if (!host) throw new Error(`Unsupported host '${hostId}'.`);
  const dependency = await resolveSuperpowersDependency();
  if (!dependency.ok) {
    return {
      ok: false,
      blocked: true,
      message: "Superpowers must be installed before dyslex.ia.",
      superpowersInstall: host.superpowersInstall
    };
  }

  await mkdir(host.adapterPath, { recursive: true });
  const manifestPath = path.join(host.adapterPath, "install-plan.json");
  await writeFile(
    manifestPath,
    `${JSON.stringify(
      {
        host: host.id,
        integrationPriority: host.integrationPriority,
        plugin: {
          mode: host.plugin.mode,
          manifest: host.plugin.manifest,
          skillsPath: "skills"
        },
        compatibilityBridge: {
          optional: true,
          protocol: "mcp",
          command: "dyslexia",
          args: ["mcp"],
          transport: "stdio",
          note: "Use only for hosts or workflows that cannot consume the skills plugin directly."
        },
        skillsPath: "skills",
        dependency: {
          superpowersPath: dependency.path,
          superpowersVersion: dependency.version
        },
        safety: {
          requiresBackupBeforeUserFileEdits: true,
          idempotent: true,
          uninstallSupported: true,
          compatibilityBridgeIsOptional: true
        }
      },
      null,
      2
    )}\n`,
    "utf8"
  );
  return { ok: true, manifestPath, host, integrationPriority: "plugin-first" };
}
