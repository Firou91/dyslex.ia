export type ProfileName = "minimal" | "balanced" | "guided" | "custom";

export interface DyslexiaProfile {
  language: string;
  maxSentenceLength?: number | undefined;
  preferredChunkSize?: "small" | "medium" | "large" | undefined;
  headingDensity?: "low" | "medium" | "high" | undefined;
  listPreference?: "minimal" | "when-useful" | "frequent" | undefined;
  correctionMode?: "silent" | "show-differences" | "explain" | "ask-when-ambiguous" | undefined;
  acronymExpansion?: boolean | undefined;
  ambiguityWarnings?: boolean | undefined;
  technicalTokenProtection?: boolean | undefined;
  explicitExpectedResults?: boolean | undefined;
  repeatCriticalContext?: boolean | undefined;
  forcedChoiceWhenRequested?: boolean | undefined;
}

export interface NamedProfile {
  name: ProfileName;
  profile: DyslexiaProfile;
  origin: "default" | "user" | "project" | "call";
}

export type HostId =
  | "claude-code"
  | "antigravity"
  | "codex-app"
  | "codex-cli"
  | "cursor"
  | "factory-droid"
  | "copilot-cli"
  | "kimi-code"
  | "opencode"
  | "pi"
  | "unknown";

export interface StructuredResult<T = unknown> {
  ok: boolean;
  kind: "success" | "user-error" | "internal-error";
  message: string;
  data?: T;
  warnings?: string[];
}
