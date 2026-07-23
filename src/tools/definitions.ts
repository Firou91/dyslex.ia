import { zodToJsonSchema } from "zod-to-json-schema";
import {
  compareInputSchema,
  explainInputSchema,
  profileUpdateSchema,
  rewriteInputSchema,
  textInputSchema
} from "./schemas.js";

export interface ToolDefinition {
  name: string;
  title: string;
  description: string;
  inputSchema: Record<string, unknown>;
}

const emptySchema = { type: "object", additionalProperties: false };

export const TOOL_DEFINITIONS: ToolDefinition[] = [
  {
    name: "dyslexia_profile_get",
    title: "Get Dyslexia Profile",
    description: "Return the active dyslex.ia accessibility profile and its source. Does not infer medical information.",
    inputSchema: emptySchema
  },
  {
    name: "dyslexia_profile_update",
    title: "Update Dyslexia Profile",
    description: "Explicitly update local dyslex.ia profile preferences. Never stores inferred disability or medical data.",
    inputSchema: zodToJsonSchema(profileUpdateSchema) as Record<string, unknown>
  },
  {
    name: "dyslexia_rewrite",
    title: "Rewrite Accessibly",
    description: "Rewrite text for readability, concision, structure, proofreading, professional tone, or plain language while protecting technical tokens.",
    inputSchema: zodToJsonSchema(rewriteInputSchema) as Record<string, unknown>
  },
  {
    name: "dyslexia_explain",
    title: "Explain Accessibly",
    description: "Explain text, an error, a command, code, or a concept with facts separated from hypotheses.",
    inputSchema: zodToJsonSchema(explainInputSchema) as Record<string, unknown>
  },
  {
    name: "dyslexia_structure_instructions",
    title: "Structure Instructions",
    description: "Transform a complex instruction into result, constraints, steps, non-goals, and success criteria.",
    inputSchema: zodToJsonSchema(textInputSchema) as Record<string, unknown>
  },
  {
    name: "dyslexia_summarize_terminal",
    title: "Summarize Terminal Output",
    description: "Summarize terminal output while preserving the first useful error, paths, warnings, commands, and exit codes.",
    inputSchema: zodToJsonSchema(textInputSchema) as Record<string, unknown>
  },
  {
    name: "dyslexia_explain_diff",
    title: "Explain Git Diff",
    description: "Explain a Git diff by additions, removals, functional change, risks, unchanged context, and tests needed.",
    inputSchema: zodToJsonSchema(textInputSchema) as Record<string, unknown>
  },
  {
    name: "dyslexia_check_ambiguity",
    title: "Check Ambiguity",
    description: "Detect wording that has multiple material interpretations, including dates, units, pronouns, and separators.",
    inputSchema: zodToJsonSchema(textInputSchema) as Record<string, unknown>
  },
  {
    name: "dyslexia_compare_versions",
    title: "Compare Text Versions",
    description: "Show clear differences between original and revised text without changing identifiers.",
    inputSchema: zodToJsonSchema(compareInputSchema) as Record<string, unknown>
  },
  {
    name: "dyslexia_resume_context",
    title: "Resume Context",
    description: "Produce a concise reentry note with current state, decisions, completed work, remaining work, and next action.",
    inputSchema: zodToJsonSchema(textInputSchema) as Record<string, unknown>
  },
  {
    name: "dyslexia_doctor",
    title: "Run Dyslexia Doctor",
    description: "Return dependency and compatibility diagnostics, including Superpowers status and host detection.",
    inputSchema: emptySchema
  }
];
