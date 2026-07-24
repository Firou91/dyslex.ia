import test from "node:test";
import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

async function readJson<T>(file: string): Promise<T> {
  return JSON.parse(await readFile(file, "utf8")) as T;
}

test("Codex plugin manifest is plugin-first and version-aligned", async () => {
  const pkg = await readJson<{ version: string; license: string }>("./package.json");
  const manifest = await readJson<{
    name: string;
    version: string;
    license: string;
    skills: string;
    interface: { displayName: string; defaultPrompt: string[] };
  }>("./.codex-plugin/plugin.json");

  assert.equal(manifest.name, "dyslex-ai");
  assert.equal(manifest.version, pkg.version);
  assert.equal(manifest.license, pkg.license);
  assert.equal(manifest.skills, "./skills/");
  assert.equal(manifest.interface.displayName, "Dyslex.ai");
  assert.ok(manifest.interface.defaultPrompt.length > 0);
});

test("host adapters are plugin-first", async () => {
  const adaptersRoot = path.join(process.cwd(), "adapters");
  const hosts = await readdir(adaptersRoot, { withFileTypes: true });
  const adapterDirs = hosts.filter((entry) => entry.isDirectory());
  assert.equal(adapterDirs.length, 10);

  for (const entry of adapterDirs) {
    const adapter = await readJson<{
      host: string;
      integrationPriority: string;
      plugin?: { mode: string; skillsPath: string };
      skills?: { path: string };
      checks?: string[];
    }>(path.join(adaptersRoot, entry.name, "adapter.json"));

    assert.equal(adapter.host, entry.name);
    assert.equal(adapter.integrationPriority, "plugin-first", entry.name);
    assert.equal(adapter.plugin?.skillsPath, "skills", entry.name);
    assert.equal(adapter.skills?.path, "skills", entry.name);
    assert.ok(adapter.checks?.includes("plugin-install"), entry.name);
  }
});
