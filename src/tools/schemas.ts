import { z } from "zod";

export const rewriteInputSchema = z.object({
  text: z.string().min(1),
  mode: z.enum(["readable", "concise", "structured", "proofread", "professional", "plain-language"]),
  preserveTechnicalTokens: z.boolean().optional(),
  preserveTone: z.boolean().optional(),
  showChanges: z.boolean().optional(),
  language: z.string().optional()
}).strict();

export const textInputSchema = z.object({
  text: z.string().min(1),
  language: z.string().optional()
}).strict();

export const explainInputSchema = z.object({
  text: z.string().min(1),
  kind: z.enum(["text", "error", "command", "concept", "code"]).default("text"),
  language: z.string().optional()
}).strict();

export const compareInputSchema = z.object({
  original: z.string(),
  revised: z.string()
}).strict();

export const profileUpdateSchema = z.object({
  activeProfile: z.enum(["minimal", "balanced", "guided", "custom"]).optional(),
  customProfile: z.record(z.unknown()).optional()
}).strict();

export type RewriteInput = z.infer<typeof rewriteInputSchema>;
export type TextInput = z.infer<typeof textInputSchema>;
export type ExplainInput = z.infer<typeof explainInputSchema>;
export type CompareInput = z.infer<typeof compareInputSchema>;
