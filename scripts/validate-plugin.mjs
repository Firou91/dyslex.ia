import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const manifestPath = path.join(root, ".codex-plugin", "plugin.json");
const packagePath = path.join(root, "package.json");
const serverPath = path.join(root, "server.json");
const skillsRoot = path.join(root, "skills");
const adaptersRoot = path.join(root, "adapters");

const errors = [];

function readJson(file) {
  try {
    return JSON.parse(readFileSync(file, "utf8"));
  } catch (error) {
    errors.push(`${path.relative(root, file)} must be valid JSON: ${error.message}`);
    return undefined;
  }
}

function requireString(object, field, label) {
  if (typeof object?.[field] !== "string" || object[field].trim() === "") {
    errors.push(`${label}.${field} must be a non-empty string`);
  }
}

function assert(condition, message) {
  if (!condition) errors.push(message);
}

const manifest = readJson(manifestPath);
const pkg = readJson(packagePath);
const server = readJson(serverPath);

if (manifest) {
  requireString(manifest, "name", ".codex-plugin/plugin.json");
  requireString(manifest, "version", ".codex-plugin/plugin.json");
  requireString(manifest, "description", ".codex-plugin/plugin.json");
  assert(manifest.name === "dyslex-ia", "plugin name must be dyslex-ia");
  assert(manifest.version === pkg?.version, "plugin version must match package.json version");
  assert(manifest.skills === "./skills/", "plugin skills path must be ./skills/");
  assert(manifest.license === "Apache-2.0", "plugin license must be Apache-2.0");
  assert(typeof manifest.author?.name === "string", "plugin author.name is required");
  assert(typeof manifest.interface?.displayName === "string", "plugin interface.displayName is required");
  assert(Array.isArray(manifest.interface?.capabilities), "plugin interface.capabilities must be an array");
  assert(
    Array.isArray(manifest.interface?.defaultPrompt) && manifest.interface.defaultPrompt.length > 0,
    "plugin interface.defaultPrompt must contain at least one prompt"
  );
}

if (pkg && server) {
  assert(pkg.version === server.version, "server.json version must match package.json version");
  assert(
    pkg.version === server.packages?.[0]?.version,
    "server.json packages[0].version must match package.json version"
  );
}

if (!existsSync(skillsRoot)) {
  errors.push("skills directory is required");
} else {
  const skillDirs = readdirSync(skillsRoot, { withFileTypes: true }).filter((entry) => entry.isDirectory());
  assert(skillDirs.length === 16, `expected 16 skills, found ${skillDirs.length}`);
  for (const entry of skillDirs) {
    const skillFile = path.join(skillsRoot, entry.name, "SKILL.md");
    assert(existsSync(skillFile), `skill ${entry.name} is missing SKILL.md`);
  }
}

if (!existsSync(adaptersRoot)) {
  errors.push("adapters directory is required");
} else {
  for (const entry of readdirSync(adaptersRoot, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const adapterPath = path.join(adaptersRoot, entry.name, "adapter.json");
    const adapter = readJson(adapterPath);
    if (!adapter) continue;
    assert(adapter.integrationPriority === "plugin-first", `${entry.name} adapter must be plugin-first`);
    assert(adapter.plugin && typeof adapter.plugin === "object", `${entry.name} adapter must declare plugin`);
    assert(adapter.skills && typeof adapter.skills === "object", `${entry.name} adapter must declare skills`);
    assert(
      adapter.mcpCompatibility?.optional === true,
      `${entry.name} adapter must keep MCP only as optional compatibility`
    );
    assert(
      Array.isArray(adapter.checks) && adapter.checks.includes("plugin-install"),
      `${entry.name} adapter checks must include plugin-install`
    );
  }
}

if (errors.length > 0) {
  console.error("[dyslex.ia] plugin validation failed");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("[dyslex.ia] plugin manifest and adapters validated");
