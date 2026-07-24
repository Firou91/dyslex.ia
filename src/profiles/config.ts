import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import envPaths from "env-paths";
import { z } from "zod";
import { DEFAULT_PROFILES, getDefaultProfile } from "./defaults.js";
import type { DyslexAIProfile, NamedProfile, ProfileName } from "../shared/types.js";

const profileSchema = z.object({
  language: z.string().min(2),
  maxSentenceLength: z.number().int().positive().optional(),
  preferredChunkSize: z.enum(["small", "medium", "large"]).optional(),
  headingDensity: z.enum(["low", "medium", "high"]).optional(),
  listPreference: z.enum(["minimal", "when-useful", "frequent"]).optional(),
  correctionMode: z.enum(["silent", "show-differences", "explain", "ask-when-ambiguous"]).optional(),
  acronymExpansion: z.boolean().optional(),
  ambiguityWarnings: z.boolean().optional(),
  technicalTokenProtection: z.boolean().optional(),
  explicitExpectedResults: z.boolean().optional(),
  repeatCriticalContext: z.boolean().optional(),
  forcedChoiceWhenRequested: z.boolean().optional()
}).strict();

const configSchema = z.object({
  activeProfile: z.enum(["minimal", "balanced", "guided", "custom"]).default("balanced"),
  customProfile: profileSchema.optional(),
  superpowersPath: z.string().optional()
}).strict();

export type DyslexAIConfig = z.infer<typeof configSchema>;

export function getUserConfigPath(): string {
  return path.join(envPaths("dyslex.ai", { suffix: "" }).config, "config.json");
}

export function getProjectConfigPath(cwd = process.cwd()): string {
  return path.join(cwd, ".dyslex.ai", "config.json");
}

async function readJson(file: string): Promise<unknown | undefined> {
  try {
    return JSON.parse(await readFile(file, "utf8"));
  } catch (error) {
    const code = (error as NodeJS.ErrnoException).code;
    if (code === "ENOENT") return undefined;
    throw error;
  }
}

export async function loadConfig(cwd = process.cwd()): Promise<{ config: DyslexAIConfig; sources: string[] }> {
  const sources: string[] = [];
  const userRaw = await readJson(getUserConfigPath());
  const projectRaw = await readJson(getProjectConfigPath(cwd));
  const user = userRaw ? configSchema.parse(userRaw) : {};
  if (userRaw) sources.push(getUserConfigPath());
  const project = projectRaw ? configSchema.parse(projectRaw) : {};
  if (projectRaw) sources.push(getProjectConfigPath(cwd));
  return {
    config: configSchema.parse({ activeProfile: "balanced", ...user, ...project }),
    sources
  };
}

export async function saveUserConfig(config: DyslexAIConfig): Promise<string> {
  const file = getUserConfigPath();
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, `${JSON.stringify(configSchema.parse(config), null, 2)}\n`, "utf8");
  return file;
}

export async function resolveProfile(callProfile?: Partial<DyslexAIProfile>, cwd = process.cwd()): Promise<NamedProfile> {
  const { config, sources } = await loadConfig(cwd);
  const name = config.activeProfile as ProfileName;
  const base = name === "custom" && config.customProfile ? config.customProfile : DEFAULT_PROFILES[name];
  return {
    name,
    profile: profileSchema.parse({ ...base, ...callProfile }),
    origin: callProfile ? "call" : sources.length > 0 ? "project" : "default"
  };
}

export async function setActiveProfile(profile: ProfileName): Promise<string> {
  const { config } = await loadConfig();
  return saveUserConfig({ ...config, activeProfile: profile });
}

export function parseProfileName(value: string): ProfileName {
  if (value in DEFAULT_PROFILES) return value as ProfileName;
  throw new Error(`Unknown profile '${value}'. Expected: minimal, balanced, guided, custom.`);
}

export { profileSchema, configSchema, getDefaultProfile };
