#!/usr/bin/env node
import { readFile } from "node:fs/promises";
import { runDoctor } from "./doctor.js";
import { installHost } from "./install.js";
import { startStdioServer } from "../server/mcp.js";
import { parseProfileName, setActiveProfile, loadConfig, saveUserConfig } from "../profiles/config.js";
import { resolveSuperpowersDependency } from "../dependency/superpowers.js";
import { HOSTS } from "../hosts/catalog.js";
import type { HostId } from "../shared/types.js";

function print(value: unknown): void {
  process.stdout.write(`${typeof value === "string" ? value : JSON.stringify(value, null, 2)}\n`);
}

async function main(argv: string[]): Promise<void> {
  const [command, subcommand, ...rest] = argv;
  if (!command || command === "help" || command === "--help") {
    print("Usage: dyslexia <doctor|dependency|compatibility|config|profile|install|uninstall|update|mcp>");
    return;
  }

  if (command === "mcp" || command === "server") {
    await startStdioServer();
    return;
  }

  if (command === "doctor") {
    print(await runDoctor(subcommand === "--verbose" || rest.includes("--verbose")));
    return;
  }

  if (command === "dependency") {
    const dependency = await resolveSuperpowersDependency();
    if (subcommand === "path") print(dependency.ok ? dependency.path : "");
    else print(dependency);
    return;
  }

  if (command === "compatibility") {
    print({ hosts: HOSTS, superpowers: await resolveSuperpowersDependency() });
    return;
  }

  if (command === "config") {
    if (subcommand === "show") print(await loadConfig());
    else if (subcommand === "reset") print({ file: await saveUserConfig({ activeProfile: "balanced" }) });
    else if (subcommand === "edit") print("Edit the user config file shown by `dyslexia config show`.");
    else throw new Error("Expected: dyslexia config show|edit|reset");
    return;
  }

  if (command === "profile") {
    if (subcommand === "set") print({ file: await setActiveProfile(parseProfileName(rest[0] ?? "")) });
    else if (subcommand === "export") print((await loadConfig()).config);
    else if (subcommand === "import") {
      const file = rest[0];
      if (!file) throw new Error("Expected: dyslexia profile import <file>");
      print({ file: await saveUserConfig(JSON.parse(await readFile(file, "utf8"))) });
    } else throw new Error("Expected: dyslexia profile set|export|import");
    return;
  }

  if (command === "install") {
    const host = subcommand === "--host" ? rest[0] : subcommand;
    print(await installHost((host ?? "codex-cli") as HostId));
    return;
  }

  if (command === "uninstall") {
    print({ ok: true, dryRun: true, message: "Remove the plugin install plan and optional compatibility bridge entry for the selected host after backing up user files." });
    return;
  }

  if (command === "update") {
    print({ ok: true, dryRun: true, message: "Re-run dyslexia install --host <host> after updating the package." });
    return;
  }

  throw new Error(`Unknown command '${command}'.`);
}

main(process.argv.slice(2)).catch((error: unknown) => {
  process.stderr.write(`[dyslex.ia] ${error instanceof Error ? error.message : String(error)}\n`);
  process.exitCode = 1;
});
