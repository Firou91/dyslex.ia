import { HOSTS } from "../hosts/catalog.js";
import { DEFAULT_PROFILES } from "../profiles/defaults.js";
import { SUPPORTED_SUPERPOWERS_RANGE, VERSION } from "../shared/version.js";
import { THREAT_MODEL } from "../security/threatModel.js";

export interface ResourceDefinition {
  uri: string;
  name: string;
  title: string;
  description: string;
  mimeType: string;
  text: string;
}

const skillNames = [
  "accessible-response",
  "typo-tolerant-intent",
  "spelling-and-writing-support",
  "instruction-decoder",
  "task-sequencer",
  "context-reentry",
  "code-explainer",
  "identifier-safety",
  "error-decoder",
  "diff-reader",
  "terminal-output-reader",
  "documentation-navigator",
  "prompt-clarifier",
  "number-and-date-clarifier",
  "decision-comparator",
  "accessible-superpowers"
];

export const RESOURCES: ResourceDefinition[] = [
  {
    uri: "dyslexai://profile/current",
    name: "current-profile",
    title: "Current Accessibility Profile",
    description: "Default profile catalog for dyslex.ai.",
    mimeType: "application/json",
    text: JSON.stringify({ version: VERSION, default: "balanced", profiles: DEFAULT_PROFILES }, null, 2)
  },
  {
    uri: "dyslexai://profile/schema",
    name: "profile-schema",
    title: "Profile Schema",
    description: "Versioned shape of DyslexAIProfile.",
    mimeType: "application/json",
    text: JSON.stringify({ version: "1", fields: Object.keys(DEFAULT_PROFILES.custom) }, null, 2)
  },
  {
    uri: "dyslexai://skills/catalog",
    name: "skills-catalog",
    title: "Skills Catalog",
    description: "Initial native Agent Skills included with dyslex.ai.",
    mimeType: "application/json",
    text: JSON.stringify({ version: "1", skills: skillNames }, null, 2)
  },
  {
    uri: "dyslexai://guidelines/readability",
    name: "readability-guidelines",
    title: "Readability Guidelines",
    description: "Internal readability rules used by dyslex.ai.",
    mimeType: "text/markdown",
    text: [
      "# Readability guidelines v1",
      "",
      "- Preserve meaning and technical detail.",
      "- Use direct sentences and explicit headings.",
      "- Prefer exact nouns over ambiguous pronouns.",
      "- Expand acronyms on first use when helpful.",
      "- Write dates without ambiguity.",
      "- Do not infantilize the user or claim medical benefit."
    ].join("\n")
  },
  {
    uri: "dyslexai://guidelines/technical-tokens",
    name: "technical-token-guidelines",
    title: "Technical Token Protection",
    description: "Technical tokens that must not be silently corrected.",
    mimeType: "text/markdown",
    text: "# Technical tokens v1\n\nProtect paths, URLs, commands, flags, package names, variables, classes, JSON keys, hashes, regexes, branch names, and environment variables."
  },
  {
    uri: "dyslexai://integration/superpowers",
    name: "superpowers-integration",
    title: "Superpowers Integration",
    description: "Relationship between Superpowers and dyslex.ai.",
    mimeType: "text/markdown",
    text: "# Superpowers integration v1\n\nSuperpowers determines the work process. dyslex.ai adapts how that process is presented and understood. dyslex.ai must not replace Superpowers hard gates."
  },
  {
    uri: "dyslexai://compatibility/hosts",
    name: "host-compatibility",
    title: "Host Compatibility",
    description: "Supported hosts and adapter strategy.",
    mimeType: "application/json",
    text: JSON.stringify({ version: "1", hosts: HOSTS }, null, 2)
  },
  {
    uri: "dyslexai://compatibility/superpowers",
    name: "superpowers-compatibility",
    title: "Superpowers Compatibility",
    description: "Supported Superpowers version range and startup behavior.",
    mimeType: "application/json",
    text: JSON.stringify({ version: "1", range: SUPPORTED_SUPERPOWERS_RANGE, startupBlockedWithoutDependency: true, threatModel: THREAT_MODEL }, null, 2)
  }
];

export function getResource(uri: string): ResourceDefinition | undefined {
  return RESOURCES.find((resource) => resource.uri === uri);
}
