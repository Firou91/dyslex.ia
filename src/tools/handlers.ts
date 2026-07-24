import { inspect } from "node:util";
import { loadConfig, saveUserConfig, resolveProfile, profileSchema, configSchema } from "../profiles/config.js";
import { assertSize, TEXT_LIMITS } from "../shared/limits.js";
import { compareTexts, rewriteText } from "../readability/rewriter.js";
import { detectAmbiguities, explainDiff, structureInstructions, summarizeTerminal } from "../readability/structure.js";
import { resolveSuperpowersDependency } from "../dependency/superpowers.js";
import {
  compareInputSchema,
  explainInputSchema,
  profileUpdateSchema,
  rewriteInputSchema,
  textInputSchema
} from "./schemas.js";

export interface ToolCallResult {
  content: Array<{ type: "text"; text: string }>;
  structuredContent?: Record<string, unknown>;
  isError?: boolean;
}

function result(data: Record<string, unknown>, message = "OK"): ToolCallResult {
  return {
    content: [{ type: "text", text: JSON.stringify({ message, ...data }, null, 2) }],
    structuredContent: { message, ...data }
  };
}

function userError(message: string): ToolCallResult {
  return {
    content: [{ type: "text", text: message }],
    structuredContent: { ok: false, kind: "user-error", message },
    isError: true
  };
}

function assertNoArgs(rawArgs: unknown, toolName: string): void {
  if (rawArgs && typeof rawArgs === "object" && Object.keys(rawArgs as Record<string, unknown>).length > 0) {
    throw new Error(`${toolName} does not accept input arguments.`);
  }
}

function explain(text: string, kind: string): Record<string, unknown> {
  const original = kind === "error" ? text : undefined;
  return {
    "Original error": original,
    "What this is": kind,
    "Plain explanation": text.split(/\r?\n/).find(Boolean) ?? "No content supplied.",
    "Facts": ["Only the supplied content was analyzed."],
    "Hypotheses": ["Any cause must be verified against surrounding logs, code, or command context."],
    "Next check": "Inspect the closest file path, command, or stack frame mentioned in the content."
  };
}

export async function callDyslexiaTool(name: string, rawArgs: unknown): Promise<ToolCallResult> {
  try {
    switch (name) {
      case "dyslexia_profile_get": {
        assertNoArgs(rawArgs, name);
        const profile = await resolveProfile();
        const config = await loadConfig();
        return result({ ok: true, profile, configSources: config.sources });
      }
      case "dyslexia_profile_update": {
        const args = profileUpdateSchema.parse(rawArgs ?? {});
        const current = (await loadConfig()).config;
        const next = configSchema.parse({
          ...current,
          ...args,
          customProfile: args.customProfile ? profileSchema.parse(args.customProfile) : current.customProfile
        });
        const file = await saveUserConfig(next);
        return result({ ok: true, file, config: next }, "Profile updated.");
      }
      case "dyslexia_rewrite": {
        const args = rewriteInputSchema.parse(rawArgs);
        assertSize("text", args.text);
        const active = await resolveProfile(args.language ? { language: args.language } : undefined);
        const rewritten = rewriteText(args.text, args.mode, active.profile, {
          preserveTechnicalTokens: args.preserveTechnicalTokens,
          preserveTone: args.preserveTone,
          showChanges: args.showChanges
        });
        return result({ ok: true, profile: active.name, ...rewritten, diff: args.showChanges ? compareTexts(args.text, rewritten.text) : undefined });
      }
      case "dyslexia_explain": {
        const args = explainInputSchema.parse(rawArgs);
        assertSize("text", args.text);
        return result({ ok: true, explanation: explain(args.text, args.kind) });
      }
      case "dyslexia_structure_instructions": {
        const args = textInputSchema.parse(rawArgs);
        assertSize("text", args.text);
        return result({ ok: true, structure: structureInstructions(args.text) });
      }
      case "dyslexia_summarize_terminal": {
        const args = textInputSchema.parse(rawArgs);
        assertSize("text", args.text, TEXT_LIMITS.terminalMaxChars);
        return result({ ok: true, summary: summarizeTerminal(args.text) });
      }
      case "dyslexia_explain_diff": {
        const args = textInputSchema.parse(rawArgs);
        assertSize("text", args.text, TEXT_LIMITS.diffMaxChars);
        return result({ ok: true, diff: explainDiff(args.text) });
      }
      case "dyslexia_check_ambiguity": {
        const args = textInputSchema.parse(rawArgs);
        assertSize("text", args.text);
        return result({ ok: true, ambiguities: detectAmbiguities(args.text) });
      }
      case "dyslexia_compare_versions": {
        const args = compareInputSchema.parse(rawArgs);
        assertSize("original", args.original);
        assertSize("revised", args.revised);
        return result({ ok: true, diff: compareTexts(args.original, args.revised) });
      }
      case "dyslexia_resume_context": {
        const args = textInputSchema.parse(rawArgs);
        assertSize("text", args.text);
        return result({
          ok: true,
          reentry: {
            "Where we are": args.text.split(/\r?\n/).find(Boolean) ?? "Context supplied but no first line found.",
            "Already decided": "Use only decisions present in the supplied context.",
            "Completed": "Extract from explicit completed items in the supplied context.",
            "Remaining": "Extract from explicit todo, failing, or pending items.",
            "Next single action": "Identify and perform the smallest unblocked verification or edit.",
            "Do not forget": detectAmbiguities(args.text)
          }
        });
      }
      case "dyslexia_doctor": {
        assertNoArgs(rawArgs, name);
        const dependency = await resolveSuperpowersDependency();
        return result({
          ok: dependency.ok,
          node: process.version,
          dependency,
          plugin: { manifestPath: ".codex-plugin/plugin.json", skillsPath: "skills", installMode: "plugin-first" },
          compatibilityBridge: {
            protocol: "mcp",
            transport: "stdio",
            optional: true,
            serverBlockedWithoutSuperpowers: true
          },
          skills: { catalogPath: "skills", requiredCount: 16 }
        });
      }
      default:
        return userError(`Unknown dyslex.ia tool '${name}'.`);
    }
  } catch (error) {
    return userError(error instanceof Error ? error.message : inspect(error));
  }
}
