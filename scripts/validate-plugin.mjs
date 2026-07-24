import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const manifestPath = path.join(root, ".codex-plugin", "plugin.json");
const packagePath = path.join(root, "package.json");
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

function validateSquarePng(reference, label) {
  if (typeof reference !== "string" || reference.trim() === "") {
    errors.push(`${label} is required`);
    return;
  }
  if (!reference.startsWith("./")) {
    errors.push(`${label} must be a ./-prefixed plugin-relative path`);
    return;
  }
  const file = path.join(root, reference);
  if (!existsSync(file)) {
    errors.push(`${label} must reference an existing image`);
    return;
  }
  const buffer = readFileSync(file);
  const isPng =
    buffer.length >= 24 &&
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47;
  if (!isPng) {
    errors.push(`${label} must reference a PNG image`);
    return;
  }
  const width = buffer.readUInt32BE(16);
  const height = buffer.readUInt32BE(20);
  if (width !== height) errors.push(`${label} must reference a square image`);
}

const manifest = readJson(manifestPath);
const pkg = readJson(packagePath);

if (manifest) {
  requireString(manifest, "name", ".codex-plugin/plugin.json");
  requireString(manifest, "version", ".codex-plugin/plugin.json");
  requireString(manifest, "description", ".codex-plugin/plugin.json");
  assert(manifest.name === "dyslex-ai", "plugin name must be dyslex-ai");
  assert(manifest.version === pkg?.version, "plugin version must match package.json version");
  assert(manifest.skills === "./skills/", "plugin skills path must be ./skills/");
  assert(manifest.license === "Apache-2.0", "plugin license must be Apache-2.0");
  assert(typeof manifest.author?.name === "string", "plugin author.name is required");
  assert(typeof manifest.interface?.displayName === "string", "plugin interface.displayName is required");
  validateSquarePng(manifest.interface?.composerIcon, "plugin interface.composerIcon");
  validateSquarePng(manifest.interface?.logo, "plugin interface.logo");
  assert(Array.isArray(manifest.interface?.capabilities), "plugin interface.capabilities must be an array");
  assert(
    Array.isArray(manifest.interface?.defaultPrompt) && manifest.interface.defaultPrompt.length > 0,
    "plugin interface.defaultPrompt must contain at least one prompt"
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
      Array.isArray(adapter.checks) && adapter.checks.includes("plugin-install"),
      `${entry.name} adapter checks must include plugin-install`
    );
  }
}

if (errors.length > 0) {
  console.error("[dyslex.ai] plugin validation failed");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("[dyslex.ai] plugin manifest and adapters validated");
