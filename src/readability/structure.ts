export function structureInstructions(text: string): Record<string, string[]> {
  const lines = text.split(/\r?\n|(?<=[.!?])\s+/).map((line) => line.trim()).filter(Boolean);
  const constraints = lines.filter((line) => /\b(must|never|required|do not|cannot|should|constraint|obligatoire|jamais)\b/i.test(line));
  const steps = lines.filter((line) => /\b(create|update|run|check|verify|install|write|add|remove|crée|modifie|vérifie|exécute)\b/i.test(line));
  return {
    "Result requested": [lines[0] ?? "Not explicit."],
    "What is provided": ["User supplied instruction text."],
    Constraints: constraints.length ? constraints : ["No explicit constraint found."],
    Steps: steps.length ? steps : lines.slice(0, 6),
    "Do not do": lines.filter((line) => /\b(do not|never|jamais|ne pas)\b/i.test(line)),
    "Success criteria": ["Each step has an observable result.", "Ambiguous technical tokens are preserved exactly."]
  };
}

export function detectAmbiguities(text: string): string[] {
  const ambiguities: string[] = [];
  if (/\b(it|this|that|ça|cela|le|la|les)\b/i.test(text)) {
    ambiguities.push("A pronoun may refer to more than one previous item.");
  }
  if (/\b(soon|later|recent|latest|demain|hier|bientôt|récent)\b/i.test(text)) {
    ambiguities.push("A relative time expression needs an absolute date or reference point.");
  }
  if (/\b\d{1,2}\/\d{1,2}\/\d{2,4}\b/.test(text)) {
    ambiguities.push("A slash date can be read as day/month/year or month/day/year.");
  }
  if (/\b\d+[,.]\d{3}\b/.test(text)) {
    ambiguities.push("A decimal or thousands separator may be locale-dependent.");
  }
  if (/\b\d+\s*m\b/i.test(text)) {
    ambiguities.push("The unit 'm' may mean meters or minutes depending on context.");
  }
  return ambiguities;
}

export function summarizeTerminal(output: string): Record<string, unknown> {
  const lines = output.split(/\r?\n/);
  const errorLine = lines.find((line) => /\b(error|failed|exception|fatal|enoent|eacces)\b/i.test(line));
  const warnings = lines.filter((line) => /\b(warn|deprecated|deprecation)\b/i.test(line)).slice(0, 10);
  const paths = Array.from(new Set(output.match(/(?:[A-Za-z]:\\|\/|\.\.?\/)[^\s:]+/g) ?? [])).slice(0, 20);
  const exitCode = output.match(/(?:exit code|code)\s*[:=]?\s*(\d+)/i)?.[1];
  return {
    "What happened": errorLine ? "The command output contains at least one error." : "No clear error line was detected.",
    "First useful error": errorLine ?? "No explicit error found.",
    "Probable root cause": errorLine ? "Needs confirmation from the surrounding command and file path." : "Not enough evidence.",
    "Paths involved": paths,
    "Exit code": exitCode ?? "Not present in the supplied output.",
    Warnings: warnings
  };
}

export function explainDiff(diff: string): Record<string, string[]> {
  const additions = diff.split(/\r?\n/).filter((line) => line.startsWith("+") && !line.startsWith("+++")).slice(0, 30);
  const deletions = diff.split(/\r?\n/).filter((line) => line.startsWith("-") && !line.startsWith("---")).slice(0, 30);
  const files = Array.from(new Set(diff.match(/(?:\+\+\+|---) [ab]\/([^\n]+)/g)?.map((line) => line.replace(/^(?:\+\+\+|---) [ab]\//, "")) ?? []));
  return {
    "Files touched": files.length ? files : ["No file headers found."],
    "Added": additions.length ? additions : ["No additions found."],
    "Removed": deletions.length ? deletions : ["No removals found."],
    "Functional change": ["Infer from the changed lines above; do not assume behavior not shown in the diff."],
    "Risks": ["Check changed identifiers, boundary cases, and tests covering the touched files."],
    "Tests needed": files.map((file) => `Run focused tests for ${file}.`)
  };
}
