export interface PromptDefinition {
  name: string;
  title: string;
  description: string;
  arguments?: Array<{ name: string; description: string; required?: boolean }>;
  template: string;
}

export const PROMPTS: PromptDefinition[] = [
  {
    name: "make_readable",
    title: "Make Text Readable",
    description: "Rewrite text into short blocks while preserving all technical details.",
    arguments: [{ name: "text", description: "Text to rewrite", required: true }],
    template: "Make the following text easier to read without removing technical information:\n\n{{text}}"
  },
  {
    name: "explain_error",
    title: "Explain Error",
    description: "Explain an error with original output preserved and no invented cause.",
    arguments: [{ name: "error", description: "Error output", required: true }],
    template: "Explain this error. Preserve the original error first, then separate facts from hypotheses:\n\n{{error}}"
  },
  {
    name: "instructions_to_plan",
    title: "Instructions To Plan",
    description: "Transform an instruction into clear steps and success criteria.",
    arguments: [{ name: "instruction", description: "Instruction text", required: true }],
    template: "Decode this instruction into result, constraints, steps, non-goals, and success criteria:\n\n{{instruction}}"
  },
  {
    name: "resume_context",
    title: "Resume Context",
    description: "Create a reentry summary for interrupted work.",
    arguments: [{ name: "context", description: "Work context", required: true }],
    template: "Create a reentry summary with current state, decisions, completed work, remaining work, and next single action:\n\n{{context}}"
  },
  {
    name: "check_understanding",
    title: "Check Understanding",
    description: "Verify understanding without turning every point into a question.",
    arguments: [{ name: "request", description: "User request", required: true }],
    template: "State the likely intent and ask only questions whose answer materially changes the result:\n\n{{request}}"
  },
  {
    name: "explain_diff",
    title: "Explain Diff",
    description: "Explain a Git diff in an accessible review-oriented structure.",
    arguments: [{ name: "diff", description: "Git diff", required: true }],
    template: "Explain this diff by additions, removals, functional change, risks, unchanged context, and tests:\n\n{{diff}}"
  },
  {
    name: "correct_preserve_tone",
    title: "Correct Text Preserve Tone",
    description: "Correct writing without changing the user's tone.",
    arguments: [{ name: "text", description: "Text to correct", required: true }],
    template: "Correct spelling and grammar while preserving tone and meaning. Distinguish certain corrections from uncertain interpretations:\n\n{{text}}"
  },
  {
    name: "accessible_superpowers_plan",
    title: "Accessible Superpowers Plan",
    description: "Present a Superpowers plan with the dyslex.ai task format.",
    arguments: [{ name: "plan", description: "Superpowers plan", required: true }],
    template: "Present this Superpowers plan accessibly without changing gates or intent. Use task blocks with But, Fichiers, Action, Pourquoi, Verification, and Resultat attendu:\n\n{{plan}}"
  }
];

export function renderPrompt(name: string, args: Record<string, unknown>): string | undefined {
  const prompt = PROMPTS.find((item) => item.name === name);
  if (!prompt) return undefined;
  return prompt.template.replace(/\{\{(\w+)\}\}/g, (_, key: string) => String(args[key] ?? ""));
}
