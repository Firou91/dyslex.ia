import { listTechnicalTokens, protectTechnicalTokens, restoreTechnicalTokens } from "./technicalTokens.js";
import type { DyslexiaProfile } from "../shared/types.js";

export type RewriteMode = "readable" | "concise" | "structured" | "proofread" | "professional" | "plain-language";

function splitSentences(text: string): string[] {
  return text
    .replace(/\s+/g, " ")
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean);
}

function chunkSentences(sentences: string[], size: number): string {
  const chunks: string[] = [];
  for (let index = 0; index < sentences.length; index += size) {
    chunks.push(sentences.slice(index, index + size).join(" "));
  }
  return chunks.join("\n\n");
}

function normalizeSpacing(text: string): string {
  return text
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function applyLightProofread(text: string): string {
  return text
    .replace(/\bteh\b/gi, "the")
    .replace(/\badn\b/gi, "and")
    .replace(/\brecieve\b/gi, "receive")
    .replace(/\bseperate\b/gi, "separate")
    .replace(/\s+([,.!?;:])/g, "$1");
}

export function rewriteText(
  text: string,
  mode: RewriteMode,
  profile: DyslexiaProfile,
  options: { preserveTechnicalTokens?: boolean | undefined; preserveTone?: boolean | undefined; showChanges?: boolean | undefined } = {}
): { text: string; changes: string[]; technicalTokens: string[] } {
  const protectedText = options.preserveTechnicalTokens !== false ? protectTechnicalTokens(text) : { text, tokens: [] };
  const original = protectedText.text;
  let result = normalizeSpacing(original);
  const changes: string[] = [];

  if (mode === "proofread" || mode === "professional") {
    const proofread = applyLightProofread(result);
    if (proofread !== result) changes.push("Corrected common spelling and spacing errors.");
    result = proofread;
  }

  if (mode === "concise") {
    result = splitSentences(result).slice(0, 6).join(" ");
    changes.push("Kept the most direct sentences.");
  }

  if (mode === "readable" || mode === "structured" || mode === "plain-language") {
    const chunkSize = profile.preferredChunkSize === "small" ? 1 : profile.preferredChunkSize === "large" ? 4 : 2;
    result = chunkSentences(splitSentences(result), chunkSize);
    changes.push("Split text into shorter blocks.");
  }

  if (mode === "structured") {
    result = `Summary\n${result}\n\nNext check\nConfirm that no technical identifier changed.`;
    changes.push("Added explicit headings.");
  }

  if (mode === "plain-language") {
    result = result
      .replace(/\butilize\b/gi, "use")
      .replace(/\bapproximately\b/gi, "about")
      .replace(/\bprior to\b/gi, "before");
    changes.push("Replaced a small set of formal words with plain-language alternatives.");
  }

  if (mode === "professional" && !options.preserveTone) {
    result = result.replace(/\bASAP\b/g, "as soon as practical");
    changes.push("Adjusted urgent wording to a professional tone.");
  }

  return {
    text: restoreTechnicalTokens(result, protectedText.tokens),
    changes,
    technicalTokens: listTechnicalTokens(text)
  };
}

export function compareTexts(original: string, revised: string): string {
  if (original === revised) return "No differences.";
  const originalLines = original.split(/\r?\n/);
  const revisedLines = revised.split(/\r?\n/);
  const rows: string[] = [];
  const max = Math.max(originalLines.length, revisedLines.length);
  for (let index = 0; index < max; index += 1) {
    if (originalLines[index] !== revisedLines[index]) {
      if (originalLines[index] !== undefined) rows.push(`- ${originalLines[index]}`);
      if (revisedLines[index] !== undefined) rows.push(`+ ${revisedLines[index]}`);
    }
  }
  return rows.join("\n");
}
