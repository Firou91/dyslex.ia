#!/usr/bin/env node
import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const skillsDir = path.join(root, "skills");
const namePattern = /^[a-z0-9-]{1,64}$/;

function fail(message) {
  console.error(`[dyslex.ia] skills validation failed: ${message}`);
  process.exitCode = 1;
}

function parseFrontmatter(text, file) {
  if (!text.startsWith("---\n")) {
    fail(`${file} is missing YAML frontmatter`);
    return {};
  }
  const end = text.indexOf("\n---\n", 4);
  if (end === -1) {
    fail(`${file} has unterminated YAML frontmatter`);
    return {};
  }
  const frontmatter = text.slice(4, end);
  const fields = {};
  for (const line of frontmatter.split(/\r?\n/)) {
    const match = line.match(/^([a-zA-Z0-9_-]+):\s*(.*)$/);
    if (match) fields[match[1]] = match[2].replace(/^["']|["']$/g, "");
  }
  return fields;
}

const entries = await readdir(skillsDir);
let count = 0;
for (const entry of entries.sort()) {
  const dir = path.join(skillsDir, entry);
  if (!(await stat(dir)).isDirectory()) continue;
  count += 1;
  if (!namePattern.test(entry)) fail(`${entry} is not kebab-case`);
  const skillFile = path.join(dir, "SKILL.md");
  const text = await readFile(skillFile, "utf8").catch((error) => {
    fail(`${entry}/SKILL.md cannot be read: ${error.message}`);
    return "";
  });
  const fields = parseFrontmatter(text, `${entry}/SKILL.md`);
  if (fields.name !== entry) fail(`${entry}/SKILL.md name '${fields.name}' does not match folder`);
  if (!fields.description || fields.description.length < 40) fail(`${entry}/SKILL.md description is missing or too short`);
  const uiFile = path.join(dir, "agents", "openai.yaml");
  const ui = await readFile(uiFile, "utf8").catch((error) => {
    fail(`${entry}/agents/openai.yaml cannot be read: ${error.message}`);
    return "";
  });
  if (!ui.includes(`Use $${entry}`)) fail(`${entry}/agents/openai.yaml default_prompt must mention $${entry}`);
}

if (count !== 16) fail(`expected 16 skills, found ${count}`);

if (process.exitCode) process.exit(process.exitCode);
console.log(`[dyslex.ia] validated ${count} skills`);
